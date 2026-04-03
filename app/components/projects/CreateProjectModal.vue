<script setup lang="ts">
// Imports
import { createProjectSchema, type CreateProjectDto } from '~/schemas/CreateProject'
import { useCurrencyInput } from 'vue-currency-input'
import { usePostCreateProject } from '~/composables/api/projects/usePostCreateProject'

const toast = useToast()

// Props
const props = defineProps<{ buttonLabel: string }>()

// VUE Composition APIs
const open = ref(false)
const state = reactive<CreateProjectDto>({
  name: '',
  description: '',
  targetAmount: 0,
})

// Composables
const { mutateAsync, isPending } = usePostCreateProject()

// Functions
const closeModal = () => {
  open.value = false
}
const createProject = async () => {
  try {
    const res = await mutateAsync(state)
    console.log("Create project res : ", { res })
    if (res.status === 201) {
      toast.add({ title: 'Successfully created a new project' })
    }
  } catch (error) {
    console.error('Error creating project:', error)
  } finally {
    console.log("will close")
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

watch(numberValue, (newValue) => {
  state.targetAmount = newValue ?? 0
})
</script>

<template>
  <UModal v-model:open="open" title="Create New Project">
    <!-- Button -->
    <UButton icon="i-heroicons-plus-circle-20-solid" size="lg" @click="open = true">
      {{ props.buttonLabel }}
    </UButton>
    <!-- Content -->
    <template #body>
      <UForm :schema="createProjectSchema" :state="state" class="w-full">
        <UFormField label="Project Name" name="name" class="mb-3">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Description" name="description">
          <UTextarea v-model="state.description" class="w-full" />
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
        <UButton @click="createProject" :loading="isPending">
          Create Project
        </UButton>
      </div>
    </template>
  </UModal>
</template>
