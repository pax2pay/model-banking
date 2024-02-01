import { userwidgets } from "@userwidgets/model"
import { pax2pay } from "../index"

describe("Roles", () => {
	it("get", () => {
		expect(
			pax2pay.Key.Roles.get("test-paxair").map(r => ({ label: r.label, permission: r.permissions("test-paxair") }))
		).toEqual([
			{ label: "realm-admin", permission: "test-*" },
			{
				label: "realm-fincrime-readonly",
				permission:
					"test-*.organizations.view test-*.organizations.accounts.view test-*.organizations.rules.view test-*.transactions.view test-*.cards.view test-*.rules.view",
			},
			{
				label: "realm-fincrime",
				permission:
					"test-*.organizations.view test-*.organizations.accounts.balance test-*.organizations.accounts.view test-*.organizations.rules test-*.transactions.view test-*.transactions.resolve test-*.transactions.comment test-*.cards.view test-*.cards.cancel test-*.rules",
			},
			{ label: "realm-finance", permission: "test-*.treasury.rebalance test-*.treasury.view test-*.settlements.view" },
			{
				label: "realm-operations",
				permission:
					"test-*.organizations.create test-*.organizations.update test-*.organizations.accounts test-*.organizations.rules",
			},
			{
				label: "realm-support",
				permission:
					"test-*.organizations.create test-*.organizations.view test-*.organizations.accounts test-*.organizations.rules.view test-*.organizations.rules.edit test-*.transactions.view test-*.cards.view test-*.cards.cancel test-*.rules.view",
			},
			{ label: "organization-admin", permission: "test-paxair" },
			{
				label: "organization-finance",
				permission:
					"test-paxair.accounts.balance test-paxair.accounts.view test-paxair.accounts.transactions.view test-paxair.accounts.transactions.create test-paxair.cards",
			},
			{
				label: "organization-payments",
				permission: "test-paxair.cards test-paxair.accounts.view test-paxair.accounts.transactions.create",
			},
		])
	})
	it("permissions", () => {
		expect(pax2pay.Key.Roles.get("test-paxair").map(role => role.permissions("paxair"))).toEqual([
			"test-*",
			"test-*.organizations.view test-*.organizations.accounts.view test-*.organizations.rules.view test-*.transactions.view test-*.cards.view test-*.rules.view",
			"test-*.organizations.view test-*.organizations.accounts.balance test-*.organizations.accounts.view test-*.organizations.rules test-*.transactions.view test-*.transactions.resolve test-*.transactions.comment test-*.cards.view test-*.cards.cancel test-*.rules",
			"test-*.treasury.rebalance test-*.treasury.view test-*.settlements.view",
			"test-*.organizations.create test-*.organizations.update test-*.organizations.accounts test-*.organizations.rules",
			"test-*.organizations.create test-*.organizations.view test-*.organizations.accounts test-*.organizations.rules.view test-*.organizations.rules.edit test-*.transactions.view test-*.cards.view test-*.cards.cancel test-*.rules.view",
			"paxair",
			"paxair.accounts.balance paxair.accounts.view paxair.accounts.transactions.view paxair.accounts.transactions.create paxair.cards",
			"paxair.cards paxair.accounts.view paxair.accounts.transactions.create",
		])
	})
	it("check", () => {
		expect(
			pax2pay.Key.Roles.get("test-paxair")
				.filter(
					role =>
						!(
							userwidgets.User.Permissions.check("test-*", role.permissions("test-paxair")) ||
							userwidgets.User.Permissions.check("test-paxair", role.permissions("test-paxair"))
						)
				)
				.map(e => e.permissions("test-paxair"))
		).toEqual([])
	})
})
