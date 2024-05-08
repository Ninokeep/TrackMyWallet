<script lang="ts" setup>
import type {Expenditure} from "~/utils/interfaces/Expenditure";
import type { Ref } from 'vue';

const props = defineProps<{
  expenditures: Ref<Expenditure[]>
}>();


</script>

<template>
  <Carousel
    class="mx-64"
    :opts="{
      align: 'start',
    }"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(value, index) in props.expenditures"
        :key="index"
        class="md:basis-1/2 lg:basis-1/3"
      >
        <div class="p-1">
          <SpendCard v-bind="value"   />
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
