import { IDL, JsonObject } from "@dfinity/candid";
import { Buffer } from "buffer";
import {
  AddFirewallRulesPayload,
  AddNodeOperatorPayload,
  AddNodesToSubnetPayload,
  AddOrRemoveDataCentersProposalPayload,
  BlessReplicaVersionPayload,
  CompleteCanisterMigrationPayload,
  CreateSubnetPayload,
  PrepareCanisterMigrationPayload,
  RecoverSubnetPayload,
  RemoveFirewallRulesPayload,
  RemoveNodeOperatorsPayload,
  RemoveNodesPayload,
  RerouteCanisterRangesPayload,
  SetAuthorizedSubnetworkListArgs,
  SetFirewallConfigPayload,
  StopOrStartNnsCanisterProposalPayload,
  UpdateIcpXdrConversionRatePayload,
  UpdateNodeOperatorConfigPayload,
  UpdateNodeRewardsTableProposalPayload,
  UpdateSubnetPayload,
  UpdateSubnetReplicaVersionPayload,
  UpdateUnassignedNodesConfigPayload,
} from "../../../candid/payloads.idl";
import { Option } from "../../types/common";

export const getNnsFunctionName = (nnsFunction: number): string => {
  switch (nnsFunction) {
    case 1:
      return "Create subnet";
    case 2:
      return "Add nodes to subnet";
    case 3:
      return "Install NNS canister";
    case 4:
      return "Upgrade NNS canister";
    case 5:
      return "Bless replica version";
    case 6:
      return "Recover subnet";
    case 7:
      return "Update subnet config";
    case 8:
      return "Assign node operator Id";
    case 9:
      return "Update NNS root canister";
    case 10:
      return "Update ICP/XDR conversion rate";
    case 11:
      return "Update subnet replica version";
    case 12:
      return "Clear provisional whitelist";
    case 13:
      return "Remove nodes from subnet";
    case 14:
      return "Set authorized subnetworks";
    case 15:
      return "Change firewall config";
    case 16:
      return "Update node operator config";
    case 17:
      return "Start or stop NNS canister";
    case 18:
      return "Remove nodes from registry";
    case 19:
      return "Uninstall code from canister";
    case 20:
      return "Update the node rewards table";
    case 21:
      return "Add or remove data centers";
    case 22:
      return "Update unassigned nodes config";
    case 23:
      return "Remove node operators";
    case 24:
      return "Reroute canister range";
    case 25:
      return "Add firewall rules";
    case 26:
      return "Remove firewall rules";
    case 27:
      return "Update firewall rules";
    case 28:
      return "Prepare Canister Migration";
    case 29:
      return "Complete Canister Migration";
    default:
      return "--Unknown--";
  }
};

// index source -- https://github.com/dfinity/ic/blob/master/rs/nns/governance/proto/ic_nns_governance/pb/v1/governance.proto#L349
export const convertNnsFunctionPayload = (
  nnsFunction: number,
  payload: ArrayBuffer
): Option<Record<string, unknown>> => {
  const buffer = new Buffer(payload);

  try {
    switch (nnsFunction) {
      case 1:
        return IDL.decode([CreateSubnetPayload], buffer)[0] as JsonObject;
      case 2:
        return IDL.decode([AddNodesToSubnetPayload], buffer)[0] as JsonObject;
      case 3:
        return { "Unable to display payload": "Payload too large" };
      case 4:
        return { "Unable to display payload": "Payload too large" };
      case 5:
        return IDL.decode(
          [BlessReplicaVersionPayload],
          buffer
        )[0] as JsonObject;
      case 6:
        return IDL.decode([RecoverSubnetPayload], buffer)[0] as JsonObject;
      case 7:
        return IDL.decode([UpdateSubnetPayload], buffer)[0] as JsonObject;
      case 8:
        // TODO: NNS_FUNCTION_ASSIGN_NOID in proto
        return IDL.decode([AddNodeOperatorPayload], buffer)[0] as JsonObject;
      case 9:
        return { "Unable to display payload": "Payload too large" };
      case 10:
        return IDL.decode(
          [UpdateIcpXdrConversionRatePayload],
          buffer
        )[0] as JsonObject;
      case 11:
        return IDL.decode(
          [UpdateSubnetReplicaVersionPayload],
          buffer
        )[0] as JsonObject;
      case 12:
        // NNS_FUNCTION_CLEAR_PROVISIONAL_WHITELIST
        return {};
      case 13:
        return IDL.decode([RemoveNodesPayload], buffer)[0] as JsonObject;
      case 14:
        return IDL.decode(
          [SetAuthorizedSubnetworkListArgs],
          buffer
        )[0] as JsonObject;
      case 15:
        return IDL.decode([SetFirewallConfigPayload], buffer)[0] as JsonObject;
      case 16:
        return IDL.decode(
          [UpdateNodeOperatorConfigPayload],
          buffer
        )[0] as JsonObject;
      case 17:
        return IDL.decode(
          [StopOrStartNnsCanisterProposalPayload],
          buffer
        )[0] as JsonObject;
      case 18:
        return IDL.decode([RemoveNodesPayload], buffer)[0] as JsonObject;
      // case 19: return "Uninstall code from canister";
      case 20:
        return IDL.decode(
          [UpdateNodeRewardsTableProposalPayload],
          buffer
        )[0] as JsonObject;
      case 21:
        return IDL.decode(
          [AddOrRemoveDataCentersProposalPayload],
          buffer
        )[0] as JsonObject;
      case 22:
        return IDL.decode(
          [UpdateUnassignedNodesConfigPayload],
          buffer
        )[0] as JsonObject;
      case 23:
        return IDL.decode(
          [RemoveNodeOperatorsPayload],
          buffer
        )[0] as JsonObject;
      case 24:
        return IDL.decode(
          [RerouteCanisterRangesPayload],
          buffer
        )[0] as JsonObject;
      case 25:
        return IDL.decode([AddFirewallRulesPayload], buffer)[0] as JsonObject;
      case 26:
        return IDL.decode(
          [RemoveFirewallRulesPayload],
          buffer
        )[0] as JsonObject;
      case 27:
        // "UpdateFirewallRulesPayload" not found in did. According to rs has same structure as AddFirewallRulesPayload
        return IDL.decode([AddFirewallRulesPayload], buffer)[0] as JsonObject;
      case 28:
        return IDL.decode(
          [PrepareCanisterMigrationPayload],
          buffer
        )[0] as JsonObject;
      case 29:
        return IDL.decode(
          [CompleteCanisterMigrationPayload],
          buffer
        )[0] as JsonObject;
      default:
        return undefined;
    }
  } catch (e) {
    console.log("Unable to deserialize payload. NNS function: " + nnsFunction);
    console.log(e);
    return { error: "Unable to deserialize payload" };
  }
};
