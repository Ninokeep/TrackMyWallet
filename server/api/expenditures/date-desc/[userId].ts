import {PrismaClient} from "@prisma/client";
import { z } from "zod";
const dataSchema   = z.object({
    userId: z.number().positive()
})

export default defineEventHandler( async (event) => {
    const data = await getValidatedRouterParams<{ userId: number  }>(event, body => {
        dataSchema.safeParse(body)
    })

    if(isNaN(data.userId)){
        throw createError({
            statusCode: 400,
            message:  "The param must be an integer"
        })
    }
    const prisma = new PrismaClient();

    const expenditure = await prisma.expenditure.findMany({
        where: {
            userId: +data.userId
        },
        take: 5,
        orderBy: {
            createAt: "desc"
        }
    })

    return {datas: expenditure}
})