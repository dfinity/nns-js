// Date represents the date of the issue with the test vectors sent to Zondax:
// https://github.com/Zondax/ledger-icp/issues/166
// We'll keep each script for reproducibility.
import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { toNullable } from "@dfinity/utils/src";
import { ListNeuronsFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);

const createListNeurons = ({
  neuronIds,
  includeEmptyNeurons,
}: {
  neuronIds?: NeuronId[];
  includeEmptyNeurons?: boolean | null;
}) => {
  const rawRequestBody = {
    neuron_ids: neuronIds ?? [],
    include_neurons_readable_by_caller: neuronIds ? false : true,
    ...(includeEmptyNeurons === null
      ? {}
      : {
          include_empty_neurons_readable_by_caller:
            toNullable(includeEmptyNeurons),
        }),
  };

  const test = {
    blob_candid: createBlob({
      arg: IDL.encode(ListNeuronsFn.argTypes, [rawRequestBody]),
      methodName: "list_neurons",
    }),
    name: `List Neurons ${
      includeEmptyNeurons === null ? "- no new `includeEmptyNeurons` param" : ""
    }`,
    candid_request: rawRequestBody,
    output: ["0 | Transaction type : List Own Neurons"],
  };
  neuronIds?.forEach((id, idx) => {
    test.output.push(`${idx + 1} | Neuron ID ${idx + 1} : ${id}`);
  });
  return test;
};

const main = () => {
  try {
    const vectors = [
      createListNeurons({}),
      createListNeurons({ includeEmptyNeurons: true }),
      createListNeurons({ includeEmptyNeurons: false }),
      createListNeurons({ includeEmptyNeurons: null }),
      createListNeurons({ neuronIds: [mockNeuronId, mockNeuronId2] }),
      createListNeurons({
        neuronIds: [mockNeuronId, mockNeuronId2],
        includeEmptyNeurons: true,
      }),
      createListNeurons({
        neuronIds: [mockNeuronId],
        includeEmptyNeurons: false,
      }),
      createListNeurons({
        neuronIds: [mockNeuronId],
        includeEmptyNeurons: null,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "list-neurons.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
