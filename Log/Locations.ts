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
	export function getLocations(request: any): Locations | undefined {
		const locations = {
			"cf-connecting-ip": request.headers.get("cf-connecting-ip") ?? undefined,
			"cf-ipcountry": request.headers.get("cf-ipcountry") ?? undefined,
			datacenter: request.cf?.colo ?? undefined,
			country: request.cf?.country ?? undefined,
		}
		return locations
	}
}
