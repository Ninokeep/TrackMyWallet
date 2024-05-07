import { z } from "zod";
import { PrismaClient, Prisma } from '@prisma/client'

const dataSchema = z.object({
  name: z.string().min(1),
  userId: z.number().positive(),
  price: z.number().positive()
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    dataSchema.safeParse(body)
  );

  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: result.error.message,
    });
  }

  const prisma = new PrismaClient()

  const user = await prisma.user.findFirst({where: {
    id: result.data.userId
    }})

  if(!user){
    throw createError({
      statusCode: 409,
      message: "The id user doesn't exist",
    });
  }
  const expenditure = await prisma.expenditure.create({
    data: {
      name: result.data.name,
      userId: result.data.userId,
      price: result.data.price
    }
  });
  if(!expenditure){
    throw createError({
      statusCode: 400,
      message: "erreur",
    });
  }

  return result.data;
});
