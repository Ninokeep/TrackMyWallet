import type { Routing } from '../utils/types/routing';
import {navigationMenuTriggerStyle} from "~/components/ui/navigation-menu";
export const routing: Routing[] = [
    {
        name: "Home",
        href: "/expenditures",
        fn: () => navigationMenuTriggerStyle(),
    },
    {
        name: "List expenditures",
        href: "/list-expenditures",
        fn: () => navigationMenuTriggerStyle(),
    },
]