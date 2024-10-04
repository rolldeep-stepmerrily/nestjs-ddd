export interface ITokenService {
  createTokens(userId: number): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
  createAccessToken(userId: number): Promise<{
    accessToken: string;
  }>;
}
