/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				primary: ['"Open Sans"', "Roboto", "sans-serif"],
				secondary: ['"Source Sans Pro"', 'Roboto", "sans-serif'],
			},
			fontWeight: {
				normal: 400,
				medium: 550,
				bold: 700,
			},
			colors: {
				transparent: "hsla(0,0%,100%,.7)",
				light: "#fff",
				dark: "#121212",
				info: "#3498db",
				success: "#07bc0c",
				warning: "#f1c40f",
				error: "#e74c3c",
				"text-light": "#757575",
				"text-dark": "#fff",
				"text-info": "#fff",
				"text-success": "#fff",
				"text-warning": "#fff",
				"text-error": "#fff",
				spinner: "#616161",
				"spinner-empty-area": "#e0e0e0",
				progress: {
					light: "linear-gradient(90deg, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)",
					dark: "#bb86fc",
					info: "#3498db",
					success: "#07bc0c",
					warning: "#f1c40f",
					error: "#e74c3c",
				},
			},
			backgroundImage: {
				"banner-pattern":
					"url('https://www.cipherschools.com/static/media/ProfileCover.e525f2d51356332792cb.png')",
				"white-gradient":
					"linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))",
			},
		},
	},
	variants: {},
	plugins: [require("@tailwindcss/forms")],
};
