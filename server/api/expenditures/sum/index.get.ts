import { PrismaClient } from "@prisma/client";
import moment from "moment";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const userId = 1;

  const expenditures = await prisma.expenditure.findMany({
    where: {
      userId,
    },
  });

  const total = expenditures.reduce((acc, cur) => acc + cur.price, 0);

  const sumOfExpendituresByMonth = expenditures.reduce((acc, current) => {
    const dateConverted = moment(current.createAt).format("MMMM");

    const foundMonth = acc.find((item) => item.name === dateConverted);
    if (foundMonth) {
      foundMonth.total += current.price;
    } else {
      acc.push({ name: dateConverted, total: current.price });
    }

    return acc;
  }, []);

  return {
    total,
    sumOfExpendituresByMonth,
  };
});
