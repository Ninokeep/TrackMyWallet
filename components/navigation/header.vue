<script setup lang="ts">
import { routing } from "~/router/router";

const route = useRoute();

const btnHeaderIsActive = (data: string) =>
  computed(() => {
    return route.path === data;
  });
</script>

<template>
  <div class="flex p-4 justify-end">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem v-for="item in routing">
          <NuxtLink
            :to="item.href"
            :class="[
              btnHeaderIsActive(item.href).value
                ? 'flex justify-start  opacity-100 text-white bg-gray-800  transition p-2 rounded-md '
                : 'flex justify-start opacity-75 hover:opacity-100  hover:text-white hover:bg-gray-800 transition p-2 rounded-md',
            ]"
          >
            <NavigationMenuLink :href="item.href">
              {{ item.name }}
            </NavigationMenuLink>
          </NuxtLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
