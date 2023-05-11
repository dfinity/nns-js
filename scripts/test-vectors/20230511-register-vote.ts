import { IDL } from "@dfinity/candid";
import { NeuronId, ProposalId } from "@dfinity/nns/src";
import { toRegisterVoteRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { Vote } from "@dfinity/nns/src/enums/governance.enums";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);
const proposalId1 = BigInt(1223);
const proposalId2 = BigInt(442233);
const proposalId3 = BigInt(233);
const vote1 = Vote.Yes;
const vote2 = Vote.No;

const createRegisterVoteVector = ({
  neuronId,
  proposalId,
  vote,
}: {
  neuronId: NeuronId;
  proposalId: ProposalId;
  vote: Vote;
}) => {
  const rawRequestBody = toRegisterVoteRequest({
    neuronId,
    proposalId,
    vote,
  });
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Register Vote",
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      createRegisterVoteVector({
        neuronId: mockNeuronId,
        vote: vote1,
        proposalId: proposalId1,
      }),
      createRegisterVoteVector({
        neuronId: mockNeuronId2,
        vote: vote1,
        proposalId: proposalId1,
      }),
      createRegisterVoteVector({
        neuronId: mockNeuronId,
        vote: vote2,
        proposalId: proposalId3,
      }),
      createRegisterVoteVector({
        neuronId: mockNeuronId,
        vote: vote1,
        proposalId: proposalId2,
      }),
      createRegisterVoteVector({
        neuronId: mockNeuronId2,
        vote: vote2,
        proposalId: proposalId1,
      }),
      createRegisterVoteVector({
        neuronId: mockNeuronId2,
        vote: vote1,
        proposalId: proposalId3,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "register-vote.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
