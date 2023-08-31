import * as authly from "authly"
import { Transaction } from "../Transaction"

export namespace verifier {
	export async function verify(event: string | undefined): Promise<authly.Payload | undefined> {
		const verifier = authly.Verifier.create(authly.Algorithm.RS256(publicKey))
		const result = verifier ? await verifier.verify(event) : undefined
		return result ? Transaction.get(result) : result
		//TODO: Expand to work with other types for other hook-events
	}
}

const publicKey =
	"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWKqXfw8HU6lMtoLdc1WEkEZP/Dmhx8JmfMMQxcUIiFUkObL9zAEo/pk4/1FCaAy/l14yX76OU97Eannq8FObjd8tU5UOqb4n9RpXO3md1JDIZkuqhjQwuCJax/0nyNY+WH5MLWCBgo5kw6R+AHBdCXQGSGoMGfm0qQAySDE1PmZWc/6sR4WacK+ooMO/YtP7HuQQeG8qsJ44wbQXaYlKupxJr3EDo+Un4N9/PHmXlTTz1u7/aO2KbzP+V6kevvPzf+mS+KvSLMYMgIuDiQXvlor9UeC1M5VNj7Trx6HKnoiekKUt3tL14cIHVKhpOTlN2l2yj4ImmAG3qZ4gMO6DwIDAQAB"
