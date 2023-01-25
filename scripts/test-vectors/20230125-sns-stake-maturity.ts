import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import { SnsNeuronStakeMaturityParams } from "@dfinity/sns/src";
import { toStakeMaturityRequest } from "@dfinity/sns/src/converters/governance.converters";
import { arrayOfNumberToUint8Array } from "@dfinity/utils";
import { ManageNeuronFn } from "./sns-governance.idl";
import {
  bytesToHexString,
  createBlob,
  splitPrincipal,
  splitString,
  writeToJson,
} from "./utils";

/**
 * Issue: https://github.com/Zondax/ledger-icp/issues/192
 */

interface StakeMaturityParams extends SnsNeuronStakeMaturityParams {
  canisterId: Principal;
}

const createStakeMaturityVector = (params: StakeMaturityParams) => {
  const rawRequestBody = toStakeMaturityRequest(params);
  const canisterIdOutputs = splitPrincipal(params.canisterId).map(
    (data, i, elements) => `Canister Id [${i + 1}/${elements.length}] : ${data}`
  );
  const neuronIdString = bytesToHexString(Array.from(params.neuronId.id));
  const neuronIdOutputs = splitString(neuronIdString, "Neuron Id");
  const percentageOutput = `Percentage to stake : ${
    params.percentageToStake ?? 100
  }`;
  const output = [
    "Transaction type : Stake Maturity Neuron",
    ...canisterIdOutputs,
    ...neuronIdOutputs,
    percentageOutput,
  ];
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
      canisterId: params.canisterId,
    }),
    output: output.map((element, index) => `${index + 1} | ${element}`),
    neuronIdString: neuronIdString,
    name: "Stake Maturity Neuron",
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
    const vectors = [
      createStakeMaturityVector({
        neuronId: { id: id1 },
        canisterId: canisterId1,
      }),
      createStakeMaturityVector({
        neuronId: { id: id2 },
        canisterId: canisterId1,
      }),
      createStakeMaturityVector({
        neuronId: { id: id1 },
        canisterId: canisterId2,
        percentageToStake: 50,
      }),
      createStakeMaturityVector({
        neuronId: { id: id2 },
        canisterId: canisterId2,
        percentageToStake: 100,
      }),
      createStakeMaturityVector({
        neuronId: { id: id1 },
        canisterId: canisterId1,
        percentageToStake: 33,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "sns-stake-maturity.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
