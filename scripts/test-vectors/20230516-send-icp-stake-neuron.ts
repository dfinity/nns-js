import { IDL } from "@dfinity/candid";
import {
  AccountIdentifier,
  SubAccount,
} from "@dfinity/nns/src/account_identifier";
import { toTransferRawRequest } from "@dfinity/nns/src/canisters/ledger/ledger.request.converts";
import {
  MAINNET_GOVERNANCE_CANISTER_ID,
  MAINNET_LEDGER_CANISTER_ID,
} from "@dfinity/nns/src/constants/canister_ids";
import { Principal } from "@dfinity/principal";
import { asciiStringToByteArray, uint8ArrayToBigInt } from "@dfinity/utils";
import { arrayOfNumberToUint8Array } from "@dfinity/utils/src";
import { sha256 } from "js-sha256";
import { TransferFn } from "./ledger.idl";
import { createBlob, writeToJson } from "./utils";

const account1 = AccountIdentifier.fromHex(
  "d3e13d4777e22367532053190b6c6ccf57444a61337e996242b1abfb52cf92c8",
);
const account2 = AccountIdentifier.fromPrincipal({
  principal: Principal.fromText(
    "bwz3t-ercuj-owo6s-4adfr-sbu4o-l72hg-kfhc5-5sapm-tj6bn-3scho-uqe",
  ),
});

const defaultCaller = Principal.fromText(
  "5upke-tazvi-6ufqc-i3v6r-j4gpu-dpwti-obhal-yb5xj-ue32x-ktkql-rqe",
);
const caller1 = Principal.fromText(
  "bwz3t-ercuj-owo6s-4adfr-sbu4o-l72hg-kfhc5-5sapm-tj6bn-3scho-uqe",
);

const subaccount1 = [
  10, 0, 0, 0, 0, 0, 48, 0, 75, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0,
];
const subaccount2 = [
  29, 2, 220, 105, 83, 29, 110, 131, 117, 207, 8, 232, 14, 110, 205, 215, 59,
  147, 176, 255, 96, 204, 41, 123, 138, 63, 234, 83, 28, 2, 0, 0,
];
const createdAt1 =
  BigInt(new Date("05-20-1992 21:33:00").getTime()) * BigInt(1e6);
const createdAt2 =
  BigInt(new Date("05-28-2011 22:33:00").getTime()) * BigInt(1e6);

const randomBytes1 = new Uint8Array([136, 67, 218, 72, 46, 254, 79, 124]);
const randomBytes2 = new Uint8Array([202, 204, 126, 241, 130, 112, 8, 122]);
const randomBytes3 = new Uint8Array([178, 247, 215, 62, 199, 137, 175, 189]);

const buildNeuronStakeSubAccount = (
  nonce: Uint8Array,
  principal: Principal,
): SubAccount => {
  const padding = asciiStringToByteArray("neuron-stake");
  const shaObj = sha256.create();
  shaObj.update([0x0c, ...padding, ...principal.toUint8Array(), ...nonce]);
  return SubAccount.fromBytes(new Uint8Array(shaObj.array())) as SubAccount;
};

const createSendIcpVector = ({
  to,
  amount,
  memo,
  fee,
  fromSubAccount,
  createdAt,
  caller = defaultCaller,
  randomBytes,
}: {
  to?: AccountIdentifier;
  amount: bigint;
  memo?: bigint;
  fee: bigint;
  fromSubAccount?: number[];
  createdAt?: bigint;
  caller: Principal;
  randomBytes?: Uint8Array;
}) => {
  const isStakeNeuron = to === undefined;
  let accountIdentifier;
  let nonce;
  if (randomBytes !== undefined) {
    nonce = uint8ArrayToBigInt(randomBytes);
    const toSubAccount = buildNeuronStakeSubAccount(randomBytes, caller);
    accountIdentifier = AccountIdentifier.fromPrincipal({
      principal: MAINNET_GOVERNANCE_CANISTER_ID,
      subAccount: toSubAccount,
    });
  }
  const toAccount = to ?? accountIdentifier;

  const rawRequestBody = toTransferRawRequest({
    to: toAccount as AccountIdentifier,
    amount,
    // Used in HW
    memo: memo ?? nonce ?? BigInt(0),
    fee,
    fromSubAccount,
    createdAt,
  });

  const subAccount =
    fromSubAccount === undefined
      ? undefined
      : (SubAccount.fromBytes(
          arrayOfNumberToUint8Array(fromSubAccount),
        ) as SubAccount);

  return {
    blob_candid: createBlob({
      arg: IDL.encode(TransferFn.argTypes, [rawRequestBody]),
      methodName: "transfer",
      canisterId: MAINNET_LEDGER_CANISTER_ID,
    }),
    name: isStakeNeuron ? "Stake Neuron" : "Send ICP",
    screen: {
      fromAccount: AccountIdentifier.fromPrincipal({
        principal: caller,
        subAccount,
      }).toHex(),
      toAccount: isStakeNeuron ? "Stake Neuron" : to?.toHex(),
    },
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      createSendIcpVector({
        to: account1,
        caller: defaultCaller,
        amount: BigInt(1_000_000_000),
        fee: BigInt(10_000),
        memo: BigInt(0),
      }),
      createSendIcpVector({
        to: account2,
        caller: defaultCaller,
        amount: BigInt(333_000_000_000),
        fee: BigInt(10_000),
        memo: BigInt(0),
        fromSubAccount: subaccount1,
      }),
      createSendIcpVector({
        to: account2,
        caller: defaultCaller,
        amount: BigInt(1_432_222_000),
        fee: BigInt(10_000),
        memo: BigInt(0),
        createdAt: createdAt1,
      }),
      createSendIcpVector({
        to: account1,
        amount: BigInt(2_000_000_000),
        fee: BigInt(10_000),
        memo: BigInt(128371233),
        createdAt: createdAt2,
        caller: caller1,
      }),
      createSendIcpVector({
        to: account1,
        amount: BigInt(1_222_000_345),
        fee: BigInt(10_000),
        memo: BigInt(0),
        fromSubAccount: subaccount2,
        caller: caller1,
      }),
      createSendIcpVector({
        to: account1,
        caller: defaultCaller,
        amount: BigInt(1_000_000_000),
        fee: BigInt(10_000),
        memo: BigInt(12123242222),
        fromSubAccount: subaccount1,
        createdAt: createdAt1,
      }),
      createSendIcpVector({
        to: account2,
        caller: defaultCaller,
        amount: BigInt(100_000_000_000),
        fee: BigInt(20_000),
        memo: BigInt(9984628273),
      }),
      // Stake Neuron
      createSendIcpVector({
        amount: BigInt(100_000_000_000),
        fee: BigInt(10_000),
        caller: defaultCaller,
        fromSubAccount: subaccount1,
        randomBytes: randomBytes1,
      }),
      createSendIcpVector({
        amount: BigInt(100_000_000_000),
        fee: BigInt(10_000),
        caller: defaultCaller,
        fromSubAccount: subaccount2,
        randomBytes: randomBytes2,
      }),
      createSendIcpVector({
        amount: BigInt(230_000_000_000),
        fee: BigInt(10_000),
        caller: defaultCaller,
        createdAt: createdAt1,
        randomBytes: randomBytes3,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "send-icp-stake-neuron.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
