<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div className="flex-1">
      <slot />
    </div>
    <Footer />
  </div>
</template>
