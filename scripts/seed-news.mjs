import { config } from "dotenv";
import { randomUUID } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

config({ path: ".env" });
config({ path: ".env.local", override: true });

function slugify(headline) {
  return (
    headline
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120) || "news"
  );
}

const posts = [
  {
    headline: "Barangay Assembly – Q2 2026",
    caption:
      "All residents are invited to the quarterly barangay assembly on May 28, 2026 at the Barangay Hall. Agenda covers project updates, budget utilization, open forum, and community programs. Please bring a valid ID for registration.",
    isFeatured: true,
  },
  {
    headline: "Free Medical & Dental Mission",
    caption:
      "Join the free Medical and Dental Mission on May 30, 2026 at the Barangay Covered Court. Services include consultation, BP and blood sugar checks, dental care, and free basic medicines. Bring a valid ID. First come, first served.",
    isFeatured: false,
  },
  {
    headline: "Livelihood Training Program",
    caption:
      "Register now for the Basic Skills and Entrepreneurship Training (June 1–15, 2026). Modules cover dressmaking, food processing, and small business management. Priority for unemployed residents. Certificates and possible starter kits upon completion.",
    isFeatured: false,
  },
  {
    headline: "Road Rehabilitation on Mulawin St. Begins June",
    caption:
      "Road rehabilitation along Mulawin Street begins June 2026. Expect temporary one-way traffic and minor closures. Alternate routes will be posted. Target completion is end of July. Thank you for your patience and cooperation.",
    isFeatured: false,
  },
  {
    headline: "Monthly Clean-Up Drive – May 4",
    caption:
      "Join our monthly community clean-up drive on May 4, 2026 at 6:00 AM. Assembly point: Barangay Plaza. Garbage bags, gloves, and light refreshments will be provided. Purok leaders are encouraged to mobilize their areas.",
    isFeatured: false,
  },
  {
    headline: "4Ps Beneficiary Update & Validation",
    caption:
      "DSWD and the Barangay Social Welfare Office will validate 4Ps beneficiaries on May 12–14, 2026. Bring a valid ID, 4Ps ID or household reference number, and proof of residency. Attendance may affect grant eligibility.",
    isFeatured: false,
  },
  {
    headline: "SK Summer Sports Clinic Wrap-Up",
    caption:
      "The SK Summer Sports Clinic concluded with over 120 youth participants in basketball, volleyball, and fitness training. Certificates were awarded at the closing ceremony. Thank you to coaches, volunteers, and parents.",
    isFeatured: false,
  },
];

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes("supabase")
    ? { rejectUnauthorized: false }
    : undefined,
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const deleted = await prisma.post.deleteMany({});
  console.log(`Deleted ${deleted.count} existing posts.`);

  for (const [index, post] of posts.entries()) {
    const base = slugify(post.headline);
    const slug = `${base}-${randomUUID().slice(0, 8)}`;
    if (post.caption.length > 500) {
      throw new Error(`Caption too long for: ${post.headline}`);
    }
    await prisma.post.create({
      data: {
        slug,
        headline: post.headline,
        caption: post.caption,
        imageUrls: [],
        isFeatured: post.isFeatured,
      },
    });
    console.log(`Created [${index + 1}] ${slug}`);
  }
}

main()
  .then(() => console.log("News seed complete."))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
