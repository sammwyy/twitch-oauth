import fetch from 'isomorphic-unfetch';

import { TwitchOAuthError } from './twitch-oauth-error';
import { TwitchOAuthResponse } from './twitch-oauth-response';
import { jsonToURLEncoded } from './utils';
import { TwitchOAuthValidation } from './twitch-oauth-validation';
import TwitchScope from './twitch-scope';

type TwitchOAuthMethod = 'token' | 'code';

interface TwitchOAuthSettings {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: TwitchScope[];
  method?: TwitchOAuthMethod;
}

export class TwitchOAuth {
  private readonly settings: TwitchOAuthSettings;

  public constructor(settings: TwitchOAuthSettings) {
    this.settings = settings;
  }

  public authenticate(): string {
    const method = this.settings.method || 'code';
    const body = {
      response_type: method,
      client_id: this.settings.clientId,
      redirect_uri: this.settings.redirectUri,
      scope: this.settings.scope,
    };
    return 'https://id.twitch.tv/oauth2/authorize?' + jsonToURLEncoded(body);
  }

  public async verifyCodeResponse(code: string): Promise<TwitchOAuthResponse> {
    const body = {
      client_id: this.settings.clientId,
      client_secret: this.settings.clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: this.settings.redirectUri,
    };

    const req = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: jsonToURLEncoded(body),
    });

    const res = await req.json();
    if (res.message) {
      throw new TwitchOAuthError(res.status, res.message);
    }

    return res as TwitchOAuthResponse;
  }

  public async validate(accessToken: string): Promise<TwitchOAuthValidation> {
    const req = await fetch('https://id.twitch.tv/oauth2/validate', {
      headers: {
        'Client-Id': this.settings.clientId,
        Authorization: `bearer ${accessToken}`,
      },
    });

    const res = await req.json();
    if (res.message) {
      throw new TwitchOAuthError(res.status, res.message);
    }

    return res as TwitchOAuthValidation;
  }

  public async refresh(refresh_token: string) {
    const body = {
      client_id: this.settings.clientId,
      client_secret: this.settings.clientSecret,
      grant_type: 'refresh_token',
      refresh_token,
    };

    const req = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: jsonToURLEncoded(body),
    });

    const res = await req.json();
    if (res.message) {
      throw new TwitchOAuthError(res.status, res.message);
    }

    return res as TwitchOAuthResponse;
  }
}
