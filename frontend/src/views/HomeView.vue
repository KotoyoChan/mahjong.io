<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui"

const tabs = [
  {
    label: "Create Table",
    description: "Create a new Mahjong table to play with friends.",
    icon: "i-heroicons-plus-circle-solid",
    slot: "create" as const
  },
  {
    label: "Join Table",
    description: "Join an existing Mahjong table using its name.",
    icon: "i-heroicons-arrow-right-circle-solid",
    slot: "join" as const
  }
] satisfies TabsItem[]
</script>

<template>
  <div class="flex flex-col items-center mt-50 h-screen">
    <UCard variant="soft">
      <div class="flex flex-col gap-6 w-sm">
        <span class="text-xl font-bold text-center mb-2">Mahjong.io</span>
        <UTabs :items="tabs" class="w-full" variant="link" :ui="{ trigger: 'grow' }">
          <template #create>
            <CreateTableForm class="mt-4" />
          </template>
          <template #join>
            <JoinTableForm class="mt-4" />
          </template>
        </UTabs>
      </div>
    </UCard>
  </div>
</template>
