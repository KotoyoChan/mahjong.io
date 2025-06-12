<script setup lang="ts">
import { reactive } from "vue"
import * as v from "valibot"
import type { FormSubmitEvent } from "@nuxt/ui"

const tableSchema = v.object({
  tableName: v.pipe(
    v.string(),
    v.trim(),
    v.maxWords("en", 1, "Nickname cannot contain spaces"),
    v.minLength(3, "Table name is required"),
    v.toLowerCase()
  ),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.maxWords("en", 1, "Nickname cannot contain spaces"),
    v.minLength(3, "Password must be at least 3 characters long")
  ),
  nickname: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "Nickname is required"),
    v.maxLength(20, "Nickname cannot exceed 20 characters"),
    v.maxWords("en", 1, "Nickname cannot contain spaces")
  )
})

type TableSchema = v.InferOutput<typeof tableSchema>

const joinTableState = reactive({
  tableName: "",
  password: "",
  nickname: ""
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
    <UFormField label="Nickname" help="No spaces allowed" name="nickname" size="xl">
      <UInput
        placeholder="Give yourself a nickname"
        v-model="joinTableState.nickname"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Table Name" name="tableName" size="xl">
      <UInput placeholder="Enter table name" v-model="joinTableState.tableName" class="w-full" />
    </UFormField>

    <UFormField label="Password" name="password" size="xl">
      <UInput
        type="password"
        placeholder="Enter password"
        v-model="joinTableState.password"
        class="w-full"
      />
    </UFormField>

    <UButton type="submit" size="lg" trailing-icon="i-heroicons-arrow-right-circle-solid">
      Join Table
    </UButton>
  </UForm>
</template>
