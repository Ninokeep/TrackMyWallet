import {PrismaClient} from "@prisma/client";
import { z } from "zod";
const dataSchema   = z.object({
    userId: z.number().positive()
})

export default defineEventHandler( async (event) => {
    const {userId} = await getValidatedRouterParams<{ userId: number  }>(event, body => {
        dataSchema.safeParse(body)
    })
    const prisma = new PrismaClient();

    const expenditure = await prisma.expenditure.findMany({
        where: {
            userId: 1
        }
    })

    return {datas: expenditure}
})