import type { Expenditure } from "~/utils/interfaces/Expenditure";
import type { SumType } from "~/utils/types/sum-type";

export const useExpenditureStore = defineStore("expenditure", () => {
  const expenditures = ref<Expenditure>([]);
  const userId = "1";
  const sumExpenditures = ref<SumType[]>([]);

  const getSumExpenditures = computed(() => sumExpenditures.value);
  const getExpenditures = computed(() => expenditures.value);

  async function loadSumExpenditures() {
    const { sumOfExpendituresByMonth } = await $fetch<{
      sumOfExpendituresByMonth: SumType[];
    }>("http://localhost:3000/api/expenditures/sum");

    setSumExpenditures(sumOfExpendituresByMonth);
  }

  function setExpenditures(value: Expenditure[]): void {
    expenditures.value = value;
  }

  function setSumExpenditures(data: SumType[]) {
    sumExpenditures.value = data;
  }

  async function loadExpenditures() {
    const data = await $fetch(
      `http://localhost:3000/api/expenditures/date-desc/${userId}`
    );

    if (data) {
      setExpenditures(data.datas);
    }
  }

  async function loadExpendituresByDesc(): Promise<Expenditure[]> {
    const { datas } = await $fetch<{ datas: Expenditure[] }>(
      `http://localhost:3000/api/expenditures/date-desc/${userId}`
    );

    return datas;
  }

  return {
    loadExpendituresByDesc,
    expenditures,
    sumExpenditures,
    setExpenditures,
    loadExpenditures,
    getExpenditures,
    getSumExpenditures,
    setSumExpenditures,
    loadSumExpenditures,
  };
});
