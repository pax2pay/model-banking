import { isoly } from "isoly"
import { userwidgets } from "@userwidgets/model"
import { Realm } from "../../../Realm"
import { Base } from "./Base"

export type User = Base<userwidgets.User> & {
	entity: { type: "user"; id: string }
	action: "created" | "updated" | "removed"
}

export namespace User {
	export function create(value: userwidgets.User, realm: Realm, action: User["action"]): User {
		return {
			realm,
			entity: { type: "user", id: value.email },
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
