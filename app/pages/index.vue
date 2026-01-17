<script setup>
const router = useRouter()
const navToStart = () => router.push('/start')
</script>

<template>
	<UContainer class="flex-1 flex items-center justify-center">
		<div class="flex flex-col items-center">
			<h1 class="text-3xl font-bold mb-6">Welcome to Ambagan.io</h1>
			<UButton label="START" @click="navToStart" />
		</div>
	</UContainer>
</template>