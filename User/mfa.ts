import { zod } from "../zod"

export namespace mfa {
	export type Totp = zod.infer<typeof Totp.Otp>
	export namespace Totp {
		export const typeZod = zod.object({
			key: zod.string().nonempty(), // secret
		})

		export type Otp = zod.infer<typeof Otp.typeZod>
		export namespace Otp {
			export const typeZod = zod.string().length(6).regex(/^\d+$/)
		}
	}
}
