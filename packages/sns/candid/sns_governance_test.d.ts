import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";

export interface Account {
  owner: [] | [Principal];
  subaccount: [] | [Subaccount];
}
export type Action =
  | {
      ManageNervousSystemParameters: NervousSystemParameters;
    }
  | { AddGenericNervousSystemFunction: NervousSystemFunction }
  | { ManageDappCanisterSettings: ManageDappCanisterSettings }
  | { RemoveGenericNervousSystemFunction: bigint }
  | { UpgradeSnsToNextVersion: {} }
  | { RegisterDappCanisters: RegisterDappCanisters }
  | { TransferSnsTreasuryFunds: TransferSnsTreasuryFunds }
  | { UpgradeSnsControlledCanister: UpgradeSnsControlledCanister }
  | { DeregisterDappCanisters: DeregisterDappCanisters }
  | { MintSnsTokens: MintSnsTokens }
  | { AdvanceSnsTargetVersion: AdvanceSnsTargetVersion }
  | { Unspecified: {} }
  | { ManageSnsMetadata: ManageSnsMetadata }
  | {
      ExecuteGenericNervousSystemFunction: ExecuteGenericNervousSystemFunction;
    }
  | { ManageLedgerParameters: ManageLedgerParameters }
  | { Motion: Motion };
export type ActionAuxiliary =
  | {
      TransferSnsTreasuryFunds: MintSnsTokensActionAuxiliary;
    }
  | { MintSnsTokens: MintSnsTokensActionAuxiliary }
  | { AdvanceSnsTargetVersion: AdvanceSnsTargetVersionActionAuxiliary };
export interface AddMaturityRequest {
  id: [] | [NeuronId];
  amount_e8s: [] | [bigint];
}
export interface AddMaturityResponse {
  new_maturity_e8s: [] | [bigint];
}
export interface AddNeuronPermissions {
  permissions_to_add: [] | [NeuronPermissionList];
  principal_id: [] | [Principal];
}
export interface AdvanceSnsTargetVersion {
  new_target: [] | [SnsVersion];
}
export interface AdvanceSnsTargetVersionActionAuxiliary {
  target_version: [] | [SnsVersion];
}
export interface AdvanceTargetVersionRequest {
  target_version: [] | [Version];
}
export type AdvanceTargetVersionResponse = {};
export interface Amount {
  e8s: bigint;
}
export interface Ballot {
  vote: number;
  cast_timestamp_seconds: bigint;
  voting_power: bigint;
}
export type By = { MemoAndController: MemoAndController } | { NeuronId: {} };
export interface CachedUpgradeSteps {
  upgrade_steps: [] | [Versions];
  response_timestamp_seconds: [] | [bigint];
  requested_timestamp_seconds: [] | [bigint];
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
export interface ChangeAutoStakeMaturity {
  requested_setting_for_auto_stake_maturity: boolean;
}
export interface ClaimOrRefresh {
  by: [] | [By];
}
export interface ClaimOrRefreshResponse {
  refreshed_neuron_id: [] | [NeuronId];
}
export interface ClaimSwapNeuronsRequest {
  neuron_recipes: [] | [NeuronRecipes];
}
export interface ClaimSwapNeuronsResponse {
  claim_swap_neurons_result: [] | [ClaimSwapNeuronsResult];
}
export type ClaimSwapNeuronsResult =
  | { Ok: ClaimedSwapNeurons }
  | { Err: number };
export interface ClaimedSwapNeurons {
  swap_neurons: Array<SwapNeuron>;
}
export type Command =
  | { Split: Split }
  | { Follow: Follow }
  | { DisburseMaturity: DisburseMaturity }
  | { ClaimOrRefresh: ClaimOrRefresh }
  | { Configure: Configure }
  | { RegisterVote: RegisterVote }
  | { MakeProposal: Proposal }
  | { StakeMaturity: StakeMaturity }
  | { RemoveNeuronPermissions: RemoveNeuronPermissions }
  | { AddNeuronPermissions: AddNeuronPermissions }
  | { MergeMaturity: MergeMaturity }
  | { Disburse: Disburse };
export type Command_1 =
  | { Error: GovernanceError }
  | { Split: SplitResponse }
  | { Follow: {} }
  | { DisburseMaturity: DisburseMaturityResponse }
  | { ClaimOrRefresh: ClaimOrRefreshResponse }
  | { Configure: {} }
  | { RegisterVote: {} }
  | { MakeProposal: GetProposal }
  | { RemoveNeuronPermission: {} }
  | { StakeMaturity: StakeMaturityResponse }
  | { MergeMaturity: MergeMaturityResponse }
  | { Disburse: DisburseResponse }
  | { AddNeuronPermission: {} };
export type Command_2 =
  | { Split: Split }
  | { Follow: Follow }
  | { DisburseMaturity: DisburseMaturity }
  | { Configure: Configure }
  | { RegisterVote: RegisterVote }
  | { SyncCommand: {} }
  | { MakeProposal: Proposal }
  | { FinalizeDisburseMaturity: FinalizeDisburseMaturity }
  | { ClaimOrRefreshNeuron: ClaimOrRefresh }
  | { RemoveNeuronPermissions: RemoveNeuronPermissions }
  | { AddNeuronPermissions: AddNeuronPermissions }
  | { MergeMaturity: MergeMaturity }
  | { Disburse: Disburse };
export interface Configure {
  operation: [] | [Operation];
}
export interface Decimal {
  human_readable: [] | [string];
}
export interface DefaultFollowees {
  followees: Array<[bigint, Followees]>;
}
export interface DefiniteCanisterSettingsArgs {
  freezing_threshold: bigint;
  wasm_memory_threshold: [] | [bigint];
  controllers: Array<Principal>;
  wasm_memory_limit: [] | [bigint];
  memory_allocation: bigint;
  compute_allocation: bigint;
}
export interface DeregisterDappCanisters {
  canister_ids: Array<Principal>;
  new_controllers: Array<Principal>;
}
export interface Disburse {
  to_account: [] | [Account];
  amount: [] | [Amount];
}
export interface DisburseMaturity {
  to_account: [] | [Account];
  percentage_to_disburse: number;
}
export interface DisburseMaturityInProgress {
  timestamp_of_disbursement_seconds: bigint;
  amount_e8s: bigint;
  account_to_disburse_to: [] | [Account];
  finalize_disbursement_timestamp_seconds: [] | [bigint];
}
export interface DisburseMaturityResponse {
  amount_disbursed_e8s: bigint;
  amount_deducted_e8s: [] | [bigint];
}
export interface DisburseResponse {
  transfer_block_height: bigint;
}
export type DissolveState =
  | { DissolveDelaySeconds: bigint }
  | { WhenDissolvedTimestampSeconds: bigint };
export interface ExecuteGenericNervousSystemFunction {
  function_id: bigint;
  payload: Uint8Array | number[];
}
export interface FinalizeDisburseMaturity {
  amount_to_be_disbursed_e8s: bigint;
  to_account: [] | [Account];
}
export interface Follow {
  function_id: bigint;
  followees: Array<NeuronId>;
}
export interface Followees {
  followees: Array<NeuronId>;
}
export type FunctionType =
  | { NativeNervousSystemFunction: {} }
  | { GenericNervousSystemFunction: GenericNervousSystemFunction };
export interface GenericNervousSystemFunction {
  validator_canister_id: [] | [Principal];
  target_canister_id: [] | [Principal];
  validator_method_name: [] | [string];
  target_method_name: [] | [string];
}
export interface GetMaturityModulationResponse {
  maturity_modulation: [] | [MaturityModulation];
}
export interface GetMetadataResponse {
  url: [] | [string];
  logo: [] | [string];
  name: [] | [string];
  description: [] | [string];
}
export interface GetModeResponse {
  mode: [] | [number];
}
export interface GetNeuron {
  neuron_id: [] | [NeuronId];
}
export interface GetNeuronResponse {
  result: [] | [Result];
}
export interface GetProposal {
  proposal_id: [] | [ProposalId];
}
export interface GetProposalResponse {
  result: [] | [Result_1];
}
export interface GetRunningSnsVersionResponse {
  deployed_version: [] | [Version];
  pending_version:
    | []
    | [
        {
          mark_failed_at_seconds: bigint;
          checking_upgrade_lock: bigint;
          proposal_id: bigint;
          target_version: [] | [Version];
        },
      ];
}
export interface GetSnsInitializationParametersResponse {
  sns_initialization_parameters: string;
}
export interface GetTimersResponse {
  timers: [] | [Timers];
}
export interface GetUpgradeJournalRequest {
  offset: [] | [bigint];
  limit: [] | [bigint];
}
export interface GetUpgradeJournalResponse {
  upgrade_journal: [] | [UpgradeJournal];
  upgrade_steps: [] | [Versions];
  response_timestamp_seconds: [] | [bigint];
  deployed_version: [] | [Version];
  target_version: [] | [Version];
  upgrade_journal_entry_count: [] | [bigint];
}
export interface Governance {
  root_canister_id: [] | [Principal];
  timers: [] | [Timers];
  cached_upgrade_steps: [] | [CachedUpgradeSteps];
  id_to_nervous_system_functions: Array<[bigint, NervousSystemFunction]>;
  metrics: [] | [GovernanceCachedMetrics];
  maturity_modulation: [] | [MaturityModulation];
  upgrade_journal: [] | [UpgradeJournal];
  mode: number;
  parameters: [] | [NervousSystemParameters];
  is_finalizing_disburse_maturity: [] | [boolean];
  deployed_version: [] | [Version];
  sns_initialization_parameters: string;
  latest_reward_event: [] | [RewardEvent];
  pending_version: [] | [PendingVersion];
  swap_canister_id: [] | [Principal];
  ledger_canister_id: [] | [Principal];
  proposals: Array<[bigint, ProposalData]>;
  in_flight_commands: Array<[string, NeuronInFlightCommand]>;
  sns_metadata: [] | [ManageSnsMetadata];
  neurons: Array<[string, Neuron]>;
  target_version: [] | [Version];
  genesis_timestamp_seconds: bigint;
}
export interface GovernanceCachedMetrics {
  not_dissolving_neurons_e8s_buckets: Array<[bigint, number]>;
  garbage_collectable_neurons_count: bigint;
  neurons_with_invalid_stake_count: bigint;
  not_dissolving_neurons_count_buckets: Array<[bigint, bigint]>;
  neurons_with_less_than_6_months_dissolve_delay_count: bigint;
  dissolved_neurons_count: bigint;
  total_staked_e8s: bigint;
  total_supply_governance_tokens: bigint;
  not_dissolving_neurons_count: bigint;
  dissolved_neurons_e8s: bigint;
  neurons_with_less_than_6_months_dissolve_delay_e8s: bigint;
  dissolving_neurons_count_buckets: Array<[bigint, bigint]>;
  dissolving_neurons_count: bigint;
  dissolving_neurons_e8s_buckets: Array<[bigint, number]>;
  timestamp_seconds: bigint;
}
export interface GovernanceError {
  error_message: string;
  error_type: number;
}
export interface IncreaseDissolveDelay {
  additional_dissolve_delay_seconds: number;
}
export interface ListNervousSystemFunctionsResponse {
  reserved_ids: BigUint64Array | bigint[];
  functions: Array<NervousSystemFunction>;
}
export interface ListNeurons {
  of_principal: [] | [Principal];
  limit: number;
  start_page_at: [] | [NeuronId];
}
export interface ListNeuronsResponse {
  neurons: Array<Neuron>;
}
export interface ListProposals {
  include_reward_status: Int32Array | number[];
  before_proposal: [] | [ProposalId];
  limit: number;
  exclude_type: BigUint64Array | bigint[];
  include_status: Int32Array | number[];
}
export interface ListProposalsResponse {
  include_ballots_by_caller: [] | [boolean];
  proposals: Array<ProposalData>;
}
export interface ManageDappCanisterSettings {
  freezing_threshold: [] | [bigint];
  wasm_memory_threshold: [] | [bigint];
  canister_ids: Array<Principal>;
  reserved_cycles_limit: [] | [bigint];
  log_visibility: [] | [number];
  wasm_memory_limit: [] | [bigint];
  memory_allocation: [] | [bigint];
  compute_allocation: [] | [bigint];
}
export interface ManageLedgerParameters {
  token_symbol: [] | [string];
  transfer_fee: [] | [bigint];
  token_logo: [] | [string];
  token_name: [] | [string];
}
export interface ManageNeuron {
  subaccount: Uint8Array | number[];
  command: [] | [Command];
}
export interface ManageNeuronResponse {
  command: [] | [Command_1];
}
export interface ManageSnsMetadata {
  url: [] | [string];
  logo: [] | [string];
  name: [] | [string];
  description: [] | [string];
}
export interface MaturityModulation {
  current_basis_points: [] | [number];
  updated_at_timestamp_seconds: [] | [bigint];
}
export interface MemoAndController {
  controller: [] | [Principal];
  memo: bigint;
}
export interface MergeMaturity {
  percentage_to_merge: number;
}
export interface MergeMaturityResponse {
  merged_maturity_e8s: bigint;
  new_stake_e8s: bigint;
}
export interface MintSnsTokens {
  to_principal: [] | [Principal];
  to_subaccount: [] | [Subaccount];
  memo: [] | [bigint];
  amount_e8s: [] | [bigint];
}
export interface MintSnsTokensActionAuxiliary {
  valuation: [] | [Valuation];
}
export interface MintTokensRequest {
  recipient: [] | [Account];
  amount_e8s: [] | [bigint];
}
export interface Motion {
  motion_text: string;
}
export interface NervousSystemFunction {
  id: bigint;
  name: string;
  description: [] | [string];
  function_type: [] | [FunctionType];
}
export interface NervousSystemParameters {
  default_followees: [] | [DefaultFollowees];
  max_dissolve_delay_seconds: [] | [bigint];
  max_dissolve_delay_bonus_percentage: [] | [bigint];
  max_followees_per_function: [] | [bigint];
  neuron_claimer_permissions: [] | [NeuronPermissionList];
  neuron_minimum_stake_e8s: [] | [bigint];
  max_neuron_age_for_age_bonus: [] | [bigint];
  initial_voting_period_seconds: [] | [bigint];
  neuron_minimum_dissolve_delay_to_vote_seconds: [] | [bigint];
  reject_cost_e8s: [] | [bigint];
  max_proposals_to_keep_per_action: [] | [number];
  wait_for_quiet_deadline_increase_seconds: [] | [bigint];
  max_number_of_neurons: [] | [bigint];
  transaction_fee_e8s: [] | [bigint];
  max_number_of_proposals_with_ballots: [] | [bigint];
  max_age_bonus_percentage: [] | [bigint];
  neuron_grantable_permissions: [] | [NeuronPermissionList];
  voting_rewards_parameters: [] | [VotingRewardsParameters];
  maturity_modulation_disabled: [] | [boolean];
  max_number_of_principals_per_neuron: [] | [bigint];
}
export interface Neuron {
  id: [] | [NeuronId];
  staked_maturity_e8s_equivalent: [] | [bigint];
  permissions: Array<NeuronPermission>;
  maturity_e8s_equivalent: bigint;
  cached_neuron_stake_e8s: bigint;
  created_timestamp_seconds: bigint;
  source_nns_neuron_id: [] | [bigint];
  auto_stake_maturity: [] | [boolean];
  aging_since_timestamp_seconds: bigint;
  dissolve_state: [] | [DissolveState];
  voting_power_percentage_multiplier: bigint;
  vesting_period_seconds: [] | [bigint];
  disburse_maturity_in_progress: Array<DisburseMaturityInProgress>;
  followees: Array<[bigint, Followees]>;
  neuron_fees_e8s: bigint;
}
export interface NeuronId {
  id: Uint8Array | number[];
}
export interface NeuronIds {
  neuron_ids: Array<NeuronId>;
}
export interface NeuronInFlightCommand {
  command: [] | [Command_2];
  timestamp: bigint;
}
export interface NeuronParameters {
  controller: [] | [Principal];
  dissolve_delay_seconds: [] | [bigint];
  source_nns_neuron_id: [] | [bigint];
  stake_e8s: [] | [bigint];
  followees: Array<NeuronId>;
  hotkey: [] | [Principal];
  neuron_id: [] | [NeuronId];
}
export interface NeuronPermission {
  principal: [] | [Principal];
  permission_type: Int32Array | number[];
}
export interface NeuronPermissionList {
  permissions: Int32Array | number[];
}
export interface NeuronRecipe {
  controller: [] | [Principal];
  dissolve_delay_seconds: [] | [bigint];
  participant: [] | [Participant];
  stake_e8s: [] | [bigint];
  followees: [] | [NeuronIds];
  neuron_id: [] | [NeuronId];
}
export interface NeuronRecipes {
  neuron_recipes: Array<NeuronRecipe>;
}
export interface NeuronsFund {
  nns_neuron_hotkeys: [] | [Principals];
  nns_neuron_controller: [] | [Principal];
  nns_neuron_id: [] | [bigint];
}
export type Operation =
  | {
      ChangeAutoStakeMaturity: ChangeAutoStakeMaturity;
    }
  | { StopDissolving: {} }
  | { StartDissolving: {} }
  | { IncreaseDissolveDelay: IncreaseDissolveDelay }
  | { SetDissolveTimestamp: SetDissolveTimestamp };
export type Participant = { NeuronsFund: NeuronsFund } | { Direct: {} };
export interface PendingVersion {
  mark_failed_at_seconds: bigint;
  checking_upgrade_lock: bigint;
  proposal_id: [] | [bigint];
  target_version: [] | [Version];
}
export interface Percentage {
  basis_points: [] | [bigint];
}
export interface Principals {
  principals: Array<Principal>;
}
export interface Proposal {
  url: string;
  title: string;
  action: [] | [Action];
  summary: string;
}
export interface ProposalData {
  id: [] | [ProposalId];
  payload_text_rendering: [] | [string];
  action: bigint;
  failure_reason: [] | [GovernanceError];
  action_auxiliary: [] | [ActionAuxiliary];
  ballots: Array<[string, Ballot]>;
  minimum_yes_proportion_of_total: [] | [Percentage];
  reward_event_round: bigint;
  failed_timestamp_seconds: bigint;
  reward_event_end_timestamp_seconds: [] | [bigint];
  proposal_creation_timestamp_seconds: bigint;
  initial_voting_period_seconds: bigint;
  reject_cost_e8s: bigint;
  latest_tally: [] | [Tally];
  wait_for_quiet_deadline_increase_seconds: bigint;
  decided_timestamp_seconds: bigint;
  proposal: [] | [Proposal];
  proposer: [] | [NeuronId];
  wait_for_quiet_state: [] | [WaitForQuietState];
  minimum_yes_proportion_of_exercised: [] | [Percentage];
  is_eligible_for_rewards: boolean;
  executed_timestamp_seconds: bigint;
}
export interface ProposalId {
  id: bigint;
}
export interface RegisterDappCanisters {
  canister_ids: Array<Principal>;
}
export interface RegisterVote {
  vote: number;
  proposal: [] | [ProposalId];
}
export interface RemoveNeuronPermissions {
  permissions_to_remove: [] | [NeuronPermissionList];
  principal_id: [] | [Principal];
}
export type Result = { Error: GovernanceError } | { Neuron: Neuron };
export type Result_1 = { Error: GovernanceError } | { Proposal: ProposalData };
export interface RewardEvent {
  rounds_since_last_distribution: [] | [bigint];
  actual_timestamp_seconds: bigint;
  end_timestamp_seconds: [] | [bigint];
  total_available_e8s_equivalent: [] | [bigint];
  distributed_e8s_equivalent: bigint;
  round: bigint;
  settled_proposals: Array<ProposalId>;
}
export interface SetDissolveTimestamp {
  dissolve_timestamp_seconds: bigint;
}
export interface SetMode {
  mode: number;
}
export interface SnsVersion {
  archive_wasm_hash: [] | [Uint8Array | number[]];
  root_wasm_hash: [] | [Uint8Array | number[]];
  swap_wasm_hash: [] | [Uint8Array | number[]];
  ledger_wasm_hash: [] | [Uint8Array | number[]];
  governance_wasm_hash: [] | [Uint8Array | number[]];
  index_wasm_hash: [] | [Uint8Array | number[]];
}
export interface Split {
  memo: bigint;
  amount_e8s: bigint;
}
export interface SplitResponse {
  created_neuron_id: [] | [NeuronId];
}
export interface StakeMaturity {
  percentage_to_stake: [] | [number];
}
export interface StakeMaturityResponse {
  maturity_e8s: bigint;
  staked_maturity_e8s: bigint;
}
export interface Subaccount {
  subaccount: Uint8Array | number[];
}
export interface SwapNeuron {
  id: [] | [NeuronId];
  status: number;
}
export interface Tally {
  no: bigint;
  yes: bigint;
  total: bigint;
  timestamp_seconds: bigint;
}
export interface TargetVersionReset {
  human_readable: [] | [string];
  old_target_version: [] | [Version];
  new_target_version: [] | [Version];
}
export interface TargetVersionSet {
  old_target_version: [] | [Version];
  new_target_version: [] | [Version];
}
export interface Timers {
  last_spawned_timestamp_seconds: [] | [bigint];
  last_reset_timestamp_seconds: [] | [bigint];
  requires_periodic_tasks: [] | [boolean];
}
export interface Tokens {
  e8s: [] | [bigint];
}
export interface TransferSnsTreasuryFunds {
  from_treasury: number;
  to_principal: [] | [Principal];
  to_subaccount: [] | [Subaccount];
  memo: [] | [bigint];
  amount_e8s: bigint;
}
export interface UpgradeInProgress {
  mark_failed_at_seconds: bigint;
  checking_upgrade_lock: bigint;
  proposal_id: [] | [bigint];
  target_version: [] | [Version];
}
export interface UpgradeJournal {
  entries: Array<UpgradeJournalEntry>;
}
export interface UpgradeJournalEntry {
  event:
    | []
    | [
        | { TargetVersionSet: TargetVersionSet }
        | { UpgradeStepsReset: UpgradeStepsReset }
        | { UpgradeOutcome: UpgradeOutcome }
        | { UpgradeStarted: UpgradeStarted }
        | { UpgradeStepsRefreshed: UpgradeStepsRefreshed }
        | { TargetVersionReset: TargetVersionReset },
      ];
  timestamp_seconds: [] | [bigint];
}
export interface UpgradeOutcome {
  status:
    | []
    | [
        | { Success: {} }
        | { Timeout: {} }
        | { ExternalFailure: {} }
        | { InvalidState: { version: [] | [Version] } },
      ];
  human_readable: [] | [string];
}
export interface UpgradeSnsControlledCanister {
  new_canister_wasm: Uint8Array | number[];
  mode: [] | [number];
  canister_id: [] | [Principal];
  canister_upgrade_arg: [] | [Uint8Array | number[]];
}
export interface UpgradeStarted {
  current_version: [] | [Version];
  expected_version: [] | [Version];
  reason:
    | []
    | [
        | { UpgradeSnsToNextVersionProposal: ProposalId }
        | { BehindTargetVersion: {} },
      ];
}
export interface UpgradeStepsRefreshed {
  upgrade_steps: [] | [Versions];
}
export interface UpgradeStepsReset {
  human_readable: [] | [string];
  upgrade_steps: [] | [Versions];
}
export interface Valuation {
  token: [] | [number];
  account: [] | [Account];
  valuation_factors: [] | [ValuationFactors];
  timestamp_seconds: [] | [bigint];
}
export interface ValuationFactors {
  xdrs_per_icp: [] | [Decimal];
  icps_per_token: [] | [Decimal];
  tokens: [] | [Tokens];
}
export interface Version {
  archive_wasm_hash: Uint8Array | number[];
  root_wasm_hash: Uint8Array | number[];
  swap_wasm_hash: Uint8Array | number[];
  ledger_wasm_hash: Uint8Array | number[];
  governance_wasm_hash: Uint8Array | number[];
  index_wasm_hash: Uint8Array | number[];
}
export interface Versions {
  versions: Array<Version>;
}
export interface VotingRewardsParameters {
  final_reward_rate_basis_points: [] | [bigint];
  initial_reward_rate_basis_points: [] | [bigint];
  reward_rate_transition_duration_seconds: [] | [bigint];
  round_duration_seconds: [] | [bigint];
}
export interface WaitForQuietState {
  current_deadline_timestamp_seconds: bigint;
}
export interface _SERVICE {
  add_maturity: ActorMethod<[AddMaturityRequest], AddMaturityResponse>;
  advance_target_version: ActorMethod<
    [AdvanceTargetVersionRequest],
    AdvanceTargetVersionResponse
  >;
  claim_swap_neurons: ActorMethod<
    [ClaimSwapNeuronsRequest],
    ClaimSwapNeuronsResponse
  >;
  fail_stuck_upgrade_in_progress: ActorMethod<[{}], {}>;
  get_build_metadata: ActorMethod<[], string>;
  get_latest_reward_event: ActorMethod<[], RewardEvent>;
  get_maturity_modulation: ActorMethod<[{}], GetMaturityModulationResponse>;
  get_metadata: ActorMethod<[{}], GetMetadataResponse>;
  get_mode: ActorMethod<[{}], GetModeResponse>;
  get_nervous_system_parameters: ActorMethod<[null], NervousSystemParameters>;
  get_neuron: ActorMethod<[GetNeuron], GetNeuronResponse>;
  get_proposal: ActorMethod<[GetProposal], GetProposalResponse>;
  get_root_canister_status: ActorMethod<[null], CanisterStatusResultV2>;
  get_running_sns_version: ActorMethod<[{}], GetRunningSnsVersionResponse>;
  get_sns_initialization_parameters: ActorMethod<
    [{}],
    GetSnsInitializationParametersResponse
  >;
  get_timers: ActorMethod<[{}], GetTimersResponse>;
  get_upgrade_journal: ActorMethod<
    [GetUpgradeJournalRequest],
    GetUpgradeJournalResponse
  >;
  list_nervous_system_functions: ActorMethod<
    [],
    ListNervousSystemFunctionsResponse
  >;
  list_neurons: ActorMethod<[ListNeurons], ListNeuronsResponse>;
  list_proposals: ActorMethod<[ListProposals], ListProposalsResponse>;
  manage_neuron: ActorMethod<[ManageNeuron], ManageNeuronResponse>;
  mint_tokens: ActorMethod<[MintTokensRequest], {}>;
  refresh_cached_upgrade_steps: ActorMethod<[{}], {}>;
  reset_timers: ActorMethod<[{}], {}>;
  set_mode: ActorMethod<[SetMode], {}>;
  update_neuron: ActorMethod<[Neuron], [] | [GovernanceError]>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
