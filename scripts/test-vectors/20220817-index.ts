// Date represents the date of the issue with the test vectors sent to Zondax:
// https://github.com/Zondax/ledger-icp/issues/166
// We'll keep each script for reproducibility.
import { IDL } from "@dfinity/candid";
import { toLeaveCommunityFundRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);

const createCandidLeaveCF = (neuronId: bigint) => {
  const rawRequestBody = toLeaveCommunityFundRequest(neuronId);
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Leave Community Fund",
    candid_request: rawRequestBody,
    output: [
      "0 | Transaction type : Leave Community Fund",
      `1 | Neuron ID: ${neuronId}`,
    ],
  };
};

const main = () => {
  try {
    const vectors = [
      createCandidLeaveCF(mockNeuronId),
      createCandidLeaveCF(mockNeuronId2),
    ];

    writeToJson({
      data: vectors,
      fileName: "test-vectors-20220817.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
