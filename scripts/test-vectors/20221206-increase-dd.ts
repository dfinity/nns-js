import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { toIncreaseDissolveDelayRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);

const createIncreaseDissolveDelayVector = (
  neuronId: NeuronId,
  additionalDissolveDelaySeconds: number,
) => {
  const params = {
    neuronId,
    additionalDissolveDelaySeconds,
  };
  const rawRequestBody = toIncreaseDissolveDelayRequest(params);

  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Increase Dissolve Delay",
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      createIncreaseDissolveDelayVector(mockNeuronId, 3600),
      createIncreaseDissolveDelayVector(mockNeuronId, 3600 * 24),
      createIncreaseDissolveDelayVector(mockNeuronId2, 3600 * 24 * 7),
      createIncreaseDissolveDelayVector(mockNeuronId2, 3600 * 24 * 7 * 4),
      createIncreaseDissolveDelayVector(mockNeuronId2, 3600),
    ];

    writeToJson({
      data: vectors,
      fileName: "increase-dissolve-delay.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
