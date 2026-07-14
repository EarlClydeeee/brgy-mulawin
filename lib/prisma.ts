import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

function getConnectionString() {
  const url = process.env.DATABASE_URL;

  if (!url && process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL environment variable is not set.");
  }

  return url ?? "postgresql://postgres:postgres@localhost:5432/postgres";
}

function createPool() {
  const connectionString = getConnectionString();
  const usesRemoteHost =
    connectionString.includes("supabase") ||
    connectionString.includes("neon.tech") ||
    connectionString.includes("sslmode=require");

  return new Pool({
    connectionString,
    max: process.env.NODE_ENV === "production" ? 1 : 5,
    ...(usesRemoteHost ? { ssl: { rejectUnauthorized: false } } : {}),
  });
}

function createPrismaClient() {
  const pool = globalForPrisma.pool ?? createPool();
  globalForPrisma.pool = pool;

  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
globalForPrisma.prisma = prisma;
