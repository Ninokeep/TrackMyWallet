<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { Expenditure } from "~/utils/interfaces/Expenditure";
import { columns } from "~/components/spend/column";
import moment from 'moment';

const data = ref<Expenditure[]>([])

async function getData(): Promise<Expenditure[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      price: 100,
      createAt: moment(new Date()).format("DD/MM/YYYY"),
      name: "testing"
    },
  ]
}

onMounted(async () => {
  data.value = await getData();
});
</script>

<template>
  <div class="container py-10 mx-auto">
    <SpendDataTable :columns="columns" :data="data" />
  </div>
</template>
