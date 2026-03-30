export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCurrentUser()
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login', { replace: true })
  }
})

