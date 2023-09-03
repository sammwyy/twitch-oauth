import dotenv from 'dotenv';
dotenv.config();

import { TwitchOAuth } from '../src';
import { TwitchOAuthError } from '../src/twitch-oauth-error';
import TwitchScope from '../src/twitch-scope';

const clientId = process.env['TWITCH_CLIENT_ID'] as string;

const twitch = new TwitchOAuth({
  clientId,
  clientSecret: process.env['TWITCH_CLIENT_SECRET'] as string,
  redirectUri: process.env['TWITCH_REDIRECT_URI'] as string,
  scope: process.env['TWITCH_SCOPE']?.split(' ') as TwitchScope[],
});

test('Generate authentication link', () => {
  const link = twitch.authenticate();
  expect(link).not.toBeNull();
  expect(link.includes(clientId)).toBeTruthy();
});

test('Get auth token by code', async () => {
  const code = process.env['TWITCH_RESPONSE_CODE'] as string;
  const res = await twitch.verifyCodeResponse(code);

  expect(res.access_token).not.toBeNull();
  expect(res.expired_in).not.toBeNull();
  expect(res.refresh_token).not.toBeNull();
  expect(res.scope).not.toBeNull();
  expect(res.token_type).toBe('bearer');
});

test('Catch exception with invalid auth code', async () => {
  let error: TwitchOAuthError | null = null;

  const res = await twitch.verifyCodeResponse('Invalid Code').catch((e) => {
    error = e;
    return null;
  });

  expect(res).toBeNull();
  expect(error).not.toBeNull();
  expect((error as unknown as TwitchOAuthError).getStatusCode()).toBe(400);
});
