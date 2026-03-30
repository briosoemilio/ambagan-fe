<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const auth = useFirebaseAuth()

const state = reactive({
	email: '',
	password: ''
})
const error = ref('')
const isSignUp = ref(false)

const schema = z.object({
	email: z.string().email('Invalid email'),
	password: z.string().min(8, 'Password must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const signInWithGoogle = async () => {
	error.value = ''
	if (!auth) {
		error.value = 'Auth not initialized'
		return
	}
	try {
		const provider = new GoogleAuthProvider()
		await signInWithPopup(auth, provider)
		navigateTo("/")
	} catch (e: any) {
		error.value = e.message
		console.log("Error during Google sign-in:", e)
	}
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
	error.value = ''
	if (!auth) {
		error.value = 'Auth not initialized'
		return
	}

	try {
		if (isSignUp.value) {
			await createUserWithEmailAndPassword(auth, state.email, state.password)
		} else {
			await signInWithEmailAndPassword(auth, state.email, state.password)
		}
		navigateTo('/')
	} catch (e: any) {
		error.value = e.message
		console.error('Authentication error:', e)
	}
}
</script>

<template>
	<UContainer class="flex-1 flex items-center">
		<div class="flex flex-col">
			<h1 class="text-3xl font-bold mb-6">{{ isSignUp ? 'Sign Up' : 'Login' }}</h1>
			<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
				<UFormField label="Email" name="email">
					<UInput v-model="state.email" />
				</UFormField>

				<UFormField label="Password" name="password">
					<UInput v-model="state.password" type="password" />
				</UFormField>

				<div class="flex items-center space-x-4">
					<UButton type="submit">
						{{ isSignUp ? 'SIGN UP' : 'LOGIN' }}
					</UButton>
					<UButton variant="link" @click="isSignUp = !isSignUp">
						{{ isSignUp ? 'Have an account? Login' : "Don't have an account? Sign Up" }}
					</UButton>
				</div>
			</UForm>

			<div class="mt-5">
				<div>or sign in using:</div>

				<UTooltip text="Sign in with Google">
					<UButton color="neutral" variant="ghost" class="mt-2 flex items-center gap-2"
						icon="i-simple-icons-google" @click="signInWithGoogle" />
				</UTooltip>
				<div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
			</div>
		</div>
	</UContainer>
</template>