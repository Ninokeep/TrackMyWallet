<script setup lang="ts">
import type { Expenditure } from "~/utils/interfaces/Expenditure";
import moment from "moment/moment";

const props = defineProps<Expenditure>()
</script>

<template>
  <Card :key="props.id">
    <CardHeader>
      <CardTitle>Expenditure</CardTitle>
      <CardDescription>Article bought : {{props.name}}</CardDescription>
    </CardHeader>
    <CardContent>
      {{`Price : ${props.price} $`}}
    </CardContent>
    <CardFooter >
      {{`The ${moment(props.createAt).format("DD-MM-YYYY hh:mm")}`}}
    </CardFooter>
  </Card>
</template>

<style scoped>

</style>