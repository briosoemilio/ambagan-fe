<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <UCard v-for="i in 3" :key="i">
      <div class="space-y-4">
        <USkeleton class="h-8 w-3/4" />
        <div class="flex items-center gap-2">
          <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
          <USkeleton class="h-4 w-1/2" />
        </div>
        <div class="flex justify-between items-center mt-4">
          <div class="space-y-2">
            <USkeleton class="h-4 w-24" />
            <USkeleton class="h-4 w-28" />
          </div>
          <div class="flex -space-x-2">
            <USkeleton class="h-8 w-8" :ui="{ rounded: 'rounded-full' }" />
            <USkeleton class="h-8 w-8" :ui="{ rounded: 'rounded-full' }" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>