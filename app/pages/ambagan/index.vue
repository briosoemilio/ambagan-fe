<script setup>
const router = useRouter()
const navToAuth = () => router.push('/auth')
const navToAmbagan = () => router.push('/ambagan')
</script>

<template>
	<UContainer class="flex-1 flex items-center justify-center">
		<div class="flex flex-col items-center">
			<h1 class="text-3xl font-bold mb-6">This is ambagan page</h1>
		</div>
	</UContainer>
</template>