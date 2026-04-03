<script setup lang="ts">
import { computed } from 'vue';
import type { Project } from '~/composables/api/types/Project';
const props = defineProps<{ project: Project }>()

const formattedTargetAmount = computed(() => {
  if (props.project.targetAmount === undefined) {
    return '';
  }
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(props.project.targetAmount);
});
</script>

<template>
  <UCard class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700" variant="subtle">
    <div class="flex flex-col h-full">
      <div class="flex justify-between items-start">
        <h2 class="text-xl font-semibold truncate mb-2">
          {{ project?.name }}
        </h2>
        <UButton icon="i-heroicons-trash" color="error" variant="ghost" />
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <UAvatar :src="project?.ownerAvatar?.src" :alt="project?.createdBy" size="xs" />
        <span>{{ project?.createdBy }}</span>
      </div>

      <div class="flex justify-between items-center mt-4">
        <div>
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-inbox-stack" />
            <span>{{ project?.ambagsCount || 0 }} Ambags</span>
          </div>
          <div v-if="project?.projectCompletion"
            class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-check-circle" />
            <span>{{ project?.projectCompletion * 100 }}% Complete</span>
          </div>
          <div v-else-if="project?.targetAmount" class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-currency-dollar" />
            <span>Target: {{ formattedTargetAmount }}</span>
          </div>
        </div>
        <UAvatarGroup :max="2" v-if="project?.users">
          <UAvatar v-for="user in project?.users" :key="user.name" :src="user?.photoURL || ''" :alt="user.name"
            size="sm" />
        </UAvatarGroup>
      </div>
    </div>
  </UCard>
</template>