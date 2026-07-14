import { prisma } from "@/lib/prisma";

type SyncUserInput = {
  id: string;
  name: string;
  email: string;
};

export async function syncUserToDatabase(user: SyncUserInput) {
  try {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name: user.name,
        email: user.email,
      },
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Failed to sync user to database:", error);
  }
}
