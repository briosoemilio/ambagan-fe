<script setup lang="ts">
// props
const props = defineProps<{
  projectName: string;
}>()

const route = useRoute();
// Imports
import { useCurrencyInput } from 'vue-currency-input'
import { usePostCreateAmbag } from '~/composables/api/ambags/usePostCreateAmbag'
import { usePostUploadFile } from '~/composables/api/uploads/usePostUploadFile'
import { addAmbagSchema, type AddAmbagDto } from '~/schemas/AddAmbag'

const toast = useToast()

// VUE Composition APIs
const open = ref(false)
const file = ref<File | null>(null)
const state = reactive<AddAmbagDto>({
  amount: 0,
  note: '',
})

// Composables
const { mutateAsync: createAmbag, isPending: isCreating } = usePostCreateAmbag()
const { mutateAsync: uploadFile, isPending: isUploading } = usePostUploadFile(route.params.id as string, props.projectName)

// Functions
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  file.value = input.files?.[0] ?? null;
};

const closeModal = () => {
  open.value = false
}
const addAmbag = async () => {
  try {
    let receipt;
    if (file.value) {
      const { body, status } = await uploadFile(file.value);
      if (status !== 200) {
        toast.add({ title: 'Failed to upload receipt', color: 'error' });
        return;
      }
      toast.add({ title: 'Receipt uploaded successfully' });
      receipt = { 
        photoUrl: body.photoUrl,
        uploadId: body.uploadId
      }
    }

    const res = await createAmbag({
      projectId: route.params.id as string,
      ...state,
      receipt,
    })

    if (res.status === 201) {
      toast.add({ title: 'Successfully added a new ambag' })
    }
  } catch (error) {
    console.error('Error creating ambag:', error)
    toast.add({ title: 'Failed to add a new ambag', color: 'error' })
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
        <UFormField label="Note" name="note" class="mb-3">
          <UTextarea v-model="state.note" class="w-full" />
        </UFormField>
        <UFormField label="Receipt (Optional)" name="file">
          <UInput type="file" @change="onFileChange" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton color="neutral" variant="ghost" @click="closeModal">
          Cancel
        </UButton>
        <UButton @click="addAmbag" :loading="isCreating || isUploading">
          Add Ambag
        </UButton>
      </div>
    </template>
  </UModal>
</template>
