declare global {
  namespace google {
    namespace accounts {
      namespace oauth2 {
        interface TokenResponse {
          access_token: string;
        }
        interface TokenClient {
          requestAccessToken: (options?: { prompt?: string }) => void;
        }
        function initTokenClient(config: {
          client_id: string;
          scope: string;
          callback: (resp: TokenResponse) => void;
        }): TokenClient;
      }
    }
  }
}

interface TokenData {
  token: string;
  expiresAt: number;
}

export { TokenData };
