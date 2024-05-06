<script setup lang="ts">
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
</script>

<template>
  <div class="flex p-4 justify-end">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/expenditures"
            :class="navigationMenuTriggerStyle()"
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/list-expenditures"
            :class="navigationMenuTriggerStyle()"
          >
            List expenditures
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/login"
            :class="navigationMenuTriggerStyle()"
          >
            Login
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
