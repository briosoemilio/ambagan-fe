<script setup>
const router = useRouter()
const navToAuth = () => router.push('/auth')
const navToAmbagan = () => router.push('/ambagan')
</script>

<template>
  <UContainer class="flex-1 flex items-center justify-center">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-6">Do you want to create an account?</h1>
      <div class="flex flex-row gap-5">
        <UButton color="success" variant="outline" label="Yes" @click="navToAuth" />
        <UButton color="error" variant="outline" label="No" @click="navToAmbagan" />
      </div>
    </div>
  </UContainer>
</template>