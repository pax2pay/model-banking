import { isly } from "isly"

export interface Issue {
	link: string
	status: "closed" | "open"
}

export namespace Issue {
	export const type = isly.object<Issue>({
		link: isly.string(),
		status: isly.string(["closed", "open"]),
	})
}
