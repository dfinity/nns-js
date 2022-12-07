import { IDL } from "@dfinity/candid";
import { NeuronId } from "../../packages/nns/src";
import { toStopDissolvingRequest } from "../../packages/nns/src/canisters/governance/request.converters";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);

const createStopDissolvingVector = (neuronId: NeuronId) => {
  const rawRequestBody = toStopDissolvingRequest(neuronId);
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Stop Dissolving",
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      createStopDissolvingVector(mockNeuronId),
      createStopDissolvingVector(mockNeuronId2),
    ];

    writeToJson({
      data: vectors,
      fileName: "stop-dissolving.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
