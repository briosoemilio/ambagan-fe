<script setup lang="ts">
import { useDeleteAmbag } from '~/composables/api/ambags/useDeleteAmbag';
import type { Ambag } from '~/composables/api/types/Ambag';

const props = defineProps<{
  ambag: Ambag;
}>();

const open = defineModel<boolean>('open', { default: false });

const { mutateAsync: deleteAmbagApi } = useDeleteAmbag();
const deleteAmbag = async () => {
  if (!confirm('Are you sure you want to delete this ambag? This action cannot be undone.')) {
    return;
  }
  try {
    const deleteAmbagRes = await deleteAmbagApi(props.ambag.id as string);
    if (deleteAmbagRes.status === 200) {
      open.value = false;
      useToast().add({ title: 'Ambag deleted successfully' });
    }
  } catch (error) {
    console.error('Failed to delete ambag', error);
    useToast().add({ title: 'Failed to delete ambag', color: 'error' });
  }
}
</script>

<template>
  <UModal v-model:open="open">
    <template #header>
      <div class="flex justify-between items-center w-full">
        <h2 class="text-lg font-semibold">Ambag Details</h2>
        <div class="flex gap-2">
          <UTooltip text="Edit Ambag">
            <UButton icon="i-heroicons-pencil-square" color="warning" variant="ghost" />
          </UTooltip>
          <UTooltip text="Delete Ambag">
            <UButton icon="i-heroicons-trash" color="error" variant="ghost" @click="deleteAmbag" />
          </UTooltip>
        </div>
      </div>
    </template>

    <template #body>
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <UAvatar :src="ambag.contributor.photoUrl" :alt="ambag.contributor.name" size="lg" />
          <div>
            <p class="font-medium text-lg">{{ ambag.contributor.name }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Date: {{ new Date(ambag.createdAt._seconds * 1000).toLocaleDateString() }}
            </p>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <p class="text-gray-500 dark:text-gray-400">Amount</p>
          <p class="text-xl font-semibold">
            {{ new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(ambag.amount) }}
          </p>
        </div>

        <div v-if="ambag.note">
          <p class="text-gray-500 dark:text-gray-400 mb-1">Note</p>
          <p class="p-2 border rounded-md">{{ ambag.note }}</p>
        </div>

        <div v-if="ambag.receipt?.photoUrl">
          <p class="text-gray-500 dark:text-gray-400 mb-1">Receipt</p>
          <img :src="ambag.receipt?.photoUrl" alt="Receipt" class="rounded-md border w-full" />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end w-full">
        <UButton color="neutral" variant="ghost" @click="open = false">
          Close
        </UButton>
      </div>
    </template>
  </UModal>
</template>