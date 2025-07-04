import { isly } from "isly"
import { Realm } from "../Realm"

export interface Me {
	email: string
	password: string
	realm: Realm
}
export namespace Me {
	export const type = isly.object<Me>({
		email: isly.string(),
		password: isly.string(),
		realm: Realm.type,
	})
}
