import { IDL } from "@dfinity/candid";
import {
  AccountIdentifier,
  SubAccount,
} from "@dfinity/nns/src/account_identifier";
import { toTransferRawRequest } from "@dfinity/nns/src/canisters/ledger/ledger.request.converts";
import { MAINNET_LEDGER_CANISTER_ID } from "@dfinity/nns/src/constants/canister_ids";
import { Principal } from "@dfinity/principal";
import { arrayOfNumberToUint8Array } from "@dfinity/utils/src";
import { TransferFn } from "./ledger.idl";
import { createBlob, writeToJson } from "./utils";

const account1 = AccountIdentifier.fromHex(
  "d3e13d4777e22367532053190b6c6ccf57444a61337e996242b1abfb52cf92c8"
);
const account2 = AccountIdentifier.fromPrincipal({
  principal: Principal.fromText(
    "bwz3t-ercuj-owo6s-4adfr-sbu4o-l72hg-kfhc5-5sapm-tj6bn-3scho-uqe"
  ),
});

const defaultCaller = Principal.fromText(
  "5upke-tazvi-6ufqc-i3v6r-j4gpu-dpwti-obhal-yb5xj-ue32x-ktkql-rqe"
);
const caller1 = Principal.fromText(
  "bwz3t-ercuj-owo6s-4adfr-sbu4o-l72hg-kfhc5-5sapm-tj6bn-3scho-uqe"
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

const createSendIcpVector = ({
  to,
  amount,
  memo,
  fee,
  fromSubAccount,
  createdAt,
  isStakeNeuron = false,
  caller = defaultCaller,
}: {
  to: AccountIdentifier;
  amount: bigint;
  memo: bigint;
  fee: bigint;
  fromSubAccount?: number[];
  createdAt?: bigint;
  isStakeNeuron?: boolean;
  caller?: Principal;
}) => {
  const rawRequestBody = toTransferRawRequest({
    to,
    amount,
    // Used in HW
    memo: memo || BigInt(0),
    fee,
    fromSubAccount,
    createdAt,
  });

  const subAccount =
    fromSubAccount === undefined
      ? undefined
      : (SubAccount.fromBytes(
          arrayOfNumberToUint8Array(fromSubAccount)
        ) as SubAccount);

  return {
    blob_candid: createBlob({
      arg: IDL.encode(TransferFn.argTypes, [rawRequestBody]),
      methodName: "transfer",
      canisterId: MAINNET_LEDGER_CANISTER_ID,
    }),
    name: isStakeNeuron ? "Send ICP" : "Stake Neuron",
    screen: {
      fromAccount: AccountIdentifier.fromPrincipal({
        principal: caller,
        subAccount,
      }).toHex(),
      toAccount: to.toHex(),
    },
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      createSendIcpVector({
        to: account1,
        amount: BigInt(1_000_000_000),
        fee: BigInt(10_000),
        memo: BigInt(0),
      }),
      createSendIcpVector({
        to: account2,
        amount: BigInt(333_000_000_000),
        fee: BigInt(10_000),
        memo: BigInt(0),
        fromSubAccount: subaccount1,
      }),
      createSendIcpVector({
        to: account2,
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
        amount: BigInt(1_000_000_000),
        fee: BigInt(10_000),
        memo: BigInt(12123242222),
        fromSubAccount: subaccount1,
        createdAt: createdAt1,
      }),
      createSendIcpVector({
        to: account2,
        amount: BigInt(100_000_000_000),
        fee: BigInt(20_000),
        memo: BigInt(9984628273),
      }),
      // Stake Neuron
      createSendIcpVector({
        to: account2,
        amount: BigInt(100_000_000_000),
        fee: BigInt(10_000),
        memo: BigInt(123132444422),
        fromSubAccount: subaccount1,
        isStakeNeuron: true,
      }),
      createSendIcpVector({
        to: account2,
        amount: BigInt(100_000_000_000),
        fee: BigInt(10_000),
        memo: BigInt(1231236788755),
        fromSubAccount: subaccount2,
        isStakeNeuron: true,
      }),
      createSendIcpVector({
        to: account2,
        amount: BigInt(230_000_000_000),
        fee: BigInt(10_000),
        memo: BigInt(123123521677),
        createdAt: createdAt1,
        isStakeNeuron: true,
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