import { isly } from "isly"

export interface Me {
	email: string
	password: string
}
export namespace Me {
	export const type = isly.object<Me>({
		email: isly.string(),
		password: isly.string(),
	})
}
