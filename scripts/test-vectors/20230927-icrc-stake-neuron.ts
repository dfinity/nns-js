import { IDL } from "@dfinity/candid";
import { MAINNET_LEDGER_CANISTER_ID } from "@dfinity/ledger-icp/src/constants/canister_ids";
import { toTransferArg } from "@dfinity/ledger-icrc/src/converters/ledger.converters";
import { TransferParams } from "@dfinity/ledger-icrc/src/types/ledger.params";
import { MAINNET_GOVERNANCE_CANISTER_ID } from "@dfinity/nns/src/constants/canister_ids";
import { E8S_PER_TOKEN } from "@dfinity/nns/src/constants/constants";
import { Principal } from "@dfinity/principal";
import {
  arrayOfNumberToUint8Array,
  asciiStringToByteArray,
  fromNullable,
  numberToUint8Array,
  uint8ArrayToBigInt,
} from "@dfinity/utils";
import { sha256 } from "@noble/hashes/sha256";
import randomBytes from "randombytes";
import { transferFn } from "./sns-ledger.idl";
import {
  createBlob,
  defaultCaller,
  splitAccount,
  splitPrincipal,
  writeToJson,
} from "./utils";

/**
 * Issue: https://github.com/Zondax/ledger-icp/issues/223
 */

interface Params extends TransferParams {
  canisterId: Principal;
  owner: Principal;
  nonce?: bigint;
}

// Fee is optional, if not provided, it will be set to 10000 which is the ICP fee
const ICP_DEFAULT_FEE_E8S = 10_000;

const createTestVector = (params: Params) => {
  const rawRequestBody = toTransferArg(params);
  const isICP =
    params.canisterId.toText() === MAINNET_LEDGER_CANISTER_ID.toText();

  const isStakeNeuron =
    isICP &&
    params.to.owner.toText() === MAINNET_GOVERNANCE_CANISTER_ID.toText();

  let outputTxType = isStakeNeuron
    ? "Stake Neuron"
    : isICP
    ? "Send ICP"
    : "Send Tokens";
  const canisterIdOutputs = splitPrincipal(params.canisterId).map(
    (data, i, elements) =>
      `Canister Id [${i + 1}/${elements.length}] : ${data}`,
  );

  const fromOutputs = splitAccount(
    {
      owner: params.owner,
      subaccount: params.from_subaccount,
    },
    "From account",
  );
  const toOutputs = splitAccount(
    {
      owner: params.to.owner,
      subaccount: fromNullable(params.to.subaccount),
    },
    "To account",
  );

  const amountToken = Number(params.amount) / Number(E8S_PER_TOKEN);
  const paymentOutput = isICP
    ? `Payment (ICP) : ${amountToken}`
    : `Payment (Tokens) : ${amountToken}`;

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
    params.memo !== undefined
      ? `Memo : ${uint8ArrayToBigInt(params.memo).toString()}`
      : "Memo : 0";

  const output = [
    outputTxType,
    ...(isICP ? [] : canisterIdOutputs),
    ...fromOutputs,
    ...(isStakeNeuron ? [] : toOutputs),
    paymentOutput,
    ...(feeOutput !== undefined ? [feeOutput] : []),
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
    isStakeNeuron,
    name: "ICRC1 Transfer",
    nonce: params.nonce,
    canisterId: params.canisterId.toText(),
    caller: params.owner.toText() ?? defaultCaller.toText(),
    candid_request: rawRequestBody,
  };
};

// Reference: Governance Canister `getNeuronStakeSubAccountBytes` private method.
const getNeuronStakeSubAccountBytes = (
  nonceBytes: Uint8Array,
  principal: Principal,
): Uint8Array => {
  const padding = asciiStringToByteArray("neuron-stake");
  const shaObj = sha256.create();
  shaObj.update(
    arrayOfNumberToUint8Array([
      0x0c,
      ...padding,
      ...principal.toUint8Array(),
      ...nonceBytes,
    ]),
  );
  return shaObj.digest();
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
    const shortPrincipal = Principal.fromText(
      "ttwhn-ittl6-fnuml-tqdgz-tbyhu-f7jti-ft2cr-znzsu-biv4l-gpvg4-ba",
    );

    const nonceBytes1 = new Uint8Array(randomBytes(8));
    const nonce1 = uint8ArrayToBigInt(nonceBytes1);
    const toSubAccount1 = getNeuronStakeSubAccountBytes(
      nonceBytes1,
      principal1,
    );
    const nonceBytes1_2 = new Uint8Array(randomBytes(8));
    const nonce1_2 = uint8ArrayToBigInt(nonceBytes1_2);
    const toSubAccount1_2 = getNeuronStakeSubAccountBytes(
      nonceBytes1_2,
      principal1,
    );
    const nonceBytes2 = new Uint8Array(randomBytes(8));
    const nonce2 = uint8ArrayToBigInt(nonceBytes2);
    const toSubAccount2 = getNeuronStakeSubAccountBytes(
      nonceBytes2,
      principal2,
    );
    const nonceBytesShort = new Uint8Array(randomBytes(8));
    const nonceShort = uint8ArrayToBigInt(nonceBytesShort);
    const toSubAccountShort = getNeuronStakeSubAccountBytes(
      nonceBytesShort,
      shortPrincipal,
    );
    const canisterId1 = Principal.fromText("ppmzm-3aaaa-aaaaa-aacpq-cai");
    const canisterId2 = Principal.fromText("s24we-diaaa-aaaaa-aaaka-cai");
    const vectors = [
      createTestVector({
        owner: principal2,
        to: {
          owner: MAINNET_GOVERNANCE_CANISTER_ID,
          subaccount: [toSubAccount1],
        },
        amount: BigInt(131_400_000),
        fee: BigInt(10_000),
        from_subaccount: subaccount2,
        memo: nonceBytes1,
        nonce: nonce1,
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        created_at_time: BigInt(1675249266635000000),
      }),
      createTestVector({
        owner: principal1,
        to: {
          owner: MAINNET_GOVERNANCE_CANISTER_ID,
          subaccount: [toSubAccount1_2],
        },
        amount: BigInt(131_400_000),
        fee: BigInt(30_000),
        memo: nonceBytes1_2,
        nonce: nonce1_2,
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        created_at_time: BigInt(1675249219635000000),
      }),
      createTestVector({
        owner: shortPrincipal,
        to: {
          owner: MAINNET_GOVERNANCE_CANISTER_ID,
          subaccount: [toSubAccountShort],
        },
        amount: BigInt(131_400_000),
        fee: BigInt(30_000),
        memo: nonceBytesShort,
        nonce: nonceShort,
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        created_at_time: BigInt(1675249216635000000),
      }),
      createTestVector({
        owner: principal2,
        to: {
          owner: MAINNET_GOVERNANCE_CANISTER_ID,
          subaccount: [toSubAccount2],
        },
        amount: BigInt(131_400_000),
        fee: BigInt(30_000),
        memo: nonceBytes2,
        nonce: nonce2,
        canisterId: MAINNET_LEDGER_CANISTER_ID,
        created_at_time: BigInt(1675249219635000000),
      }),
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
        created_at_time: BigInt(1675249266635000000),
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
        created_at_time: BigInt(1675249266635000000),
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
        created_at_time: BigInt(1675249266635000000),
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
        created_at_time: BigInt(1675249266635000000),
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
        created_at_time: BigInt(1675249266635000000),
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
        created_at_time: BigInt(1675249266635000000),
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "icrc-stake-neuron.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
