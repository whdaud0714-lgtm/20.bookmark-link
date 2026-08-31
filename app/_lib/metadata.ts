import type { Metadata } from "next";

export const SITE_NAME = "북마크 링크";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// 오픈그래프/트위터 카드에서 공통으로 사용하는 썸네일 이미지.
export const siteOgImage: NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
> = [
  {
    url: "/북마크 썸네일 제작.png",
    width: 2400,
    height: 1260,
    alt: SITE_NAME,
  },
];

// 페이지별 메타 태그를 만들 때 공통으로 사용하는 헬퍼.
export function buildMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: siteOgImage,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: siteOgImage,
    },
  };
}
