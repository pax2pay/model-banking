import { isly } from "isly"
import { zod } from "../../zod"

export type Route = Route.Account | Route.Service
export namespace Route {
	export type Account = { type: "account"; id: string }
	export namespace Account {
		export const type = isly.object<Account>({ type: isly.string("account"), id: isly.string() })
		export const typeZod = zod.object({ type: zod.literal("account"), id: zod.string() })
	}
	export type Service = { type: "service"; service: string; configuration: string }
	export namespace Service {
		export const type = isly.object<Service>({
			type: isly.string("service"),
			service: isly.string(),
			configuration: isly.string(),
		})
		export const typeZod = zod.object({
			type: zod.literal("service"),
			service: zod.string(),
			configuration: zod.string(),
		})
	}
	export const type = isly.union<Route, Account, Service>(Account.type, Service.type)
	export const typeZod = zod.union([Account.typeZod, Service.typeZod])
	export function fromLegacy(route: string | Route): Route {
		return typeof route == "string" ? { type: "account", id: route } : route
	}
}
