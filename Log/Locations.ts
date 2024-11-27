import { isly } from "isly"

export interface Locations {
	"cf-connecting-ip"?: string
	"cf-ipcountry"?: string
	datacenter?: string
	country?: string
}
export namespace Locations {
	export const type = isly.object<Locations>({
		"cf-connecting-ip": isly.string().optional(),
		"cf-ipcountry": isly.string().optional(),
		datacenter: isly.string().optional(),
		country: isly.string().optional(),
	})
	export function getLocations(request: any): Locations | undefined {
		return {
			"cf-connecting-ip": request.headers.get("cf-connecting-ip") ?? undefined,
			"cf-ipcountry": request.headers.get("cf-ipcountry") ?? undefined,
			datacenter: request.cf?.colo ?? undefined,
			country: request.cf?.country ?? undefined,
		}
	}
}
