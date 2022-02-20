import { StorageService } from "@services/ports";
import type { Token } from "@domain/user";
import { del, get, set } from "idb-keyval";

export function storageAdapter(): StorageService {
  const tokenKey = "token";

  return {
    async setToken(token: Token): Promise<void> {
      return set(tokenKey, token);
    },
    getToken(): Promise<Token | undefined> {
      return get(tokenKey);
    },
    removeToken(): Promise<void> {
      return del(tokenKey);
    },
  };
}
