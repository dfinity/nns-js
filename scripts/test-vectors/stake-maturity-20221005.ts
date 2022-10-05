import { IDL } from "@dfinity/candid";
import { NeuronId } from "../../packages/nns/src";
import { toStakeMaturityRequest } from "../../packages/nns/src/canisters/governance/request.converters";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);

const createCandidStakeMaturity = ({
  neuronId,
  percentageToStake,
}: {
  neuronId: NeuronId;
  percentageToStake?: number;
}) => {
  const rawRequestBody = toStakeMaturityRequest({
    neuronId,
    percentageToStake,
  });

  const outputs = [
    "Transaction type : Stake Maturity Neuron",
    `Neuron ID : ${neuronId}`,
    `Percentage to stake : ${percentageToStake}`,
  ];

  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Stake Maturity",
    candid_request: rawRequestBody,
    output: outputs.map((data, index) => `${index + 1} | ${data}`),
  };
};

const main = () => {
  try {
    const vectors = [
      createCandidStakeMaturity({
        neuronId: mockNeuronId,
      }),
      createCandidStakeMaturity({
        neuronId: mockNeuronId2,
      }),
      createCandidStakeMaturity({
        neuronId: mockNeuronId2,
        percentageToStake: 50,
      }),
      createCandidStakeMaturity({
        neuronId: mockNeuronId,
        percentageToStake: 50,
      }),
      createCandidStakeMaturity({
        neuronId: mockNeuronId,
        percentageToStake: 15,
      }),
      createCandidStakeMaturity({
        neuronId: mockNeuronId2,
        percentageToStake: 30,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "stake-maturity.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
