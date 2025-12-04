import { zod } from "../zod"

export namespace Locations {
	export const type = zod.object({
		cfConnectionIp: zod.string().optional(),
		cfIpCountry: zod.string().optional(),
		datacenter: zod.string().optional(),
		country: zod.string().optional(),
	})
	export function getLocations(request: any): Locations | undefined {
		const locations = {
			"cf-connecting-ip": request.headers.get("cf-connecting-ip"),
			"cf-ipcountry": request.headers.get("cf-ipcountry"),
			datacenter: request.cf?.colo,
			country: request.cf?.country,
		}
		return type.safeParse(locations).success ? locations : undefined
	}
}
export type Locations = zod.infer<typeof Locations.type>
