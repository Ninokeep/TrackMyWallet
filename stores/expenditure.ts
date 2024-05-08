import type {Expenditure} from "~/utils/interfaces/Expenditure";

export const useExpenditureStore = defineStore('expenditure', () => {

    const expenditures = ref<Expenditure>([]);
    const userId = "1";

    function setExpenditures  (value: Expenditure[]):void {
        expenditures.value = value;
    }

    const getExpenditures = computed(() => expenditures.value);

    async function loadExpenditures () {
        const data = await $fetch(`http://localhost:3000/api/expenditures/date-desc/${userId}`);

        if(data){
            setExpenditures(data.datas);
        }
    }

    async function loadExpendituresByDesc(): Promise<Expenditure[]> {
        const { datas } = await $fetch<{datas: Expenditure[]}>(`http://localhost:3000/api/expenditures/date-desc/${userId}`);
        return datas;
    }
    return { loadExpendituresByDesc, expenditures, setExpenditures, loadExpenditures, getExpenditures };
})