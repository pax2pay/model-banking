import type { JWT } from "./index"

export const whitelist: JWT.Whitelist = {
	test: [
		{
			aud: "https://banking.pax2pay.app",
			iat: 1751283567,
			// cSpell:disable-next-line
			id: "UUwLn9rhcf8AoRuG",
			iss: "pax2pay",
			permission: {},
			realm: "test",
			sub: "Test",
		},
	],
}
