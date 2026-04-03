<script setup lang="ts">
import { computed } from 'vue';
import type { Project } from '~/composables/api/types/Project';
import { useDeleteProject } from '~/composables/api/projects/useDeleteProject';

const props = defineProps<{ project: Project }>()
const toast = useToast();
const { mutateAsync, isPending } = useDeleteProject();

const formattedTargetAmount = computed(() => {
  if (props.project.targetAmount === undefined) {
    return '';
  }
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(props.project.targetAmount);
});

const deleteProject = async () => {
  if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
    return;
  }
  try {
    const res = await mutateAsync(props.project.id);
    if (res.status === 200) {
      toast.add({ title: 'Project deleted successfully', color: 'success' });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    toast.add({ title: 'Error deleting project', description: 'Please try again.', color: 'error' });
  }
}
</script>

<template>
  <UCard class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700" variant="subtle">
    <div class="flex flex-col h-full">
      <div class="flex justify-between items-start">
        <h2 class="text-xl font-semibold truncate mb-2">
          {{ project?.name }}
        </h2>
        <UButton icon="i-heroicons-trash" color="error" variant="ghost" @click.stop.prevent="deleteProject"
          :loading="isPending" />
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <UAvatar :src="project?.owner?.photoUrl" :alt="project?.owner?.name" size="xs" />
        <span>{{ project?.owner?.name }}</span>
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
          <div v-else-if="project?.targetAmount"
            class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
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