<script setup lang="ts">
const props = defineProps<{ buttonLabel: string }>()
const open = ref(false)
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
</script>

<template>
  <UModal v-model:open="open" title="Create New Project">
    <!-- Button -->
    <UButton icon="i-heroicons-plus-circle-20-solid" size="lg">
      {{ props.buttonLabel }}
    </UButton>
    <!-- Content -->
    <template #body>
      <p>Project form will go here.</p>
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
