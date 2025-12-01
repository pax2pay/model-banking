import { isoly } from "isoly"
import { Realm } from "../Realm"
import { User as PaysUser } from "../User"
import { Base } from "./Base"

export type User = Base<PaysUser> & {
	entityType: "user"
	entity: string
}

export namespace User {
	export const create: Base.Create<PaysUser, User, { realm: Realm }> = (
		value: PaysUser,
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
