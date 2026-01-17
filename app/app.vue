<template>
  <UApp class="min-h-screen flex flex-col">

    <!-- Header -->
    <Header />

    <!-- Main content with exact height -->
    <UMain class="flex-1 flex flex-col min-h-[calc(100vh-var(--ui-header-height)-52px)]">
      <NuxtPage />
    </UMain>

    <!-- Footer -->
    <Footer />
  </UApp>
</template>
