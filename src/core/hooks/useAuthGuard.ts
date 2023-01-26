import { useRouter } from "next/router";
import { useCallback } from "react";
import { EPaidService, useMeQuery } from "../../../graphql/urql-codegen";
import { EUserRole } from "../../../graphql/urql-codegen/index";

interface IAuthGuardOptions {
  services?: EPaidService[];
  roles?: EUserRole[];
  username?: string;
  byPass?: EUserRole[];
}

export function useAuthGuard<T extends Array<any>, U>(
  func: (...args: T) => U extends Promise<unknown> ? never : U,
  auth?: IAuthGuardOptions
): (...args: T) => Promise<U | undefined>;
export function useAuthGuard<T extends Array<any>, U>(
  func: (...args: T) => Promise<U>,
  auth?: IAuthGuardOptions
): (...args: T) => Promise<U | undefined>;
export function useAuthGuard<T extends Array<any>, U>(func: (...args: T) => Promise<U> | U, auth: IAuthGuardOptions = {}) {
  const { username, roles, services, byPass = [EUserRole.Admin] } = auth;
  const router = useRouter();
  const [{ data }] = useMeQuery();
  return useCallback(
    async (...args: T) => {
      switch (true) {
        case !data?.me:
          await router.push("/auth/login");
          return;
        case Boolean(byPass) && byPass?.some((role) => data?.me?.roles.includes(role)):
          return func(...args);
        case Boolean(roles) && !roles?.some((role) => data?.me?.roles.includes(role)):
          await router.push("/auth/login");
          return;
        case Boolean(services) && !services?.some((service) => data?.me?.paidServices.includes(service)):
          await router.push("/auth/login");
          return;
        case Boolean(username) && data?.me?.id !== username:
          await router.push("/auth/login");
          return;
        default:
          return func(...args);
      }
    },
    [data, func]
  );
}
