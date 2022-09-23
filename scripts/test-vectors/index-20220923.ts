// Date represents the date of the issue with the test vectors sent to Zondax:
// https://github.com/Zondax/ledger-icp/issues/166
// We'll keep each script for reproducibility.
import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import { NeuronId } from "../../packages/nns/src";
import { toSpawnNeuronRequest } from "../../packages/nns/src/canisters/governance/request.converters";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, splitPrincipal, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);
const mockPrincipal = Principal.fromText(
  "xlmdg-vkosz-ceopx-7wtgu-g3xmd-koiyc-awqaq-7modz-zf6r6-364rh-oqe"
);

const createCandidSpawnNeuron = ({
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

  const outputs = [
    "Transaction type : Spawn Neuron",
    `Neuron ID : ${neuronId}`,
  ];

  if (percentageToSpawn !== undefined) {
    outputs.push(`Percentage to spawn : ${percentageToSpawn}`);
  }

  const controllerMessages =
    newController === undefined
      ? ["Controller : Self"]
      : splitPrincipal(newController).map(
          (data, i, elements) =>
            `Controller [${i + 1}/${elements.length}] : ${data}`
        );

  outputs.push(...controllerMessages);

  if (nonce !== undefined) {
    outputs.push(`Nonce : ${nonce}`);
  }
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Spawn Neuron",
    candid_request: rawRequestBody,
    output: outputs.map((data, index) => `${index + 1} | ${data}`),
  };
};

const main = () => {
  try {
    const vectors = [
      createCandidSpawnNeuron({
        neuronId: mockNeuronId,
      }),
      createCandidSpawnNeuron({
        neuronId: mockNeuronId2,
      }),
      createCandidSpawnNeuron({
        neuronId: mockNeuronId2,
        percentageToSpawn: 50,
      }),
      createCandidSpawnNeuron({
        neuronId: mockNeuronId2,
        newController: mockPrincipal,
      }),
      createCandidSpawnNeuron({
        neuronId: mockNeuronId2,
        percentageToSpawn: 50,
        newController: mockPrincipal,
      }),
      createCandidSpawnNeuron({
        neuronId: mockNeuronId,
        percentageToSpawn: 50,
        nonce: BigInt(12345),
      }),
      createCandidSpawnNeuron({
        neuronId: mockNeuronId2,
        percentageToSpawn: 30,
        newController: mockPrincipal,
        nonce: BigInt(12345),
      }),
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
