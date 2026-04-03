<script setup lang="ts">
import { useGetSpecificProject } from '~/composables/api/projects/useGetSpecificProject';

const route = useRoute();
const projectId = computed(() => route.params.id);
const { data: projectData } = useGetSpecificProject(projectId.value as string);
</script>


<template>
  <div>
    <h1>Project Details</h1>
    <p>Project ID: {{ $route.params.id }}</p>
    <p>Project Name: {{ projectData?.name }}</p>
  </div>
</template>