import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";

export interface Account {
  owner: Principal;
  subaccount: [] | [SubAccount];
}
export interface AccountBalanceArgs {
  account: AccountIdentifier;
}
export interface AccountBalanceArgsDfx {
  account: TextAccountIdentifier;
}
export type AccountIdentifier = Uint8Array | number[];
export interface Allowance {
  allowance: Icrc1Tokens;
  expires_at: [] | [Icrc1Timestamp];
}
export interface AllowanceArgs {
  account: Account;
  spender: Account;
}
export interface ApproveArgs {
  fee: [] | [Icrc1Tokens];
  memo: [] | [Uint8Array | number[]];
  from_subaccount: [] | [SubAccount];
  created_at_time: [] | [Icrc1Timestamp];
  amount: Icrc1Tokens;
  expected_allowance: [] | [Icrc1Tokens];
  expires_at: [] | [Icrc1Timestamp];
  spender: Account;
}
export type ApproveError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { Duplicate: { duplicate_of: Icrc1BlockIndex } }
  | { BadFee: { expected_fee: Icrc1Tokens } }
  | { AllowanceChanged: { current_allowance: Icrc1Tokens } }
  | { CreatedInFuture: { ledger_time: bigint } }
  | { TooOld: null }
  | { Expired: { ledger_time: bigint } }
  | { InsufficientFunds: { balance: Icrc1Tokens } };
export type ApproveResult = { Ok: Icrc1BlockIndex } | { Err: ApproveError };
export interface Archive {
  canister_id: Principal;
}
export interface ArchiveOptions {
  num_blocks_to_archive: bigint;
  max_transactions_per_response: [] | [bigint];
  trigger_threshold: bigint;
  more_controller_ids: [] | [Array<Principal>];
  max_message_size_bytes: [] | [bigint];
  cycles_for_archive_creation: [] | [bigint];
  node_max_memory_size_bytes: [] | [bigint];
  controller_id: Principal;
}
export interface ArchivedBlocksRange {
  callback: QueryArchiveFn;
  start: BlockIndex;
  length: bigint;
}
export interface ArchivedEncodedBlocksRange {
  callback: [Principal, string];
  start: bigint;
  length: bigint;
}
export interface Archives {
  archives: Array<Archive>;
}
export interface Block {
  transaction: Transaction;
  timestamp: TimeStamp;
  parent_hash: [] | [Uint8Array | number[]];
}
export type BlockIndex = bigint;
export interface BlockRange {
  blocks: Array<Block>;
}
export interface Duration {
  secs: bigint;
  nanos: number;
}
export interface FeatureFlags {
  icrc2: boolean;
}
export interface GetBlocksArgs {
  start: BlockIndex;
  length: bigint;
}
export type Icrc1BlockIndex = bigint;
export type Icrc1Timestamp = bigint;
export type Icrc1Tokens = bigint;
export type Icrc1TransferError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { BadBurn: { min_burn_amount: Icrc1Tokens } }
  | { Duplicate: { duplicate_of: Icrc1BlockIndex } }
  | { BadFee: { expected_fee: Icrc1Tokens } }
  | { CreatedInFuture: { ledger_time: bigint } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: Icrc1Tokens } };
export type Icrc1TransferResult =
  | { Ok: Icrc1BlockIndex }
  | { Err: Icrc1TransferError };
export interface InitArgs {
  send_whitelist: Array<Principal>;
  token_symbol: [] | [string];
  transfer_fee: [] | [Tokens];
  minting_account: TextAccountIdentifier;
  maximum_number_of_accounts: [] | [bigint];
  accounts_overflow_trim_quantity: [] | [bigint];
  transaction_window: [] | [Duration];
  max_message_size_bytes: [] | [bigint];
  icrc1_minting_account: [] | [Account];
  archive_options: [] | [ArchiveOptions];
  initial_values: Array<[TextAccountIdentifier, Tokens]>;
  token_name: [] | [string];
  feature_flags: [] | [FeatureFlags];
}
export type LedgerCanisterPayload =
  | { Upgrade: [] | [UpgradeArgs] }
  | { Init: InitArgs };
export type Memo = bigint;
export type Operation =
  | {
      Approve: {
        fee: Tokens;
        from: AccountIdentifier;
        allowance_e8s: bigint;
        allowance: Tokens;
        expected_allowance: [] | [Tokens];
        expires_at: [] | [TimeStamp];
        spender: AccountIdentifier;
      };
    }
  | {
      Burn: {
        from: AccountIdentifier;
        amount: Tokens;
        spender: [] | [AccountIdentifier];
      };
    }
  | { Mint: { to: AccountIdentifier; amount: Tokens } }
  | {
      Transfer: {
        to: AccountIdentifier;
        fee: Tokens;
        from: AccountIdentifier;
        amount: Tokens;
        spender: [] | [Uint8Array | number[]];
      };
    };
export type QueryArchiveError =
  | {
      BadFirstBlockIndex: {
        requested_index: BlockIndex;
        first_valid_index: BlockIndex;
      };
    }
  | { Other: { error_message: string; error_code: bigint } };
export type QueryArchiveFn = ActorMethod<[GetBlocksArgs], QueryArchiveResult>;
export type QueryArchiveResult =
  | { Ok: BlockRange }
  | { Err: QueryArchiveError };
export interface QueryBlocksResponse {
  certificate: [] | [Uint8Array | number[]];
  blocks: Array<Block>;
  chain_length: bigint;
  first_block_index: BlockIndex;
  archived_blocks: Array<ArchivedBlocksRange>;
}
export interface QueryEncodedBlocksResponse {
  certificate: [] | [Uint8Array | number[]];
  blocks: Array<Uint8Array | number[]>;
  chain_length: bigint;
  first_block_index: bigint;
  archived_blocks: Array<ArchivedEncodedBlocksRange>;
}
export interface SendArgs {
  to: TextAccountIdentifier;
  fee: Tokens;
  memo: Memo;
  from_subaccount: [] | [SubAccount];
  created_at_time: [] | [TimeStamp];
  amount: Tokens;
}
export type SubAccount = Uint8Array | number[];
export type TextAccountIdentifier = string;
export interface TimeStamp {
  timestamp_nanos: bigint;
}
export interface Tokens {
  e8s: bigint;
}
export interface Transaction {
  memo: Memo;
  icrc1_memo: [] | [Uint8Array | number[]];
  operation: [] | [Operation];
  created_at_time: TimeStamp;
}
export interface TransferArg {
  to: Account;
  fee: [] | [Icrc1Tokens];
  memo: [] | [Uint8Array | number[]];
  from_subaccount: [] | [SubAccount];
  created_at_time: [] | [Icrc1Timestamp];
  amount: Icrc1Tokens;
}
export interface TransferArgs {
  to: AccountIdentifier;
  fee: Tokens;
  memo: Memo;
  from_subaccount: [] | [SubAccount];
  created_at_time: [] | [TimeStamp];
  amount: Tokens;
}
export type TransferError =
  | {
      TxTooOld: { allowed_window_nanos: bigint };
    }
  | { BadFee: { expected_fee: Tokens } }
  | { TxDuplicate: { duplicate_of: BlockIndex } }
  | { TxCreatedInFuture: null }
  | { InsufficientFunds: { balance: Tokens } };
export interface TransferFee {
  transfer_fee: Tokens;
}
export type TransferFeeArg = {};
export interface TransferFromArgs {
  to: Account;
  fee: [] | [Icrc1Tokens];
  spender_subaccount: [] | [SubAccount];
  from: Account;
  memo: [] | [Uint8Array | number[]];
  created_at_time: [] | [Icrc1Timestamp];
  amount: Icrc1Tokens;
}
export type TransferFromError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { InsufficientAllowance: { allowance: Icrc1Tokens } }
  | { BadBurn: { min_burn_amount: Icrc1Tokens } }
  | { Duplicate: { duplicate_of: Icrc1BlockIndex } }
  | { BadFee: { expected_fee: Icrc1Tokens } }
  | { CreatedInFuture: { ledger_time: Icrc1Timestamp } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: Icrc1Tokens } };
export type TransferFromResult =
  | { Ok: Icrc1BlockIndex }
  | { Err: TransferFromError };
export type TransferResult = { Ok: BlockIndex } | { Err: TransferError };
export interface UpgradeArgs {
  icrc1_minting_account: [] | [Account];
  feature_flags: [] | [FeatureFlags];
}
export type Value =
  | { Int: bigint }
  | { Nat: bigint }
  | { Blob: Uint8Array | number[] }
  | { Text: string };
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
  account_balance: ActorMethod<[AccountBalanceArgs], Tokens>;
  account_balance_dfx: ActorMethod<[AccountBalanceArgsDfx], Tokens>;
  account_identifier: ActorMethod<[Account], AccountIdentifier>;
  archives: ActorMethod<[], Archives>;
  decimals: ActorMethod<[], { decimals: number }>;
  icrc10_supported_standards: ActorMethod<
    [],
    Array<{ url: string; name: string }>
  >;
  icrc1_balance_of: ActorMethod<[Account], Icrc1Tokens>;
  icrc1_decimals: ActorMethod<[], number>;
  icrc1_fee: ActorMethod<[], Icrc1Tokens>;
  icrc1_metadata: ActorMethod<[], Array<[string, Value]>>;
  icrc1_minting_account: ActorMethod<[], [] | [Account]>;
  icrc1_name: ActorMethod<[], string>;
  icrc1_supported_standards: ActorMethod<
    [],
    Array<{ url: string; name: string }>
  >;
  icrc1_symbol: ActorMethod<[], string>;
  icrc1_total_supply: ActorMethod<[], Icrc1Tokens>;
  icrc1_transfer: ActorMethod<[TransferArg], Icrc1TransferResult>;
  icrc21_canister_call_consent_message: ActorMethod<
    [icrc21_consent_message_request],
    icrc21_consent_message_response
  >;
  icrc2_allowance: ActorMethod<[AllowanceArgs], Allowance>;
  icrc2_approve: ActorMethod<[ApproveArgs], ApproveResult>;
  icrc2_transfer_from: ActorMethod<[TransferFromArgs], TransferFromResult>;
  is_ledger_ready: ActorMethod<[], boolean>;
  name: ActorMethod<[], { name: string }>;
  query_blocks: ActorMethod<[GetBlocksArgs], QueryBlocksResponse>;
  query_encoded_blocks: ActorMethod<
    [GetBlocksArgs],
    QueryEncodedBlocksResponse
  >;
  send_dfx: ActorMethod<[SendArgs], BlockIndex>;
  symbol: ActorMethod<[], { symbol: string }>;
  transfer: ActorMethod<[TransferArgs], TransferResult>;
  transfer_fee: ActorMethod<[TransferFeeArg], TransferFee>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
