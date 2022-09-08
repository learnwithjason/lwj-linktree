import type { Handler } from '@netlify/functions';
import { builder } from '@netlify/functions';
import fetch from 'node-fetch';
import { getTwitchAccessToken } from '@jlengstorf/get-twitch-oauth';

type TwitchFollowsResponse = {
  total: number;
};

const apiUrl = new URL('https://api.twitch.tv');
apiUrl.pathname = '/helix/users/follows';
apiUrl.searchParams.set('to_id', process.env.TWITCH_CHANNEL_ID || '');
apiUrl.searchParams.set('first', '1');

async function getTwitchFollowsData() {
  const res = await getTwitchAccessToken();

  if (!process.env.TWITCH_CLIENT_ID) {
    return {
      statusCode: 401,
      body: 'Must supply valid credentials for Twitch.',
    };
  }

  const twitchRes = await fetch(apiUrl.toString(), {
    method: 'GET',
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${res.access_token}`,
    },
  });

  if (!twitchRes.ok) {
    console.error(`Failed to fetch Twitch stats: ${twitchRes.status}`);
  }

  const data = (await twitchRes.json()) as TwitchFollowsResponse;

  const followers = data.total;

  return {
    statusCode: 200,
    body: JSON.stringify({
      site: 'twitch',
      stats: {
        followers,
      },
    }),
    ttl: 3600,
  };
}

export const handler: Handler = builder(getTwitchFollowsData);
