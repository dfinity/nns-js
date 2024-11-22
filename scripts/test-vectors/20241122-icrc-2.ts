import { IDL } from "@dfinity/candid";
import { toIcrc2ApproveRawRequest } from "@dfinity/ledger-icp/src/canisters/ledger/ledger.request.converts";
import { MAINNET_LEDGER_CANISTER_ID } from "@dfinity/ledger-icp/src/constants/canister_ids";
import { Icrc2ApproveRequest } from "@dfinity/ledger-icp/src/types/ledger_converters";
import { E8S_PER_TOKEN } from "@dfinity/nns/src/constants/constants";
import { Principal } from "@dfinity/principal";
import {
  arrayOfNumberToUint8Array,
  fromNullable,
  numberToUint8Array,
  uint8ArrayToBigInt,
} from "@dfinity/utils";
import { ICRC2ApproveTransferFn } from "./ledger.idl";
import {
  createBlob,
  defaultCaller,
  splitAccount,
  splitPrincipal,
  writeToJson,
} from "./utils";

/**
 * Issue: https://github.com/Zondax/ledger-icp/issues/252
 */

/**
 * Specific business logic.
 *
 * - When is ICP and when not.
 * - Convert memo to bigint.
 * - Default fee for ICP.
 * - Textual representation of accounts.
 * - How to create the "source" account.
 * - When to show "ICP" and when "Tokens".
 */

interface Params extends Icrc2ApproveRequest {
  canisterId: Principal;
  owner: Principal;
}

// Fee is optional, if not provided, it will be set to 10000 which is the ICP fee
const ICP_DEFAULT_FEE_E8S = 10_000;

const createTestVector = (params: Params) => {
  const rawRequestBody = toIcrc2ApproveRawRequest(params);
  const isICP =
    params.canisterId.toText() === MAINNET_LEDGER_CANISTER_ID.toText();

  let outputTxType = isICP
    ? "Allow another account to withdraw ICP"
    : "Allow another account to withdraw tokens";
  const canisterIdOutputs = splitPrincipal(params.canisterId).map(
    (data, i, elements) =>
      `Canister Id [${i + 1}/${elements.length}] : ${data}`,
  );

  const fromOutputs = splitAccount(
    {
      owner: params.owner,
      subaccount: params.fromSubAccount,
    },
    "From account",
  );
  const toOutputs = splitAccount(
    {
      owner: params.spender.owner,
      subaccount: fromNullable(params.spender.subaccount),
    },
    "Allowed Spender",
  );

  const amountToken = Number(params.amount) / Number(E8S_PER_TOKEN);
  const paymentOutput = isICP
    ? `Amount (ICP) : ${amountToken}`
    : `Amount (Tokens) : ${amountToken}`;

  const expectedAllowance =
    params.expected_allowance !== undefined
      ? Number(params.expected_allowance) / Number(E8S_PER_TOKEN)
      : undefined;
  const expectedAllowanceOutput =
    expectedAllowance !== undefined
      ? isICP
        ? [`Expected Current Allowance (ICP) : ${expectedAllowance}`]
        : [`Expected Current Allowance (Tokens) : ${expectedAllowance}`]
      : [];

  // Do not show fee if it's not present in the request body.
  // Except if it's ICP, in which case we always show the fee.
  let feeOutput: string | undefined;
  if (isICP || params.fee !== undefined) {
    const feeToken =
      Number(params.fee ?? ICP_DEFAULT_FEE_E8S) / Number(E8S_PER_TOKEN);
    feeOutput = isICP
      ? `Maximum fee (ICP) : ${feeToken}`
      : `Maximum fee (Tokens) : ${feeToken}`;
  }

  const memoOutput =
    params.icrc1Memo !== undefined
      ? `Memo : ${uint8ArrayToBigInt(params.icrc1Memo).toString()}`
      : "Memo : 0";

  const output = [
    outputTxType,
    ...(isICP ? [] : canisterIdOutputs),
    ...fromOutputs,
    ...toOutputs,
    paymentOutput,
    ...expectedAllowanceOutput,
    ...(feeOutput !== undefined ? [feeOutput] : []),
    memoOutput,
  ];
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ICRC2ApproveTransferFn.argTypes, [rawRequestBody]),
      methodName: "icrc2_approve",
      canisterId: params.canisterId,
      caller: params.owner,
    }),
    output: output.map((element, index) => `${index + 1} | ${element}`),
    isICP,
    name: "ICRC2 Transfer",
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
      "krpzt-buecq-u3umg-7kb7r-j5jpx-twqwa-3ykc4-y3cnk-7kwvw-5bq6z-mae",
    );
    const principal2 = Principal.fromText(
      "2dfd6-abjpf-eihu7-pwv6m-qnlbt-oszmg-kb26q-rvqms-onmuh-mwiq3-uqe",
    );
    const canisterId1 = Principal.fromText("ppmzm-3aaaa-aaaaa-aacpq-cai");
    const canisterId2 = Principal.fromText("s24we-diaaa-aaaaa-aaaka-cai");
    const vectors = [
      createTestVector({
        owner: principal1,
        spender: {
          owner: principal2,
          subaccount: [],
        },
        amount: BigInt(100_000_000),
        canisterId: canisterId1,
      }),
      createTestVector({
        owner: principal1,
        spender: {
          owner: principal2,
          subaccount: [],
        },
        amount: BigInt(100_000_000),
        fromSubAccount: subaccount1,
        fee: BigInt(10_000),
        canisterId: canisterId1,
        createdAt: BigInt(1629200000000000000),
      }),
      createTestVector({
        owner: principal1,
        spender: {
          owner: principal2,
          subaccount: [subaccount2],
        },
        amount: BigInt(330_000_000),
        fromSubAccount: subaccount1,
        fee: BigInt(10_000),
        canisterId: canisterId1,
        createdAt: BigInt(1629200000000000000),
      }),
      createTestVector({
        owner: principal1,
        spender: {
          owner: principal2,
          subaccount: [subaccount2],
        },
        amount: BigInt(330_000_000),
        icrc1Memo: numberToUint8Array(11223312),
        fee: BigInt(30_000),
        canisterId: canisterId2,
        createdAt: BigInt(1675249266635000000),
      }),
      createTestVector({
        owner: principal2,
        spender: {
          owner: principal1,
          subaccount: [],
        },
        amount: BigInt(314_000_000),
        icrc1Memo: numberToUint8Array(11223312),
        canisterId: canisterId1,
        createdAt: BigInt(1675249266635000000),
      }),
      createTestVector({
        owner: principal2,
        spender: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(1331_400_000),
        icrc1Memo: numberToUint8Array(11223312),
        fromSubAccount: subaccount2,
        fee: BigInt(20_000),
        canisterId: canisterId1,
        createdAt: BigInt(1675249266635000000),
      }),
      createTestVector({
        owner: principal2,
        spender: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(1331_400_000),
        expected_allowance: BigInt(100_000_000),
        icrc1Memo: numberToUint8Array(11223312),
        fromSubAccount: subaccount2,
        fee: BigInt(20_000),
        canisterId: canisterId1,
        createdAt: BigInt(1675249266635000000),
      }),
      createTestVector({
        owner: principal1,
        spender: {
          owner: principal2,
          subaccount: [],
        },
        amount: BigInt(100_000_000),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
      }),
      createTestVector({
        owner: principal2,
        spender: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(31_400_000),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
      }),
      createTestVector({
        owner: principal2,
        spender: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(31_400_000),
        fromSubAccount: subaccount2,
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        createdAt: BigInt(1675249266635000000),
      }),
      createTestVector({
        owner: principal2,
        spender: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(31_400_000),
        icrc1Memo: numberToUint8Array(11223312),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        createdAt: BigInt(1675249266635000000),
      }),
      createTestVector({
        owner: principal2,
        spender: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(31_400_000),
        fee: BigInt(100_000),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        createdAt: BigInt(1629200000000000000),
      }),
      createTestVector({
        owner: principal2,
        spender: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(131_400_000),
        fee: BigInt(30_000),
        fromSubAccount: subaccount2,
        icrc1Memo: numberToUint8Array(11223312),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        createdAt: BigInt(1629200000000000000),
      }),
      createTestVector({
        owner: principal2,
        spender: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(131_400_000),
        fee: BigInt(30_000),
        fromSubAccount: subaccount2,
        icrc1Memo: numberToUint8Array(11223312),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        createdAt: BigInt(1675249266635000000),
      }),
      createTestVector({
        owner: principal2,
        spender: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(200_000_000),
        expected_allowance: BigInt(100_000_000),
        fee: BigInt(30_000),
        fromSubAccount: subaccount2,
        icrc1Memo: numberToUint8Array(11223312),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        createdAt: BigInt(1675249266635000000),
      }),
      createTestVector({
        owner: principal2,
        spender: {
          owner: principal1,
          subaccount: [subaccount1],
        },
        amount: BigInt(200_000_000),
        expected_allowance: BigInt(0),
        fee: BigInt(30_000),
        fromSubAccount: subaccount2,
        icrc1Memo: numberToUint8Array(11223312),
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        createdAt: BigInt(1675249266635000000),
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "icrc-2.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
