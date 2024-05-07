import { PrismaClient, Prisma } from '@prisma/client'
import {z} from "zod";

const dataSchema = z.object({
  userId: z.number().positive(),
});

export default defineEventHandler(async (event) => {

  const result = await getValidatedRouterParams(event, (body) =>
      dataSchema.safeParse(body)
  );

  const prisma = new PrismaClient();

  const data = await prisma.expenditure.findMany({
    where: {
      userId : result.data?.userId
    }
  });

  return data;
});
