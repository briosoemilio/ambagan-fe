<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const auth = useFirebaseAuth()
const toast = useToast()

const state = reactive({
	email: '',
	password: ''
})
const loading = ref(false)
const loadingGoogle = ref(false)
const isSignUp = ref(false)

const schema = z.object({
	email: z.string().email('Invalid email'),
	password: z.string().min(8, 'Password must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const signInWithGoogle = async () => {
	if (!auth) {
		toast.add({ title: 'Error', description: 'Auth not initialized', color: 'error' })
		return
	}
	loadingGoogle.value = true
	try {
		const provider = new GoogleAuthProvider()
		await signInWithPopup(auth, provider)
		navigateTo("/")
	} catch (e: any) {
		toast.add({ title: 'Error', description: e.message, color: 'error' })
		console.log("Error during Google sign-in:", e)
	} finally {
		loadingGoogle.value = false
	}
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
	if (!auth) {
		toast.add({ title: 'Error', description: 'Auth not initialized', color: 'error' })
		return
	}

	loading.value = true
	try {
		if (isSignUp.value) {
			await createUserWithEmailAndPassword(auth, state.email, state.password)
		} else {
			await signInWithEmailAndPassword(auth, state.email, state.password)
		}
		toast.add({ title: 'Success', description: 'Logged in successfully!', color: 'success' })
		navigateTo('/')
	} catch (e: any) {
		toast.add({ title: 'Authentication Error', description: e.message, color: 'error' })
		console.error('Authentication error:', e)
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<UContainer class="flex-1 flex items-center justify-center">
		<UCard class="w-full max-w-sm">
			<template #header>
				<h1 class="text-2xl font-bold text-center">{{ isSignUp ? 'Sign Up' : 'Login' }}</h1>
			</template>

			<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
				<UFormField label="Email" name="email" required>
					<UInput v-model="state.email" icon="i-heroicons-envelope" class="w-full" />
				</UFormField>

				<UFormField label="Password" name="password" required>
					<UInput v-model="state.password" type="password" icon="i-heroicons-lock-closed" class="w-full" />
				</UFormField>

				<UButton type="submit" block :loading="loading">
					{{ isSignUp ? 'Sign Up' : 'Login' }}
				</UButton>
				
			</UForm>

			<template #footer>
				<UButton class="mb-2 -mt-2" variant="link" block @click="isSignUp = !isSignUp">
					{{ isSignUp ? 'Have an account? Login' : "Don't have an account? Sign Up" }}
				</UButton>
				<UButton variant="outline" color="primary" block @click="signInWithGoogle" :loading="loadingGoogle">
					<UIcon name="i-simple-icons-google" class="mr-2" />
					Sign in with Google
				</UButton>
				<UDivider label="OR" class="my-4" />
			</template>
		</UCard>
	</UContainer>
</template>