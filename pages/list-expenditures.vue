<script lang="ts" setup>
import { onMounted, onBeforeMount } from "vue";
import { columns } from "@/components/spend/column";

const expenditureStore = useExpenditureStore();
const data = ref(null);
await expenditureStore.loadExpenditures();

async function loadPagination(index: number) {
  await expenditureStore.loadExpenditures(index);
}
</script>

<template>
  <div class="container py-10 mx-auto">
    <SpendDataTable
      :columns="columns"
      :data="expenditureStore.getExpenditures"
      @load-pagination="(e) => loadPagination(e)"
    />
  </div>
</template>
