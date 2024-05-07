import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient();
    const userId = 1;
    const result = await prisma.expenditure.aggregate({
        _sum: {
            price: true
        },
        where: {
            userId: userId
        }
    })
    const sommeParMois = await prisma.expenditure.groupBy({
        by: ['createAt'],
        _sum: {
            price: true,
        },
        where: {
            userId: userId
        }
    });

    return result
})