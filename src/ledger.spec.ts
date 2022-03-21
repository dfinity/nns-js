import { AccountIdentifier } from "./account_identifier";
import { ICP } from "./icp";
import { LedgerCanister } from "./ledger";
import {
  InsufficientFundsError,
  InvalidSenderError,
  TxCreatedInFutureError,
  TxDuplicateError,
  TxTooOldError
} from './errors/ledger.errors';

describe("LedgerCanister.transfer", () => {
  it("handles invalid sender", async () => {
    const ledger = LedgerCanister.create({
      updateCallOverride: () => {
        return Promise.resolve(
          Error(`Reject code: 5
            Reject text: Canister ryjl3-tyaaa-aaaaa-aaaba-cai trapped explicitly: Panicked at 'Sending from 2vxsx-fae is not allowed', rosetta-api/ledger_canister/src/main.rs:135:9`)
        );
      },
    });

    const call = async () =>
      await ledger.transfer({
        to: AccountIdentifier.fromHex(
          "3e8bbceef8b9338e56a1b561a127326e6614894ab9b0739df4cc3664d40a5958"
        ),
        amount: ICP.fromE8s(BigInt(100000)),
      });

    await expect(call).rejects.toThrow(new InvalidSenderError());
  });

  it("handles duplicate transaction", async () => {
    const ledger = LedgerCanister.create({
      updateCallOverride: () => {
        return Promise.resolve(
          Error(`Reject code: 5
            Reject text: Canister ryjl3-tyaaa-aaaaa-aaaba-cai trapped explicitly: Panicked at 'transaction is a duplicate of another transaction in block 1235123', rosetta-api/ledger_canister/src/main.rs:135:9`)
        );
      },
    });

    const call = async () =>
      await ledger.transfer({
        to: AccountIdentifier.fromHex(
          "3e8bbceef8b9338e56a1b561a127326e6614894ab9b0739df4cc3664d40a5958"
        ),
        amount: ICP.fromE8s(BigInt(100000)),
      });

    await expect(call).rejects.toThrow(new TxDuplicateError(BigInt(1235123)));
  });

  it("handles insufficient balance", async () => {
    const ledger = LedgerCanister.create({
      updateCallOverride: () => {
        return Promise.resolve(
          Error(`Reject code: 5
            Reject text: Canister ryjl3-tyaaa-aaaaa-aaaba-cai trapped explicitly: Panicked at 'the debit account doesn't have enough funds to complete the transaction, current balance: 123.46789123', rosetta-api/ledger_canister/src/main.rs:135:9`)
        );
      },
    });

    const call = async () =>
      await ledger.transfer({
        to: AccountIdentifier.fromHex(
          "3e8bbceef8b9338e56a1b561a127326e6614894ab9b0739df4cc3664d40a5958"
        ),
        amount: ICP.fromE8s(BigInt(100000)),
      });

    await expect(call).rejects.toThrow(
      new InsufficientFundsError(ICP.fromE8s(BigInt(12346789123)))
    );
  });

  it("handles future tx", async () => {
    const ledger = LedgerCanister.create({
      updateCallOverride: () => {
        return Promise.resolve(
          Error(`Reject code: 5
            Reject text: Canister ryjl3-tyaaa-aaaaa-aaaba-cai trapped explicitly: Panicked at 'transaction's created_at_time is in future', rosetta-api/ledger_canister/src/main.rs:135:9`)
        );
      },
    });

    const call = async () =>
      await ledger.transfer({
        to: AccountIdentifier.fromHex(
          "a2a794c66495083317e4be5197eb655b1e63015469d769e2338af3d3e3f3aa86"
        ),
        amount: ICP.fromE8s(BigInt(100000)),
      });

    await expect(call).rejects.toThrow(new TxCreatedInFutureError());
  });

  it("handles old tx", async () => {
    const ledger = LedgerCanister.create({
      updateCallOverride: () => {
        return Promise.resolve(
          Error(`Reject code: 5
            Reject text: Canister ryjl3-tyaaa-aaaaa-aaaba-cai trapped explicitly: Panicked at 'transaction is older than 123 seconds', rosetta-api/ledger_canister/src/main.rs:135:9`)
        );
      },
    });

    const call = async () =>
      await ledger.transfer({
        to: AccountIdentifier.fromHex(
          "3e8bbceef8b9338e56a1b561a127326e6614894ab9b0739df4cc3664d40a5958"
        ),
        amount: ICP.fromE8s(BigInt(100000)),
      });

    await expect(call).rejects.toThrow(new TxTooOldError(123));
  });

  it("handles subaccount", async () => {
    const ledger = LedgerCanister.create({
      updateCallOverride: jest
        .fn()
        .mockResolvedValue(new Uint8Array(32).fill(0)),
    });

    const res = await ledger.transfer({
      to: AccountIdentifier.fromHex(
        "3e8bbceef8b9338e56a1b561a127326e6614894ab9b0739df4cc3664d40a5958"
      ),
      amount: ICP.fromE8s(BigInt(100000)),
      fromSubAccountId: 1234,
    });

    expect(typeof res).toEqual("bigint");
  });
});
