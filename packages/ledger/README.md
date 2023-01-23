# ledger-js

A library for interfacing with an [ICRC-1 ledger](https://github.com/dfinity/ic/tree/master/rs/rosetta-api/icrc1).

[![npm version](https://img.shields.io/npm/v/@dfinity/ledger.svg?logo=npm)](https://www.npmjs.com/package/@dfinity/ledger) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

You can use `ledger-js` by installing it in your project.

```bash
npm i @dfinity/ledger
```

The bundle needs peer dependencies, be sure that following resources are available in your project as well.

```bash
npm i @dfinity/agent @dfinity/candid @dfinity/principal @dfinity/utils
```

## Usage

The features are available through the class `LedgerCanister`. It has to be instantiated with a canister ID.

e.g. fetching a token metadata.

```ts
import { LedgerCanister } from "@dfinity/ledger";
import { createAgent } from "@dfinity/utils";

const agent = await createAgent({
  identity,
  host: HOST,
});

const { metadata } = LedgerCanister.create({
  agent,
  canisterId: MY_LEDGER_CANISTER_ID,
});

const data = await metadata();
```

## Features

`ledger-js` implements following features:

<!-- TSDOC_START -->

### :toolbox: Functions

- [encodeIcrc1Account](#gear-encodeicrc1account)
- [decodeIcrc1Account](#gear-decodeicrc1account)

#### :gear: encodeIcrc1Account

Encodes an Icrc1 account into a string.
Formatting Reference: https://github.com/dfinity/ICRC-1/pull/55/files#diff-b335630551682c19a781afebcf4d07bf978fb1f8ac04c6bf87428ed5106870f5R238

| Function | Type |
| ---------- | ---------- |
| `encodeIcrc1Account` | `({ owner, subaccount, }: Icrc1Account) => string` |

Parameters:

* `account`: : Principal, subaccount?: Uint8Array }


#### :gear: decodeIcrc1Account

Decodes a string into an Icrc1 account.
Formatting Reference: https://github.com/dfinity/ICRC-1/pull/55/files#diff-b335630551682c19a781afebcf4d07bf978fb1f8ac04c6bf87428ed5106870f5R268

| Function | Type |
| ---------- | ---------- |
| `decodeIcrc1Account` | `(accountString: string) => Icrc1Account` |

Parameters:

* `accountString`: string



### :factory: Icrc1LedgerCanister



#### Constructors

`public`



#### Methods

- [create](#gear-create)
- [metadata](#gear-metadata)
- [transactionFee](#gear-transactionfee)
- [balance](#gear-balance)
- [transfer](#gear-transfer)

##### :gear: create

| Method | Type |
| ---------- | ---------- |
| `create` | `(options: Icrc1LedgerCanisterOptions<_SERVICE>) => Icrc1LedgerCanister` |

##### :gear: metadata

The token metadata (name, symbol, etc.).

| Method | Type |
| ---------- | ---------- |
| `metadata` | `(params: QueryParams) => Promise<Icrc1TokenMetadataResponse>` |

##### :gear: transactionFee

The ledger transaction fees.

| Method | Type |
| ---------- | ---------- |
| `transactionFee` | `(params: QueryParams) => Promise<bigint>` |

##### :gear: balance

Returns the balance of the given account.

| Method | Type |
| ---------- | ---------- |
| `balance` | `(params: BalanceParams) => Promise<bigint>` |

Parameters:

* `params`: The parameters to get the balance of an account.


##### :gear: transfer

Transfers tokens from the sender to the given account.

| Method | Type |
| ---------- | ---------- |
| `transfer` | `(params: TransferParams) => Promise<bigint>` |

Parameters:

* `params`: The parameters to transfer tokens.



<!-- TSDOC_END -->