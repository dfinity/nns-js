import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import { SnsNeuronPermissionsParams } from "@dfinity/sns/src";
import { toAddPermissionsRequest } from "@dfinity/sns/src/converters/governance.converters";
import { SnsNeuronPermissionType } from "@dfinity/sns/src/enums/governance.enums";
import { arrayOfNumberToUint8Array } from "@dfinity/utils";
import { ManageNeuronFn } from "./sns-governance.idl";
import { createBlob, splitPrincipal, writeToJson } from "./utils";

/**
 * ISSUE: https://github.com/Zondax/ledger-icp/issues/187
 */

interface Params extends SnsNeuronPermissionsParams {
  canisterId: Principal;
}

const permissionMapper: Record<SnsNeuronPermissionType, string> = {
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_VOTE]: "Vote",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_SUBMIT_PROPOSAL]:
    "Submit Proposal",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_CONFIGURE_DISSOLVE_STATE]:
    "Configure Dissolve State",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_DISBURSE]: "Disburse Neuron",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_DISBURSE_MATURITY]:
    "Disburse Maturity",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_MANAGE_PRINCIPALS]:
    "Manage Principals",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_MANAGE_VOTING_PERMISSION]:
    "Manage Voting Permission",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_SPLIT]: "Split Neuron",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_STAKE_MATURITY]:
    "Stake Maturity",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_UNSPECIFIED]: "Unspecified",
  [SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_MERGE_MATURITY]:
    "Merge Maturity",
};

export const bytesToHexString = (bytes: number[]): string =>
  bytes.reduce(
    (str, byte) => `${str}${byte.toString(16).padStart(2, "0")}`,
    ""
  );

const createTestVector = (params: Params) => {
  const rawRequestBody = toAddPermissionsRequest(params);
  const canisterIdOutputs = splitPrincipal(params.canisterId).map(
    (data, i, elements) => `Canister Id [${i + 1}/${elements.length}] : ${data}`
  );
  const neuronIdString = bytesToHexString(Array.from(params.neuronId.id));
  const neuronIdOutputs =
    neuronIdString
      .match(/.{1,6}/g)
      ?.reduce((acc, curr) => {
        if (acc.length === 0) {
          return [curr];
        }
        const lastItem = acc[acc.length - 1];
        if (lastItem.length > 18) {
          return [...acc, curr];
        } else if (lastItem.length < 18) {
          return [...acc.slice(0, -1), `${lastItem} : ${curr}`];
        }
        return acc;
      }, [] as string[])
      ?.map(
        (data, i, elements) =>
          `Neuron Id [${i + 1}/${elements.length}] : ${data}`
      ) || [];
  const principalOutputs = splitPrincipal(params.principal).map(
    (data, i, elements) =>
      `Principal Id [${i + 1}/${elements.length}] : ${data}`
  );
  const permissionOutputs = params.permissions.map(
    (p) => `Add Permission : ${permissionMapper[p]}`
  );
  const output = [
    "Transaction type : Add Neuron Permissions",
    ...canisterIdOutputs,
    ...neuronIdOutputs,
    ...principalOutputs,
    ...permissionOutputs,
  ];
  return {
    blob_candid: createBlob({
      arg: IDL.encode(ManageNeuronFn.argTypes, [rawRequestBody]),
      methodName: "manage_neuron",
      canisterId: params.canisterId,
    }),
    output: output.map((element, index) => `${index + 1} | ${element}`),
    neuronIdString: neuronIdString,
    name: "Add Neuron Permissions",
    canisterId: params.canisterId.toText(),
    candid_request: rawRequestBody,
  };
};

const main = () => {
  try {
    const id1 = arrayOfNumberToUint8Array([
      215, 232, 81, 101, 44, 208, 50, 186, 94, 215, 107, 23, 246, 38, 170, 71,
      130, 159, 6, 229, 35, 90, 13, 88, 14, 150, 211, 114, 119, 41, 234, 36,
    ]);
    const id2 = arrayOfNumberToUint8Array([
      163, 110, 20, 60, 134, 231, 228, 113, 231, 199, 25, 80, 100, 135, 207,
      122, 108, 244, 13, 167, 99, 97, 174, 175, 238, 81, 51, 225, 217, 172, 234,
      61,
    ]);
    const principal1 = Principal.fromText(
      "krpzt-buecq-u3umg-7kb7r-j5jpx-twqwa-3ykc4-y3cnk-7kwvw-5bq6z-mae"
    );
    const principal2 = Principal.fromText(
      "2dfd6-abjpf-eihu7-pwv6m-qnlbt-oszmg-kb26q-rvqms-onmuh-mwiq3-uqe"
    );
    const canisterId1 = Principal.fromText("ppmzm-3aaaa-aaaaa-aacpq-cai");
    const canisterId2 = Principal.fromText("s24we-diaaa-aaaaa-aaaka-cai");
    const vectors = [
      createTestVector({
        neuronId: { id: id1 },
        principal: principal1,
        permissions: [
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_VOTE,
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_SUBMIT_PROPOSAL,
        ],
        canisterId: canisterId1,
      }),
      createTestVector({
        neuronId: { id: id1 },
        principal: principal2,
        permissions: [
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_VOTE,
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_SUBMIT_PROPOSAL,
        ],
        canisterId: canisterId1,
      }),
      createTestVector({
        neuronId: { id: id2 },
        principal: principal2,
        permissions: [
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_VOTE,
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_SUBMIT_PROPOSAL,
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_CONFIGURE_DISSOLVE_STATE,
        ],
        canisterId: canisterId2,
      }),
      createTestVector({
        neuronId: { id: id1 },
        principal: principal1,
        permissions: [
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_VOTE,
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_DISBURSE,
        ],
        canisterId: canisterId2,
      }),
      createTestVector({
        neuronId: { id: id1 },
        principal: principal2,
        permissions: [
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_DISBURSE,
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_CONFIGURE_DISSOLVE_STATE,
        ],
        canisterId: canisterId2,
      }),
      createTestVector({
        neuronId: { id: id2 },
        principal: principal2,
        permissions: [
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_MANAGE_VOTING_PERMISSION,
          SnsNeuronPermissionType.NEURON_PERMISSION_TYPE_DISBURSE,
        ],
        canisterId: canisterId1,
      }),
    ];

    writeToJson({
      data: vectors,
      fileName: "sns-add-neuron-permissions.json",
    });
    console.log("File created successfully");
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
};

main();
