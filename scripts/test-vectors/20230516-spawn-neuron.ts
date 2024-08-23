import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { toSpawnNeuronRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { Principal } from "@dfinity/principal";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);
const principal1 = Principal.fromText(
  "krpzt-buecq-u3umg-7kb7r-j5jpx-twqwa-3ykc4-y3cnk-7kwvw-5bq6z-mae",
);
const principal2 = Principal.fromText(
  "2dfd6-abjpf-eihu7-pwv6m-qnlbt-oszmg-kb26q-rvqms-onmuh-mwiq3-uqe",
);

const createSpawnNeuronVector = ({
  neuronId,
  percentageToSpawn,
  newController,
  nonce,
}: {
  neuronId: NeuronId;
  percentageToSpawn?: number;
  newController?: Principal;
  nonce?: bigint;
}) => {
  const rawRequestBody = toSpawnNeuronRequest({
    neuronId,
    percentageToSpawn,
    newController,
    nonce,
  });
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Spawn Neuron",
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      createSpawnNeuronVector({
        neuronId: mockNeuronId,
      }),
      createSpawnNeuronVector({
        neuronId: mockNeuronId,
        percentageToSpawn: 100,
      }),
      createSpawnNeuronVector({
        neuronId: mockNeuronId,
        percentageToSpawn: 10,
        newController: principal1,
      }),
      createSpawnNeuronVector({
        neuronId: mockNeuronId,
        percentageToSpawn: 33,
        newController: principal2,
        nonce: BigInt(1444),
      }),
      createSpawnNeuronVector({
        neuronId: mockNeuronId2,
        percentageToSpawn: 50,
        newController: principal2,
        nonce: BigInt(1444),
      }),
      createSpawnNeuronVector({
        neuronId: mockNeuronId2,
        percentageToSpawn: 84,
        nonce: BigInt(1444),
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "spawn-neuron.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
