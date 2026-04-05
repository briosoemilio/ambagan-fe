<script setup lang="ts">
import type { Ambag } from '~/composables/api/types/Ambag';

const props = defineProps<{
  ambag?: Ambag;
  isLoading?: boolean;
}>();

const isModalOpen = ref(false);
</script>

<template>
  <!-- Loading Card -->
  <div v-if="isLoading" class="p-4 border rounded-lg">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-4">
        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
        <div class="space-y-2">
          <USkeleton class="h-4 w-37.5" />
          <USkeleton class="h-4 w-25" />
        </div>
      </div>
      <div class="space-y-2 flex flex-col items-end">
        <USkeleton class="h-4 w-25" />
        <USkeleton class="h-4 w-12.5" />
      </div>
    </div>
  </div>

  <!-- Ambag Card -->
  <div
    v-else-if="ambag"
    class="px-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition flex justify-between items-center cursor-pointer"
    @click="isModalOpen = true"
  >
    <div class="flex items-center gap-4">
      <UAvatar :src="ambag.contributor.photoUrl" :alt="ambag.contributor.name" size="md" />
      <div class="flex flex-col items-start overflow-hidden">
        <p class="font-medium truncate">{{ ambag.contributor.name }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-3/4 md:max-w-full">
          Date added: {{ new
            Date(ambag.createdAt._seconds * 1000).toLocaleDateString() }}</p>
      </div>
    </div>
    <div class="text-right overflow-hidden">
      <p class="text-lg font-semibold truncate">
        {{ new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(ambag.amount) }}
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ ambag.note }}</p>
    </div>
  </div>

  <AmbagsViewAmbagModal v-if="ambag" v-model:open="isModalOpen" :ambag="ambag" />
</template>