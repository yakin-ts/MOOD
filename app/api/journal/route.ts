import getUserByClerkId from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (reques: Request) => {
  const user = await getUserByClerkId();
  const journal = await prisma.journalEntry.create({
    data: {
      content: "Write about your day !!",

      user: {
        connect: {
          id: user.id,
        },
      },
      entryAnalysis: {
        create: {
          sentiment: "Neutral",
          subject: "None",
          negative: false,
          summary: "None",
          sentimentScore: 0,
          color: "#0101fe",
          userId: user.id,
        },
      },
    },
  });

 
  revalidatePath("/journal");

  return NextResponse.json({
    data: { ...journal },
  });
};
