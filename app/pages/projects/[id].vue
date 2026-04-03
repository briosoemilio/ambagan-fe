<script setup lang="ts">
import { useGetSpecificProject } from '~/composables/api/projects/useGetSpecificProject';

const route = useRoute();
const projectId = computed(() => route.params.id);
const { data: projectData, isPending } = useGetSpecificProject(projectId.value as string);

const formattedTargetAmount = computed(() => {
  if (projectData.value?.targetAmount === undefined) {
    return '';
  }
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(projectData.value.targetAmount);
});

const generateInviteLink = () => {
  // do generate invite
};
</script>

<template>
  <div v-if="isPending" class="p-4">
    <p>Loading project details...</p>
  </div>

  <div v-else-if="projectData" class="container mx-auto p-4">
    <!-- Project Info Section -->
    <UCard class="mb-8">
      <template #header>
        <h1 class="text-3xl font-bold">{{ projectData?.name }}</h1>
      </template>
      <p class="text-gray-500 dark:text-gray-400 mb-4">{{ projectData?.description }}</p>
      <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div class="flex items-center gap-2">
          <UAvatar v-if="projectData?.owner.photoUrl" :src="projectData.owner?.photoUrl" :alt="projectData?.owner?.name"
            size="sm" />
          <span>{{ projectData?.owner?.name }}</span>
        </div>
        <div v-if="projectData?.targetAmount" class="flex items-center gap-2">
          <UIcon name="i-heroicons-currency-dollar" />
          <span>Target: {{ formattedTargetAmount }}</span>
        </div>
      </div>
    </UCard>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
        <!-- "Ambag" List Section -->
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-semibold">Ambags</h2>
              <UButton icon="i-heroicons-plus-circle">Ambag</UButton>
            </div>
          </template>
          <!-- This is where you would list the "ambags". For now, it's a placeholder. -->
          <div class="text-center py-8">
            <p class="text-gray-500 dark:text-gray-400">No ambags yet.</p>
          </div>
        </UCard>
      </div>

      <div class="space-y-8">
        <!-- Members Section -->
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-semibold">Members</h2>
              <UButton @click="generateInviteLink" icon="i-heroicons-plus-circle">
                Members
              </UButton>
            </div>
          </template>
          <div v-if="projectData?.users && projectData.users.length > 0" class="space-y-4">
            <div v-for="user in projectData.users" :key="user.id" class="flex items-center gap-3">
              <UAvatar v-if="user.photoURL" :src="user.photoURL" :alt="user.name" size="md" />
              <span class="font-medium">Owner: {{ user.name }}</span>
            </div>
          </div>
          <div v-else class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">No other members.</p>
          </div>
        </UCard>
      </div>
    </div>
  </div>

  <div v-else class="text-center p-8">
    <p class="text-xl text-gray-500 dark:text-gray-400">Project not found.</p>
  </div>
</template>