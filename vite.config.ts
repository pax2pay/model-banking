/// <reference types="vitest/config" />
import { defineConfig } from "vite"

export default defineConfig({
	test: {
		typecheck: { tsconfig: "./tsconfig.json" },
		coverage: {
			reporter: ["text", "json", "html"],
			enabled: true,
			all: true,
			cleanOnRerun: true,
			thresholds: { statements: 99, branches: 94, functions: 95, lines: 99 },
		},
		globals: true,
		include: ["**/*.spec.[tj]s"],
		testTimeout: 20000,
		isolate: false,
		exclude: ["node_modules", "dist"],
		server: {
			deps: {
				inline: [
					"@cloudflare/workers-types",
					"cryptly",
					"flagly",
					"authly",
					"isly",
					"isoly",
					"gracely",
					"cloudly-http",
					"cloudly-rest",
					"cloudly-router",
					"cloudly-formdata",
					"cloudly-storage",
					"cloudly-analytics-administration",
					"cloudly-analytics-common",
					"@userwidgets",
					"@userwidgets/model",
					"selectively",
				],
			},
		},
	},
})
