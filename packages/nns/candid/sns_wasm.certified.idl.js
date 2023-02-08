/* Do not edit.  Compiled with ./scripts/compile-idl-js from packages/nns/candid/sns_wasm.did */
export const idlFactory = ({ IDL }) => {
  const SnsWasmCanisterInitPayload = IDL.Record({
    'allowed_principals' : IDL.Vec(IDL.Principal),
    'access_controls_enabled' : IDL.Bool,
    'sns_subnet_ids' : IDL.Vec(IDL.Principal),
  });
  const SnsWasm = IDL.Record({
    'wasm' : IDL.Vec(IDL.Nat8),
    'canister_type' : IDL.Int32,
  });
  const AddWasmRequest = IDL.Record({
    'hash' : IDL.Vec(IDL.Nat8),
    'wasm' : IDL.Opt(SnsWasm),
  });
  const SnsWasmError = IDL.Record({ 'message' : IDL.Text });
  const Result = IDL.Variant({
    'Error' : SnsWasmError,
    'Hash' : IDL.Vec(IDL.Nat8),
  });
  const AddWasmResponse = IDL.Record({ 'result' : IDL.Opt(Result) });
  const TreasuryDistribution = IDL.Record({ 'total_e8s' : IDL.Nat64 });
  const NeuronDistribution = IDL.Record({
    'controller' : IDL.Opt(IDL.Principal),
    'dissolve_delay_seconds' : IDL.Nat64,
    'memo' : IDL.Nat64,
    'stake_e8s' : IDL.Nat64,
    'vesting_period_seconds' : IDL.Opt(IDL.Nat64),
  });
  const DeveloperDistribution = IDL.Record({
    'developer_neurons' : IDL.Vec(NeuronDistribution),
  });
  const AirdropDistribution = IDL.Record({
    'airdrop_neurons' : IDL.Vec(NeuronDistribution),
  });
  const SwapDistribution = IDL.Record({
    'total_e8s' : IDL.Nat64,
    'initial_swap_amount_e8s' : IDL.Nat64,
  });
  const FractionalDeveloperVotingPower = IDL.Record({
    'treasury_distribution' : IDL.Opt(TreasuryDistribution),
    'developer_distribution' : IDL.Opt(DeveloperDistribution),
    'airdrop_distribution' : IDL.Opt(AirdropDistribution),
    'swap_distribution' : IDL.Opt(SwapDistribution),
  });
  const InitialTokenDistribution = IDL.Variant({
    'FractionalDeveloperVotingPower' : FractionalDeveloperVotingPower,
  });
  const SnsInitPayload = IDL.Record({
    'url' : IDL.Opt(IDL.Text),
    'max_dissolve_delay_seconds' : IDL.Opt(IDL.Nat64),
    'max_dissolve_delay_bonus_percentage' : IDL.Opt(IDL.Nat64),
    'fallback_controller_principal_ids' : IDL.Vec(IDL.Text),
    'token_symbol' : IDL.Opt(IDL.Text),
    'final_reward_rate_basis_points' : IDL.Opt(IDL.Nat64),
    'neuron_minimum_stake_e8s' : IDL.Opt(IDL.Nat64),
    'logo' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'initial_voting_period_seconds' : IDL.Opt(IDL.Nat64),
    'neuron_minimum_dissolve_delay_to_vote_seconds' : IDL.Opt(IDL.Nat64),
    'description' : IDL.Opt(IDL.Text),
    'max_neuron_age_seconds_for_age_bonus' : IDL.Opt(IDL.Nat64),
    'initial_reward_rate_basis_points' : IDL.Opt(IDL.Nat64),
    'wait_for_quiet_deadline_increase_seconds' : IDL.Opt(IDL.Nat64),
    'transaction_fee_e8s' : IDL.Opt(IDL.Nat64),
    'max_age_bonus_percentage' : IDL.Opt(IDL.Nat64),
    'initial_token_distribution' : IDL.Opt(InitialTokenDistribution),
    'reward_rate_transition_duration_seconds' : IDL.Opt(IDL.Nat64),
    'token_name' : IDL.Opt(IDL.Text),
    'proposal_reject_cost_e8s' : IDL.Opt(IDL.Nat64),
  });
  const DeployNewSnsRequest = IDL.Record({
    'sns_init_payload' : IDL.Opt(SnsInitPayload),
  });
  const SnsCanisterIds = IDL.Record({
    'root' : IDL.Opt(IDL.Principal),
    'swap' : IDL.Opt(IDL.Principal),
    'ledger' : IDL.Opt(IDL.Principal),
    'index' : IDL.Opt(IDL.Principal),
    'governance' : IDL.Opt(IDL.Principal),
  });
  const DeployNewSnsResponse = IDL.Record({
    'subnet_id' : IDL.Opt(IDL.Principal),
    'error' : IDL.Opt(SnsWasmError),
    'canisters' : IDL.Opt(SnsCanisterIds),
  });
  const GetAllowedPrincipalsResponse = IDL.Record({
    'allowed_principals' : IDL.Vec(IDL.Principal),
  });
  const SnsVersion = IDL.Record({
    'archive_wasm_hash' : IDL.Vec(IDL.Nat8),
    'root_wasm_hash' : IDL.Vec(IDL.Nat8),
    'swap_wasm_hash' : IDL.Vec(IDL.Nat8),
    'ledger_wasm_hash' : IDL.Vec(IDL.Nat8),
    'governance_wasm_hash' : IDL.Vec(IDL.Nat8),
    'index_wasm_hash' : IDL.Vec(IDL.Nat8),
  });
  const GetNextSnsVersionRequest = IDL.Record({
    'governance_canister_id' : IDL.Opt(IDL.Principal),
    'current_version' : IDL.Opt(SnsVersion),
  });
  const GetNextSnsVersionResponse = IDL.Record({
    'next_version' : IDL.Opt(SnsVersion),
  });
  const GetSnsSubnetIdsResponse = IDL.Record({
    'sns_subnet_ids' : IDL.Vec(IDL.Principal),
  });
  const GetWasmRequest = IDL.Record({ 'hash' : IDL.Vec(IDL.Nat8) });
  const GetWasmResponse = IDL.Record({ 'wasm' : IDL.Opt(SnsWasm) });
  const SnsUpgrade = IDL.Record({
    'next_version' : IDL.Opt(SnsVersion),
    'current_version' : IDL.Opt(SnsVersion),
  });
  const InsertUpgradePathEntriesRequest = IDL.Record({
    'upgrade_path' : IDL.Vec(SnsUpgrade),
    'sns_governance_canister_id' : IDL.Opt(IDL.Principal),
  });
  const InsertUpgradePathEntriesResponse = IDL.Record({
    'error' : IDL.Opt(SnsWasmError),
  });
  const DeployedSns = IDL.Record({
    'root_canister_id' : IDL.Opt(IDL.Principal),
    'governance_canister_id' : IDL.Opt(IDL.Principal),
    'index_canister_id' : IDL.Opt(IDL.Principal),
    'swap_canister_id' : IDL.Opt(IDL.Principal),
    'ledger_canister_id' : IDL.Opt(IDL.Principal),
  });
  const ListDeployedSnsesResponse = IDL.Record({
    'instances' : IDL.Vec(DeployedSns),
  });
  const ListUpgradeStepsRequest = IDL.Record({
    'limit' : IDL.Nat32,
    'starting_at' : IDL.Opt(SnsVersion),
    'sns_governance_canister_id' : IDL.Opt(IDL.Principal),
  });
  const PrettySnsVersion = IDL.Record({
    'archive_wasm_hash' : IDL.Text,
    'root_wasm_hash' : IDL.Text,
    'swap_wasm_hash' : IDL.Text,
    'ledger_wasm_hash' : IDL.Text,
    'governance_wasm_hash' : IDL.Text,
    'index_wasm_hash' : IDL.Text,
  });
  const ListUpgradeStep = IDL.Record({
    'pretty_version' : IDL.Opt(PrettySnsVersion),
    'version' : IDL.Opt(SnsVersion),
  });
  const ListUpgradeStepsResponse = IDL.Record({
    'steps' : IDL.Vec(ListUpgradeStep),
  });
  const UpdateAllowedPrincipalsRequest = IDL.Record({
    'added_principals' : IDL.Vec(IDL.Principal),
    'removed_principals' : IDL.Vec(IDL.Principal),
  });
  const UpdateAllowedPrincipalsResult = IDL.Variant({
    'Error' : SnsWasmError,
    'AllowedPrincipals' : GetAllowedPrincipalsResponse,
  });
  const UpdateAllowedPrincipalsResponse = IDL.Record({
    'update_allowed_principals_result' : IDL.Opt(UpdateAllowedPrincipalsResult),
  });
  const UpdateSnsSubnetListRequest = IDL.Record({
    'sns_subnet_ids_to_add' : IDL.Vec(IDL.Principal),
    'sns_subnet_ids_to_remove' : IDL.Vec(IDL.Principal),
  });
  const UpdateSnsSubnetListResponse = IDL.Record({
    'error' : IDL.Opt(SnsWasmError),
  });
  return IDL.Service({
    'add_wasm' : IDL.Func([AddWasmRequest], [AddWasmResponse], []),
    'deploy_new_sns' : IDL.Func(
        [DeployNewSnsRequest],
        [DeployNewSnsResponse],
        [],
      ),
    'get_allowed_principals' : IDL.Func(
        [IDL.Record({})],
        [GetAllowedPrincipalsResponse],
        [],
      ),
    'get_latest_sns_version_pretty' : IDL.Func(
        [IDL.Null],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        [],
      ),
    'get_next_sns_version' : IDL.Func(
        [GetNextSnsVersionRequest],
        [GetNextSnsVersionResponse],
        [],
      ),
    'get_sns_subnet_ids' : IDL.Func(
        [IDL.Record({})],
        [GetSnsSubnetIdsResponse],
        [],
      ),
    'get_wasm' : IDL.Func([GetWasmRequest], [GetWasmResponse], []),
    'insert_upgrade_path_entries' : IDL.Func(
        [InsertUpgradePathEntriesRequest],
        [InsertUpgradePathEntriesResponse],
        [],
      ),
    'list_deployed_snses' : IDL.Func(
        [IDL.Record({})],
        [ListDeployedSnsesResponse],
        [],
      ),
    'list_upgrade_steps' : IDL.Func(
        [ListUpgradeStepsRequest],
        [ListUpgradeStepsResponse],
        [],
      ),
    'update_allowed_principals' : IDL.Func(
        [UpdateAllowedPrincipalsRequest],
        [UpdateAllowedPrincipalsResponse],
        [],
      ),
    'update_sns_subnet_list' : IDL.Func(
        [UpdateSnsSubnetListRequest],
        [UpdateSnsSubnetListResponse],
        [],
      ),
  });
};
export const init = ({ IDL }) => {
  const SnsWasmCanisterInitPayload = IDL.Record({
    'allowed_principals' : IDL.Vec(IDL.Principal),
    'access_controls_enabled' : IDL.Bool,
    'sns_subnet_ids' : IDL.Vec(IDL.Principal),
  });
  return [SnsWasmCanisterInitPayload];
};
