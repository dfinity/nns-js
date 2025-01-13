import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";

export interface Account {
  owner: Principal;
  subaccount: [] | [Uint8Array | number[]];
}
export type BitcoinAddress =
  | { p2wsh_v0: Uint8Array | number[] }
  | { p2tr_v1: Uint8Array | number[] }
  | { p2sh: Uint8Array | number[] }
  | { p2wpkh_v0: Uint8Array | number[] }
  | { p2pkh: Uint8Array | number[] };
export type BtcNetwork =
  | { Mainnet: null }
  | { Regtest: null }
  | { Testnet: null };
export interface CanisterStatusResponse {
  status: CanisterStatusType;
  memory_size: bigint;
  cycles: bigint;
  settings: DefiniteCanisterSettings;
  query_stats: QueryStats;
  idle_cycles_burned_per_day: bigint;
  module_hash: [] | [Uint8Array | number[]];
  reserved_cycles: bigint;
}
export type CanisterStatusType =
  | { stopped: null }
  | { stopping: null }
  | { running: null };
export interface DefiniteCanisterSettings {
  freezing_threshold: bigint;
  controllers: Array<Principal>;
  reserved_cycles_limit: bigint;
  log_visibility: LogVisibility;
  wasm_memory_limit: bigint;
  memory_allocation: bigint;
  compute_allocation: bigint;
}
export interface Event {
  timestamp: [] | [bigint];
  payload: EventType;
}
export type EventType =
  | {
      received_utxos: {
        to_account: Account;
        mint_txid: [] | [bigint];
        utxos: Array<Utxo>;
      };
    }
  | {
      schedule_deposit_reimbursement: {
        burn_block_index: bigint;
        account: Account;
        amount: bigint;
        reason: ReimbursementReason;
      };
    }
  | {
      sent_transaction: {
        fee: [] | [bigint];
        change_output: [] | [{ value: bigint; vout: number }];
        txid: Uint8Array | number[];
        utxos: Array<Utxo>;
        requests: BigUint64Array | bigint[];
        submitted_at: bigint;
      };
    }
  | {
      distributed_kyt_fee: {
        block_index: bigint;
        amount: bigint;
        kyt_provider: Principal;
      };
    }
  | { init: InitArgs }
  | { upgrade: UpgradeArgs }
  | {
      retrieve_btc_kyt_failed: {
        block_index: bigint;
        owner: Principal;
        uuid: string;
        address: string;
        amount: bigint;
        kyt_provider: Principal;
      };
    }
  | {
      suspended_utxo: {
        utxo: Utxo;
        account: Account;
        reason: SuspendedReason;
      };
    }
  | {
      accepted_retrieve_btc_request: {
        received_at: bigint;
        block_index: bigint;
        address: BitcoinAddress;
        reimbursement_account: [] | [Account];
        amount: bigint;
        kyt_provider: [] | [Principal];
      };
    }
  | {
      checked_utxo: {
        clean: boolean;
        utxo: Utxo;
        uuid: string;
        kyt_provider: [] | [Principal];
      };
    }
  | { removed_retrieve_btc_request: { block_index: bigint } }
  | { confirmed_transaction: { txid: Uint8Array | number[] } }
  | {
      replaced_transaction: {
        fee: bigint;
        change_output: { value: bigint; vout: number };
        old_txid: Uint8Array | number[];
        new_txid: Uint8Array | number[];
        submitted_at: bigint;
      };
    }
  | { checked_utxo_v2: { utxo: Utxo; account: Account } }
  | { ignored_utxo: { utxo: Utxo } }
  | {
      reimbursed_failed_deposit: {
        burn_block_index: bigint;
        mint_block_index: bigint;
      };
    };
export interface InitArgs {
  kyt_principal: [] | [Principal];
  ecdsa_key_name: string;
  mode: Mode;
  retrieve_btc_min_amount: bigint;
  ledger_id: Principal;
  max_time_in_queue_nanos: bigint;
  btc_network: BtcNetwork;
  check_fee: [] | [bigint];
  btc_checker_principal: [] | [Principal];
  min_confirmations: [] | [number];
  kyt_fee: [] | [bigint];
}
export type LogVisibility = { controllers: null } | { public: null };
export type MinterArg = { Upgrade: [] | [UpgradeArgs] } | { Init: InitArgs };
export interface MinterInfo {
  retrieve_btc_min_amount: bigint;
  min_confirmations: number;
  kyt_fee: bigint;
}
export type Mode =
  | { RestrictedTo: Array<Principal> }
  | { DepositsRestrictedTo: Array<Principal> }
  | { ReadOnly: null }
  | { GeneralAvailability: null };
export interface PendingUtxo {
  confirmations: number;
  value: bigint;
  outpoint: { txid: Uint8Array | number[]; vout: number };
}
export interface QueryStats {
  response_payload_bytes_total: bigint;
  num_instructions_total: bigint;
  num_calls_total: bigint;
  request_payload_bytes_total: bigint;
}
export interface ReimbursedDeposit {
  account: Account;
  mint_block_index: bigint;
  amount: bigint;
  reason: ReimbursementReason;
}
export type ReimbursementReason =
  | { CallFailed: null }
  | { TaintedDestination: { kyt_fee: bigint; kyt_provider: Principal } };
export interface ReimbursementRequest {
  account: Account;
  amount: bigint;
  reason: ReimbursementReason;
}
export interface RetrieveBtcArgs {
  address: string;
  amount: bigint;
}
export type RetrieveBtcError =
  | { MalformedAddress: string }
  | { GenericError: { error_message: string; error_code: bigint } }
  | { TemporarilyUnavailable: string }
  | { AlreadyProcessing: null }
  | { AmountTooLow: bigint }
  | { InsufficientFunds: { balance: bigint } };
export interface RetrieveBtcOk {
  block_index: bigint;
}
export type RetrieveBtcStatus =
  | { Signing: null }
  | { Confirmed: { txid: Uint8Array | number[] } }
  | { Sending: { txid: Uint8Array | number[] } }
  | { AmountTooLow: null }
  | { Unknown: null }
  | { Submitted: { txid: Uint8Array | number[] } }
  | { Pending: null };
export type RetrieveBtcStatusV2 =
  | { Signing: null }
  | { Confirmed: { txid: Uint8Array | number[] } }
  | { Sending: { txid: Uint8Array | number[] } }
  | { AmountTooLow: null }
  | { WillReimburse: ReimbursementRequest }
  | { Unknown: null }
  | { Submitted: { txid: Uint8Array | number[] } }
  | { Reimbursed: ReimbursedDeposit }
  | { Pending: null };
export interface RetrieveBtcWithApprovalArgs {
  from_subaccount: [] | [Uint8Array | number[]];
  address: string;
  amount: bigint;
}
export type RetrieveBtcWithApprovalError =
  | { MalformedAddress: string }
  | { GenericError: { error_message: string; error_code: bigint } }
  | { TemporarilyUnavailable: string }
  | { InsufficientAllowance: { allowance: bigint } }
  | { AlreadyProcessing: null }
  | { AmountTooLow: bigint }
  | { InsufficientFunds: { balance: bigint } };
export type SuspendedReason = { ValueTooSmall: null } | { Quarantined: null };
export interface SuspendedUtxo {
  utxo: Utxo;
  earliest_retry: Timestamp;
  reason: SuspendedReason;
}
export type Timestamp = bigint;
export type UpdateBalanceError =
  | {
      GenericError: { error_message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: string }
  | { AlreadyProcessing: null }
  | {
      NoNewUtxos: {
        suspended_utxos: [] | [Array<SuspendedUtxo>];
        required_confirmations: number;
        pending_utxos: [] | [Array<PendingUtxo>];
        current_confirmations: [] | [number];
      };
    };
export interface UpgradeArgs {
  kyt_principal: [] | [Principal];
  mode: [] | [Mode];
  retrieve_btc_min_amount: [] | [bigint];
  max_time_in_queue_nanos: [] | [bigint];
  check_fee: [] | [bigint];
  btc_checker_principal: [] | [Principal];
  min_confirmations: [] | [number];
  kyt_fee: [] | [bigint];
}
export interface Utxo {
  height: number;
  value: bigint;
  outpoint: { txid: Uint8Array | number[]; vout: number };
}
export type UtxoStatus =
  | { ValueTooSmall: Utxo }
  | { Tainted: Utxo }
  | {
      Minted: {
        minted_amount: bigint;
        block_index: bigint;
        utxo: Utxo;
      };
    }
  | { Checked: Utxo };
export interface _SERVICE {
  estimate_withdrawal_fee: ActorMethod<
    [{ amount: [] | [bigint] }],
    { minter_fee: bigint; bitcoin_fee: bigint }
  >;
  get_btc_address: ActorMethod<
    [
      {
        owner: [] | [Principal];
        subaccount: [] | [Uint8Array | number[]];
      },
    ],
    string
  >;
  get_canister_status: ActorMethod<[], CanisterStatusResponse>;
  get_deposit_fee: ActorMethod<[], bigint>;
  get_events: ActorMethod<[{ start: bigint; length: bigint }], Array<Event>>;
  get_known_utxos: ActorMethod<
    [
      {
        owner: [] | [Principal];
        subaccount: [] | [Uint8Array | number[]];
      },
    ],
    Array<Utxo>
  >;
  get_minter_info: ActorMethod<[], MinterInfo>;
  get_withdrawal_account: ActorMethod<[], Account>;
  retrieve_btc: ActorMethod<
    [RetrieveBtcArgs],
    { Ok: RetrieveBtcOk } | { Err: RetrieveBtcError }
  >;
  retrieve_btc_status: ActorMethod<
    [{ block_index: bigint }],
    RetrieveBtcStatus
  >;
  retrieve_btc_status_v2: ActorMethod<
    [{ block_index: bigint }],
    RetrieveBtcStatusV2
  >;
  retrieve_btc_status_v2_by_account: ActorMethod<
    [[] | [Account]],
    Array<{ block_index: bigint; status_v2: [] | [RetrieveBtcStatusV2] }>
  >;
  retrieve_btc_with_approval: ActorMethod<
    [RetrieveBtcWithApprovalArgs],
    { Ok: RetrieveBtcOk } | { Err: RetrieveBtcWithApprovalError }
  >;
  update_balance: ActorMethod<
    [
      {
        owner: [] | [Principal];
        subaccount: [] | [Uint8Array | number[]];
      },
    ],
    { Ok: Array<UtxoStatus> } | { Err: UpdateBalanceError }
  >;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
