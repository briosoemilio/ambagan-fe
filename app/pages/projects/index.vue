<script setup lang="ts">
import type { Project } from '~/schemas/Project';

const projects = ref<Project[]>([
  {
    id: 1,
    name: 'Project Alpha',
    owner: { name: 'Ben', avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' } },
    ambagsCount: 12,
    projectCompletion: 0.15,
    users: [
      { name: 'A', avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' } },
      { name: 'B', avatar: { src: 'https://avatars.githubusercontent.com/u/904724?v=4' } },
      { name: 'C', avatar: { src: 'https://avatars.githubusercontent.com/u/2213332?v=4' } },
    ],
  },
  {
    id: 2,
    name: 'Project Beta',
    owner: { name: 'Zoltan', avatar: { src: 'https://avatars.githubusercontent.com/u/611362?v=4' } },
    ambagsCount: 8,
    projectCompletion: 0.85,
    users: [
      { name: 'D', avatar: { src: 'https://avatars.githubusercontent.com/u/611362?v=4' } },
      { name: 'E', avatar: { src: 'https://avatars.githubusercontent.com/u/1024025?v=4' } },
    ],
  },
  {
    id: 3,
    name: 'Project Gamma',
    owner: { name: 'Debbie', avatar: { src: 'https://avatars.githubusercontent.com/u/199975?v=4' } },
    ambagsCount: 23,
    projectCompletion: 0.50,
    users: [
      { name: 'F', avatar: { src: 'https://avatars.githubusercontent.com/u/199975?v=4' } },
      { name: 'G', avatar: { src: 'https://avatars.githubusercontent.com/u/199976?v=4' } },
      { name: 'H', avatar: { src: 'https://avatars.githubusercontent.com/u/199977?v=4' } },
      { name: 'I', avatar: { src: 'https://avatars.githubusercontent.com/u/199978?v=4' } },
    ],
  },
])
</script>

<template>
  <UContainer class="py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">
        My Projects
      </h1>
      <ProjectsCreateProjectModal v-if="projects && projects.length > 0" buttonLabel="Create Project" />
    </div>

    <div v-if="projects && projects.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectsProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </div>

    <div v-else class="text-center py-16">
      <h2 class="text-2xl font-semibold mb-2">
        No Projects Yet
      </h2>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        Get started by creating your first project.
      </p>
      <ProjectsCreateProjectModal buttonLabel="Create Your First Project" />
    </div>


  </UContainer>
</template>
