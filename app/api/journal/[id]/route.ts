import getUserByClerkId from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { analyze } from "@/utils/ai";
import {JournalEntry,Analysis,User} from '@prisma/client'


interface Props {
  params: {
    id: string
  }
}

export const PATCH = async (req: Request, { params }: Props) => {
  const user = await getUserByClerkId();
  const { content } = await req.json();

  const journalUpdated: JournalEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(journalUpdated.content);

  const updatedAnalysis: Analysis = await prisma.analysis.upsert({
    where: {
      entryId: journalUpdated.id,
    },
    create: {
      userId: user.id,
      entryId: journalUpdated.id,
      ...analysis,
    },
    update: {
      ...analysis,
    },
  });

  return NextResponse.json({
    data: { ...journalUpdated, analysis: { ...updatedAnalysis } },
  });
};
