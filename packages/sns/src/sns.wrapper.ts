import type { Principal } from "@dfinity/principal";
import type { Neuron } from "../candid/sns_governance";
import type { GovernanceCanister } from "./governance.canister";
import type { LedgerCanister } from "./ledger.canister";
import type { RootCanister } from "./root.canister";
import type { ListNeuronsParams } from "./types/governance.params";
import type { QueryParams } from "./types/query.params";

interface SnsWrapperOptions {
  root: RootCanister;
  governance: GovernanceCanister;
  ledger: LedgerCanister;
  // TODO: add swap canister

  certified: boolean;
}

/**
 * Sns wrapper - notably used by NNS-dapp - ease the access to a particular Sns.
 * It knows all the Sns' canisters, wrap and enhance the available features.
 */
export class SnsWrapper {
  private readonly root: RootCanister;
  private readonly governance: GovernanceCanister;
  private readonly ledger: LedgerCanister;
  private readonly certified: boolean;

  /**
   * Constructor to instantiate a Sns
   * @param root - The wrapper for the "root" canister of the particular Sns
   * @param governance - The wrapper for the "governance" canister of the particular Sns
   * @param ledger - The wrapper for the "ledger" canister of the particular Sns
   * @param certified - The wrapper has been instantiated and should perform query or update calls
   */
  constructor({ root, governance, ledger, certified }: SnsWrapperOptions) {
    this.root = root;
    this.governance = governance;
    this.ledger = ledger;
    this.certified = certified;
  }

  get canisterIds(): {
    rootCanisterId: Principal;
    ledgerCanisterId: Principal;
    governanceCanisterId: Principal;
  } {
    return {
      rootCanisterId: this.root.canisterId,
      ledgerCanisterId: this.ledger.canisterId,
      governanceCanisterId: this.governance.canisterId,
    };
  }

  listNeurons = (
    params: Omit<ListNeuronsParams, "certified">
  ): Promise<Neuron[]> =>
    this.governance.listNeurons({
      ...params,
      certified: this.certified,
    });

  metadata = async (params: Omit<QueryParams, "certified">): Promise<string> =>
    this.governance.metadata({
      ...params,
      certified: this.certified,
    });
}
