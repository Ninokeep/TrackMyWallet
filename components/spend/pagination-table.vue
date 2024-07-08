<script setup lang="ts" generic="TData">
import { Table } from "@/components/ui/table";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

defineProps({
  table: Table<TData>,
});
const emit = defineEmits<{
  (e: "change", index: number): void;
}>();
const router = useRouter();
const route = useRoute();

function updatePagination(index: number) {
  emit("change", index);
}
</script>
<template>
  <Pagination
    @update:page="
      (index:number) => {updatePagination(index)}
    "
    v-slot="{ page }"
    :total="table.getRowCount()"
    :sibling-count="table.getPageCount()"
    show-edges
    :default-page="1"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
