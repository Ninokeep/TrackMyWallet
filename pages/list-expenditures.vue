<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Expenditure } from "@/utils/interfaces/Expenditure";
import type { ResponseApi } from "@/utils/interfaces/response-api";
import { columns } from "@/components/spend/column";

const data = ref<Expenditure[]>([]);

async function getData(): Promise<ResponseApi<Expenditure>> {
  return await $fetch<ResponseApi<Expenditure>>(
    "http://localhost:3000/api/expenditures"
  );
}

onMounted(async () => {
  data.value = (await getData()).items;
  console.log(data.value);
});
</script>

<template>
  <div class="container py-10 mx-auto">
    <SpendDataTable :columns="columns" :data="data" />
  </div>
</template>
