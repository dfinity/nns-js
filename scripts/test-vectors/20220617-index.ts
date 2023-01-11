// Date represents the date of the issue with the test vectors sent to Zondax:
// https://github.com/Zondax/ledger-icp/issues/162
// We'll keep each script for reproducibility.
import { IDL } from "@dfinity/candid";
import { Memo, Payment, SendRequest } from "../../proto/ledger_pb";
import { AccountIdentifier } from "../../src/account_identifier";
import {
  toICPTs,
  toTransferRawRequest,
} from "../../src/canisters/ledger/ledger.request.converts";
import { ICP } from "../../src/icp";
import { TransferFn } from "./ledger.idl";
import { createBlob, writeToJson } from "./utils";

const mockAccountIdentifier = AccountIdentifier.fromHex(
  "646f4d2d6fcb6fab5ba1547647526b666553467ecb5cb28c8d9ddf451c8f4c21",
);
const mockTo = AccountIdentifier.fromHex(
  "b1cebc8480a0afc91198a87ddf52c6ca7eb7ccddb0cb398064f71d2bbaf2f72b",
);
const arrayBufferToNumber = (buffer: ArrayBuffer): number => {
  const view = new DataView(buffer);
  return view.getUint32(view.byteLength - 4);
};
export const toSubAccountId = (subAccount: number[]): number => {
  const bytes = new Uint8Array(subAccount).buffer;
  return arrayBufferToNumber(bytes);
};
const mockSubaccountId = toSubAccountId([
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1,
]);

// A helper to decode candid. Useful to check that the payload is what is supposed to be.
// const decodeCandid = () => {
//   const payload =
//     "4449444C066D7B6C01E0A9B302786E006C01D6F68E8001786E036C06FBCA0100C6FCB60201BA89E5C20478A2DE94EB060282F3F3910C04D8A38CA80D01010520B1CEBC8480A0AFC91198A87DDF52C6CA7EB7CCDDB0CB398064F71D2BBAF2F72B10270000000000000000000000000000000000CA9A3B00000000";
//   const decoded = IDL.decode(TransferFn.argTypes, Buffer.from(payload, "hex"));
//   console.log(decoded);
// };

// decodeCandid();

const createTransferVector = ({
  to,
  amount,
  fromSubAccountId,
}: {
  to: AccountIdentifier;
  amount: number;
  fromSubAccountId?: number;
}) => {
  const request = {
    to,
    amount: ICP.fromE8s(BigInt(amount)),
    fee: BigInt(10_000),
    memo: BigInt(0),
    fromSubAccountId,
  };
  // CANDID
  const rawRequestBody = toTransferRawRequest(request);
  // PROTO
  const requestPb = new SendRequest();
  requestPb.setTo(request.to.toProto());

  const payment = new Payment();
  payment.setReceiverGets(request.amount.toProto());
  requestPb.setPayment(payment);

  requestPb.setMaxFee(toICPTs(request.fee));

  // Always explicitly set the memo for compatibility with ledger wallet - hardware wallet
  const requestMemo = new Memo();
  requestMemo.setMemo((request.memo ?? BigInt(0)).toString());
  requestPb.setMemo(requestMemo);
  return {
    blob_candid: createBlob({
      arg: IDL.encode(TransferFn.argTypes, [rawRequestBody]),
      methodName: "transfer",
    }),
    blob_proto: createBlob({
      arg: requestPb.serializeBinary(),
      methodName: "send_pb",
    }),
    name: "Send ICPs",
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      { to: mockAccountIdentifier, amount: 100_000_000 },
      { to: mockAccountIdentifier, amount: 10_000_000_000 },
      { to: mockTo, amount: 400_000_000 },
      { to: mockTo, amount: 123_000_000 },
      { to: mockTo, amount: 123_000_000, fromSubAccountId: mockSubaccountId },
      { to: mockTo, amount: 123_000_000, fromSubAccountId: mockSubaccountId },
    ].map(createTransferVector);

    writeToJson({
      data: vectors,
      fileName: "test-vectors-20220617.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
