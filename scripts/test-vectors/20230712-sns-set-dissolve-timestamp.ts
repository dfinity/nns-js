import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import { SnsSetDissolveTimestampParams } from "@dfinity/sns/src";
import { toSetDissolveTimestampRequest } from "@dfinity/sns/src/converters/governance.converters";
import { arrayOfNumberToUint8Array } from "@dfinity/utils";
import {
  secondsToDissolveDelayDuration,
  SECONDS_IN_DAY,
  SECONDS_IN_MONTH,
  SECONDS_IN_YEAR,
} from "./date-utils";
import { ManageNeuronFn } from "./sns-governance.idl";
import { bytesToHexString, createBlob, writeToJson } from "./utils";

/**
 * Issue: https://github.com/Zondax/ledger-icp/issues/212
 */

interface Params extends SnsSetDissolveTimestampParams {
  canisterId: Principal;
}
const nowInSeconds = Math.round(Date.now() / 1000);

const createTestVector = (params: Params) => {
  const rawRequestBody = toSetDissolveTimestampRequest(params);
  const neuronIdString = bytesToHexString(Array.from(params.neuronId.id));
  const timestampLabel = secondsToDissolveDelayDuration(
    params.dissolveTimestampSeconds - BigInt(nowInSeconds)
  );
  console.log("in da test vector", params.dissolveTimestampSeconds);
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
      canisterId: params.canisterId,
    }),
    nowInSeconds,
    timestampLabel,
    neuronIdString: neuronIdString,
    name: "Set Dissolve Delay Timestamp",
    canisterId: params.canisterId.toText(),
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const id1 = arrayOfNumberToUint8Array([
      215, 232, 81, 101, 44, 208, 50, 186, 94, 215, 107, 23, 246, 38, 170, 71,
      130, 159, 6, 229, 35, 90, 13, 88, 14, 150, 211, 114, 119, 41, 234, 36,
    ]);
    const id2 = arrayOfNumberToUint8Array([
      163, 110, 20, 60, 134, 231, 228, 113, 231, 199, 25, 80, 100, 135, 207,
      122, 108, 244, 13, 167, 99, 97, 174, 175, 238, 81, 51, 225, 217, 172, 234,
      61,
    ]);
    const canisterId1 = Principal.fromText("ppmzm-3aaaa-aaaaa-aacpq-cai");
    const canisterId2 = Principal.fromText("s24we-diaaa-aaaaa-aaaka-cai");
    const inOneYear = BigInt(nowInSeconds + SECONDS_IN_YEAR);
    const nextYearAndAHalf = BigInt(
      Math.round(nowInSeconds + SECONDS_IN_YEAR + SECONDS_IN_MONTH * 6)
    );
    const inOneYearMonthsAndDays = BigInt(
      Math.round(
        nowInSeconds +
          SECONDS_IN_YEAR +
          SECONDS_IN_MONTH * 3 +
          SECONDS_IN_DAY * 18
      )
    );
    const inSixMonths = BigInt(Math.round(nowInSeconds + SECONDS_IN_MONTH * 6));
    const inEightYears = BigInt(Math.round(nowInSeconds + SECONDS_IN_YEAR * 8));

    const vectors = [
      createTestVector({
        neuronId: { id: id1 },
        dissolveTimestampSeconds: inOneYear,
        canisterId: canisterId1,
      }),
      createTestVector({
        neuronId: { id: id1 },
        dissolveTimestampSeconds: inSixMonths,
        canisterId: canisterId1,
      }),
      createTestVector({
        neuronId: { id: id1 },
        dissolveTimestampSeconds: inOneYearMonthsAndDays,
        canisterId: canisterId2,
      }),
      createTestVector({
        neuronId: { id: id1 },
        dissolveTimestampSeconds: nextYearAndAHalf,
        canisterId: canisterId2,
      }),
      createTestVector({
        neuronId: { id: id2 },
        dissolveTimestampSeconds: inOneYearMonthsAndDays,
        canisterId: canisterId2,
      }),
      createTestVector({
        neuronId: { id: id2 },
        dissolveTimestampSeconds: inSixMonths,
        canisterId: canisterId2,
      }),
      createTestVector({
        neuronId: { id: id2 },
        dissolveTimestampSeconds: inEightYears,
        canisterId: canisterId1,
      }),
      createTestVector({
        neuronId: { id: id2 },
        dissolveTimestampSeconds: nextYearAndAHalf,
        canisterId: canisterId1,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "sns-set-dissolve-delay-timestamp.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
