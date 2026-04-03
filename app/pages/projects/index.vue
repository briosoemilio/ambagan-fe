<script setup lang="ts">
import { useGetProjects } from '~/composables/api/projects/useGetProjects';
const { data: projects, isFetching } = useGetProjects();
</script>

<template>
  <UContainer class="py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">
        My Projects
      </h1>
      <ProjectsCreateProjectModal v-if="projects && projects.length > 0" buttonLabel="Create Project" />
    </div>

    <ProjectsFetchingProjects v-if="isFetching" />

    <div v-else-if="projects && projects.length > 0">
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
