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
	export type BankFeedIntegrity = CheckBankFeedIntegrity
	export type ExternalReconciliation = CheckExternalReconciliation
	export type InternalReconciliation = CheckInternalReconciliation
	export type LedgerIntegrity = CheckLedgerIntegrity
	export type Overdraft = CheckOverdraft
	export type TransactionMatch = CheckTransactionMatch
	export type UnidentifiedFunds = CheckUnidentifiedFunds
}
