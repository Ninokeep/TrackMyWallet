<script setup lang="ts">
import { routing } from "~/router/router";

const route = useRoute();

const btnHeaderIsActive = (data:string) =>  computed(() => route.path === data);

</script>

<template>
  <div class="flex p-4 justify-end">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem v-for="item in routing">
          <NavigationMenuLink
            :href="item.href"
            :class="[
            item.fn(), btnHeaderIsActive(item.href).value  ?
            'flex justify-start  opacity-100 text-white bg-gray-800 hover:bg-gray-800 hover:text-white'
            : 'flex justify-start opacity-75 hover:opacity-100 hover:text-white hover:bg-gray-800'
            ]"
          >
            {{ item.name }}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
