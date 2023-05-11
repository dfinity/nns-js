import { IDL } from "@dfinity/candid";
import { NeuronId } from "@dfinity/nns/src";
import { toManageNeuronsFollowRequest } from "@dfinity/nns/src/canisters/governance/request.converters";
import { Topic } from "@dfinity/nns/src/enums/governance.enums";
import { ManageNeuronFn } from "./governance.idl";
import { createBlob, writeToJson } from "./utils";

const mockNeuronId = BigInt(15374508381553347371);
const mockNeuronId2 = BigInt(8836564053576662908);
const mockNeuronId3 = BigInt(4053576662908);
const mockNeuronId4 = BigInt(999888123);
const mockNeuronId5 = BigInt(3141242222);
const topic1 = Topic.ExchangeRate;
const topic2 = Topic.Governance;
const topic3 = Topic.SnsAndCommunityFund;

const createFollowVector = ({
  neuronId,
  topic,
  followees,
}: {
  neuronId: NeuronId;
  topic: Topic;
  followees: Array<NeuronId>;
}) => {
  const rawRequestBody = toManageNeuronsFollowRequest({
    neuronId,
    topic,
    followees,
  });
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
    }),
    name: "Follow",
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const vectors = [
      createFollowVector({
        neuronId: mockNeuronId,
        topic: topic1,
        followees: [mockNeuronId2, mockNeuronId3],
      }),
      createFollowVector({
        neuronId: mockNeuronId2,
        topic: topic2,
        followees: [mockNeuronId3, mockNeuronId4],
      }),
      createFollowVector({
        neuronId: mockNeuronId3,
        topic: topic3,
        followees: [mockNeuronId4, mockNeuronId5],
      }),
      createFollowVector({
        neuronId: mockNeuronId3,
        topic: topic3,
        followees: [mockNeuronId4, mockNeuronId5],
      }),
      createFollowVector({
        neuronId: mockNeuronId4,
        topic: topic1,
        followees: [mockNeuronId, mockNeuronId2, mockNeuronId4, mockNeuronId5],
      }),
      createFollowVector({
        neuronId: mockNeuronId4,
        topic: topic2,
        followees: [mockNeuronId5],
      }),
      createFollowVector({
        neuronId: mockNeuronId4,
        topic: topic3,
        followees: [mockNeuronId3, mockNeuronId5, mockNeuronId2],
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "follow.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
