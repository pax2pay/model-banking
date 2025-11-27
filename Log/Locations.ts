import * as z from "zod"

export namespace Locations {
	export const type = z.object({
		cfConnectionIp: z.string().optional(),
		cfIpCountry: z.string().optional(),
		datacenter: z.string().optional(),
		country: z.string().optional(),
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
export type Locations = z.infer<typeof Locations.type>
