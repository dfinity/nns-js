import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { toSetVisibilityRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { NeuronVisibility } from "@dfinity/nns/src/enums/governance.enums";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

/**
 * Issue: https://github.com/Zondax/ledger-icp/issues/249
 */

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);

const createSetVisibilityVector = ({
  neuronId,
  visibility,
}: {
  neuronId: NeuronId;
  visibility: NeuronVisibility;
}) => {
  const rawRequestBody = toSetVisibilityRequest({
    neuronId,
    visibility,
  });

  const messages = {
    [NeuronVisibility.Private]: "Make Neuron Private",
    [NeuronVisibility.Public]: "Make Neuron Public",
    [NeuronVisibility.Unspecified]: "Unspecified",
  };

  const outputs = [
    `Transaction type : ${messages[visibility]}`,
    `Neuron ID : ${neuronId}`,
  ];

  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Set Neuron Visibility",
    candid_request: rawRequestBody,
    outputs:
      visibility === NeuronVisibility.Unspecified
        ? [
            `Fail: "${NeuronVisibility.Unspecified} is not a valid visibility option."`,
          ]
        : outputs,
  };
};

const main = () => {
  try {
    const vectors = [
      createSetVisibilityVector({
        neuronId: mockNeuronId,
        visibility: NeuronVisibility.Public,
      }),
      createSetVisibilityVector({
        neuronId: mockNeuronId,
        visibility: NeuronVisibility.Private,
      }),
      createSetVisibilityVector({
        neuronId: mockNeuronId2,
        visibility: NeuronVisibility.Public,
      }),
      createSetVisibilityVector({
        neuronId: mockNeuronId,
        visibility: NeuronVisibility.Private,
      }),
      createSetVisibilityVector({
        neuronId: mockNeuronId,
        visibility: NeuronVisibility.Unspecified,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "set-neuron-visibility.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
