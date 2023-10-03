import {
  CallRequest,
  Cbor,
  Expiry,
  ReadRequest,
  SubmitRequestType,
} from "@dfinity/agent";
import { IcrcAccount } from "@dfinity/ledger-icrc/src/types/ledger.responses";
import { encodeIcrcAccount } from "@dfinity/ledger-icrc/src/utils/ledger.utils";
import { Principal } from "@dfinity/principal";
import { writeFileSync } from "fs";
import { MAINNET_GOVERNANCE_CANISTER_ID } from "../../packages/nns/src/constants/canister_ids";
import { SnsNeuronPermissionType } from "../../packages/sns/src/enums/governance.enums";

/**
 * Changes needed to match the `arg` inside the blob_proto with the Hardware Wallet CLI blob.
 *
 * In this file
 * - Change `sender` in the `createCallRequest` to the one commented.
 *
 * In the hardware-wallet-cli
 * - `disableNonce: true` in `getAgent` when creating the `HttpAgent.create(...)`.
 * - `console.log(Buffer.from(blob).toString("hex"));` inside the `sign` method in LedgerIdentity
 *
 * Go to cbor.me and decode both blobs.
 * The `arg` property should match.
 */

/**
 * Extra change to check for `candid`.
 *
 * In the hardware-wallet-cli
 * - `hardwareWallet: false` in the method.
 */

function _prepareCborForLedger(
  request: ReadRequest | CallRequest,
): ArrayBuffer {
  return Cbor.encode({ content: request });
}

// Default delta for ingress expiry is 5 minutes.
const DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS = 5 * 60 * 1000;

export const defaultCaller = Principal.fromText(
  "5upke-tazvi-6ufqc-i3v6r-j4gpu-dpwti-obhal-yb5xj-ue32x-ktkql-rqe",
);

const createCallRequest = ({
  arg,
  methodName,
  canisterId,
  caller,
}: {
  arg: ArrayBuffer;
  methodName: string;
  canisterId?: Principal;
  caller?: Principal;
}): CallRequest => ({
  request_type: SubmitRequestType.Call,
  canister_id: canisterId ?? MAINNET_GOVERNANCE_CANISTER_ID,
  method_name: methodName,
  arg,
  // Use this principal to match the principal used in Zondax integration tests.
  sender: caller ?? defaultCaller,
  ingress_expiry: new Expiry(DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS),
});

export const createBlob = ({
  arg,
  methodName,
  canisterId,
  caller,
}: {
  arg: ArrayBuffer;
  methodName: string;
  canisterId?: Principal;
  caller?: Principal;
}): string => {
  const callRequestCandid = createCallRequest({
    arg,
    methodName,
    caller,
    canisterId,
  });
  const candidBlob = _prepareCborForLedger(callRequestCandid);
  return Buffer.from(candidBlob).toString("hex");
};

export const writeToJson = ({
  data,
  fileName,
}: {
  data: any;
  fileName: string;
}) => {
  try {
    writeFileSync(
      fileName,
      JSON.stringify(data, (key, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        if (value instanceof Principal) {
          return value.toText();
        }
        return value;
      }),
    );
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

export const splitPrincipal = (principal: Principal): string[] => {
  const text = principal.toText();
  const split = text.split("-");
  const groupedInThrees = [];
  for (let i = 0; i < split.length; i += 3) {
    groupedInThrees.push(split.slice(i, i + 3).join("-"));
  }
  const lines = [];
  for (let i = 0; i < groupedInThrees.length; i += 2) {
    lines.push(groupedInThrees.slice(i, i + 2).join(" : "));
  }
  return lines;
};

export const splitString = (
  textToSplit: string,
  screenText: string,
): string[] => {
  return (
    textToSplit
      .match(/.{1,8}/g)
      ?.reduce((acc, curr) => {
        if (acc.length === 0) {
          return [curr];
        }
        const lastItem = acc[acc.length - 1];
        if (lastItem.length > 18) {
          return [...acc, curr];
        } else if (lastItem.length < 18) {
          return [...acc.slice(0, -1), `${lastItem} : ${curr}`];
        }
        return acc;
      }, [] as string[])
      ?.map(
        (data, i, elements) =>
          `${screenText} [${i + 1}/${elements.length}] : ${data}`,
      ) || []
  );
};

export const splitAccount = (
  account: IcrcAccount,
  screenText: string,
): string[] => {
  return splitString(encodeIcrcAccount(account), screenText);
};

export const permissionMapper: Record<SnsNeuronPermissionType, string> = {
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_VOTE]: "Vote",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_SUBMIT_PROPOSAL]:
    "Submit Proposal",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_CONFIGURE_DISSOLVE_STATE]:
    "Configure Dissolve State",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_DISBURSE]: "Disburse Neuron",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_DISBURSE_MATURITY]:
    "Disburse Maturity",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_MANAGE_PRINCIPALS]:
    "Manage Principals",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_MANAGE_VOTING_PERMISSION]:
    "Manage Voting Permission",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_SPLIT]: "Split Neuron",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_STAKE_MATURITY]:
    "Stake Maturity",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_UNSPECIFIED]: "Unspecified",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_MERGE_MATURITY]:
    "Merge Maturity",
};

export const bytesToHexString = (bytes: number[]): string =>
  bytes.reduce(
    (str, byte) => `${str}${byte.toString(16).padStart(2, "0")}`,
    "",
  );
