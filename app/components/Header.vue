<script setup lang="ts">
import { useUser } from '~/composables/useUser'
import { useFirebaseAuth } from 'vuefire'
import { signOut } from 'firebase/auth'

const auth = useFirebaseAuth()

const user = useUser()
const isLoggedIn = computed(() => user.value !== null)

const logout = async () => {
  if (auth) {
    console.log("logging out user:", user.value)
    await signOut(auth)
    navigateTo('/')
  }
}
</script>

<template>
  <UHeader>
    <template #title>
      <h1>Ambagan.io</h1>
    </template>


    <template #right>
      <UColorModeButton />
      <UTooltip text="Open on GitHub">
        <UButton color="neutral" variant="ghost" to="https://github.com/nuxt/ui" target="_blank"
          icon="i-simple-icons-github" aria-label="GitHub" />
      </UTooltip>
      <UButton v-if="isLoggedIn" color="error" variant="soft" @click="logout">LOGOUT</UButton>
    </template>
  </UHeader>
</template>
