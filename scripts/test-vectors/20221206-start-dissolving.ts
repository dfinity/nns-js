import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { toStartDissolvingRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);

const createStartDissolvingVector = (neuronId: NeuronId) => {
  const rawRequestBody = toStartDissolvingRequest(neuronId);
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Start Dissolving",
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      createStartDissolvingVector(mockNeuronId),
      createStartDissolvingVector(mockNeuronId2),
    ];

    writeToJson({
      data: vectors,
      fileName: "start-dissolving.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
