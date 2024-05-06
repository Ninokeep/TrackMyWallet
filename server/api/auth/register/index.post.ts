import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const { email, password, name } = await readBody(event);

  const userFound = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userFound) {
    throw createError({
      statusCode: 409,
      statusMessage: "This email already exists",
    });
  }
  if (!email && !password && !name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bas request",
    });
  }

  try {
    const e = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  } catch (e) {}

  return {
    message: "Hello world",
  };
});
