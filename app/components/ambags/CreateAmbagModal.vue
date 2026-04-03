<script setup lang="ts">
const route = useRoute();
// Imports
import { useCurrencyInput } from 'vue-currency-input'
import { usePostCreateAmbag } from '~/composables/api/ambags/usePostCreateAmbag'
import { addAmbagSchema, type AddAmbagDto } from '~/schemas/AddAmbag'

const toast = useToast()

// VUE Composition APIs
const open = ref(false)
const state = reactive<AddAmbagDto>({
  amount: 0,
  note: '',
})

// Composables
const { mutateAsync, isPending } = usePostCreateAmbag()

// Functions
const closeModal = () => {
  open.value = false
}
const addAmbag = async () => {
  try {
    const res = await mutateAsync({
      projectId: route.params.id as string,
      ...state
    })
    console.log("Create ambag res : ", { res })
    if (res.status === 201) {
      toast.add({ title: 'Successfully added a new ambag' })
    }
  } catch (error) {
    console.error('Error creating ambag:', error)
    toast.add({ title: 'Failed to add a new ambag', color: 'error' })
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
  state.amount = newValue ?? 0
})
</script>

<template>
  <UModal v-model:open="open" title="Add Ambag">
    <!-- Button -->
    <UButton icon="i-heroicons-plus-circle">Ambag</UButton>
    <!-- Content -->
    <template #body>
      <UForm :schema="addAmbagSchema" :state="state" class="w-full">
        <UFormField label="Amount" name="amount" class="mb-3">
          <UInput ref="inputRef" type="text" class="w-full" />
        </UFormField>
        <UFormField label="Note" name="note">
          <UTextarea v-model="state.note" class="w-full" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton color="neutral" variant="ghost" @click="closeModal">
          Cancel
        </UButton>
        <UButton @click="addAmbag" :loading="isPending">
          Add Ambag
        </UButton>
      </div>
    </template>
  </UModal>
</template>
