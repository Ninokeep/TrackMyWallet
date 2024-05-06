<script lang="ts" setup></script>

<template>
  <Carousel
    class="mx-64"
    :opts="{
      align: 'start',
    }"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
        class="md:basis-1/2 lg:basis-1/3"
      >
        <div class="p-1">
          <SpendCard />
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
