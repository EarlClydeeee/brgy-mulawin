import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { prisma } from "@/lib/prisma";

const HOUR_MS = 60 * 60 * 1_000;
const DAY_MS = 24 * HOUR_MS;

const limits = {
  ip: { durationMs: HOUR_MS, max: 3 },
  email: { durationMs: DAY_MS, max: 5 },
} as const;

function getRateLimitSecret() {
  const secret = process.env.CONTACT_RATE_LIMIT_SECRET;

  if (!secret) {
    throw new Error("CONTACT_RATE_LIMIT_SECRET is not configured.");
  }

  return secret;
}

function hashIdentifier(type: "ip" | "email", value: string) {
  return createHmac("sha256", getRateLimitSecret())
    .update(`${type}:${value}`)
    .digest("hex");
}

function getWindowStart(now: Date, durationMs: number) {
  return new Date(Math.floor(now.getTime() / durationMs) * durationMs);
}

export function getClientIp(requestHeaders: Headers) {
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const candidate = forwardedFor?.split(",")[0]?.trim() ?? requestHeaders.get("x-real-ip")?.trim();

  return candidate && isIP(candidate) ? candidate : null;
}

export function hasInvalidBotFields(
  honeypot: FormDataEntryValue | null,
  formStartedAt: FormDataEntryValue | null,
  now = Date.now(),
) {
  if (typeof honeypot === "string" && honeypot.trim()) {
    return true;
  }

  const startedAt = Number(formStartedAt);
  const elapsedMs = now - startedAt;

  return !Number.isFinite(startedAt) || elapsedMs < 1_500 || elapsedMs > DAY_MS;
}

export async function consumeContactRateLimit({
  email,
  clientIp,
  now = new Date(),
}: {
  email: string;
  clientIp: string | null;
  now?: Date;
}) {
  const identifiers = [
    {
      type: "email" as const,
      value: email.trim().toLowerCase(),
      ...limits.email,
    },
    ...(clientIp
      ? [
          {
            type: "ip" as const,
            value: clientIp,
            ...limits.ip,
          },
        ]
      : []),
  ];

  return prisma.$transaction(async (tx) => {
    await tx.contactRateLimit.deleteMany({
      where: { expiresAt: { lt: now } },
    });

    for (const identifier of identifiers) {
      const windowStart = getWindowStart(now, identifier.durationMs);
      const expiresAt = new Date(windowStart.getTime() + identifier.durationMs);
      const rateLimit = await tx.contactRateLimit.upsert({
        where: {
          keyHash_windowStart: {
            keyHash: hashIdentifier(identifier.type, identifier.value),
            windowStart,
          },
        },
        create: {
          keyHash: hashIdentifier(identifier.type, identifier.value),
          windowStart,
          expiresAt,
          count: 1,
        },
        update: {
          count: { increment: 1 },
          expiresAt,
        },
      });

      if (rateLimit.count > identifier.max) {
        return false;
      }
    }

    return true;
  });
}
