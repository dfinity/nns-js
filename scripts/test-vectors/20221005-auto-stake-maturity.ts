import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { toAutoStakeMaturityRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);

const createCandidAutoStakeMaturity = ({
  neuronId,
  autoStake: autoStake,
}: {
  neuronId: NeuronId;
  autoStake: boolean;
}) => {
  const rawRequestBody = toAutoStakeMaturityRequest({
    neuronId,
    autoStake,
  });

  const outputs = [
    "Transaction type : Set Auto Stake Maturity",
    `Neuron ID : ${neuronId}`,
    `Auto stake : ${autoStake}`,
  ];

  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Auto Stake Maturity",
    candid_request: rawRequestBody,
    output: outputs.map((data, index) => `${index + 1} | ${data}`),
  };
};

const main = () => {
  try {
    const vectors = [
      createCandidAutoStakeMaturity({
        neuronId: mockNeuronId,
        autoStake: true,
      }),
      createCandidAutoStakeMaturity({
        neuronId: mockNeuronId2,
        autoStake: true,
      }),
      createCandidAutoStakeMaturity({
        neuronId: mockNeuronId2,
        autoStake: false,
      }),
      createCandidAutoStakeMaturity({
        neuronId: mockNeuronId,
        autoStake: false,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "auto-stake-maturity.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
