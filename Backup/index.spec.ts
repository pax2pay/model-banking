import { pax2pay } from "../index"

namespace Test {
	export const source = "@pax2pay/model-banking"
	export const version = "1.0.0"
	export const realm = "test"
	export const identifiers = { source, version, realm }
	export const organization: pax2pay.Organization = {
		realm: "test",
		status: "active",
		code: "organization-id",
		name: "Acme Inc.",
		rules: [],
	}
	export const account: pax2pay.Account = {
		id: "account-id",
		name: "account-name",
		created: "2023-08-07T09:25:11.296Z",
		organization: organization.code,
		balances: { GBP: { available: 100 } },
		rails: [],
		key: "string",
		rules: [],
		status: { mode: "active" },
	}
	export const transaction: pax2pay.Transaction = {
		id: "transaction-id",
		accountId: account.id,
		organization: organization.code,
		counterpart: { type: "internal", identifier: "target12" },
		currency: "USD",
		amount: { original: -100, charge: 0, total: -100 },
		posted: "2023-08-07T09:25:11.296Z",
		description: "internal transaction",
		account: {
			type: "internal",
			identifier: "3Lb41MlP",
		},
		type: "internal",
		direction: "outbound",
		balance: {
			actual: 1000,
			reserved: 10,
			available: 990,
		},
		operations: [
			{
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
			},
		],
		status: "review",
		rail: "paxgiro",
		flags: [],
		oldFlags: [],
		notes: [],
	}
	export const operation: pax2pay.Operation = {
		account: account.id,
		transaction: transaction.id,
		created: "2023-08-07T09:25:11.296Z",
		counter: 1,
		currency: "GBP",
		changes: {
			"reserved-incoming": {
				type: "add",
				amount: 100,
				status: "pending",
			},
		},
		type: "refund",
		signature: "signature",
		previous: "previous",
	}
	export const rule: pax2pay.Rule = {
		code: "string",
		name: "string",
		description: "string",
		type: "capture",
		category: "fincrime",
		condition: "string",
		flags: [],
		action: "review",
	}
	export const user: pax2pay.User = {
		email: "user-id@example.com",
		created: "2023-08-07T09:25:11.296Z",
		changed: "2023-08-07T09:25:11.296Z",
		access: {
			test: {
				"*": "read",
				card: "read",
				log: "read",
				operation: "read",
				organization: "read",
				rule: "read",
				settlement: "read",
				transaction: "read",
				treasury: "read",
			},
		},
		password: {
			changed: "2023-08-07T09:25:11.296Z",
		},
	}
	export const card: pax2pay.Card = {
		id: "card-id",
		account: account.id,
		organization: organization.code,
		created: "2023-08-07T09:25:11.296Z",
		realm: "test",
		preset: "p2p-mc-200",
		scheme: "mastercard",
		reference: "example",
		details: {
			iin: "example",
			last4: "example",
			expiry: [24, 12],
			holder: "example",
			token: "example",
		},
		limit: ["GBP", 2000],
		spent: ["GBP", 300],
		status: "active",
		history: [],
		rules: [],
	}
	export function sender(backup: pax2pay.Backup.Partial) {
		return { ...identifiers, ...backup }
	}
}
describe("Backup", () => {
	it("User", () => {
		const args = [Test.user, "created", { realm: Test.realm }] as const
		const backup = pax2pay.Backup.User.create(...args)
		const piped = pax2pay.Backup.User.addSender(Test.sender)(...args)
		const partial = {
			realm: Test.realm,
			entityType: "user",
			entity: Test.user.email,
			created: backup.created,
			action: "created",
			value: Test.user,
		}
		expect(backup).toEqual(partial)
		expect(piped).toEqual({ ...Test.identifiers, ...partial, created: piped.created })
	})
	it("Account", () => {
		const args = [Test.account, "created"] as const
		const backup = pax2pay.Backup.Account.create(...args)
		const piped = pax2pay.Backup.Account.addSender(Test.sender)(...args)
		const partial = {
			entityType: "account",
			entity: Test.account.id,
			organization: Test.organization.code,
			account: Test.account.id,
			created: backup.created,
			action: "created",
			meta: { key: Test.account.key },
			value: Test.account,
		}
		expect(backup).toEqual(partial)
		expect(piped).toEqual({ ...Test.identifiers, ...partial, created: piped.created })
	})
	it("Transaction", () => {
		const args = [Test.transaction, "created"] as const
		const backup = pax2pay.Backup.Transaction.create(...args)
		const piped = pax2pay.Backup.Transaction.addSender(Test.sender)(...args)
		const partial = {
			entityType: "transaction",
			entity: Test.transaction.id,
			organization: Test.organization.code,
			account: Test.account.id,
			created: backup.created,
			action: "created",
			value: Test.transaction,
		}
		expect(backup).toEqual(partial)
		expect(piped).toEqual({ ...Test.identifiers, ...partial, created: piped.created })
	})
	it("Operation", () => {
		const args = [Test.operation, "created", { organization: Test.organization.code }] as const
		const backup = pax2pay.Backup.Operation.create(...args)
		const piped = pax2pay.Backup.Operation.addSender(Test.sender)(...args)
		const partial = {
			entityType: "operation",
			entity: Test.operation.signature,
			organization: Test.organization.code,
			account: Test.account.id,
			created: backup.created,
			action: "created",
			value: Test.operation,
		}
		expect(backup).toEqual(partial)
		expect(piped).toEqual({ ...Test.identifiers, ...partial, created: piped.created })
	})
	it("Organization", () => {
		const args = [Test.organization, "created"] as const
		const backup = pax2pay.Backup.Organization.create(...args)
		const piped = pax2pay.Backup.Organization.addSender(Test.sender)(...args)
		const partial = {
			realm: Test.realm,
			entityType: "organization",
			entity: Test.organization.code,
			organization: Test.organization.code,
			created: backup.created,
			action: "created",
			value: Test.organization,
		}
		expect(backup).toEqual(partial)
		expect(piped).toEqual({ ...Test.identifiers, ...partial, created: piped.created })
	})
	it("Rule", () => {
		const args = [Test.rule, "created", { organization: Test.organization.code }] as const
		const backup = pax2pay.Backup.Rule.create(...args)
		const piped = pax2pay.Backup.Rule.addSender(Test.sender)(...args)
		const partial = {
			entityType: "rule",
			entity: Test.rule.code,
			organization: Test.organization.code,
			created: backup.created,
			action: "created",
			meta: "fincrime.capture.review",
			value: Test.rule,
		}
		expect(backup).toEqual(partial)
		expect(piped).toEqual({ ...Test.identifiers, ...partial, created: piped.created })
	})
})
