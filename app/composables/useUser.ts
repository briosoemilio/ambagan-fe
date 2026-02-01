import { useCurrentUser } from "vuefire";
import { computed } from "vue";

export function useUser() {
  const userRef = useCurrentUser();
  const user = computed(() => userRef.value ?? null);
  return user;
}
