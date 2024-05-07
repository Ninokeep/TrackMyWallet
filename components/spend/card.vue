<script setup lang="ts">
import type {Expenditure} from "~/utils/interfaces/Expenditure";
import moment from "moment/moment";

const props = defineProps<Expenditure>()
</script>

<template>
  <Card :key="props.id">
    <CardHeader>
      <CardTitle>Expenditure</CardTitle>
      <CardDescription>{{props.name}}</CardDescription>
    </CardHeader>
    <CardContent>
      {{`${props.price} $`}}
    </CardContent>
    <CardFooter>
      {{moment(props.createAt).format("DD/MM/YYYY")}}
    </CardFooter>
  </Card>
</template>

<style scoped>

</style>