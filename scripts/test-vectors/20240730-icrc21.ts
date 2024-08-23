import { Cbor } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { writeToJson } from "./utils";

function hexStringToArrayBuffer(hexString: string): ArrayBuffer {
  // Remove any non-hexadecimal characters (e.g., spaces)
  hexString = hexString.replace(/[^a-fA-F0-9]/g, "");

  // Ensure the string has an even length
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }

  // Create an ArrayBuffer with the appropriate length
  var arrayBuffer = new ArrayBuffer(hexString.length / 2);
  var uint8Array = new Uint8Array(arrayBuffer);

  // Convert each pair of hex characters to a byte
  for (var i = 0; i < hexString.length; i += 2) {
    uint8Array[i / 2] = parseInt(hexString.substr(i, 2), 16);
  }

  return arrayBuffer;
}

const callRequest = {
  arg: hexStringToArrayBuffer("4449444C00017104746F6269"),
  canister_id: Principal.fromHex("00000000006000FD0101"),
  ingress_expiry: BigInt("1712667140606000000"),
  method_name: "greet",
  request_type: "query",
  sender: Principal.fromHex("04"),
};

const consentMessageRequest = {
  arg: hexStringToArrayBuffer(
    "4449444C076D7B6C01D880C6D007716C02CBAEB581017AB183E7F1077A6B028BEABFC2067F8EF1C1EE0D026E036C02EFCEE7800401C4FBF2DB05046C03D6FCA70200E1EDEB4A7184F7FEE80A0501060C4449444C00017104746F626905677265657402656E01011E000300",
  ),
  canister_id: Principal.fromHex("00000000006000FD0101"),
  ingress_expiry: BigInt("1712666698482000000"),
  method_name: "icrc21_canister_call_consent_message",
  nonce: hexStringToArrayBuffer("A3788C1805553FB69B20F08E87E23B13"),
  request_type: "call",
  sender: Principal.fromHex("04"),
};

const createCandidBlobs = () => {
  const callRequestBlob = Buffer.from(
    Cbor.encode({ content: callRequest }),
  ).toString("hex");
  const consentMessageRequestBlob = Buffer.from(
    Cbor.encode({ content: consentMessageRequest }),
  ).toString("hex");

  writeToJson({
    data: { callRequestBlob, consentMessageRequestBlob },
    fileName: "icrc21.json",
  });
};

createCandidBlobs();
