import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { AccountIdentifier } from "@dfinity/nns/src/account_identifier";
import { toDisburseNeuronRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);
const amount1 = BigInt(20_000_000);
const amount2 = BigInt(25_000_000);
const account1 = AccountIdentifier.fromHex(
  "d4685b31b51450508aff0331584df7692a84467b680326f5c5f7d30ae711682f"
);
const account2 = AccountIdentifier.fromHex(
  "b1cebc8480a0afc91198a87ddf52c6ca7eb7ccddb0cb398064f71d2bbaf2f72b"
);

const createDisburseVector = ({
  neuronId,
  toAccountIdentifier,
  amount,
}: {
  neuronId: NeuronId;
  toAccountIdentifier?: AccountIdentifier;
  amount?: bigint;
}) => {
  const rawRequestBody = toDisburseNeuronRequest({
    neuronId,
    toAccountIdentifier,
    amount,
  });
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Join Community Fund",
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      createDisburseVector({ neuronId: mockNeuronId }),
      createDisburseVector({ neuronId: mockNeuronId2 }),
      createDisburseVector({ neuronId: mockNeuronId2, amount: amount1 }),
      createDisburseVector({
        neuronId: mockNeuronId2,
        amount: amount1,
        toAccountIdentifier: account1,
      }),
      createDisburseVector({
        neuronId: mockNeuronId,
        toAccountIdentifier: account1,
      }),
      createDisburseVector({
        neuronId: mockNeuronId,
        amount: amount2,
        toAccountIdentifier: account1,
      }),
      createDisburseVector({
        neuronId: mockNeuronId2,
        amount: amount1,
        toAccountIdentifier: account2,
      }),
      createDisburseVector({
        neuronId: mockNeuronId,
        toAccountIdentifier: account2,
      }),
      createDisburseVector({
        neuronId: mockNeuronId,
        amount: amount2,
        toAccountIdentifier: account2,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "disburse.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
