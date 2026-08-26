import { NextRequest, NextResponse } from "next/server";

const FETCH_TIMEOUT_MS = 8000;

function decodeHtmlEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractMetaContent(html: string, key: string): string | null {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${escaped}["'][^>]*content=["']([^"']*)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${escaped}["']`,
      "i"
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtmlEntities(match[1].trim());
  }
  return null;
}

function extractTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1] ? decodeHtmlEntities(match[1].trim()) : null;
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "url query parameter is required" },
      { status: 400 }
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BookmarkLinkBot/1.0)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    const ogImage = extractMetaContent(html, "og:image");
    const title =
      extractMetaContent(html, "og:title") ??
      extractTitleTag(html) ??
      parsedUrl.hostname;
    const description =
      extractMetaContent(html, "og:description") ??
      extractMetaContent(html, "description") ??
      "";
    const thumbnail = ogImage ? new URL(ogImage, parsedUrl).toString() : null;

    return NextResponse.json({
      url: parsedUrl.toString(),
      title,
      description,
      thumbnail,
    });
  } catch {
    return NextResponse.json({
      url: parsedUrl.toString(),
      title: parsedUrl.hostname,
      description: "",
      thumbnail: null,
    });
  }
}
