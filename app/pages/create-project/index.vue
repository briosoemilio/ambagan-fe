<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { Project } from '~/schemas/Project'
import { v4 as uuidv4 } from 'uuid';

type ProjectSchema = z.infer<typeof Project>

const schema = Project
const user = useUser()

const state = reactive<Partial<ProjectSchema>>({
	name: undefined,
	members: [],
	createdBy: undefined,
	description: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<ProjectSchema>) {
	if (!user.value) {
		toast.add({ title: 'Error', description: 'You must be logged in to create a project.', color: 'error' })
		return
	}
	const userid = user.value.uid
	const newProject = {
		id: uuidv4(),
		...event.data,
		createdBy: userid,
		members: [userid]
	}
	toast.add({ title: 'Success', description: 'Project successfully created!', color: 'success' })
	console.log({ newProject })
}
</script>

<template>
	<UContainer class="mt-5 flex-1 flex flex-col justify-center">
		<h1 class="text-3xl font-bold mb-6">Start a project</h1>
		<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormField label="Project Name" name="name">
				<UInput v-model="state.name" />
			</UFormField>

			<UFormField label="Description" name="description">
				<UInput v-model="state.description" />
			</UFormField>

			<UButton type="submit">
				Submit
			</UButton>
		</UForm>
	</UContainer>
</template>