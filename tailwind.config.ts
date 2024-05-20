import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
			},
			borderColor: {
				base: "var(--color-border)"
			},
			fontSize: {
				xs: "var(--text-xs)",
				md: "var(--text-md)",
				lg: "var(--text-lg)",
				xl: "var(--text-xl)",
				xxl: "var(--text-xxl)",
			},
			textColor: {
				main: "var(--text-color-main)",
				desc: "var(--text-color-desc)",
				primary: "var(--text-color-primary)",
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
