<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

import type { FormProps } from "@/utils/types/form-props";

const props = defineProps<FormProps>();
const emit = defineEmits<{
  (e: "submit:form", { name: string, price: number }): void;
}>();

const name = ref(props.name);
const price = ref(props.price);
const errorSubmit = ref(props.errorSubmit);

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    price: z.number().positive(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {

  emit("submit:form", { name: values.name, price: values.price });
});

const isError  = computed(() => Object.keys(form.errors.value).length > 0  ? true : false)
</script>

<template>
  <form @submit="onSubmit" class="flex mt-8 flex-col ">
    <FormField v-slot="{ componentField }" name="name" >
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input
            placeholder="Chips"
            v-bind="componentField"
            :model-value="name"
          />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="price" >
      <FormItem>
        <FormLabel>Price</FormLabel>
        <FormControl class="w-[10em]">
          <Input
            placeholder="10.0"
            v-bind="componentField"
            type="number"
            :model-value="price"
          />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="mt-4" :disabled="!form">Submit</Button>
  </form>
</template>
