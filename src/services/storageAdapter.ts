import { StorageService } from "@services/ports";
import { delMany, get, setMany } from "idb-keyval";
import { TokenType } from "@services/types";

export function storageAdapter(): StorageService {
  return {
    async setTokens(tokens) {
      return setMany([
        [TokenType.auth_token, tokens.token],
        [TokenType.refresh_token, tokens.refreshToken],
      ]);
    },
    getToken(type) {
      return get(type);
    },
    removeTokens() {
      return delMany([TokenType.auth_token, TokenType.refresh_token]);
    },
  };
}
