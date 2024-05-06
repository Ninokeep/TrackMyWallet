import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const e = getQuery(event);

  console.log(e);
  try {
    await prisma.user.create({
      data: {
        name: "jean",
        email: "jean@gmail.com",
        password: "toto",
      },
    });
  } catch (e) {
    return {
      message: "error",
    };
  }

  return {
    message: "Hello world",
  };
});
