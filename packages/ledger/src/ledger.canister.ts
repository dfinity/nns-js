import type { QueryParams } from "@dfinity/utils";
import { Canister, createServices, toNullable } from "@dfinity/utils";
import type {
  BlockIndex,
  Tokens,
  _SERVICE as IcrcLedgerService,
} from "../candid/icrc1_ledger";
import { idlFactory as certifiedIdlFactory } from "../candid/icrc1_ledger.certified.idl";
import { idlFactory } from "../candid/icrc1_ledger.idl";
import {
  toTransferArg,
  toTransferFromArgs,
} from "./converters/ledger.converters";
import { IcrcTransferError } from "./errors/ledger.errors";
import type { IcrcLedgerCanisterOptions } from "./types/canister.options";
import type {
  BalanceParams,
  TransferFromParams,
  TransferParams,
} from "./types/ledger.params";
import type { IcrcTokenMetadataResponse } from "./types/ledger.responses";

export class IcrcLedgerCanister extends Canister<IcrcLedgerService> {
  static create(options: IcrcLedgerCanisterOptions<IcrcLedgerService>) {
    const { service, certifiedService, canisterId } =
      createServices<IcrcLedgerService>({
        options,
        idlFactory,
        certifiedIdlFactory,
      });

    return new IcrcLedgerCanister(canisterId, service, certifiedService);
  }

  /**
   * The token metadata (name, symbol, etc.).
   */
  metadata = (params: QueryParams): Promise<IcrcTokenMetadataResponse> =>
    this.caller(params).icrc1_metadata();

  /**
   * The ledger transaction fees.
   *
   * @returns {Tokens} The ledger transaction fees in Tokens
   */
  transactionFee = (params: QueryParams): Promise<Tokens> =>
    this.caller(params).icrc1_fee();

  /**
   * Returns the balance for a given account provided as owner and with optional subaccount.
   *
   * @param {BalanceParams} params The parameters to get the balance of an account.
   * @returns {Promise<Tokens>} The balance of the given account.
   */
  balance = (params: BalanceParams): Promise<Tokens> =>
    this.caller({ certified: params.certified }).icrc1_balance_of({
      owner: params.owner,
      subaccount: toNullable(params.subaccount),
    });

  /**
   * Transfers tokens from the sender to the given account.
   *
   * @param {TransferArg} params The parameters to transfer tokens.
   *
   * @throws {IcrcTransferError} If the transfer fails.
   */
  transfer = async (params: TransferParams): Promise<BlockIndex> => {
    const response = await this.caller({ certified: true }).icrc1_transfer(
      toTransferArg(params),
    );
    if ("Err" in response) {
      throw new IcrcTransferError({
        errorType: response.Err,
        msg: "Failed to transfer",
      });
    }
    return response.Ok;
  };

  /**
   * Returns the total supply of tokens.
   */
  totalTokensSupply = (params: QueryParams): Promise<Tokens> => {
    return this.caller(params).icrc1_total_supply();
  };

  /**
   * Transfers a token amount from the `from` account to the `to` account using the allowance of the spender's account (`SpenderAccount = { owner = caller; subaccount = spender_subaccount }`). The ledger draws the fees from the `from` account.
   *
   * Reference: https://github.com/dfinity/ICRC-1/blob/main/standards/ICRC-2/README.md#icrc2_transfer_from
   *
   * @param {TransferFromParams} params The parameters to transfer tokens from to.
   *
   * @throws {IcrcTransferError} If the transfer fails.
   */
  transferFrom = async (params: TransferFromParams): Promise<BlockIndex> => {
    const response = await this.caller({ certified: true }).icrc2_transfer_from(
      toTransferFromArgs(params),
    );
    if ("Err" in response) {
      throw new IcrcTransferError({
        errorType: response.Err,
        msg: "Failed to transfer from",
      });
    }
    return response.Ok;
  };
}
