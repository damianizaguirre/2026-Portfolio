import { NextResponse } from "next/server";

// Backs the "My recent listens" shelf on /about. Same confidential-client
// refresh-token setup as /api/now-playing -- see that file for why there's no
// visitor-facing OAuth here -- but reads the recently-played history instead
// of the single current track.
export const dynamic = "force-dynamic";

const TRACK_LIMIT = 8;

interface SpotifyArtist {
  name: string;
}

interface SpotifyImage {
  url: string;
}

interface SpotifyTrack {
  id?: string;
  name?: string;
  artists?: SpotifyArtist[];
  external_urls?: { spotify?: string };
  album?: { images?: SpotifyImage[] };
}

interface RecentTrack {
  id: string;
  title: string;
  artist: string;
  albumArt: string | null;
  trackUrl: string | null;
}

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | null> {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now()) {
    return cachedAccessToken.token;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  if (!data.access_token) {
    return null;
  }

  cachedAccessToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in || 3600) * 1000 - 60_000,
  };

  return cachedAccessToken.token;
}

function normalize(track: SpotifyTrack, index: number): RecentTrack {
  return {
    id: track.id || `track-${index}`,
    title: track.name || "Unknown track",
    artist: (track.artists || []).map((artist) => artist.name).join(", ") || "Unknown artist",
    albumArt: track.album?.images?.[0]?.url || null,
    trackUrl: track.external_urls?.spotify || null,
  };
}

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ ok: true, tracks: [] }, { headers: { "Cache-Control": "no-store" } });
  }

  const response = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${TRACK_LIMIT * 2}`,
    { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" },
  );

  if (!response.ok) {
    return NextResponse.json({ ok: true, tracks: [] }, { headers: { "Cache-Control": "no-store" } });
  }

  const data = await response.json();
  const items: { track?: SpotifyTrack }[] = data?.items || [];

  // Spotify returns one entry per play, so a song looped three times shows up
  // three times -- dedupe by track id before trimming to the display count.
  const seen = new Set<string>();
  const tracks: RecentTrack[] = [];

  for (const [index, item] of items.entries()) {
    if (!item.track) {
      continue;
    }

    const normalized = normalize(item.track, index);

    if (seen.has(normalized.id)) {
      continue;
    }

    seen.add(normalized.id);
    tracks.push(normalized);

    if (tracks.length >= TRACK_LIMIT) {
      break;
    }
  }

  return NextResponse.json({ ok: true, tracks }, { headers: { "Cache-Control": "no-store" } });
}
