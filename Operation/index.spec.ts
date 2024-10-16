import { pax2pay } from "../index"

const keys = {
	public:
		"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWKqXfw8HU6lMtoLdc1WEkEZP/Dmhx8JmfMMQxcUIiFUkObL9zAEo/pk4/1FCaAy/l14yX76OU97Eannq8FObjd8tU5UOqb4n9RpXO3md1JDIZkuqhjQwuCJax/0nyNY+WH5MLWCBgo5kw6R+AHBdCXQGSGoMGfm0qQAySDE1PmZWc/6sR4WacK+ooMO/YtP7HuQQeG8qsJ44wbQXaYlKupxJr3EDo+Un4N9/PHmXlTTz1u7/aO2KbzP+V6kevvPzf+mS+KvSLMYMgIuDiQXvlor9UeC1M5VNj7Trx6HKnoiekKUt3tL14cIHVKhpOTlN2l2yj4ImmAG3qZ4gMO6DwIDAQAB",
	private:
		"MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNYqpd/DwdTqUy2gt1zVYSQRk/8OaHHwmZ8wxDFxQiIVSQ5sv3MASj+mTj/UUJoDL+XXjJfvo5T3sRqeerwU5uN3y1TlQ6pvif1Glc7eZ3UkMhmS6qGNDC4IlrH/SfI1j5YfkwtYIGCjmTDpH4AcF0JdAZIagwZ+bSpADJIMTU+ZlZz/qxHhZpwr6igw79i0/se5BB4byqwnjjBtBdpiUq6nEmvcQOj5Sfg3388eZeVNPPW7v9o7YpvM/5XqR6+8/N/6ZL4q9IsxgyAi4OJBe+Wiv1R4LUzlU2PtOvHocqeiJ6QpS3e0vXhwgdUqGk5OU3aXbKPgiaYAbepniAw7oPAgMBAAECggEBAMJ9KC+P560pCC67ZBbNty/aDXsLOIHD1me+TGJLvHkFbvs4UvVkt0BAoMF02Kdg2GkfQn4si+8xYK09Y3C1wPuF98YIwqI380AG+S9S6OcdMwzh7dqNXULtNbQHsrHv2xVsvXhuqQ3nKNYk+f0MTJEcLY9e29Ha0i2tuEC9kybI8mvzTHXjEboypN3wYP2m+G2+GrjIeLxLPpGBvTLO9/vzQlahlBwEU3JKFC9/qXT8HymCLAS6k7E6USSEGw2kCYx/TrG0VWXuxpXx86dSwAmgaqp44ykLA89stMjeuFVaKbP+CCuWrlx95sUK7pvQv/xEtT+ThVlRi05Fp2JBzeECgYEA83ejxhzxF+npMvNymMw+NyeYrPwMjGw9hdXHF0um10u9I6KDIn/PMTnVWDa0oQ1rKElrzzD0lWLJw/oDfSP4SH5MhAuX/syWZqJW/hucjPq4Puf+et4Fve2q15L5jVPmwYGqI/Bmy+OaePdnGFr8RfI9Sil2dklkcIEQuv0cFlMCgYEA1/UwtU7kvdR+fDAS7LRx0UmWLTbvux93UzHxqn+XNauma8lZOkKRh6/PJ3emUscMI2PgGFTdn65BwmUj8icVpioXo71/vbmfvFluMjPgbllvhEwFTsZUgkCSx4ivPgh2Pk/VOflT6xu4q1F5NUZpzX/cW1a9fHM93a4V0v9zXdUCgYBCZ6hYub4caqU7S2E/Qb3aZ0diLyDxD/i7zzINLYolALhmxsWDnF6Tq5WACPO9VZ6bj2MDUPP05svnUwKumCf5BdGy1kKvsXd4KOEXT8qkPSIRrk8fjfz8750ATUsZe//dWZNhWAmBpOOWCMyqvO4/2bFTz/lKi/wEH3/DsJN/lwKBgFYhSi3lq0EysMei/Mk/Jm3MJYMe9/nvkM2zi6jufkY/kX5HrbiYuCYfrkUVaVZ2YJb0zHmnz0RSYZPAdterUu0UuJzrhTkMAXNDT7niCs64CMwA7dT/MNFKI8BE+W+KPG6ZtHcMw7VvNvXM5sSisqvtJNug+q3Z4IC7X6TpkP+JAoGAPLqj9DG52nNdY+BwqJLWG5nIZxfWXcYlsr5dwwVYptc4Dont5R63r3Mk8q94+1VC+Vewzfba+y1+kYyK0twdkXNLNDuvHydOXX7LR1L66iEd//rlvWCvuqFkOgnEJk5iPBiF8Z7dFA5+HoHgeBBiF3Na1R3aWiCxnIPbcchRZgQ=",
}
const signer = pax2pay.Operation.Signer.open(keys)

describe("Operation", () => {
	it("is", () => {
		expect(pax2pay.Operation.is(operation)).toBeTruthy()
	})
	it("sign", async () => {
		const operation = {
			...operation2,
			previous:
				"dOGrAgMq1r60lzW0TgCOcyixRktp1Qp9N4x5GWeisAQAazDtL6b1PwlXe8W0w9gf-kPARWRaqi7YQ67pxB7jIzJtMGDN5VL1KBdLmiRm8acUdSVPnrC0n9xh1rFpfQLE-7jCjNjCQHaExaWCZwrt2-kqCCsQgCqNg5yqYZuEjUw9q5YXceaUYjkFwuRtp97WiJYe02iucmgMlaTnsW4AxqqLdQag9_Yom5z3maSyeSkxDuAOIkYABXwV9Nef1uo18I3Qzc_DVm8fXWjPGL0uVs0FJFELDPtN9CAZpEqsbUPoknnGX71rNZ8Kpz7ioG7kEo1gI52r287jn9WUqxNtlQ",
		}
		const signature = await signer.sign(operation)
		expect(signature).toBe(
			"lmZEZ9BoZ7njmuYahtMJwSf6a8K2MmlaRGhOHQwQ66De15PxfnAnQdiqh3z6CvpuvBWP5rFj5G_Olc3b5mJAC-RjtU9wwwQXV92TmkjG5kFBH70Pdo8vWFoguD8oev600MFKhukv-saC5s0pEbG6y4iyW1Ann3jwOHIDdBFDA_dGti2KYyxvvU2RBdupVd8yDQ37xhGUPWZ2sGaPehjvRXZEx3lkINOuQuvqVaUtIkMmq9kOiq3Q1oiq97IY_IEkjWeXSuHMuPHMxPeqcRS-Byyd9pjp9fy0G76IOMpcKGrQcLJawxb87Nxws8gW5cZJaLzFA-E4w_UFn34V1kJ5rw"
		)
	})
	it("verifiy", async () => {
		const verified = await signer.verify({
			...operation2,
			previous:
				"dOGrAgMq1r60lzW0TgCOcyixRktp1Qp9N4x5GWeisAQAazDtL6b1PwlXe8W0w9gf-kPARWRaqi7YQ67pxB7jIzJtMGDN5VL1KBdLmiRm8acUdSVPnrC0n9xh1rFpfQLE-7jCjNjCQHaExaWCZwrt2-kqCCsQgCqNg5yqYZuEjUw9q5YXceaUYjkFwuRtp97WiJYe02iucmgMlaTnsW4AxqqLdQag9_Yom5z3maSyeSkxDuAOIkYABXwV9Nef1uo18I3Qzc_DVm8fXWjPGL0uVs0FJFELDPtN9CAZpEqsbUPoknnGX71rNZ8Kpz7ioG7kEo1gI52r287jn9WUqxNtlQ",
			signature:
				"lmZEZ9BoZ7njmuYahtMJwSf6a8K2MmlaRGhOHQwQ66De15PxfnAnQdiqh3z6CvpuvBWP5rFj5G_Olc3b5mJAC-RjtU9wwwQXV92TmkjG5kFBH70Pdo8vWFoguD8oev600MFKhukv-saC5s0pEbG6y4iyW1Ann3jwOHIDdBFDA_dGti2KYyxvvU2RBdupVd8yDQ37xhGUPWZ2sGaPehjvRXZEx3lkINOuQuvqVaUtIkMmq9kOiq3Q1oiq97IY_IEkjWeXSuHMuPHMxPeqcRS-Byyd9pjp9fy0G76IOMpcKGrQcLJawxb87Nxws8gW5cZJaLzFA-E4w_UFn34V1kJ5rw",
		})
		expect(verified).toBe(true)
	})
	it("changes is", async () => {
		expect(pax2pay.Operation.is(operation3)).toBe(true)
	})
	it("split", async () => {
		expect(pax2pay.Operation.Changes.Entry.split("uk-cb-safe01-2024-03-04T15Z")).toEqual([
			"2024-03-04T15Z",
			"uk-cb-safe01",
		])
	})
	it("split", async () => {
		expect(pax2pay.Operation.Changes.Entry.split("test-internal-asdf-qw--2024-03-04T15Z")).toEqual([
			"2024-03-04T15Z",
			"test-internal-asdf-qw-",
		])
	})

	it("sum counterbalances", () => {
		expect(pax2pay.Operation.Changes.counterbalance(operation4.changes, "USD")).toEqual(20)
	})
})
const operation: pax2pay.Operation = {
	account: "3Lb41MlP",
	currency: "GBP",
	type: "collect",
	changes: {
		"fee_test-paxgiro_202333303": {
			type: "subtract",
			amount: 10,
			status: "success",
			result: 0,
		},
	},
	transaction: "zzzyRwIvXovdzVNA",
	counter: 0,
	created: "2023-12-05T17:26:36.977Z",
}
const operation2: pax2pay.Operation = {
	account: "23Md_znq",
	currency: "GBP",
	changes: {
		available: {
			type: "add",
			amount: 1000,
			status: "success",
			result: 71000,
		},
	},
	type: "manual",
	transaction: "manual",
	counter: 71,
	created: "2024-02-14T14:47:41.472Z",
}
const operation3: pax2pay.Operation = {
	account: "3Lb41MlP",
	currency: "GBP",
	type: "collect",
	changes: {
		"internal-safe01-2024-03-04T15Z": {
			type: "subtract",
			amount: 10,
			status: "success",
			result: 0,
		},
	},
	transaction: "zzzyRwIvXovdzVNA",
	counter: 0,
	created: "2023-12-05T17:26:36.977Z",
}
const operation4: pax2pay.Operation = {
	account: "23Md_znq",
	currency: "GBP",
	changes: {
		"fee_test-paxgiro_202333303": {
			type: "add",
			amount: 10,
			status: "success",
			result: 0,
		},
		available: {
			type: "subtract",
			amount: 1000,
			status: "success",
			result: 71000,
		},
		"internal-safe01-2024-03-04T15Z": {
			type: "add",
			amount: 10,
			status: "success",
			result: 0,
		},
	},
	type: "manual",
	transaction: "manual",
	counter: 71,
	created: "2024-02-14T14:47:41.472Z",
}
