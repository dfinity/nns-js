import { IDL } from "@dfinity/candid";
import { toTransferArg } from "@dfinity/ledger/src/converters/ledger.converters";
import { TransferParams } from "@dfinity/ledger/src/types/ledger.params";
import { Principal } from "@dfinity/principal";
import { uint8ArrayToBigInt } from "@dfinity/utils";
import { transferFn } from "./sns-ledger.idl";
import { createBlob, defaultCaller, writeToJson } from "./utils";

/**
 * Issue: https://github.com/Zondax/ledger-icp/issues/218
 */

/**
 * Principals can be up to 29 bytes long.
 *
 * Source: https://wiki.internetcomputer.org/wiki/Principal
 */

interface Params extends TransferParams {
  canisterId: Principal;
  owner: Principal;
  isWorking: boolean;
}

// Fee is optional, if not provided, it will be set to 10000 which is the ICP fee
const ICP_DEFAULT_FEE_E8S = 10_000;

const createTestVector = (params: Params) => {
  const rawRequestBody = toTransferArg(params);

  const memoOutput =
    params.memo !== undefined
      ? `Memo : ${uint8ArrayToBigInt(params.memo).toString()}`
      : "Memo : 0";

  return {
    blob_candid: createBlob({
      arg: IDL.encode(transferFn.argTypes, [rawRequestBody]),
      methodName: "icrc1_transfer",
      canisterId: params.canisterId,
      caller: params.owner,
    }),
    isWorking: params.isWorking,
    name: "ICRC1 ICP Transfer",
    canisterId: params.canisterId.toText(),
    caller: params.owner.toText() ?? defaultCaller.toText(),
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const notWorkingPrincipalDestination = Principal.fromText(
      "ttwhn-ittl6-fnuml-tqdgz-tbyhu-f7jti-ft2cr-znzsu-biv4l-gpvg4-ba",
    );
    const workingPrincipalDestination = Principal.fromText(
      "mhfqd-kvmfi-k6dts-lgdui-wgyrn-5o4uv-jiokz-dk4v3-meds4-j4umt-vae",
    );
    const fromPrincipal = Principal.from(
      "q2fbu-chrgb-o7dmd-u5cfn-xgo4f-5lpcl-ldeca-wl4sn-5j7gb-ltm63-hqe",
    );
    const ledgerCanister = Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
    const workingTransfer: Params = {
      owner: fromPrincipal,
      to: {
        owner: workingPrincipalDestination,
        subaccount: [],
      },
      isWorking: true,
      fee: BigInt(10_000),
      amount: BigInt(100_000_000),
      canisterId: ledgerCanister,
      created_at_time: BigInt(1629200000000000000),
    };
    const vectors = [
      createTestVector(workingTransfer),
      createTestVector({
        ...workingTransfer,
        to: {
          owner: notWorkingPrincipalDestination,
          subaccount: [],
        },
        isWorking: false,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "icrc-1-issue.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
