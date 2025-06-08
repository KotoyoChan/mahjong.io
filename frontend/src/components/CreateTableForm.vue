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

const createTableState = reactive({
  tableName: "",
  password: ""
})

const toast = useToast()
async function onCreateTableSubmit(event: FormSubmitEvent<TableSchema>) {
  event.preventDefault()
  const { tableName } = event.data
  // Handle table creation logic here
  toast.add({
    title: "Table Created",
    description: `Table "${tableName}" has been created successfully!`,
    color: "success"
  })
  console.log(event.data)
}
</script>

<template>
  <UForm
    :schema="tableSchema"
    :state="createTableState"
    @submit="onCreateTableSubmit"
    class="space-y-4"
  >
    <UFormField
      label="Create Table"
      help="Minimum 3 characters and no spaces"
      name="tableName"
      size="xl"
    >
      <UInput placeholder="Enter table name" v-model="createTableState.tableName" class="w-full" />
    </UFormField>

    <UFormField
      label="Password"
      help="Minimum 3 characters and no spaces"
      name="password"
      size="xl"
    >
      <UInput placeholder="Enter table name" v-model="createTableState.password" class="w-full" />
    </UFormField>

    <UButton type="submit" size="lg" class="mt-4 text-center">Create Table</UButton>
  </UForm>
</template>
