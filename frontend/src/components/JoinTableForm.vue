<script setup lang="ts">
import { reactive } from "vue"
import * as v from "valibot"
import type { FormSubmitEvent } from "@nuxt/ui"

const tableSchema = v.object({
  tableName: v.pipe(
    v.string(),
    v.trim(),
    v.regex(/^\S*$/, "Table name cannot contain spaces"),
    v.minLength(3, "Table name is required"),
    v.toLowerCase()
  ),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.regex(/^\S*$/, "Password cannot contain spaces"),
    v.minLength(3, "Password must be at least 3 characters long")
  )
})

type TableSchema = v.InferOutput<typeof tableSchema>

const joinTableState = reactive({
  tableName: "",
  password: ""
})

const toast = useToast()
async function onJoinTableSubmit(event: FormSubmitEvent<TableSchema>) {
  event.preventDefault()
  const { tableName } = event.data
  // Handle table creation logic here
  toast.add({
    title: "Joined Table",
    description: `Table "${tableName}" has been joined successfully!`,
    color: "success"
  })
  console.log(event.data)
}
</script>

<template>
  <UForm
    :schema="tableSchema"
    :state="joinTableState"
    @submit="onJoinTableSubmit"
    class="space-y-4"
  >
    <UFormField label="Join Table" name="tableName" size="xl">
      <UInput placeholder="Enter table name" v-model="joinTableState.tableName" class="w-full" />
    </UFormField>

    <UFormField label="Password" name="password" size="xl">
      <UInput placeholder="Enter table name" v-model="joinTableState.password" class="w-full" />
    </UFormField>

    <UButton type="submit" size="lg" trailing-icon="i-heroicons-arrow-right-circle-solid">
      Join Table
    </UButton>
  </UForm>
</template>
