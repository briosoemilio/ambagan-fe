<script setup lang="ts">
import type { Project } from '~/schemas/Project';
const props = defineProps<{ project: Project }>()
console.log('Project Prop:', props.project)
</script>

<template>
  <UCard class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700" variant="subtle">
    <div class="flex flex-col h-full">
      <h2 class="text-xl font-semibold truncate mb-2">
        {{ project.name }}
      </h2>
      <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <UAvatar :src="project.owner.avatar?.src" :alt="project.owner.name" size="xs" />
        <span>{{ project.owner.name }}</span>
      </div>

      <div class="flex justify-between items-center mt-4">
        <div>
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-inbox-stack" />
            <span>{{ project.ambagsCount }} Ambags</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-check-circle" />
            <span>{{ project.projectCompletion * 100 }}% Complete</span>
          </div>
        </div>
        <UAvatarGroup :max="2">
          <UAvatar v-for="user in project.users" :key="user.name" :src="user.avatar?.src" :alt="user.name" size="sm" />
        </UAvatarGroup>
      </div>
    </div>
  </UCard>
</template>