import { IDL } from "@dfinity/candid";
import { encodeIcrcAccount } from "@dfinity/ledger/src/utils/ledger.utils";
import { E8S_PER_TOKEN } from "@dfinity/nns/src/constants/constants";
import { Principal } from "@dfinity/principal";
import { SnsDisburseNeuronParams, SnsNeuronId } from "@dfinity/sns/src";
import {
  toDisburseNeuronRequest,
  toStartDissolvingNeuronRequest,
  toStopDissolvingNeuronRequest,
} from "@dfinity/sns/src/converters/governance.converters";
import { arrayOfNumberToUint8Array } from "@dfinity/utils";
import { ManageNeuronFn } from "./sns-governance.idl";
import {
  bytesToHexString,
  createBlob,
  defaultCaller,
  splitPrincipal,
  splitString,
  writeToJson,
} from "./utils";

/**
 * Issue: https://github.com/Zondax/ledger-icp/issues/189
 */

interface DisburseParams extends SnsDisburseNeuronParams {
  canisterId: Principal;
}

const createDisburseVector = (params: DisburseParams) => {
  const rawRequestBody = toDisburseNeuronRequest(params);
  const canisterIdOutputs = splitPrincipal(params.canisterId).map(
    (data, i, elements) =>
      `Canister Id [${i + 1}/${elements.length}] : ${data}`,
  );
  const neuronIdString = bytesToHexString(Array.from(params.neuronId.id));
  const neuronIdOutputs = splitString(neuronIdString, "Neuron Id");
  const disburseToAccountStr = encodeIcrcAccount(
    params.toAccount ?? {
      owner: defaultCaller,
    },
  );
  const disburseToOutputs = splitString(disburseToAccountStr, "Disburse to");
  const amount = params.amount
    ? Number(params.amount) / Number(E8S_PER_TOKEN)
    : "All";
  const amountOutputs = [`Amount : ${amount}`];
  const output = [
    "Transaction type : Disburse Neuron",
    ...canisterIdOutputs,
    ...neuronIdOutputs,
    ...disburseToOutputs,
    ...amountOutputs,
  ];
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
      canisterId: params.canisterId,
    }),
    output: output.map((element, index) => `${index + 1} | ${element}`),
    neuronIdString: neuronIdString,
    name: "Disburse Neuron",
    canisterId: params.canisterId.toText(),
    candid_request: rawRequestBody,
  };
};

interface SetDissolveParams {
  canisterId: Principal;
  neuronId: SnsNeuronId;
}

const createStopDissolveVector = (params: SetDissolveParams) => {
  const rawRequestBody = toStopDissolvingNeuronRequest(params.neuronId);
  const canisterIdOutputs = splitPrincipal(params.canisterId).map(
    (data, i, elements) =>
      `Canister Id [${i + 1}/${elements.length}] : ${data}`,
  );
  const neuronIdString = bytesToHexString(Array.from(params.neuronId.id));
  const neuronIdOutputs = splitString(neuronIdString, "Neuron Id");
  const output = [
    "Transaction type : Stop Dissolve Neuron",
    ...canisterIdOutputs,
    ...neuronIdOutputs,
  ];
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
      canisterId: params.canisterId,
    }),
    output: output.map((element, index) => `${index + 1} | ${element}`),
    neuronIdString: neuronIdString,
    name: "Stop Dissolve Neuron",
    canisterId: params.canisterId.toText(),
    candid_request: rawRequestBody,
  };
};

const createStartDissolveVector = (params: SetDissolveParams) => {
  const rawRequestBody = toStartDissolvingNeuronRequest(params.neuronId);
  const canisterIdOutputs = splitPrincipal(params.canisterId).map(
    (data, i, elements) =>
      `Canister Id [${i + 1}/${elements.length}] : ${data}`,
  );
  const neuronIdString = bytesToHexString(Array.from(params.neuronId.id));
  const neuronIdOutputs = splitString(neuronIdString, "Neuron Id");
  const output = [
    "Transaction type : Start Dissolve Neuron",
    ...canisterIdOutputs,
    ...neuronIdOutputs,
  ];
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
      canisterId: params.canisterId,
    }),
    output: output.map((element, index) => `${index + 1} | ${element}`),
    neuronIdString: neuronIdString,
    name: "Start Dissolve Neuron",
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
    const principal1 = Principal.fromText(
      "krpzt-buecq-u3umg-7kb7r-j5jpx-twqwa-3ykc4-y3cnk-7kwvw-5bq6z-mae",
    );
    const principal2 = Principal.fromText(
      "2dfd6-abjpf-eihu7-pwv6m-qnlbt-oszmg-kb26q-rvqms-onmuh-mwiq3-uqe",
    );
    const snsAccount1 = {
      owner: principal1,
      subaccount: id1,
    };
    const snsAccount2 = {
      owner: principal2,
      subaccount: id2,
    };
    const canisterId1 = Principal.fromText("ppmzm-3aaaa-aaaaa-aacpq-cai");
    const canisterId2 = Principal.fromText("s24we-diaaa-aaaaa-aaaka-cai");
    const vectors = [
      createDisburseVector({
        neuronId: { id: id1 },
        amount: BigInt(50_000_000),
        canisterId: canisterId1,
      }),
      createDisburseVector({
        neuronId: { id: id1 },
        canisterId: canisterId1,
      }),
      createDisburseVector({
        neuronId: { id: id2 },
        amount: BigInt(200_000_000),
        canisterId: canisterId2,
      }),
      createDisburseVector({
        neuronId: { id: id2 },
        amount: BigInt(200_000_000),
        toAccount: snsAccount1,
        canisterId: canisterId2,
      }),
      createDisburseVector({
        neuronId: { id: id1 },
        amount: BigInt(2870_000_000),
        toAccount: snsAccount2,
        canisterId: canisterId1,
      }),
      createStartDissolveVector({
        neuronId: { id: id1 },
        canisterId: canisterId1,
      }),
      createStartDissolveVector({
        neuronId: { id: id2 },
        canisterId: canisterId1,
      }),
      createStartDissolveVector({
        neuronId: { id: id1 },
        canisterId: canisterId2,
      }),
      createStartDissolveVector({
        neuronId: { id: id2 },
        canisterId: canisterId2,
      }),
      createStopDissolveVector({
        neuronId: { id: id1 },
        canisterId: canisterId1,
      }),
      createStopDissolveVector({
        neuronId: { id: id2 },
        canisterId: canisterId1,
      }),
      createStopDissolveVector({
        neuronId: { id: id1 },
        canisterId: canisterId2,
      }),
      createStopDissolveVector({
        neuronId: { id: id2 },
        canisterId: canisterId2,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "sns-manage-neuron-actions.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
