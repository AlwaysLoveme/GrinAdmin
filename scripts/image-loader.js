"use client";

export default function imageLoader({ src, width, quality }) {
	return `${process.env.NEXT_PUBLIC_IMAGE_URL}${src}?w=${width}&q=${quality || 75}`;
}