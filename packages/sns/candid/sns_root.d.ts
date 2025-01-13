import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";

export interface CanisterCallError {
  code: [] | [number];
  description: string;
}
export interface CanisterIdRecord {
  canister_id: Principal;
}
export type CanisterInstallMode =
  | { reinstall: null }
  | { upgrade: null }
  | { install: null };
export interface CanisterStatusResult {
  status: CanisterStatusType;
  memory_size: bigint;
  cycles: bigint;
  settings: DefiniteCanisterSettings;
  idle_cycles_burned_per_day: [] | [bigint];
  module_hash: [] | [Uint8Array | number[]];
  reserved_cycles: [] | [bigint];
}
export interface CanisterStatusResultV2 {
  status: CanisterStatusType;
  memory_size: bigint;
  cycles: bigint;
  settings: DefiniteCanisterSettingsArgs;
  idle_cycles_burned_per_day: bigint;
  module_hash: [] | [Uint8Array | number[]];
}
export type CanisterStatusType =
  | { stopped: null }
  | { stopping: null }
  | { running: null };
export interface CanisterSummary {
  status: [] | [CanisterStatusResultV2];
  canister_id: [] | [Principal];
}
export interface ChangeCanisterRequest {
  arg: Uint8Array | number[];
  wasm_module: Uint8Array | number[];
  stop_before_installing: boolean;
  mode: CanisterInstallMode;
  canister_id: Principal;
  chunked_canister_wasm: [] | [ChunkedCanisterWasm];
  memory_allocation: [] | [bigint];
  compute_allocation: [] | [bigint];
}
export interface ChunkedCanisterWasm {
  wasm_module_hash: Uint8Array | number[];
  chunk_hashes_list: Array<Uint8Array | number[]>;
  store_canister_id: Principal;
}
export interface DefiniteCanisterSettings {
  freezing_threshold: [] | [bigint];
  wasm_memory_threshold: [] | [bigint];
  controllers: Array<Principal>;
  reserved_cycles_limit: [] | [bigint];
  log_visibility: [] | [LogVisibility];
  wasm_memory_limit: [] | [bigint];
  memory_allocation: [] | [bigint];
  compute_allocation: [] | [bigint];
}
export interface DefiniteCanisterSettingsArgs {
  freezing_threshold: bigint;
  wasm_memory_threshold: [] | [bigint];
  controllers: Array<Principal>;
  wasm_memory_limit: [] | [bigint];
  memory_allocation: bigint;
  compute_allocation: bigint;
}
export interface FailedUpdate {
  err: [] | [CanisterCallError];
  dapp_canister_id: [] | [Principal];
}
export interface GetSnsCanistersSummaryRequest {
  update_canister_list: [] | [boolean];
}
export interface GetSnsCanistersSummaryResponse {
  root: [] | [CanisterSummary];
  swap: [] | [CanisterSummary];
  ledger: [] | [CanisterSummary];
  index: [] | [CanisterSummary];
  governance: [] | [CanisterSummary];
  dapps: Array<CanisterSummary>;
  archives: Array<CanisterSummary>;
}
export interface GetTimersResponse {
  timers: [] | [Timers];
}
export interface ListSnsCanistersResponse {
  root: [] | [Principal];
  swap: [] | [Principal];
  ledger: [] | [Principal];
  index: [] | [Principal];
  governance: [] | [Principal];
  dapps: Array<Principal>;
  archives: Array<Principal>;
}
export type LogVisibility = { controllers: null } | { public: null };
export interface ManageDappCanisterSettingsRequest {
  freezing_threshold: [] | [bigint];
  wasm_memory_threshold: [] | [bigint];
  canister_ids: Array<Principal>;
  reserved_cycles_limit: [] | [bigint];
  log_visibility: [] | [number];
  wasm_memory_limit: [] | [bigint];
  memory_allocation: [] | [bigint];
  compute_allocation: [] | [bigint];
}
export interface ManageDappCanisterSettingsResponse {
  failure_reason: [] | [string];
}
export interface RegisterDappCanisterRequest {
  canister_id: [] | [Principal];
}
export interface RegisterDappCanistersRequest {
  canister_ids: Array<Principal>;
}
export interface SetDappControllersRequest {
  canister_ids: [] | [RegisterDappCanistersRequest];
  controller_principal_ids: Array<Principal>;
}
export interface SetDappControllersResponse {
  failed_updates: Array<FailedUpdate>;
}
export interface SnsRootCanister {
  dapp_canister_ids: Array<Principal>;
  timers: [] | [Timers];
  testflight: boolean;
  archive_canister_ids: Array<Principal>;
  governance_canister_id: [] | [Principal];
  index_canister_id: [] | [Principal];
  swap_canister_id: [] | [Principal];
  ledger_canister_id: [] | [Principal];
}
export interface Timers {
  last_spawned_timestamp_seconds: [] | [bigint];
  last_reset_timestamp_seconds: [] | [bigint];
  requires_periodic_tasks: [] | [boolean];
}
export interface _SERVICE {
  canister_status: ActorMethod<[CanisterIdRecord], CanisterStatusResult>;
  change_canister: ActorMethod<[ChangeCanisterRequest], undefined>;
  get_build_metadata: ActorMethod<[], string>;
  get_sns_canisters_summary: ActorMethod<
    [GetSnsCanistersSummaryRequest],
    GetSnsCanistersSummaryResponse
  >;
  get_timers: ActorMethod<[{}], GetTimersResponse>;
  list_sns_canisters: ActorMethod<[{}], ListSnsCanistersResponse>;
  manage_dapp_canister_settings: ActorMethod<
    [ManageDappCanisterSettingsRequest],
    ManageDappCanisterSettingsResponse
  >;
  register_dapp_canister: ActorMethod<[RegisterDappCanisterRequest], {}>;
  register_dapp_canisters: ActorMethod<[RegisterDappCanistersRequest], {}>;
  reset_timers: ActorMethod<[{}], {}>;
  set_dapp_controllers: ActorMethod<
    [SetDappControllersRequest],
    SetDappControllersResponse
  >;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
