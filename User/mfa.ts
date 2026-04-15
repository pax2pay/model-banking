import { zod } from "../zod"

export namespace mfa {
	export type Totp = zod.infer<typeof Totp.typeZod>
	export namespace Totp {
		export const typeZod = zod.object({
			key: zod.string().nonempty(), // secret
		})
		export const is = (value: any): value is Totp => typeZod.safeParse(value).success

		export type Otp = zod.infer<typeof Otp.typeZod>
		export namespace Otp {
			export const typeZod = zod.string().length(6).regex(/^\d+$/)
			export const is = (value: any): value is Otp => typeZod.safeParse(value).success
		}
	}
}
