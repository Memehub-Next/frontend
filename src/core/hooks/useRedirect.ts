import { useRouter } from "next/router";
export const useRedirect = () => {
  const router = useRouter();
  return (route: string) => async () => await router.push(route);
};
