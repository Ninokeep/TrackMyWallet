<script setup lang="ts">
import type { Ref } from "vue";
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'

const name = ref("");
const price = ref(0);
const errorSubmit = ref(false);

const { toast } = useToast()

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
  }
}
</script>

<template>
  <Toaster />
  <div class="flex flex-col justify-around h-full">
    <div class="mb-2 mt-4">
      <h1 class="text-2xl font-bold text-center">
        Enter your expenditure of the week
      </h1>
      <SpendForm
        :name="name"
        :price="price"
        :error-submit="errorSubmit"
        @submit:form="(e) => updateFormValue(e)"
      />
    </div>

    <div class="mt-40">
      <h1 class="mx-64 text-xl font-bold mb-2"> Spend of the month</h1>
      <SpendSpenditures />
    </div>
  </div>
</template>