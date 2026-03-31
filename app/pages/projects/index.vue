<script setup lang="ts">
interface Project {
  id: number
  name: string
  owner: { name: string, avatar?: { src: string } }
  ambagsCount: number
  users: { name: string, avatar?: { src: string } }[]
  projectCompletion: number
}

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
      <UButton to="/create-project" icon="i-heroicons-plus-circle-20-solid" size="lg">
        Create Project
      </UButton>
    </div>

    <div v-if="projects.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <UCard v-for="project in projects" :key="project.id" class="cursor-pointer" variant="subtle">
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
                <UAvatar v-for="user in project.users" :key="user.name" :src="user.avatar?.src" :alt="user.name"
                  size="sm" />
              </UAvatarGroup>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <div v-else class="text-center py-16">
      <h2 class="text-2xl font-semibold mb-2">
        No Projects Yet
      </h2>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        Get started by creating your first project.
      </p>
      <UButton to="/create-project" icon="i-heroicons-plus-circle-20-solid" size="lg">
        Create Your First Project
      </UButton>
    </div>
  </UContainer>
</template>
