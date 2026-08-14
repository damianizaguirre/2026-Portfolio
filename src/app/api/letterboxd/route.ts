import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MOVIE_LIMIT = 20;
const CACHE_SECONDS = 3600;

interface LetterboxdMovie {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  url: string;
}

function readTag(source: string, tag: string) {
  const escapedTag = tag.replace(":", "\\:");
  const match = source.match(new RegExp(`<${escapedTag}[^>]*>([\\s\\S]*?)<\\/${escapedTag}>`, "i"));
  return match ? decodeEntities(stripCdata(match[1]).trim()) : "";
}

function stripCdata(value: string) {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
}

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function formatWatchedDate(value: string) {
  if (!value) return "";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatRating(value: string) {
  const rating = Number(value);
  if (!Number.isFinite(rating) || rating <= 0) return "";

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return `${"★".repeat(fullStars)}${halfStar ? "½" : ""}`;
}

function readPoster(description: string) {
  const match = description.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? decodeEntities(match[1]) : "";
}

function parseLetterboxdFeed(xml: string): LetterboxdMovie[] {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];
  const seen = new Set<string>();
  const movies: LetterboxdMovie[] = [];

  for (const item of items) {
    const title = readTag(item, "letterboxd:filmTitle");
    const year = readTag(item, "letterboxd:filmYear");
    const watchedDate = formatWatchedDate(readTag(item, "letterboxd:watchedDate"));
    const rating = formatRating(readTag(item, "letterboxd:memberRating"));
    const link = readTag(item, "link");
    const description = readTag(item, "description");
    const image = readPoster(description);
    const dedupeKey = `${title}-${year}`;

    if (!title || !image || seen.has(dedupeKey)) continue;

    seen.add(dedupeKey);
    movies.push({
      id: dedupeKey.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      image,
      title,
      subtitle: [year, watchedDate, rating].filter(Boolean).join(" · "),
      url: link,
    });

    if (movies.length >= MOVIE_LIMIT) break;
  }

  return movies;
}

export async function GET() {
  const username = process.env.LETTERBOXD_USERNAME;

  if (!username) {
    return NextResponse.json(
      { ok: true, movies: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const response = await fetch(`https://letterboxd.com/${username}/rss/`, {
    next: { revalidate: CACHE_SECONDS },
    headers: { "User-Agent": "damianizaguirre.com portfolio" },
  });

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, movies: [] },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }

  const xml = await response.text();
  const movies = parseLetterboxdFeed(xml);

  return NextResponse.json(
    { ok: true, movies },
    { headers: { "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=86400` } },
  );
}
