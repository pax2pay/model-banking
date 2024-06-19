import { isly } from "isly"
import { Realm } from "../Realm"

export interface Configuration {
	realm: Realm
	collection: string
	resource?: string
}
export namespace Configuration {
	export const type = isly.object<Configuration>({
		realm: Realm.type,
		collection: isly.string(),
		resource: isly.string().optional(),
	})
}
