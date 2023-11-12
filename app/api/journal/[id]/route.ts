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
      entryId: journalUpdated.id,
      userId: user.id,
      sentiment: analysis?.sentiment || 'neutral',
      summary: analysis?.summary || '',
      subject: analysis?.subject || '',
      negative: analysis?.negative || false,
      color: analysis?.color || '',
      sentimentScore: analysis?.sentimentScore || 0,
    },
    update: {
      sentiment: analysis?.sentiment || 'neutral',
      summary: analysis?.summary || '',
      subject: analysis?.subject,
      negative: analysis?.negative,
      color: analysis?.color,
      sentimentScore: analysis?.sentimentScore,
    },
     
  });
    

  return NextResponse.json({
    data: { ...journalUpdated, entryAnalysis: { ...updatedAnalysis } },
  });
};
