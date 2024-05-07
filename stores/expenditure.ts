import type {Expenditure} from "~/utils/interfaces/Expenditure";

export const useExpenditureStore = defineStore('expenditure', () => {

    const expenditures = ref<Expenditure>([]);
    const userId = 1;

    function setExpenditures  (value: Expenditure[]):void {
        expenditures.value = value;
    }

    const getExpenditures = computed(() => expenditures.value);

    async function loadExpenditures () {
        const data = await $fetch(`http://localhost:3000/api/expenditures/${userId}`);

        if(data){
            setExpenditures(data.datas);
        }
    }
    return { expenditures, setExpenditures, loadExpenditures, getExpenditures };
})