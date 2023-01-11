// Date represents the date of the issue with the test vectors sent to Zondax:
// https://github.com/Zondax/ledger-icp/issues/166
// We'll keep each script for reproducibility.
import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { fromListNeurons } from "@dfinity/nns/src/canisters/governance/request.converters";
import { ListNeuronsFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);

const createListNeurons = (neuronIds?: NeuronId[]) => {
  const rawRequestBody = fromListNeurons(neuronIds);

  return {
    blob_candid: createBlob({
      arg: IDL.encode(ListNeuronsFn.argTypes, [rawRequestBody]),
      methodName: "list_neurons",
    }),
    name: "List Neurons",
    candid_request: rawRequestBody,
    output: ["0 | Transaction type : List Own Neurons"],
  };
};

const main = () => {
  try {
    const vectors = [createListNeurons()];

    writeToJson({
      data: vectors,
      fileName: "test-vectors.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
