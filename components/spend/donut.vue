<script setup lang="ts">
import { DonutChart } from "~/components/ui/chart-donut";
import { onMounted } from "vue";
import { useExpenditureStore } from "@/stores/expenditure";

const expenditureStore = useExpenditureStore();

const emits = defineEmits<{
  (e: "mounted", value: boolean): void;
}>();

const valueFormatter = (tick: number | Date) =>
  typeof tick === "number"
    ? `$ ${new Intl.NumberFormat("us").format(tick).toString()}`
    : "";

onMounted(() => {
  emits("mounted", true);
});
</script>

<template>
  <DonutChart
    index="name"
    :category="'total'"
    :data="expenditureStore.getSumExpenditures"
    :value-formatter="valueFormatter"
  />
</template>

<style scoped></style>
