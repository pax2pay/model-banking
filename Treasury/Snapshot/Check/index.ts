import { zod } from "../../../zod"
import { BankFeedIntegrity as CheckBankFeedIntegrity } from "./BankFeedIntegrity"
import { Checks as CheckChecks } from "./Checks"
import { ExternalReconciliation as CheckExternalReconciliation } from "./ExternalReconciliation"
import { InternalReconciliation as CheckInternalReconciliation } from "./InternalReconciliation"
import { LedgerIntegrity as CheckLedgerIntegrity } from "./LedgerIntegrity"
import { Overdraft as CheckOverdraft } from "./Overdraft"
import { Result as CheckResult } from "./Result"
import { TransactionMatch as CheckTransactionMatch } from "./TransactionMatch"
import { UnidentifiedFunds as CheckUnidentifiedFunds } from "./UnidentifiedFunds"

export type Check =
	| Check.BankFeedIntegrity
	| Check.ExternalReconciliation
	| Check.InternalReconciliation
	| Check.LedgerIntegrity
	| Check.Overdraft
	| Check.TransactionMatch
	| Check.UnidentifiedFunds
export namespace Check {
	export import Result = CheckResult
	export import Checks = CheckChecks
	export import BankFeedIntegrity = CheckBankFeedIntegrity
	export import ExternalReconciliation = CheckExternalReconciliation
	export import InternalReconciliation = CheckInternalReconciliation
	export import LedgerIntegrity = CheckLedgerIntegrity
	export import Overdraft = CheckOverdraft
	export import TransactionMatch = CheckTransactionMatch
	export import UnidentifiedFunds = CheckUnidentifiedFunds
	export const typeZod: zod.ZodType<Check> = zod.union([
		CheckBankFeedIntegrity.typeZod,
		CheckExternalReconciliation.typeZod,
		CheckInternalReconciliation.typeZod,
		CheckLedgerIntegrity.typeZod,
		CheckOverdraft.typeZod,
		CheckTransactionMatch.typeZod,
		CheckUnidentifiedFunds.typeZod,
	])
}
