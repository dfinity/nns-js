import { IDL } from "@dfinity/candid";
import { E8S_PER_TOKEN } from "@dfinity/nns/src/constants/constants";
import { Principal } from "@dfinity/principal";
import { toTransferArg } from "@dfinity/sns/src/converters/ledger.converters";
import { TransferParams } from "@dfinity/sns/src/types/ledger.params";
import {
  arrayOfNumberToUint8Array,
  fromNullable,
  numberToUint8Array,
  uint8ArrayToBigInt,
} from "@dfinity/utils";
import { MAINNET_LEDGER_CANISTER_ID } from "../../packages/nns/src/constants/canister_ids";
import { transferFn } from "./sns-ledger.idl";
import {
  createBlob,
  defaultCaller,
  splitAccount,
  splitPrincipal,
  writeToJson,
} from "./utils";

/**
 * Issue: PENDING
 */

interface Params extends TransferParams {
  canisterId: Principal;
  owner: Principal;
}

// Fee is optional, if not provided, it will be set to 10000 which is the ICP fee
const icpFeeE8s = 10000;

const createTestVector = (params: Params) => {
  const rawRequestBody = toTransferArg(params);
  const isICP =
    params.canisterId.toText() === MAINNET_LEDGER_CANISTER_ID.toText();

  let outputTxType = isICP ? "Send ICP" : "Send Tokens";
  const canisterIdOutputs = splitPrincipal(params.canisterId).map(
    (data, i, elements) => `Canister Id [${i + 1}/${elements.length}] : ${data}`
  );

  const fromOutputs = splitAccount(
    {
      owner: params.owner,
      subaccount: params.from_subaccount,
    },
    "From account"
  );
  const toOutputs = splitAccount(
    {
      owner: params.to.owner,
      subaccount: fromNullable(params.to.subaccount),
    },
    "To account"
  );

  const amountToken = Number(params.amount) / Number(E8S_PER_TOKEN);
  const paymentOutput = isICP
    ? `Payment (ICP) : ${amountToken}`
    : `Payment (Tokens) : ${amountToken}`;
  const feeToken = Number(params.fee ?? icpFeeE8s) / Number(E8S_PER_TOKEN);
  const feeOutput = isICP
    ? `Maximum fee (ICP) : ${feeToken}`
    : `Maximum fee (Tokens) : ${feeToken}`;
  const memoOutput =
    params.memo !== undefined
      ? `Memo : ${uint8ArrayToBigInt(params.memo).toString()}`
      : "Memo : 0";

  const output = [
    outputTxType,
    ...(isICP ? [] : canisterIdOutputs),
    ...fromOutputs,
    ...toOutputs,
    paymentOutput,
    feeOutput,
    memoOutput,
  ];
  return {
    blob_candid: createBlob({
      arg: IDL.encode(transferFn.argTypes, [rawRequestBody]),
      methodName: "icrc1_transfer",
      canisterId: params.canisterId,
      caller: params.owner,
    }),
    output: output.map((element, index) => `${index + 1} | ${element}`),
    isICP,
    name: "ICRC1 Transfer",
    canisterId: params.canisterId.toText(),
    caller: params.owner.toText() ?? defaultCaller.toText(),
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const subaccount1 = arrayOfNumberToUint8Array([
      215, 232, 81, 101, 44, 208, 50, 186, 94, 215, 107, 23, 246, 38, 170, 71,
      130, 159, 6, 229, 35, 90, 13, 88, 14, 150, 211, 114, 119, 41, 234, 36,
    ]);
    const subaccount2 = arrayOfNumberToUint8Array([
      163, 110, 20, 60, 134, 231, 228, 113, 231, 199, 25, 80, 100, 135, 207,
      122, 108, 244, 13, 167, 99, 97, 174, 175, 238, 81, 51, 225, 217, 172, 234,
      61,
    ]);
    const principal1 = Principal.fromText(
      "krpzt-buecq-u3umg-7kb7r-j5jpx-twqwa-3ykc4-y3cnk-7kwvw-5bq6z-mae"
    );
    const principal2 = Principal.fromText(
      "2dfd6-abjpf-eihu7-pwv6m-qnlbt-oszmg-kb26q-rvqms-onmuh-mwiq3-uqe"
    );
    const canisterId1 = Principal.fromText("ppmzm-3aaaa-aaaaa-aacpq-cai");
    const canisterId2 = Principal.fromText("s24we-diaaa-aaaaa-aaaka-cai");
    const vectors = [
      createTestVector({
        owner: principal1,
        to: {
          owner: principal2,
          subaccount: [],
        },
        amount: BigInt(100_000_000),
        canisterId: canisterId1,
      }),
      createTestVector({
        owner: principal1,
        to: {
          owner: principal2,
          subaccount: [],
        },
        amount: BigInt(100_000_000),
        from_subaccount: subaccount1,
        fee: BigInt(10_000),
        canisterId: canisterId1,
        created_at_time: BigInt(1629200000000000000),
      }),
      createTestVector({
        owner: principal1,
        to: {
          owner: principal2,
          subaccount: [subaccount2],
        },
        amount: BigInt(330_000_000),
        from_subaccount: subaccount1,
        fee: BigInt(10_000),
        canisterId: canisterId1,
        created_at_time: BigInt(1629200000000000000),
      }),
      createTestVector({
        owner: principal1,
        to: {
          owner: principal2,
          subaccount: [subaccount2],
        },
        amount: BigInt(330_000_000),
        memo: numberToUint8Array(11223312),
        fee: BigInt(30_000),
        canisterId: canisterId2,
      }),
      createTestVector({
        owner: principal2,
        to: {
          owner: principal1,
          subaccount: [],
        },
        amount: BigInt(314_000_000),
        memo: numberToUint8Array(11223312),
        canisterId: canisterId1,
      }),
      createTestVector({
        owner: principal2,
        to: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(1331_400_000),
        memo: numberToUint8Array(11223312),
        from_subaccount: subaccount2,
        fee: BigInt(20_000),
        canisterId: canisterId1,
      }),
      createTestVector({
        owner: principal1,
        to: {
          owner: principal2,
          subaccount: [],
        },
        amount: BigInt(100_000_000),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
      }),
      createTestVector({
        owner: principal2,
        to: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(31_400_000),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
      }),
      createTestVector({
        owner: principal2,
        to: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(31_400_000),
        from_subaccount: subaccount2,
        canisterId: MAINNET_LEDGER_CANISTER_ID,
      }),
      createTestVector({
        owner: principal2,
        to: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(31_400_000),
        memo: numberToUint8Array(11223312),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
      }),
      createTestVector({
        owner: principal2,
        to: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(31_400_000),
        fee: BigInt(100_000),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        created_at_time: BigInt(1629200000000000000),
      }),
      createTestVector({
        owner: principal2,
        to: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(131_400_000),
        fee: BigInt(30_000),
        from_subaccount: subaccount2,
        memo: numberToUint8Array(11223312),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        created_at_time: BigInt(1629200000000000000),
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "icrc-1.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
