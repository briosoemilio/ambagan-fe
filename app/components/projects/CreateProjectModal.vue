<script setup lang="ts">
// Imports
import { createProjectSchema, type CreateProject } from '~/schemas/CreateProject'
import { useCurrencyInput } from 'vue-currency-input'

// Props
const props = defineProps<{ buttonLabel: string }>()

// VUE Composition APIs
const open = ref(false)
const state = reactive<Partial<CreateProject>>({
  name: '',
  description: '',
  targetAmount: 0,
})

// Functions
const closeModal = () => {
  open.value = false
}
const createProject = () => {
  try {
    // do create project
  } catch (error) {
    console.error('Error creating project:', error)
  } finally {
    closeModal()
  }
}

// Currency Input
const { inputRef, numberValue } = useCurrencyInput({
  currency: 'PHP',
  locale: 'en-PH',
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  precision: 2,
})
</script>

<template>
  <UModal v-model:open="open" title="Create New Project">
    <!-- Button -->
    <UButton icon="i-heroicons-plus-circle-20-solid" size="lg">
      {{ props.buttonLabel }}
    </UButton>
    <!-- Content -->
    <template #body>
      <UForm :schema="createProjectSchema" :state="state" class="w-full">
        <UFormField label="Project Name" name="name" class="mb-3">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Description" name="description">
          <UTextarea v-model="state.description" class="w-full"/>
        </UFormField>
        <UFormField label="Target Amount" name="targetAmount" class="mt-3">
          <UInput ref="inputRef" type="text" class="w-full" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton color="neutral" variant="ghost" @click="closeModal">
          Cancel
        </UButton>
        <UButton @click="createProject">
          Create Project
        </UButton>
      </div>
    </template>
  </UModal>
</template>
