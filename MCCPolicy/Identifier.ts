import { cryptly } from "cryptly"

export type Identifier = string

export namespace Identifier {
	export function generate(): Identifier {
		return cryptly.Identifier.generate(8)
	}
}
