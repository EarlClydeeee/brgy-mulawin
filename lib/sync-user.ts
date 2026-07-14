import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type SyncUserInput = {
  id: string;
  name: string;
  email: string;
};

export async function syncUserToDatabase(user: SyncUserInput): Promise<boolean> {
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
    return true;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      try {
        await prisma.user.update({
          where: { email: user.email },
          data: {
            id: user.id,
            name: user.name,
          },
        });
        return true;
      } catch (updateError) {
        console.error("Failed to reconcile user record:", updateError);
        return false;
      }
    }

    console.error("Failed to sync user to database:", error);
    return false;
  }
}
