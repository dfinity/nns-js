import {
  CallRequest,
  Cbor,
  Expiry,
  ReadRequest,
  SubmitRequestType,
} from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { writeFileSync } from "fs";
import { MAINNET_GOVERNANCE_CANISTER_ID } from "../../packages/nns/src/constants/canister_ids";

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

const createCallRequest = ({
  arg,
  methodName,
  canisterId,
}: {
  arg: ArrayBuffer;
  methodName: string;
  canisterId?: Principal;
}): CallRequest => ({
  request_type: SubmitRequestType.Call,
  canister_id: canisterId ?? MAINNET_GOVERNANCE_CANISTER_ID,
  method_name: methodName,
  arg,
  // sender: new AnonymousIdentity().getPrincipal(),
  // Use this principal to match the principal used in Zondax integration tests.
  sender: Principal.fromText(
    "5upke-tazvi-6ufqc-i3v6r-j4gpu-dpwti-obhal-yb5xj-ue32x-ktkql-rqe"
  ),
  ingress_expiry: new Expiry(DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS),
});

export const createBlob = ({
  arg,
  methodName,
  canisterId,
}: {
  arg: ArrayBuffer;
  methodName: string;
  canisterId?: Principal;
}): string => {
  const callRequestCandid = createCallRequest({
    arg,
    methodName,
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
