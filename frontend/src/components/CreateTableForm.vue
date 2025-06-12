<script setup lang="ts">
import { reactive } from "vue"
import * as v from "valibot"
import type { FormSubmitEvent } from "@nuxt/ui"
import { useFetch } from "@vueuse/core"

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

const createTableState = reactive({
  tableName: "",
  password: "",
  nickname: ""
})

const toast = useToast()
async function onCreateTableSubmit(event: FormSubmitEvent<TableSchema>) {
  event.preventDefault()
  const { tableName, password, nickname } = event.data

  const { data, error } = await useFetch("http://localhost:3000/api/create", {
    async beforeFetch({ options }) {
      options.credentials = "include"
    }
  }).post({
    tableName,
    password,
    nickname
  })

  if (error.value) {
    toast.add({
      title: "Error",
      description: error.value.message || "Failed to create table",
      color: "error"
    })
    return
  }

  console.log("Table created:", data.value)

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
    <UFormField label="Nickname" help="No spaces allowed" name="nickname" size="xl">
      <UInput
        placeholder="Give yourself a nickname"
        v-model="createTableState.nickname"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Table Name"
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
      <UInput
        type="password"
        placeholder="Enter password"
        v-model="createTableState.password"
        class="w-full"
      />
    </UFormField>

    <UButton type="submit" size="lg" trailing-icon="i-heroicons-plus-circle-solid">
      Create Table
    </UButton>
  </UForm>
</template>
