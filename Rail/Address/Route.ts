import { isly } from "isly"

export type Route = Route.Account | Route.Service
export namespace Route {
	export type Account = { type: "account"; id: string }
	export namespace Account {
		export const type = isly.object<Account>({ type: isly.string("account"), id: isly.string() })
	}
	export type Service = { type: "service"; service: "paxgiroCredit"; configuration: string }
	export namespace Service {
		export const type = isly.object<Service>({
			type: isly.string("service"),
			service: isly.string("paxgiroCredit"),
			configuration: isly.string(),
		})
	}
	export const type = isly.union<Route, Account, Service>(Account.type, Service.type)
	export function fromLegacy(route: string | Route): Route {
		return typeof route == "string" ? { type: "account", id: route } : route
	}
}
