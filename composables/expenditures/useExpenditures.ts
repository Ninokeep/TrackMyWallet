import type { Expenditure } from "@/utils/interfaces/Expenditure";
import type { ResponseApi } from "@/utils/interfaces/response-api";

export const useExpenditures = async (queryParam?: number) => {
  const expenditures = ref<ResponseApi<Expenditure>>(null);
  const error = ref(null);

  try {
    expenditures.value = await $fetch<ResponseApi<Expenditure>>(
      `http://localhost:3000/api/expenditures?p=${queryParam ?? 1}`
    );
  } catch (err) {
    error.value = err;
  }
  return { expenditures, error };
};
