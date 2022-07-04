import { mock } from "jest-mock-extended";
import { SnsWasmService } from "../candid/sns-wasm.idl";
import { snsMock } from "./mocks/sns-wasm.mock";
import { SnsWasmCanister } from "./sns-wasm";

describe("Sns-wasm", () => {
  it("should return the list of sns", async () => {
    const service = mock<SnsWasmService>();
    service.list_deployed_snses.mockResolvedValue({
      instances: snsMock,
    });

    const canister = SnsWasmCanister.create({
      certifiedServiceOverride: service,
    });
    const res = await canister.listSns({});
    expect(res).toEqual(snsMock);
  });
});
