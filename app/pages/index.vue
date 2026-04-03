<script setup>
import { useGetUsers } from '~/composables/api/users/useGetUsers';

const router = useRouter()
const navToStart = () => router.push('/login')
const { data } = useGetUsers();
console.log(
  'Users Data:',
  data.value
)

const items = [{
  title: 'Ambag',
  description: 'Contribute to your projects and goals seamlessly.',
  icon: 'i-heroicons-arrow-trending-up'
}, {
  title: 'Track',
  description: 'Monitor your progress with our intuitive tracking tools.',
  icon: 'i-heroicons-chart-pie'
}, {
  title: 'Record',
  description: 'Keep a detailed history of your achievements and milestones.',
  icon: 'i-heroicons-archive-box'
}]
</script>

<template>
  <UContainer class="flex-1 flex items-center justify-center">
    <div class="text-center max-w-2xl mx-auto">
      <h1 class="text-5xl font-bold mb-4">
        Welcome to Ambagan.io
      </h1>
      <p class="text-xl text-gray-500 dark:text-gray-400 mb-8">
        Your personal tracker of your "Ambagan" goals.
      </p>

      <UCarousel v-slot="{ item }" :items="items" :ui="{
        item: 'basis-full',
        container: 'rounded-lg',
      }" autoplay dots class="mx-auto mb-10">
        <div class="text-center p-4">
          <UIcon :name="item.icon" class="text-4xl text-primary" />
          <h3 class="text-2xl font-bold mt-2">{{ item.title }}</h3>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-1">{{ item.description }}</p>
        </div>
      </UCarousel>

      <UButton class="mt-8" label="Get Started" size="xl" @click="navToStart" />
    </div>
  </UContainer>
</template>