<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/vue-table";
import type { PaginationState } from "@tanstack/vue-table";

import { valueUpdater } from "@/lib/utils";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ResponseApi } from "@/utils/interfaces/response-api";
const router = useRouter();
const route = useRoute();
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const emit = defineEmits<{
  (e: "load-pagination", index: number): void;
}>();
const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: ResponseApi<TData>;
}>();

const pagination = ref<PaginationState>({
  pageIndex: props.data.currentPage,
  pageSize: 10,
});

function setPagination({ pageIndex, pageSize }): PaginationState {
  pagination.value.pageIndex = pageIndex;
  pagination.value.pageSize = pageSize;

  return {
    pageIndex,
    pageSize,
  };
}
const table = useVueTable({
  get data() {
    return props.data.items;
  },
  get columns() {
    return props.columns;
  },
  manualPagination: true,
  rowCount: props.data.totalItems,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),

  onPaginationChange: (updater) => {
    if (typeof updater === "function") {
      return setPagination(
        updater({
          pageIndex: pagination.value.pageIndex,
          pageSize: pagination.value.pageSize,
        })
      );
    } else {
      return setPagination(updater);
    }
  },
  state: {
    pagination: pagination.value,
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
  },
});
function setQueryParamPage(page: number) {
  router.push({
    path: route.fullPath,
    query: {
      p: page,
    },
  });
}
function updateTablePageIndexAndSetQueryParam(index: number) {
  table.setPageIndex(index);
  setQueryParamPage(pagination.value.pageIndex);
  emit("load-pagination", index);
}
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filter name..."
        :model-value="table.getColumn('name')?.getFilterValue() as string"
        @update:model-value="table.getColumn('name')?.setFilterValue($event)"
      />
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="text-right"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              class="text-right"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colSpan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="p-4 flex justify-end">
      <SpendPaginationTable
        :table
        @change="(e) => updateTablePageIndexAndSetQueryParam(e)"
      />
    </div>
  </div>
</template>
