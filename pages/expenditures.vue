<script setup lang="ts">
import type { Ref } from "vue";
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useExpenditureStore } from '@/stores/expenditure'
import type {Expenditure} from "~/utils/interfaces/Expenditure";
import {show} from "@unovis/ts/components/tooltip/style";

const name = ref("");
const price = ref(0);
const errorSubmit = ref(false);
const expendituresLimitByDate = ref<Expenditure[]>([]);
const expenditures = ref<{datas: Expenditure[]}>({datas: [] as Expenditure[]});
const showDonutSkeleton = ref(false);

const { toast } = useToast()

const expenditureStore  = useExpenditureStore();

onMounted(async () => {
  expendituresLimitByDate.value = await expenditureStore.loadExpendituresByDesc();
})
async function updateFormValue(value: {
  name: Ref<string>;
  price: Ref<number>;
}) {

  const { data, error, pending } = await useFetch("/api/expenditures", {
    method: "POST",
    body: {
      name: value.name,
      price: value.price,
      userId: 1
    },
  });

  if(error.value){
    toast({
      title: 'Error encountered while creating expenditure',
      variant: "destructive",
      description: 'You are encountered an error while creating the expenditure',
    });
  }
  if(data.value){
    toast({
      title: 'Expenditure added',
      description: 'You are added an expenditure',
    });

    expendituresLimitByDate.value = await expenditureStore.loadExpendituresByDesc();
  }

}

function setSkeletonDonut(value: boolean){
  showDonutSkeleton.value = value;
  console.log("event")
}
</script>

<template>
  <Toaster />
  <div class="flex flex-col justify-around h-full">
    <div class="mb-2 mt-4 flex  mx-40">
       <div class="flex-1 flex  flex-col mx-28 ">
       <h1 class="text-2xl font-bold">
         Enter your expenditure of the week
       </h1>
       <SpendForm
           :name="name"
           :price="price"
           :error-submit="errorSubmit"
           @submit:form="(e) => updateFormValue(e)"
       />
     </div>
     <div class="flex-none flex  flex-col items-center justify-start">
       <h1 class="text-2xl font-bold pb-8">General Expenditures</h1>
       <SpendDonut />
     </div>
    </div>

    <div class="mt-40">
      <h1 class="mx-64 text-xl font-bold mb-2"> Spend of the month</h1>

      <SpendSpenditures :expenditures="expendituresLimitByDate" v-if="expendituresLimitByDate.length > 0"/>
      <p class="text-gray-500 text-center" v-else> Not expenditures ...</p>
    </div>
  </div>
</template>
