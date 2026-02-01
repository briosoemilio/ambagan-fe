<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const auth = useFirebaseAuth()

const state = reactive({
	email: '',
	password: ''
})
const error = ref('')

const schema = z.object({
	email: z.email('Invalid email'),
	password: z.string('Password is required').min(8, 'Must be at least 8 characters')
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
		navigateTo("/ambagan")
	} catch (e: any) {
		error.value = e.message
		console.log("Error during Google sign-in:", e)
	}
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
	console.log("Form submitted with:", state)
}

</script>

<template>
	<UContainer class="flex-1 flex items-center">
		<div class="flex flex-col">
			<h1 class="text-3xl font-bold mb-6">Login</h1>
			<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
				<UFormField label="Email" name="email">
					<UInput v-model="state.email" />
				</UFormField>

				<UFormField label="Password" name="password">
					<UInput v-model="state.password" type="password" />
				</UFormField>

				<UButton type="submit">
					LOGIN
				</UButton>
			</UForm>

			<div class="mt-5">
				<div>or sign up using:</div>

      <UTooltip text="Sign up with Google">
				<UButton color="neutral" variant="ghost" class="mt-2 flex items-center gap-2" icon="i-simple-icons-google"
				@click="signInWithGoogle" />
			</UTooltip>
				<div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
			</div>
		</div>
	</UContainer>
</template>