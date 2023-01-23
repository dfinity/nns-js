import type { Principal } from "@dfinity/principal";
import type { CanisterOptions } from "@dfinity/utils";

// TODO: extract to utils
export interface Icrc1LedgerCanisterOptions<T>
  extends Omit<CanisterOptions<T>, "canisterId"> {
  // The canister's ID is mandatory to instantiate an ICRC1 ledger.
  canisterId: Principal;
}
