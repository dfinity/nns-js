import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import { SnsDisburseNeuronParams } from "@dfinity/sns/src";
import { toDisburseNeuronRequest } from "@dfinity/sns/src/converters/governance.converters";
import { encodeSnsAccount } from "@dfinity/sns/src/utils/ledger.utils";
import { arrayOfNumberToUint8Array } from "@dfinity/utils";
import { ManageNeuronFn } from "./sns-governance.idl";
import {
  bytesToHexString,
  caller,
  createBlob,
  splitPrincipal,
  splitString,
  writeToJson,
} from "./utils";

/**
 * ISSUE: https://github.com/Zondax/ledger-icp/issues/187
 */

interface Params extends SnsDisburseNeuronParams {
  canisterId: Principal;
}

const createDisburseVector = (params: Params) => {
  const rawRequestBody = toDisburseNeuronRequest(params);
  const canisterIdOutputs = splitPrincipal(params.canisterId).map(
    (data, i, elements) => `Canister Id [${i + 1}/${elements.length}] : ${data}`
  );
  const neuronIdString = bytesToHexString(Array.from(params.neuronId.id));
  const neuronIdOutputs = splitString(neuronIdString, "Neuron Id");
  const disburseToAccountStr = encodeSnsAccount({
    owner: caller,
  });
  const disburseToOutputs = splitString(disburseToAccountStr, "Disburse to");
  const amountOutputs = ["Amount : " + (params.amount?.toString() ?? "All")];
  const output = [
    "Transaction type : Remove Neuron Permissions",
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
      "krpzt-buecq-u3umg-7kb7r-j5jpx-twqwa-3ykc4-y3cnk-7kwvw-5bq6z-mae"
    );
    const principal2 = Principal.fromText(
      "2dfd6-abjpf-eihu7-pwv6m-qnlbt-oszmg-kb26q-rvqms-onmuh-mwiq3-uqe"
    );
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
