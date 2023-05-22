import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { toMergeMaturityRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);

const createMergeMaturityVector = ({
  neuronId,
  percentageToMerge,
}: {
  neuronId: NeuronId;
  percentageToMerge: number;
}) => {
  const rawRequestBody = toMergeMaturityRequest({
    neuronId,
    percentageToMerge,
  });
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Merge Maturity",
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      createMergeMaturityVector({
        neuronId: mockNeuronId,
        percentageToMerge: 100,
      }),
      createMergeMaturityVector({
        neuronId: mockNeuronId,
        percentageToMerge: 10,
      }),
      createMergeMaturityVector({
        neuronId: mockNeuronId2,
        percentageToMerge: 50,
      }),
      createMergeMaturityVector({
        neuronId: mockNeuronId2,
        percentageToMerge: 84,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "merge-maturity.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
