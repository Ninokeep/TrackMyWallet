import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { hasPreviousPage, skip, totalPages, hasNextPage } from "@/lib/utils";

const dataSchema = z.object({
  p: z.coerce.number().positive().optional().default(1),
});

export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, (body) => {
    return dataSchema.safeParse(body);
  });
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "The query take must be an integer",
    });
  }
  const prisma = new PrismaClient();

  const [data, totalExpenditures] = await prisma.$transaction([
    prisma.expenditure.findMany({
      take: 10,
      skip: skip(result.data.p, 10),
    }),
    prisma.expenditure.count(),
  ]);

  return {
    items: data,
    currentPage: result.data.p,
    totalItems: totalExpenditures,
    totalPages: totalPages(totalExpenditures, 10),
    hasPrevPage: hasPreviousPage(result.data.p),
    hasNextPage: hasNextPage(result.data.p, totalPages(totalExpenditures, 10)),
  };
});
