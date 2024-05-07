import { h } from 'vue'
import type { Expenditure } from "~/utils/interfaces/Expenditure";
import type { ColumnDef } from "@tanstack/vue-table";

export const columns: ColumnDef<Expenditure>[] = [
    {
        accessorKey: 'id',
        header: () => h('div', { class: 'text-right' }, 'Id'),
        cell: ({ row }) => {

            return h('div', { class: 'text-right font-medium' }, row.getValue("id"))
        },
    },
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-right' }, 'Name'),
        cell: ({ row }) => {

            return h('div', { class: 'text-right font-medium' }, row.getValue("name"))
        },
    },
    {
        accessorKey: 'price',
        header: () => h('div', { class: 'text-right' }, 'Price'),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue('price'))
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return h('div', { class: 'text-right font-medium' }, formatted)
        }
    },
    {
        accessorKey: 'createAt',
        header: () => h('div', { class: 'text-right' }, 'Create At'),
        cell: ({ row }) => {

            return h('div', { class: 'text-right font-medium' }, row.getValue("createAt"))
        }
    }
]