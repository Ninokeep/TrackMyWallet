import { h } from 'vue'
import type { Expenditure } from "~/utils/interfaces/Expenditure";
import type { ColumnDef } from "@tanstack/vue-table";
import moment from 'moment';
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

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
        header: ({column}) => h(Button
            ,
            {
                variant: "ghost",
                onClick: () => column.toggleSorting(column.getIsSorted() === "asc")
            },
            () => ["Name", h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
        ),
        cell: ({ row }) => {

            return h('div', { class: 'font-medium' }, row.getValue("name"))
        }
    },
    {
        accessorKey: 'price',
        header: ({column}) => h(Button, { variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc")
        }, () => ["Price", h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]),
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
        header: ({column}) => h(Button, { variant: "ghost",onClick: () => column.toggleSorting(column.getIsSorted() === "asc") },
            () => ["Create At", h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]),
        cell: ({ row }) => {

            return h('div', { class: 'text-right font-medium' }, moment(row.getValue("createAt")).format('YYYY-MM-DD hh:mm'))
        }
    }
]