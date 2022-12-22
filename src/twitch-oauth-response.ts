export interface TwitchOAuthResponse {
  access_token: string;
  expired_in: number;
  refresh_token: string;
  scope: string[];
  token_type: string;
}
