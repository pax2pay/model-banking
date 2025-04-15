import { isoly } from "isoly"
import { userwidgets } from "@userwidgets/model"
import { Realm } from "../Realm"
import { Base } from "./Base"

export type User = Base<userwidgets.User> & {
	entityType: "user"
	entity: string
}

export namespace User {
	export const create: Base.Create<userwidgets.User, User, { realm: Realm }> = (
		value: userwidgets.User,
		action: Base.Action,
		data?: { realm: Realm }
	) => ({
		...data,
		entityType: "user",
		entity: value.email,
		action,
		created: isoly.DateTime.now(),
		value,
	})
	export const addSender = Base.pipeToSender(create)
}
