import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";

export interface Account {
  owner: Principal;
  subaccount: [] | [Subaccount];
}
export interface Allowance {
  allowance: bigint;
  expires_at: [] | [Timestamp];
}
export interface AllowanceArgs {
  account: Account;
  spender: Account;
}
export interface Approve {
  fee: [] | [bigint];
  from: Account;
  memo: [] | [Uint8Array | number[]];
  created_at_time: [] | [Timestamp];
  amount: bigint;
  expected_allowance: [] | [bigint];
  expires_at: [] | [Timestamp];
  spender: Account;
}
export interface ApproveArgs {
  fee: [] | [bigint];
  memo: [] | [Uint8Array | number[]];
  from_subaccount: [] | [Uint8Array | number[]];
  created_at_time: [] | [Timestamp];
  amount: bigint;
  expected_allowance: [] | [bigint];
  expires_at: [] | [Timestamp];
  spender: Account;
}
export type ApproveError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { Duplicate: { duplicate_of: BlockIndex } }
  | { BadFee: { expected_fee: bigint } }
  | { AllowanceChanged: { current_allowance: bigint } }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { TooOld: null }
  | { Expired: { ledger_time: Timestamp } }
  | { InsufficientFunds: { balance: bigint } };
export type ApproveResult = { Ok: BlockIndex } | { Err: ApproveError };
export interface ArchiveInfo {
  block_range_end: BlockIndex;
  canister_id: Principal;
  block_range_start: BlockIndex;
}
export type Block = Value;
export type BlockIndex = bigint;
export interface BlockRange {
  blocks: Array<Block>;
}
export interface Burn {
  from: Account;
  memo: [] | [Uint8Array | number[]];
  created_at_time: [] | [Timestamp];
  amount: bigint;
  spender: [] | [Account];
}
export interface ChangeArchiveOptions {
  num_blocks_to_archive: [] | [bigint];
  max_transactions_per_response: [] | [bigint];
  trigger_threshold: [] | [bigint];
  more_controller_ids: [] | [Array<Principal>];
  max_message_size_bytes: [] | [bigint];
  cycles_for_archive_creation: [] | [bigint];
  node_max_memory_size_bytes: [] | [bigint];
  controller_id: [] | [Principal];
}
export type ChangeFeeCollector = { SetTo: Account } | { Unset: null };
export interface DataCertificate {
  certificate: [] | [Uint8Array | number[]];
  hash_tree: Uint8Array | number[];
}
export type Duration = bigint;
export interface FeatureFlags {
  icrc2: boolean;
}
export interface GetArchivesArgs {
  from: [] | [Principal];
}
export type GetArchivesResult = Array<{
  end: bigint;
  canister_id: Principal;
  start: bigint;
}>;
export interface GetBlocksArgs {
  start: BlockIndex;
  length: bigint;
}
export interface GetBlocksResponse {
  certificate: [] | [Uint8Array | number[]];
  first_index: BlockIndex;
  blocks: Array<Block>;
  chain_length: bigint;
  archived_blocks: Array<{
    callback: QueryBlockArchiveFn;
    start: BlockIndex;
    length: bigint;
  }>;
}
export interface GetBlocksResult {
  log_length: bigint;
  blocks: Array<{ id: bigint; block: ICRC3Value }>;
  archived_blocks: Array<{
    args: Array<GetBlocksArgs>;
    callback: [Principal, string];
  }>;
}
export interface GetTransactionsRequest {
  start: TxIndex;
  length: bigint;
}
export interface GetTransactionsResponse {
  first_index: TxIndex;
  log_length: bigint;
  transactions: Array<Transaction>;
  archived_transactions: Array<{
    callback: QueryArchiveFn;
    start: TxIndex;
    length: bigint;
  }>;
}
export interface HttpRequest {
  url: string;
  method: string;
  body: Uint8Array | number[];
  headers: Array<[string, string]>;
}
export interface HttpResponse {
  body: Uint8Array | number[];
  headers: Array<[string, string]>;
  status_code: number;
}
export interface ICRC3DataCertificate {
  certificate: Uint8Array | number[];
  hash_tree: Uint8Array | number[];
}
export type ICRC3Value =
  | { Int: bigint }
  | { Map: Array<[string, ICRC3Value]> }
  | { Nat: bigint }
  | { Blob: Uint8Array | number[] }
  | { Text: string }
  | { Array: Array<ICRC3Value> };
export interface InitArgs {
  decimals: [] | [number];
  token_symbol: string;
  transfer_fee: bigint;
  metadata: Array<[string, MetadataValue]>;
  minting_account: Account;
  initial_balances: Array<[Account, bigint]>;
  fee_collector_account: [] | [Account];
  archive_options: {
    num_blocks_to_archive: bigint;
    max_transactions_per_response: [] | [bigint];
    trigger_threshold: bigint;
    more_controller_ids: [] | [Array<Principal>];
    max_message_size_bytes: [] | [bigint];
    cycles_for_archive_creation: [] | [bigint];
    node_max_memory_size_bytes: [] | [bigint];
    controller_id: Principal;
  };
  max_memo_length: [] | [number];
  token_name: string;
  feature_flags: [] | [FeatureFlags];
}
export type LedgerArg = { Upgrade: [] | [UpgradeArgs] } | { Init: InitArgs };
export type Map = Array<[string, Value]>;
export type MetadataValue =
  | { Int: bigint }
  | { Nat: bigint }
  | { Blob: Uint8Array | number[] }
  | { Text: string };
export interface Mint {
  to: Account;
  memo: [] | [Uint8Array | number[]];
  created_at_time: [] | [Timestamp];
  amount: bigint;
}
export type QueryArchiveFn = ActorMethod<
  [GetTransactionsRequest],
  TransactionRange
>;
export type QueryBlockArchiveFn = ActorMethod<[GetBlocksArgs], BlockRange>;
export interface StandardRecord {
  url: string;
  name: string;
}
export type Subaccount = Uint8Array | number[];
export type Timestamp = bigint;
export type Tokens = bigint;
export interface Transaction {
  burn: [] | [Burn];
  kind: string;
  mint: [] | [Mint];
  approve: [] | [Approve];
  timestamp: Timestamp;
  transfer: [] | [Transfer];
}
export interface TransactionRange {
  transactions: Array<Transaction>;
}
export interface Transfer {
  to: Account;
  fee: [] | [bigint];
  from: Account;
  memo: [] | [Uint8Array | number[]];
  created_at_time: [] | [Timestamp];
  amount: bigint;
  spender: [] | [Account];
}
export interface TransferArg {
  to: Account;
  fee: [] | [Tokens];
  memo: [] | [Uint8Array | number[]];
  from_subaccount: [] | [Subaccount];
  created_at_time: [] | [Timestamp];
  amount: Tokens;
}
export type TransferError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { BadBurn: { min_burn_amount: Tokens } }
  | { Duplicate: { duplicate_of: BlockIndex } }
  | { BadFee: { expected_fee: Tokens } }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: Tokens } };
export interface TransferFromArgs {
  to: Account;
  fee: [] | [Tokens];
  spender_subaccount: [] | [Subaccount];
  from: Account;
  memo: [] | [Uint8Array | number[]];
  created_at_time: [] | [Timestamp];
  amount: Tokens;
}
export type TransferFromError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { InsufficientAllowance: { allowance: Tokens } }
  | { BadBurn: { min_burn_amount: Tokens } }
  | { Duplicate: { duplicate_of: BlockIndex } }
  | { BadFee: { expected_fee: Tokens } }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: Tokens } };
export type TransferFromResult =
  | { Ok: BlockIndex }
  | { Err: TransferFromError };
export type TransferResult = { Ok: BlockIndex } | { Err: TransferError };
export type TxIndex = bigint;
export interface UpgradeArgs {
  change_archive_options: [] | [ChangeArchiveOptions];
  token_symbol: [] | [string];
  transfer_fee: [] | [bigint];
  metadata: [] | [Array<[string, MetadataValue]>];
  change_fee_collector: [] | [ChangeFeeCollector];
  max_memo_length: [] | [number];
  token_name: [] | [string];
  feature_flags: [] | [FeatureFlags];
}
export type Value =
  | { Int: bigint }
  | { Map: Map }
  | { Nat: bigint }
  | { Nat64: bigint }
  | { Blob: Uint8Array | number[] }
  | { Text: string }
  | { Array: Array<Value> };
export interface icrc21_consent_info {
  metadata: icrc21_consent_message_metadata;
  consent_message: icrc21_consent_message;
}
export type icrc21_consent_message =
  | {
      LineDisplayMessage: { pages: Array<{ lines: Array<string> }> };
    }
  | { GenericDisplayMessage: string };
export interface icrc21_consent_message_metadata {
  utc_offset_minutes: [] | [number];
  language: string;
}
export interface icrc21_consent_message_request {
  arg: Uint8Array | number[];
  method: string;
  user_preferences: icrc21_consent_message_spec;
}
export type icrc21_consent_message_response =
  | { Ok: icrc21_consent_info }
  | { Err: icrc21_error };
export interface icrc21_consent_message_spec {
  metadata: icrc21_consent_message_metadata;
  device_spec:
    | []
    | [
        | { GenericDisplay: null }
        | {
            LineDisplay: {
              characters_per_line: number;
              lines_per_page: number;
            };
          },
      ];
}
export type icrc21_error =
  | {
      GenericError: { description: string; error_code: bigint };
    }
  | { InsufficientPayment: icrc21_error_info }
  | { UnsupportedCanisterCall: icrc21_error_info }
  | { ConsentMessageUnavailable: icrc21_error_info };
export interface icrc21_error_info {
  description: string;
}
export interface _SERVICE {
  archives: ActorMethod<[], Array<ArchiveInfo>>;
  get_blocks: ActorMethod<[GetBlocksArgs], GetBlocksResponse>;
  get_data_certificate: ActorMethod<[], DataCertificate>;
  get_transactions: ActorMethod<
    [GetTransactionsRequest],
    GetTransactionsResponse
  >;
  icrc10_supported_standards: ActorMethod<
    [],
    Array<{ url: string; name: string }>
  >;
  icrc1_balance_of: ActorMethod<[Account], Tokens>;
  icrc1_decimals: ActorMethod<[], number>;
  icrc1_fee: ActorMethod<[], Tokens>;
  icrc1_metadata: ActorMethod<[], Array<[string, MetadataValue]>>;
  icrc1_minting_account: ActorMethod<[], [] | [Account]>;
  icrc1_name: ActorMethod<[], string>;
  icrc1_supported_standards: ActorMethod<[], Array<StandardRecord>>;
  icrc1_symbol: ActorMethod<[], string>;
  icrc1_total_supply: ActorMethod<[], Tokens>;
  icrc1_transfer: ActorMethod<[TransferArg], TransferResult>;
  icrc21_canister_call_consent_message: ActorMethod<
    [icrc21_consent_message_request],
    icrc21_consent_message_response
  >;
  icrc2_allowance: ActorMethod<[AllowanceArgs], Allowance>;
  icrc2_approve: ActorMethod<[ApproveArgs], ApproveResult>;
  icrc2_transfer_from: ActorMethod<[TransferFromArgs], TransferFromResult>;
  icrc3_get_archives: ActorMethod<[GetArchivesArgs], GetArchivesResult>;
  icrc3_get_blocks: ActorMethod<[Array<GetBlocksArgs>], GetBlocksResult>;
  icrc3_get_tip_certificate: ActorMethod<[], [] | [ICRC3DataCertificate]>;
  icrc3_supported_block_types: ActorMethod<
    [],
    Array<{ url: string; block_type: string }>
  >;
  is_ledger_ready: ActorMethod<[], boolean>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
