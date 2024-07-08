import type { SumType } from "~/utils/types/sum-type";
import type { Expenditure } from "@/utils/interfaces/Expenditure";
import type { ResponseApi } from "@/utils/interfaces/response-api";
import { useFetch } from "@vueuse/core";

export const useExpenditureStore = defineStore("expenditure", () => {
  const expenditures = ref<ResponseApi<Expenditure>>(null);
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

  async function loadExpenditures(queryParam?: number) {
    // const { data, status, error, refresh, clear } = await useAsyncData(
    //   "expendituresLoad",
    //   () =>
    //     $fetch(`http://localhost:3000/api/expenditures?p=${queryParam ?? 1}`)
    // );
    // if (data) {
    //   setExpenditures(data.value);
    // }

    try {
      const data = await $fetch(
        `http://localhost:3000/api/expenditures?p=${queryParam ?? 1}`
      );
      setExpenditures(data);
    } catch (e) {
      throw new Error();
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
