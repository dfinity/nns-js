import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { toAddHotkeyRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { Principal } from "@dfinity/principal";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);
const principal1 = Principal.fromText(
  "krpzt-buecq-u3umg-7kb7r-j5jpx-twqwa-3ykc4-y3cnk-7kwvw-5bq6z-mae"
);
const principal2 = Principal.fromText(
  "2dfd6-abjpf-eihu7-pwv6m-qnlbt-oszmg-kb26q-rvqms-onmuh-mwiq3-uqe"
);

const createAddHotkeyVector = ({
  neuronId,
  principal,
}: {
  neuronId: NeuronId;
  principal: Principal;
}) => {
  const rawRequestBody = toAddHotkeyRequest({
    neuronId,
    principal,
  });
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Add Hotkey",
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      createAddHotkeyVector({
        neuronId: mockNeuronId,
        principal: principal1,
      }),
      createAddHotkeyVector({
        neuronId: mockNeuronId,
        principal: principal2,
      }),
      createAddHotkeyVector({
        neuronId: mockNeuronId2,
        principal: principal1,
      }),
      createAddHotkeyVector({
        neuronId: mockNeuronId2,
        principal: principal2,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "add-hotkey.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();