import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { toRefreshVotingPowerRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

/**
 * Issue: https://github.com/Zondax/ledger-icp/issues/255
 */

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);

const createRefreshVotingVector = ({ neuronId }: { neuronId: NeuronId }) => {
  const rawRequestBody = toRefreshVotingPowerRequest({
    neuronId,
  });

  const outputs = [
    `Transaction type : Refresh Voting Power`,
    `Neuron ID : ${neuronId}`,
  ];

  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Refresh Neuron Voting Power",
    candid_request: rawRequestBody,
    outputs,
  };
};

const main = () => {
  try {
    const vectors = [
      createRefreshVotingVector({
        neuronId: mockNeuronId,
      }),
      createRefreshVotingVector({
        neuronId: mockNeuronId2,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "refresh-voting-power.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
