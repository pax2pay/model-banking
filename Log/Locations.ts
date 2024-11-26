import { isly } from "isly"

export interface Locations {
	cfConnectionIp?: string
	cfIpCountry?: string
	datacenter?: string
	country?: string
}
export namespace Locations {
	export const type = isly.object<Locations>({
		cfConnectionIp: isly.string().optional(),
		cfIpCountry: isly.string().optional(),
		datacenter: isly.string().optional(),
		country: isly.string().optional(),
	})
}
