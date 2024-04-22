import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			borderColor: {
				base: "var(--color-border)"
			}
		},
	},
	plugins: [],
	corePlugins: {
		// Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
		preflight: true
	}
};
export default config;
