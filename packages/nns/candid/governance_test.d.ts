import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";

export interface AccountIdentifier {
  hash: Uint8Array | number[];
}
export type Action =
  | { RegisterKnownNeuron: KnownNeuron }
  | { ManageNeuron: ManageNeuron }
  | { UpdateCanisterSettings: UpdateCanisterSettings }
  | { InstallCode: InstallCode }
  | { StopOrStartCanister: StopOrStartCanister }
  | { CreateServiceNervousSystem: CreateServiceNervousSystem }
  | { ExecuteNnsFunction: ExecuteNnsFunction }
  | { RewardNodeProvider: RewardNodeProvider }
  | { OpenSnsTokenSwap: OpenSnsTokenSwap }
  | { SetSnsTokenSwapOpenTimeWindow: SetSnsTokenSwapOpenTimeWindow }
  | { SetDefaultFollowees: SetDefaultFollowees }
  | { RewardNodeProviders: RewardNodeProviders }
  | { ManageNetworkEconomics: NetworkEconomics }
  | { ApproveGenesisKyc: Principals }
  | { AddOrRemoveNodeProvider: AddOrRemoveNodeProvider }
  | { Motion: Motion };
export interface AddHotKey {
  new_hot_key: [] | [Principal];
}
export interface AddOrRemoveNodeProvider {
  change: [] | [Change];
}
export interface Amount {
  e8s: bigint;
}
export interface ApproveGenesisKyc {
  principals: Array<Principal>;
}
export interface Ballot {
  vote: number;
  voting_power: bigint;
}
export interface BallotInfo {
  vote: number;
  proposal_id: [] | [ProposalId];
}
export type By =
  | { NeuronIdOrSubaccount: {} }
  | { MemoAndController: ClaimOrRefreshNeuronFromAccount }
  | { Memo: bigint };
export interface Canister {
  id: [] | [Principal];
}
export interface CanisterSettings {
  freezing_threshold: [] | [bigint];
  wasm_memory_threshold: [] | [bigint];
  controllers: [] | [Controllers];
  log_visibility: [] | [number];
  wasm_memory_limit: [] | [bigint];
  memory_allocation: [] | [bigint];
  compute_allocation: [] | [bigint];
}
export interface CanisterStatusResultV2 {
  status: [] | [number];
  freezing_threshold: [] | [bigint];
  controllers: Array<Principal>;
  memory_size: [] | [bigint];
  cycles: [] | [bigint];
  idle_cycles_burned_per_day: [] | [bigint];
  module_hash: Uint8Array | number[];
}
export interface CanisterSummary {
  status: [] | [CanisterStatusResultV2];
  canister_id: [] | [Principal];
}
export type Change = { ToRemove: NodeProvider } | { ToAdd: NodeProvider };
export interface ChangeAutoStakeMaturity {
  requested_setting_for_auto_stake_maturity: boolean;
}
export interface ClaimOrRefresh {
  by: [] | [By];
}
export interface ClaimOrRefreshNeuronFromAccount {
  controller: [] | [Principal];
  memo: bigint;
}
export interface ClaimOrRefreshNeuronFromAccountResponse {
  result: [] | [Result_1];
}
export interface ClaimOrRefreshResponse {
  refreshed_neuron_id: [] | [NeuronId];
}
export type Command =
  | { Spawn: Spawn }
  | { Split: Split }
  | { Follow: Follow }
  | { RefreshVotingPower: RefreshVotingPower }
  | { ClaimOrRefresh: ClaimOrRefresh }
  | { Configure: Configure }
  | { RegisterVote: RegisterVote }
  | { Merge: Merge }
  | { DisburseToNeuron: DisburseToNeuron }
  | { MakeProposal: Proposal }
  | { StakeMaturity: StakeMaturity }
  | { MergeMaturity: MergeMaturity }
  | { Disburse: Disburse };
export type Command_1 =
  | { Error: GovernanceError }
  | { Spawn: SpawnResponse }
  | { Split: SpawnResponse }
  | { Follow: {} }
  | { RefreshVotingPower: RefreshVotingPowerResponse }
  | { ClaimOrRefresh: ClaimOrRefreshResponse }
  | { Configure: {} }
  | { RegisterVote: {} }
  | { Merge: MergeResponse }
  | { DisburseToNeuron: SpawnResponse }
  | { MakeProposal: MakeProposalResponse }
  | { StakeMaturity: StakeMaturityResponse }
  | { MergeMaturity: MergeMaturityResponse }
  | { Disburse: DisburseResponse };
export type Command_2 =
  | { Spawn: NeuronId }
  | { Split: Split }
  | { Configure: Configure }
  | { Merge: Merge }
  | { DisburseToNeuron: DisburseToNeuron }
  | { SyncCommand: {} }
  | { ClaimOrRefreshNeuron: ClaimOrRefresh }
  | { MergeMaturity: MergeMaturity }
  | { Disburse: Disburse };
export interface Committed {
  total_direct_contribution_icp_e8s: [] | [bigint];
  total_neurons_fund_contribution_icp_e8s: [] | [bigint];
  sns_governance_canister_id: [] | [Principal];
}
export interface Committed_1 {
  total_direct_participation_icp_e8s: [] | [bigint];
  total_neurons_fund_participation_icp_e8s: [] | [bigint];
  sns_governance_canister_id: [] | [Principal];
}
export interface Configure {
  operation: [] | [Operation];
}
export interface Controllers {
  controllers: Array<Principal>;
}
export interface Countries {
  iso_codes: Array<string>;
}
export interface CreateServiceNervousSystem {
  url: [] | [string];
  governance_parameters: [] | [GovernanceParameters];
  fallback_controller_principal_ids: Array<Principal>;
  logo: [] | [Image];
  name: [] | [string];
  ledger_parameters: [] | [LedgerParameters];
  description: [] | [string];
  dapp_canisters: Array<Canister>;
  swap_parameters: [] | [SwapParameters];
  initial_token_distribution: [] | [InitialTokenDistribution];
}
export interface DateRangeFilter {
  start_timestamp_seconds: [] | [bigint];
  end_timestamp_seconds: [] | [bigint];
}
export interface Decimal {
  human_readable: [] | [string];
}
export interface DerivedProposalInformation {
  swap_background_information: [] | [SwapBackgroundInformation];
}
export interface DeveloperDistribution {
  developer_neurons: Array<NeuronDistribution>;
}
export interface Disburse {
  to_account: [] | [AccountIdentifier];
  amount: [] | [Amount];
}
export interface DisburseResponse {
  transfer_block_height: bigint;
}
export interface DisburseToNeuron {
  dissolve_delay_seconds: bigint;
  kyc_verified: boolean;
  amount_e8s: bigint;
  new_controller: [] | [Principal];
  nonce: bigint;
}
export type DissolveState =
  | { DissolveDelaySeconds: bigint }
  | { WhenDissolvedTimestampSeconds: bigint };
export interface Duration {
  seconds: [] | [bigint];
}
export interface ExecuteNnsFunction {
  nns_function: number;
  payload: Uint8Array | number[];
}
export interface Follow {
  topic: number;
  followees: Array<NeuronId>;
}
export interface Followees {
  followees: Array<NeuronId>;
}
export interface Followers {
  followers: Array<NeuronId>;
}
export interface FollowersMap {
  followers_map: Array<[bigint, Followers]>;
}
export interface GetNeuronsFundAuditInfoRequest {
  nns_proposal_id: [] | [ProposalId];
}
export interface GetNeuronsFundAuditInfoResponse {
  result: [] | [Result_6];
}
export interface GlobalTimeOfDay {
  seconds_after_utc_midnight: [] | [bigint];
}
export interface Governance {
  default_followees: Array<[number, Followees]>;
  making_sns_proposal: [] | [MakingSnsProposal];
  most_recent_monthly_node_provider_rewards: [] | [MonthlyNodeProviderRewards];
  maturity_modulation_last_updated_at_timestamp_seconds: [] | [bigint];
  wait_for_quiet_threshold_seconds: bigint;
  metrics: [] | [GovernanceCachedMetrics];
  neuron_management_voting_period_seconds: [] | [bigint];
  node_providers: Array<NodeProvider>;
  cached_daily_maturity_modulation_basis_points: [] | [number];
  economics: [] | [NetworkEconomics];
  restore_aging_summary: [] | [RestoreAgingSummary];
  spawning_neurons: [] | [boolean];
  latest_reward_event: [] | [RewardEvent];
  to_claim_transfers: Array<NeuronStakeTransfer>;
  short_voting_period_seconds: bigint;
  topic_followee_index: Array<[number, FollowersMap]>;
  migrations: [] | [Migrations];
  proposals: Array<[bigint, ProposalData]>;
  xdr_conversion_rate: [] | [XdrConversionRate];
  in_flight_commands: Array<[bigint, NeuronInFlightCommand]>;
  neurons: Array<[bigint, Neuron]>;
  genesis_timestamp_seconds: bigint;
}
export interface GovernanceCachedMetrics {
  total_maturity_e8s_equivalent: bigint;
  not_dissolving_neurons_e8s_buckets: Array<[bigint, number]>;
  dissolving_neurons_staked_maturity_e8s_equivalent_sum: bigint;
  garbage_collectable_neurons_count: bigint;
  dissolving_neurons_staked_maturity_e8s_equivalent_buckets: Array<
    [bigint, number]
  >;
  neurons_with_invalid_stake_count: bigint;
  not_dissolving_neurons_count_buckets: Array<[bigint, bigint]>;
  ect_neuron_count: bigint;
  total_supply_icp: bigint;
  neurons_with_less_than_6_months_dissolve_delay_count: bigint;
  dissolved_neurons_count: bigint;
  community_fund_total_maturity_e8s_equivalent: bigint;
  total_staked_e8s_seed: bigint;
  total_staked_maturity_e8s_equivalent_ect: bigint;
  total_staked_e8s: bigint;
  fully_lost_voting_power_neuron_subset_metrics: [] | [NeuronSubsetMetrics];
  not_dissolving_neurons_count: bigint;
  total_locked_e8s: bigint;
  neurons_fund_total_active_neurons: bigint;
  total_voting_power_non_self_authenticating_controller: [] | [bigint];
  total_staked_maturity_e8s_equivalent: bigint;
  not_dissolving_neurons_e8s_buckets_ect: Array<[bigint, number]>;
  declining_voting_power_neuron_subset_metrics: [] | [NeuronSubsetMetrics];
  total_staked_e8s_ect: bigint;
  not_dissolving_neurons_staked_maturity_e8s_equivalent_sum: bigint;
  dissolved_neurons_e8s: bigint;
  total_staked_e8s_non_self_authenticating_controller: [] | [bigint];
  dissolving_neurons_e8s_buckets_seed: Array<[bigint, number]>;
  neurons_with_less_than_6_months_dissolve_delay_e8s: bigint;
  not_dissolving_neurons_staked_maturity_e8s_equivalent_buckets: Array<
    [bigint, number]
  >;
  dissolving_neurons_count_buckets: Array<[bigint, bigint]>;
  dissolving_neurons_e8s_buckets_ect: Array<[bigint, number]>;
  non_self_authenticating_controller_neuron_subset_metrics:
    | []
    | [NeuronSubsetMetrics];
  dissolving_neurons_count: bigint;
  dissolving_neurons_e8s_buckets: Array<[bigint, number]>;
  total_staked_maturity_e8s_equivalent_seed: bigint;
  community_fund_total_staked_e8s: bigint;
  not_dissolving_neurons_e8s_buckets_seed: Array<[bigint, number]>;
  public_neuron_subset_metrics: [] | [NeuronSubsetMetrics];
  timestamp_seconds: bigint;
  seed_neuron_count: bigint;
}
export interface GovernanceError {
  error_message: string;
  error_type: number;
}
export interface GovernanceParameters {
  neuron_maximum_dissolve_delay_bonus: [] | [Percentage];
  neuron_maximum_age_for_age_bonus: [] | [Duration];
  neuron_maximum_dissolve_delay: [] | [Duration];
  neuron_minimum_dissolve_delay_to_vote: [] | [Duration];
  neuron_maximum_age_bonus: [] | [Percentage];
  neuron_minimum_stake: [] | [Tokens];
  proposal_wait_for_quiet_deadline_increase: [] | [Duration];
  proposal_initial_voting_period: [] | [Duration];
  proposal_rejection_fee: [] | [Tokens];
  voting_reward_parameters: [] | [VotingRewardParameters];
}
export interface IdealMatchedParticipationFunction {
  serialized_representation: [] | [string];
}
export interface Image {
  base64_encoding: [] | [string];
}
export interface IncreaseDissolveDelay {
  additional_dissolve_delay_seconds: number;
}
export interface InitialTokenDistribution {
  treasury_distribution: [] | [SwapDistribution];
  developer_distribution: [] | [DeveloperDistribution];
  swap_distribution: [] | [SwapDistribution];
}
export interface InstallCode {
  skip_stopping_before_installing: [] | [boolean];
  wasm_module_hash: [] | [Uint8Array | number[]];
  canister_id: [] | [Principal];
  arg_hash: [] | [Uint8Array | number[]];
  install_mode: [] | [number];
}
export interface InstallCodeRequest {
  arg: [] | [Uint8Array | number[]];
  wasm_module: [] | [Uint8Array | number[]];
  skip_stopping_before_installing: [] | [boolean];
  canister_id: [] | [Principal];
  install_mode: [] | [number];
}
export interface KnownNeuron {
  id: [] | [NeuronId];
  known_neuron_data: [] | [KnownNeuronData];
}
export interface KnownNeuronData {
  name: string;
  description: [] | [string];
}
export interface LedgerParameters {
  transaction_fee: [] | [Tokens];
  token_symbol: [] | [string];
  token_logo: [] | [Image];
  token_name: [] | [string];
}
export interface ListKnownNeuronsResponse {
  known_neurons: Array<KnownNeuron>;
}
export interface ListNeurons {
  include_public_neurons_in_full_neurons: [] | [boolean];
  neuron_ids: BigUint64Array | bigint[];
  include_empty_neurons_readable_by_caller: [] | [boolean];
  include_neurons_readable_by_caller: boolean;
}
export interface ListNeuronsResponse {
  neuron_infos: Array<[bigint, NeuronInfo]>;
  full_neurons: Array<Neuron>;
}
export interface ListNodeProviderRewardsRequest {
  date_filter: [] | [DateRangeFilter];
}
export interface ListNodeProviderRewardsResponse {
  rewards: Array<MonthlyNodeProviderRewards>;
}
export interface ListNodeProvidersResponse {
  node_providers: Array<NodeProvider>;
}
export interface ListProposalInfo {
  include_reward_status: Int32Array | number[];
  omit_large_fields: [] | [boolean];
  before_proposal: [] | [ProposalId];
  limit: number;
  exclude_topic: Int32Array | number[];
  include_all_manage_neuron_proposals: [] | [boolean];
  include_status: Int32Array | number[];
}
export interface ListProposalInfoResponse {
  proposal_info: Array<ProposalInfo>;
}
export interface MakeProposalRequest {
  url: string;
  title: [] | [string];
  action: [] | [ProposalActionRequest];
  summary: string;
}
export interface MakeProposalResponse {
  message: [] | [string];
  proposal_id: [] | [ProposalId];
}
export interface MakingSnsProposal {
  proposal: [] | [Proposal];
  caller: [] | [Principal];
  proposer_id: [] | [NeuronId];
}
export interface ManageNeuron {
  id: [] | [NeuronId];
  command: [] | [Command];
  neuron_id_or_subaccount: [] | [NeuronIdOrSubaccount];
}
export type ManageNeuronCommandRequest =
  | { Spawn: Spawn }
  | { Split: Split }
  | { Follow: Follow }
  | { RefreshVotingPower: RefreshVotingPower }
  | { ClaimOrRefresh: ClaimOrRefresh }
  | { Configure: Configure }
  | { RegisterVote: RegisterVote }
  | { Merge: Merge }
  | { DisburseToNeuron: DisburseToNeuron }
  | { MakeProposal: MakeProposalRequest }
  | { StakeMaturity: StakeMaturity }
  | { MergeMaturity: MergeMaturity }
  | { Disburse: Disburse };
export interface ManageNeuronRequest {
  id: [] | [NeuronId];
  command: [] | [ManageNeuronCommandRequest];
  neuron_id_or_subaccount: [] | [NeuronIdOrSubaccount];
}
export interface ManageNeuronResponse {
  command: [] | [Command_1];
}
export interface Merge {
  source_neuron_id: [] | [NeuronId];
}
export interface MergeMaturity {
  percentage_to_merge: number;
}
export interface MergeMaturityResponse {
  merged_maturity_e8s: bigint;
  new_stake_e8s: bigint;
}
export interface MergeResponse {
  target_neuron: [] | [Neuron];
  source_neuron: [] | [Neuron];
  target_neuron_info: [] | [NeuronInfo];
  source_neuron_info: [] | [NeuronInfo];
}
export interface Migration {
  status: [] | [number];
  failure_reason: [] | [string];
  progress: [] | [Progress];
}
export interface Migrations {
  neuron_indexes_migration: [] | [Migration];
  copy_inactive_neurons_to_stable_memory_migration: [] | [Migration];
}
export interface MonthlyNodeProviderRewards {
  minimum_xdr_permyriad_per_icp: [] | [bigint];
  registry_version: [] | [bigint];
  node_providers: Array<NodeProvider>;
  timestamp: bigint;
  rewards: Array<RewardNodeProvider>;
  xdr_conversion_rate: [] | [XdrConversionRate];
  maximum_node_provider_rewards_e8s: [] | [bigint];
}
export interface Motion {
  motion_text: string;
}
export interface NetworkEconomics {
  neuron_minimum_stake_e8s: bigint;
  voting_power_economics: [] | [VotingPowerEconomics];
  max_proposals_to_keep_per_topic: number;
  neuron_management_fee_per_proposal_e8s: bigint;
  reject_cost_e8s: bigint;
  transaction_fee_e8s: bigint;
  neuron_spawn_dissolve_delay_seconds: bigint;
  minimum_icp_xdr_rate: bigint;
  maximum_node_provider_rewards_e8s: bigint;
  neurons_fund_economics: [] | [NeuronsFundEconomics];
}
export interface Neuron {
  id: [] | [NeuronId];
  staked_maturity_e8s_equivalent: [] | [bigint];
  controller: [] | [Principal];
  recent_ballots: Array<BallotInfo>;
  voting_power_refreshed_timestamp_seconds: [] | [bigint];
  kyc_verified: boolean;
  potential_voting_power: [] | [bigint];
  neuron_type: [] | [number];
  not_for_profit: boolean;
  maturity_e8s_equivalent: bigint;
  deciding_voting_power: [] | [bigint];
  cached_neuron_stake_e8s: bigint;
  created_timestamp_seconds: bigint;
  auto_stake_maturity: [] | [boolean];
  aging_since_timestamp_seconds: bigint;
  hot_keys: Array<Principal>;
  account: Uint8Array | number[];
  joined_community_fund_timestamp_seconds: [] | [bigint];
  dissolve_state: [] | [DissolveState];
  followees: Array<[number, Followees]>;
  neuron_fees_e8s: bigint;
  visibility: [] | [number];
  transfer: [] | [NeuronStakeTransfer];
  known_neuron_data: [] | [KnownNeuronData];
  spawn_at_timestamp_seconds: [] | [bigint];
}
export interface NeuronBasketConstructionParameters {
  dissolve_delay_interval: [] | [Duration];
  count: [] | [bigint];
}
export interface NeuronBasketConstructionParameters_1 {
  dissolve_delay_interval_seconds: bigint;
  count: bigint;
}
export interface NeuronDistribution {
  controller: [] | [Principal];
  dissolve_delay: [] | [Duration];
  memo: [] | [bigint];
  vesting_period: [] | [Duration];
  stake: [] | [Tokens];
}
export interface NeuronId {
  id: bigint;
}
export type NeuronIdOrSubaccount =
  | { Subaccount: Uint8Array | number[] }
  | { NeuronId: NeuronId };
export interface NeuronInFlightCommand {
  command: [] | [Command_2];
  timestamp: bigint;
}
export interface NeuronInfo {
  dissolve_delay_seconds: bigint;
  recent_ballots: Array<BallotInfo>;
  voting_power_refreshed_timestamp_seconds: [] | [bigint];
  potential_voting_power: [] | [bigint];
  neuron_type: [] | [number];
  deciding_voting_power: [] | [bigint];
  created_timestamp_seconds: bigint;
  state: number;
  stake_e8s: bigint;
  joined_community_fund_timestamp_seconds: [] | [bigint];
  retrieved_at_timestamp_seconds: bigint;
  visibility: [] | [number];
  known_neuron_data: [] | [KnownNeuronData];
  voting_power: bigint;
  age_seconds: bigint;
}
export interface NeuronStakeTransfer {
  to_subaccount: Uint8Array | number[];
  neuron_stake_e8s: bigint;
  from: [] | [Principal];
  memo: bigint;
  from_subaccount: Uint8Array | number[];
  transfer_timestamp: bigint;
  block_height: bigint;
}
export interface NeuronSubsetMetrics {
  total_maturity_e8s_equivalent: [] | [bigint];
  maturity_e8s_equivalent_buckets: Array<[bigint, bigint]>;
  voting_power_buckets: Array<[bigint, bigint]>;
  total_staked_e8s: [] | [bigint];
  count: [] | [bigint];
  deciding_voting_power_buckets: Array<[bigint, bigint]>;
  total_staked_maturity_e8s_equivalent: [] | [bigint];
  total_potential_voting_power: [] | [bigint];
  total_deciding_voting_power: [] | [bigint];
  staked_maturity_e8s_equivalent_buckets: Array<[bigint, bigint]>;
  staked_e8s_buckets: Array<[bigint, bigint]>;
  total_voting_power: [] | [bigint];
  potential_voting_power_buckets: Array<[bigint, bigint]>;
  count_buckets: Array<[bigint, bigint]>;
}
export interface NeuronsFundAuditInfo {
  final_neurons_fund_participation: [] | [NeuronsFundParticipation];
  initial_neurons_fund_participation: [] | [NeuronsFundParticipation];
  neurons_fund_refunds: [] | [NeuronsFundSnapshot];
}
export interface NeuronsFundData {
  final_neurons_fund_participation: [] | [NeuronsFundParticipation];
  initial_neurons_fund_participation: [] | [NeuronsFundParticipation];
  neurons_fund_refunds: [] | [NeuronsFundSnapshot];
}
export interface NeuronsFundEconomics {
  maximum_icp_xdr_rate: [] | [Percentage];
  neurons_fund_matched_funding_curve_coefficients:
    | []
    | [NeuronsFundMatchedFundingCurveCoefficients];
  max_theoretical_neurons_fund_participation_amount_xdr: [] | [Decimal];
  minimum_icp_xdr_rate: [] | [Percentage];
}
export interface NeuronsFundMatchedFundingCurveCoefficients {
  contribution_threshold_xdr: [] | [Decimal];
  one_third_participation_milestone_xdr: [] | [Decimal];
  full_participation_milestone_xdr: [] | [Decimal];
}
export interface NeuronsFundNeuron {
  controller: [] | [Principal];
  hotkeys: [] | [Principals];
  is_capped: [] | [boolean];
  nns_neuron_id: [] | [bigint];
  amount_icp_e8s: [] | [bigint];
}
export interface NeuronsFundNeuronPortion {
  controller: [] | [Principal];
  hotkeys: Array<Principal>;
  is_capped: [] | [boolean];
  maturity_equivalent_icp_e8s: [] | [bigint];
  nns_neuron_id: [] | [NeuronId];
  amount_icp_e8s: [] | [bigint];
}
export interface NeuronsFundParticipation {
  total_maturity_equivalent_icp_e8s: [] | [bigint];
  intended_neurons_fund_participation_icp_e8s: [] | [bigint];
  direct_participation_icp_e8s: [] | [bigint];
  swap_participation_limits: [] | [SwapParticipationLimits];
  max_neurons_fund_swap_participation_icp_e8s: [] | [bigint];
  neurons_fund_reserves: [] | [NeuronsFundSnapshot];
  ideal_matched_participation_function:
    | []
    | [IdealMatchedParticipationFunction];
  allocated_neurons_fund_participation_icp_e8s: [] | [bigint];
}
export interface NeuronsFundSnapshot {
  neurons_fund_neuron_portions: Array<NeuronsFundNeuronPortion>;
}
export interface NodeProvider {
  id: [] | [Principal];
  reward_account: [] | [AccountIdentifier];
}
export interface Ok {
  neurons_fund_audit_info: [] | [NeuronsFundAuditInfo];
}
export interface Ok_1 {
  neurons_fund_neuron_portions: Array<NeuronsFundNeuron>;
}
export interface OpenSnsTokenSwap {
  community_fund_investment_e8s: [] | [bigint];
  target_swap_canister_id: [] | [Principal];
  params: [] | [Params];
}
export type Operation =
  | { RemoveHotKey: RemoveHotKey }
  | { AddHotKey: AddHotKey }
  | { ChangeAutoStakeMaturity: ChangeAutoStakeMaturity }
  | { StopDissolving: {} }
  | { StartDissolving: {} }
  | { IncreaseDissolveDelay: IncreaseDissolveDelay }
  | { SetVisibility: SetVisibility }
  | { JoinCommunityFund: {} }
  | { LeaveCommunityFund: {} }
  | { SetDissolveTimestamp: SetDissolveTimestamp };
export interface Params {
  min_participant_icp_e8s: bigint;
  neuron_basket_construction_parameters:
    | []
    | [NeuronBasketConstructionParameters_1];
  max_icp_e8s: bigint;
  swap_due_timestamp_seconds: bigint;
  min_participants: number;
  sns_token_e8s: bigint;
  sale_delay_seconds: [] | [bigint];
  max_participant_icp_e8s: bigint;
  min_direct_participation_icp_e8s: [] | [bigint];
  min_icp_e8s: bigint;
  max_direct_participation_icp_e8s: [] | [bigint];
}
export interface Percentage {
  basis_points: [] | [bigint];
}
export interface Principals {
  principals: Array<Principal>;
}
export type Progress = { LastNeuronId: NeuronId };
export interface Proposal {
  url: string;
  title: [] | [string];
  action: [] | [Action];
  summary: string;
}
export type ProposalActionRequest =
  | { RegisterKnownNeuron: KnownNeuron }
  | { ManageNeuron: ManageNeuronRequest }
  | { UpdateCanisterSettings: UpdateCanisterSettings }
  | { InstallCode: InstallCodeRequest }
  | { StopOrStartCanister: StopOrStartCanister }
  | { CreateServiceNervousSystem: CreateServiceNervousSystem }
  | { ExecuteNnsFunction: ExecuteNnsFunction }
  | { RewardNodeProvider: RewardNodeProvider }
  | { RewardNodeProviders: RewardNodeProviders }
  | { ManageNetworkEconomics: NetworkEconomics }
  | { ApproveGenesisKyc: Principals }
  | { AddOrRemoveNodeProvider: AddOrRemoveNodeProvider }
  | { Motion: Motion };
export interface ProposalData {
  id: [] | [ProposalId];
  failure_reason: [] | [GovernanceError];
  ballots: Array<[bigint, Ballot]>;
  proposal_timestamp_seconds: bigint;
  reward_event_round: bigint;
  failed_timestamp_seconds: bigint;
  neurons_fund_data: [] | [NeuronsFundData];
  reject_cost_e8s: bigint;
  derived_proposal_information: [] | [DerivedProposalInformation];
  latest_tally: [] | [Tally];
  total_potential_voting_power: [] | [bigint];
  sns_token_swap_lifecycle: [] | [number];
  decided_timestamp_seconds: bigint;
  proposal: [] | [Proposal];
  proposer: [] | [NeuronId];
  wait_for_quiet_state: [] | [WaitForQuietState];
  executed_timestamp_seconds: bigint;
  original_total_community_fund_maturity_e8s_equivalent: [] | [bigint];
}
export interface ProposalId {
  id: bigint;
}
export interface ProposalInfo {
  id: [] | [ProposalId];
  status: number;
  topic: number;
  failure_reason: [] | [GovernanceError];
  ballots: Array<[bigint, Ballot]>;
  proposal_timestamp_seconds: bigint;
  reward_event_round: bigint;
  deadline_timestamp_seconds: [] | [bigint];
  failed_timestamp_seconds: bigint;
  reject_cost_e8s: bigint;
  derived_proposal_information: [] | [DerivedProposalInformation];
  latest_tally: [] | [Tally];
  total_potential_voting_power: [] | [bigint];
  reward_status: number;
  decided_timestamp_seconds: bigint;
  proposal: [] | [Proposal];
  proposer: [] | [NeuronId];
  executed_timestamp_seconds: bigint;
}
export type RefreshVotingPower = {};
export type RefreshVotingPowerResponse = {};
export interface RegisterVote {
  vote: number;
  proposal: [] | [ProposalId];
}
export interface RemoveHotKey {
  hot_key_to_remove: [] | [Principal];
}
export interface RestoreAgingNeuronGroup {
  count: [] | [bigint];
  previous_total_stake_e8s: [] | [bigint];
  current_total_stake_e8s: [] | [bigint];
  group_type: number;
}
export interface RestoreAgingSummary {
  groups: Array<RestoreAgingNeuronGroup>;
  timestamp_seconds: [] | [bigint];
}
export type Result = { Ok: null } | { Err: GovernanceError };
export type Result_1 = { Error: GovernanceError } | { NeuronId: NeuronId };
export type Result_10 = { Ok: Ok_1 } | { Err: GovernanceError };
export type Result_2 = { Ok: Neuron } | { Err: GovernanceError };
export type Result_3 =
  | { Ok: GovernanceCachedMetrics }
  | { Err: GovernanceError };
export type Result_4 =
  | { Ok: MonthlyNodeProviderRewards }
  | { Err: GovernanceError };
export type Result_5 = { Ok: NeuronInfo } | { Err: GovernanceError };
export type Result_6 = { Ok: Ok } | { Err: GovernanceError };
export type Result_7 = { Ok: NodeProvider } | { Err: GovernanceError };
export type Result_8 = { Committed: Committed } | { Aborted: {} };
export type Result_9 = { Committed: Committed_1 } | { Aborted: {} };
export interface RewardEvent {
  rounds_since_last_distribution: [] | [bigint];
  day_after_genesis: bigint;
  actual_timestamp_seconds: bigint;
  total_available_e8s_equivalent: bigint;
  latest_round_available_e8s_equivalent: [] | [bigint];
  distributed_e8s_equivalent: bigint;
  settled_proposals: Array<ProposalId>;
}
export type RewardMode =
  | { RewardToNeuron: RewardToNeuron }
  | { RewardToAccount: RewardToAccount };
export interface RewardNodeProvider {
  node_provider: [] | [NodeProvider];
  reward_mode: [] | [RewardMode];
  amount_e8s: bigint;
}
export interface RewardNodeProviders {
  use_registry_derived_rewards: [] | [boolean];
  rewards: Array<RewardNodeProvider>;
}
export interface RewardToAccount {
  to_account: [] | [AccountIdentifier];
}
export interface RewardToNeuron {
  dissolve_delay_seconds: bigint;
}
export interface SetDefaultFollowees {
  default_followees: Array<[number, Followees]>;
}
export interface SetDissolveTimestamp {
  dissolve_timestamp_seconds: bigint;
}
export interface SetOpenTimeWindowRequest {
  open_time_window: [] | [TimeWindow];
}
export interface SetSnsTokenSwapOpenTimeWindow {
  request: [] | [SetOpenTimeWindowRequest];
  swap_canister_id: [] | [Principal];
}
export interface SetVisibility {
  visibility: [] | [number];
}
export interface SettleCommunityFundParticipation {
  result: [] | [Result_8];
  open_sns_token_swap_proposal_id: [] | [bigint];
}
export interface SettleNeuronsFundParticipationRequest {
  result: [] | [Result_9];
  nns_proposal_id: [] | [bigint];
}
export interface SettleNeuronsFundParticipationResponse {
  result: [] | [Result_10];
}
export interface Spawn {
  percentage_to_spawn: [] | [number];
  new_controller: [] | [Principal];
  nonce: [] | [bigint];
}
export interface SpawnResponse {
  created_neuron_id: [] | [NeuronId];
}
export interface Split {
  amount_e8s: bigint;
}
export interface StakeMaturity {
  percentage_to_stake: [] | [number];
}
export interface StakeMaturityResponse {
  maturity_e8s: bigint;
  staked_maturity_e8s: bigint;
}
export interface StopOrStartCanister {
  action: [] | [number];
  canister_id: [] | [Principal];
}
export interface SwapBackgroundInformation {
  ledger_index_canister_summary: [] | [CanisterSummary];
  fallback_controller_principal_ids: Array<Principal>;
  ledger_archive_canister_summaries: Array<CanisterSummary>;
  ledger_canister_summary: [] | [CanisterSummary];
  swap_canister_summary: [] | [CanisterSummary];
  governance_canister_summary: [] | [CanisterSummary];
  root_canister_summary: [] | [CanisterSummary];
  dapp_canister_summaries: Array<CanisterSummary>;
}
export interface SwapDistribution {
  total: [] | [Tokens];
}
export interface SwapParameters {
  minimum_participants: [] | [bigint];
  neurons_fund_participation: [] | [boolean];
  duration: [] | [Duration];
  neuron_basket_construction_parameters:
    | []
    | [NeuronBasketConstructionParameters];
  confirmation_text: [] | [string];
  maximum_participant_icp: [] | [Tokens];
  minimum_icp: [] | [Tokens];
  minimum_direct_participation_icp: [] | [Tokens];
  minimum_participant_icp: [] | [Tokens];
  start_time: [] | [GlobalTimeOfDay];
  maximum_direct_participation_icp: [] | [Tokens];
  maximum_icp: [] | [Tokens];
  neurons_fund_investment_icp: [] | [Tokens];
  restricted_countries: [] | [Countries];
}
export interface SwapParticipationLimits {
  min_participant_icp_e8s: [] | [bigint];
  max_participant_icp_e8s: [] | [bigint];
  min_direct_participation_icp_e8s: [] | [bigint];
  max_direct_participation_icp_e8s: [] | [bigint];
}
export interface Tally {
  no: bigint;
  yes: bigint;
  total: bigint;
  timestamp_seconds: bigint;
}
export interface TimeWindow {
  start_timestamp_seconds: bigint;
  end_timestamp_seconds: bigint;
}
export interface Tokens {
  e8s: [] | [bigint];
}
export interface UpdateCanisterSettings {
  canister_id: [] | [Principal];
  settings: [] | [CanisterSettings];
}
export interface UpdateNodeProvider {
  reward_account: [] | [AccountIdentifier];
}
export interface VotingPowerEconomics {
  start_reducing_voting_power_after_seconds: [] | [bigint];
  clear_following_after_seconds: [] | [bigint];
}
export interface VotingRewardParameters {
  reward_rate_transition_duration: [] | [Duration];
  initial_reward_rate: [] | [Percentage];
  final_reward_rate: [] | [Percentage];
}
export interface WaitForQuietState {
  current_deadline_timestamp_seconds: bigint;
}
export interface XdrConversionRate {
  xdr_permyriad_per_icp: [] | [bigint];
  timestamp_seconds: [] | [bigint];
}
export interface _SERVICE {
  claim_gtc_neurons: ActorMethod<[Principal, Array<NeuronId>], Result>;
  claim_or_refresh_neuron_from_account: ActorMethod<
    [ClaimOrRefreshNeuronFromAccount],
    ClaimOrRefreshNeuronFromAccountResponse
  >;
  get_build_metadata: ActorMethod<[], string>;
  get_full_neuron: ActorMethod<[bigint], Result_2>;
  get_full_neuron_by_id_or_subaccount: ActorMethod<
    [NeuronIdOrSubaccount],
    Result_2
  >;
  get_latest_reward_event: ActorMethod<[], RewardEvent>;
  get_metrics: ActorMethod<[], Result_3>;
  get_monthly_node_provider_rewards: ActorMethod<[], Result_4>;
  get_most_recent_monthly_node_provider_rewards: ActorMethod<
    [],
    [] | [MonthlyNodeProviderRewards]
  >;
  get_network_economics_parameters: ActorMethod<[], NetworkEconomics>;
  get_neuron_ids: ActorMethod<[], BigUint64Array | bigint[]>;
  get_neuron_info: ActorMethod<[bigint], Result_5>;
  get_neuron_info_by_id_or_subaccount: ActorMethod<
    [NeuronIdOrSubaccount],
    Result_5
  >;
  get_neurons_fund_audit_info: ActorMethod<
    [GetNeuronsFundAuditInfoRequest],
    GetNeuronsFundAuditInfoResponse
  >;
  get_node_provider_by_caller: ActorMethod<[null], Result_7>;
  get_pending_proposals: ActorMethod<[], Array<ProposalInfo>>;
  get_proposal_info: ActorMethod<[bigint], [] | [ProposalInfo]>;
  get_restore_aging_summary: ActorMethod<[], RestoreAgingSummary>;
  list_known_neurons: ActorMethod<[], ListKnownNeuronsResponse>;
  list_neurons: ActorMethod<[ListNeurons], ListNeuronsResponse>;
  list_node_provider_rewards: ActorMethod<
    [ListNodeProviderRewardsRequest],
    ListNodeProviderRewardsResponse
  >;
  list_node_providers: ActorMethod<[], ListNodeProvidersResponse>;
  list_proposals: ActorMethod<[ListProposalInfo], ListProposalInfoResponse>;
  manage_neuron: ActorMethod<[ManageNeuronRequest], ManageNeuronResponse>;
  settle_community_fund_participation: ActorMethod<
    [SettleCommunityFundParticipation],
    Result
  >;
  settle_neurons_fund_participation: ActorMethod<
    [SettleNeuronsFundParticipationRequest],
    SettleNeuronsFundParticipationResponse
  >;
  simulate_manage_neuron: ActorMethod<
    [ManageNeuronRequest],
    ManageNeuronResponse
  >;
  transfer_gtc_neuron: ActorMethod<[NeuronId, NeuronId], Result>;
  update_neuron: ActorMethod<[Neuron], [] | [GovernanceError]>;
  update_node_provider: ActorMethod<[UpdateNodeProvider], Result>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
