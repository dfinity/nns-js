# utils-js

A collection of utilities and constants for NNS/SNS projects.

[![npm version](https://img.shields.io/npm/v/@dfinity/utils.svg?logo=npm)](https://www.npmjs.com/package/@dfinity/utils) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Table of contents

- [Installation](#installation)
- [Features](#features)

## Installation

You can use `utils-js` by installing it in your project.

```bash
npm i @dfinity/utils
```

The bundle needs peer dependencies, be sure that following resources are available in your project as well.

```bash
npm i @dfinity/agent @dfinity/candid @dfinity/principal
```

## Features

`utils-js` implements following features:

<!-- TSDOC_START -->

### :toolbox: Functions

- [convertStringToE8s](#gear-convertstringtoe8s)
- [isNullish](#gear-isnullish)
- [nonNullish](#gear-nonnullish)
- [notEmptyString](#gear-notemptystring)
- [isEmptyString](#gear-isemptystring)
- [defaultAgent](#gear-defaultagent)
- [createAgent](#gear-createagent)
- [createServices](#gear-createservices)
- [assertNonNullish](#gear-assertnonnullish)
- [asNonNullish](#gear-asnonnullish)
- [assertPercentageNumber](#gear-assertpercentagenumber)
- [uint8ArrayToBigInt](#gear-uint8arraytobigint)
- [bigIntToUint8Array](#gear-biginttouint8array)
- [numberToUint8Array](#gear-numbertouint8array)
- [arrayBufferToUint8Array](#gear-arraybuffertouint8array)
- [uint8ArrayToArrayOfNumber](#gear-uint8arraytoarrayofnumber)
- [arrayOfNumberToUint8Array](#gear-arrayofnumbertouint8array)
- [asciiStringToByteArray](#gear-asciistringtobytearray)
- [hexStringToUint8Array](#gear-hexstringtouint8array)
- [uint8ArrayToHexString](#gear-uint8arraytohexstring)
- [candidNumberArrayToBigInt](#gear-candidnumberarraytobigint)
- [encodeBase32](#gear-encodebase32)
- [decodeBase32](#gear-decodebase32)
- [bigEndianCrc32](#gear-bigendiancrc32)
- [secondsToDuration](#gear-secondstoduration)
- [nowInBigIntNanoSeconds](#gear-nowinbigintnanoseconds)
- [debounce](#gear-debounce)
- [toNullable](#gear-tonullable)
- [fromNullable](#gear-fromnullable)
- [fromDefinedNullable](#gear-fromdefinednullable)
- [fromNullishNullable](#gear-fromnullishnullable)
- [jsonReplacer](#gear-jsonreplacer)
- [jsonReviver](#gear-jsonreviver)
- [principalToSubAccount](#gear-principaltosubaccount)
- [smallerVersion](#gear-smallerversion)

#### :gear: convertStringToE8s

Receives a string representing a number and returns the big int or error.

| Function             | Type                                                  |
| -------------------- | ----------------------------------------------------- |
| `convertStringToE8s` | `(value: string) => bigint or FromStringToTokenError` |

Parameters:

- `amount`: - in string format

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L12)

#### :gear: isNullish

Checks if a given argument is null or undefined.

| Function    | Type                                                                     |
| ----------- | ------------------------------------------------------------------------ |
| `isNullish` | `<T>(argument: T or null or undefined) => argument is null or undefined` |

Parameters:

- `argument`: - The argument to check.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/nullish.utils.ts#L8)

#### :gear: nonNullish

Checks if a given argument is neither null nor undefined.

| Function     | Type                                                                  |
| ------------ | --------------------------------------------------------------------- |
| `nonNullish` | `<T>(argument: T or null or undefined) => argument is NonNullable<T>` |

Parameters:

- `argument`: - The argument to check.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/nullish.utils.ts#L19)

#### :gear: notEmptyString

Checks if a given value is not null, not undefined, and not an empty string.

| Function         | Type                                              |
| ---------------- | ------------------------------------------------- |
| `notEmptyString` | `(value: string or null or undefined) => boolean` |

Parameters:

- `value`: - The value to check.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/nullish.utils.ts#L29)

#### :gear: isEmptyString

Checks if a given value is null, undefined, or an empty string.

| Function        | Type                                              |
| --------------- | ------------------------------------------------- |
| `isEmptyString` | `(value: string or null or undefined) => boolean` |

Parameters:

- `value`: - The value to check.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/nullish.utils.ts#L38)

#### :gear: defaultAgent

Get a default agent that connects to mainnet with the anonymous identity.

| Function       | Type          |
| -------------- | ------------- |
| `defaultAgent` | `() => Agent` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/agent.utils.ts#L10)

#### :gear: createAgent

Create an agent for a given identity

| Function      | Type                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| `createAgent` | `({ identity, host, fetchRootKey, verifyQuerySignatures, retryTimes, }: CreateAgentParams) => Promise<HttpAgent>` |

Parameters:

- `params`: The parameters to create a new HTTP agent
- `params.identity`: A mandatory identity to use for the agent
- `params.host`: An optional host to connect to, particularly useful for local development
- `params.fetchRootKey`: Fetch root key for certificate validation during local development or on testnet
- `params.verifyQuerySignatures`: Check for signatures in the state tree signed by the node that replies to queries - i.e. certify responses.
- `params.retryTimes`: Set the number of retries the agent should perform before error.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/agent.utils.ts#L26)

#### :gear: createServices

| Function         | Type                                                                                                                                                                                                                                                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createServices` | `<T>({ options: { canisterId, serviceOverride, certifiedServiceOverride, agent: agentOption, callTransform, queryTransform, }, idlFactory, certifiedIdlFactory, }: { options: Required<Pick<CanisterOptions<T>, "canisterId">> and Omit<CanisterOptions<T>, "canisterId"> and Pick<...>; idlFactory: InterfaceFactory; certifiedId...` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/actor.utils.ts#L13)

#### :gear: assertNonNullish

| Function           | Type                                                                              |
| ------------------ | --------------------------------------------------------------------------------- |
| `assertNonNullish` | `<T>(value: T, message?: string or undefined) => asserts value is NonNullable<T>` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/asserts.utils.ts#L4)

#### :gear: asNonNullish

| Function       | Type                                                             |
| -------------- | ---------------------------------------------------------------- |
| `asNonNullish` | `<T>(value: T, message?: string or undefined) => NonNullable<T>` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/asserts.utils.ts#L16)

#### :gear: assertPercentageNumber

| Function                 | Type                           |
| ------------------------ | ------------------------------ |
| `assertPercentageNumber` | `(percentage: number) => void` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/asserts.utils.ts#L21)

#### :gear: uint8ArrayToBigInt

| Function             | Type                            |
| -------------------- | ------------------------------- |
| `uint8ArrayToBigInt` | `(array: Uint8Array) => bigint` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/arrays.utils.ts#L3)

#### :gear: bigIntToUint8Array

| Function             | Type                            |
| -------------------- | ------------------------------- |
| `bigIntToUint8Array` | `(value: bigint) => Uint8Array` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/arrays.utils.ts#L15)

#### :gear: numberToUint8Array

| Function             | Type                            |
| -------------------- | ------------------------------- |
| `numberToUint8Array` | `(value: number) => Uint8Array` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/arrays.utils.ts#L31)

#### :gear: arrayBufferToUint8Array

| Function                  | Type                                  |
| ------------------------- | ------------------------------------- |
| `arrayBufferToUint8Array` | `(buffer: ArrayBuffer) => Uint8Array` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/arrays.utils.ts#L40)

#### :gear: uint8ArrayToArrayOfNumber

| Function                    | Type                              |
| --------------------------- | --------------------------------- |
| `uint8ArrayToArrayOfNumber` | `(array: Uint8Array) => number[]` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/arrays.utils.ts#L43)

#### :gear: arrayOfNumberToUint8Array

| Function                    | Type                                |
| --------------------------- | ----------------------------------- |
| `arrayOfNumberToUint8Array` | `(numbers: number[]) => Uint8Array` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/arrays.utils.ts#L46)

#### :gear: asciiStringToByteArray

| Function                 | Type                         |
| ------------------------ | ---------------------------- |
| `asciiStringToByteArray` | `(text: string) => number[]` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/arrays.utils.ts#L49)

#### :gear: hexStringToUint8Array

| Function                | Type                                |
| ----------------------- | ----------------------------------- |
| `hexStringToUint8Array` | `(hexString: string) => Uint8Array` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/arrays.utils.ts#L52)

#### :gear: uint8ArrayToHexString

| Function                | Type                                        |
| ----------------------- | ------------------------------------------- |
| `uint8ArrayToHexString` | `(bytes: Uint8Array or number[]) => string` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/arrays.utils.ts#L60)

#### :gear: candidNumberArrayToBigInt

| Function                    | Type                          |
| --------------------------- | ----------------------------- |
| `candidNumberArrayToBigInt` | `(array: number[]) => bigint` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/arrays.utils.ts#L70)

#### :gear: encodeBase32

Encode an Uint8Array to a base32 string.

| Function       | Type                            |
| -------------- | ------------------------------- |
| `encodeBase32` | `(input: Uint8Array) => string` |

Parameters:

- `input`: The input array to encode.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/base32.utils.ts#L21)

#### :gear: decodeBase32

Decode a base32 string to Uint8Array.

| Function       | Type                            |
| -------------- | ------------------------------- |
| `decodeBase32` | `(input: string) => Uint8Array` |

Parameters:

- `input`: The input string to decode.
- `input`: The base32 encoded string to decode.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/base32.utils.ts#L67)

#### :gear: bigEndianCrc32

| Function         | Type                                |
| ---------------- | ----------------------------------- |
| `bigEndianCrc32` | `(bytes: Uint8Array) => Uint8Array` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/crc.utils.ts#L61)

#### :gear: secondsToDuration

Convert seconds to a human-readable duration, such as "6 days, 10 hours."

| Function            | Type                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `secondsToDuration` | `({ seconds, i18n, }: { seconds: bigint; i18n?: I18nSecondsToDuration or undefined; }) => string` |

Parameters:

- `options`: - The options object.
- `options.seconds`: - The number of seconds to convert.
- `options.i18n`: - The i18n object for customizing language and units. Defaults to English.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/date.utils.ts#L43)

#### :gear: nowInBigIntNanoSeconds

Returns the current timestamp in nanoseconds as a `bigint`.

| Function                 | Type           |
| ------------------------ | -------------- |
| `nowInBigIntNanoSeconds` | `() => bigint` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/date.utils.ts#L115)

#### :gear: debounce

| Function   | Type                                                                              |
| ---------- | --------------------------------------------------------------------------------- |
| `debounce` | `(func: Function, timeout?: number or undefined) => (...args: unknown[]) => void` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/debounce.utils.ts#L2)

#### :gear: toNullable

| Function     | Type                                               |
| ------------ | -------------------------------------------------- |
| `toNullable` | `<T>(value?: T or null or undefined) => [] or [T]` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/did.utils.ts#L4)

#### :gear: fromNullable

| Function       | Type                                      |
| -------------- | ----------------------------------------- |
| `fromNullable` | `<T>(value: [] or [T]) => T or undefined` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/did.utils.ts#L8)

#### :gear: fromDefinedNullable

| Function              | Type                         |
| --------------------- | ---------------------------- |
| `fromDefinedNullable` | `<T>(value: [] or [T]) => T` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/did.utils.ts#L12)

#### :gear: fromNullishNullable

Extracts the value from a nullish Candid-style variant representation.

| Function              | Type                                                   |
| --------------------- | ------------------------------------------------------ |
| `fromNullishNullable` | `<T>(value: [] or [T] or undefined) => T or undefined` |

Parameters:

- `value`: - A Candid-style variant or `undefined`.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/did.utils.ts#L27)

#### :gear: jsonReplacer

A parser that interprets revived BigInt, Principal, and Uint8Array when constructing JavaScript values or objects.

| Function       | Type                                        |
| -------------- | ------------------------------------------- |
| `jsonReplacer` | `(_key: string, value: unknown) => unknown` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/json.utils.ts#L11)

#### :gear: jsonReviver

A function that alters the behavior of the stringification process for BigInt, Principal and Uint8Array.

| Function      | Type                                        |
| ------------- | ------------------------------------------- |
| `jsonReviver` | `(_key: string, value: unknown) => unknown` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/json.utils.ts#L30)

#### :gear: principalToSubAccount

Convert a principal to a Uint8Array 32 length.
e.g. Useful to convert a canister ID when topping up cycles with the Cmc canister

| Function                | Type                                   |
| ----------------------- | -------------------------------------- |
| `principalToSubAccount` | `(principal: Principal) => Uint8Array` |

Parameters:

- `principal`: The principal that needs to be converted to Subaccount

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/principal.utils.ts#L8)

#### :gear: smallerVersion

Returns true if the current version is smaller than the minVersion, false if equal or bigger.
Tags after patch version are ignored, e.g. 1.0.0-beta.1 is considered equal to 1.0.0.

| Function         | Type                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| `smallerVersion` | `({ minVersion, currentVersion, }: { minVersion: string; currentVersion: string; }) => boolean` |

Parameters:

- `params.minVersion`: Ex: "1.0.0"
- `params.currentVersion`: Ex: "2.0.0"

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/version.utils.ts#L28)

### :wrench: Constants

- [E8S_PER_TOKEN](#gear-e8s_per_token)
- [ICPToken](#gear-icptoken)

#### :gear: E8S_PER_TOKEN

| Constant        | Type     |
| --------------- | -------- |
| `E8S_PER_TOKEN` | `bigint` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/constants/constants.ts#L1)

#### :gear: ICPToken

| Constant   | Type    |
| ---------- | ------- |
| `ICPToken` | `Token` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L116)

### :factory: TokenAmount

Deprecated. Use TokenAmountV2 instead which supports decimals !== 8.

Represents an amount of tokens.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L130)

#### Methods

- [fromE8s](#gear-frome8s)
- [fromString](#gear-fromstring)
- [fromNumber](#gear-fromnumber)
- [toE8s](#gear-toe8s)

##### :gear: fromE8s

Initialize from a bigint. Bigint are considered e8s.

| Method    | Type                                                                     |
| --------- | ------------------------------------------------------------------------ |
| `fromE8s` | `({ amount, token, }: { amount: bigint; token: Token; }) => TokenAmount` |

Parameters:

- `params.amount`: The amount in bigint format.
- `params.token`: The token type.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L147)

##### :gear: fromString

Initialize from a string. Accepted formats:

1234567.8901
1'234'567.8901
1,234,567.8901

| Method       | Type                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `fromString` | `({ amount, token, }: { amount: string; token: Token; }) => FromStringToTokenError or TokenAmount` |

Parameters:

- `params.amount`: The amount in string format.
- `params.token`: The token type.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L168)

##### :gear: fromNumber

Initialize from a number.

1 integer is considered E8S_PER_TOKEN

| Method       | Type                                                                     |
| ------------ | ------------------------------------------------------------------------ |
| `fromNumber` | `({ amount, token, }: { amount: number; token: Token; }) => TokenAmount` |

Parameters:

- `params.amount`: The amount in number format.
- `params.token`: The token type.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L198)

##### :gear: toE8s

| Method  | Type           |
| ------- | -------------- |
| `toE8s` | `() => bigint` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L224)

### :factory: TokenAmountV2

Represents an amount of tokens.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L236)

#### Methods

- [fromUlps](#gear-fromulps)
- [fromString](#gear-fromstring)
- [fromNumber](#gear-fromnumber)
- [toUlps](#gear-toulps)
- [toE8s](#gear-toe8s)

##### :gear: fromUlps

Initialize from a bigint. Bigint are considered ulps.

| Method     | Type                                                                       |
| ---------- | -------------------------------------------------------------------------- |
| `fromUlps` | `({ amount, token, }: { amount: bigint; token: Token; }) => TokenAmountV2` |

Parameters:

- `params.amount`: The amount in bigint format.
- `params.token`: The token type.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L249)

##### :gear: fromString

Initialize from a string. Accepted formats:

1234567.8901
1'234'567.8901
1,234,567.8901

| Method       | Type                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| `fromString` | `({ amount, token, }: { amount: string; token: Token; }) => FromStringToTokenError or TokenAmountV2` |

Parameters:

- `params.amount`: The amount in string format.
- `params.token`: The token type.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L270)

##### :gear: fromNumber

Initialize from a number.

1 integer is considered 10^{token.decimals} ulps

| Method       | Type                                                                       |
| ------------ | -------------------------------------------------------------------------- |
| `fromNumber` | `({ amount, token, }: { amount: number; token: Token; }) => TokenAmountV2` |

Parameters:

- `params.amount`: The amount in number format.
- `params.token`: The token type.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L294)

##### :gear: toUlps

| Method   | Type           |
| -------- | -------------- |
| `toUlps` | `() => bigint` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L324)

##### :gear: toE8s

| Method  | Type           |
| ------- | -------------- |
| `toE8s` | `() => bigint` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/parser/token.ts#L332)

### :factory: Canister

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/services/canister.ts#L4)

### :factory: AgentManager

AgentManager class manages HttpAgent instances for different identities.

It caches agents by identity to optimise resource usage and avoid unnecessary agent creation.
Provides functionality to create new agents, retrieve cached agents, and clear the cache when needed.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/agent.utils.ts#L53)

#### Methods

- [create](#gear-create)
- [getAgent](#gear-getagent)
- [clearAgents](#gear-clearagents)

##### :gear: create

Static factory method to create a new AgentManager instance.

This method serves as an alternative to directly using the private constructor,
making it more convenient to create instances of `AgentManager` using a simple and clear method.

| Method   | Type                                           |
| -------- | ---------------------------------------------- |
| `create` | `(config: AgentManagerConfig) => AgentManager` |

Parameters:

- `config`: - Configuration options for the AgentManager instance.
- `config.fetchRootKey`: - Whether to fetch the root key for certificate validation.
- `config.host`: - The host to connect to.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/agent.utils.ts#L69)

##### :gear: getAgent

Get or create an HTTP agent for a given identity.

If the agent for the specified identity has been created and cached, it is retrieved from the cache.
If no agent exists for the identity, a new one is created, cached, and then returned.

| Method     | Type                                                             |
| ---------- | ---------------------------------------------------------------- |
| `getAgent` | `({ identity, }: { identity: Identity; }) => Promise<HttpAgent>` |

Parameters:

- `identity`: - The identity to be used to create the agent.

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/agent.utils.ts#L82)

##### :gear: clearAgents

Clear the cache of HTTP agents.

This method removes all cached agents, forcing new agent creation on the next request for any identity.
Useful when identities have changed or if you want to reset all active connections.

| Method        | Type         |
| ------------- | ------------ |
| `clearAgents` | `() => void` |

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/agent.utils.ts#L114)

### :factory: InvalidPercentageError

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/asserts.utils.ts#L1)

### :factory: NullishError

[:link: Source](https://github.com/dfinity/ic-js/tree/main/packages/utils/src/utils/asserts.utils.ts#L2)

### :nut_and_bolt: Enum

- [FromStringToTokenError](#gear-fromstringtotokenerror)

#### :gear: FromStringToTokenError

| Property                      | Type | Description |
| ----------------------------- | ---- | ----------- |
| `FractionalMoreThan8Decimals` | ``   |             |
| `InvalidFormat`               | ``   |             |
| `FractionalTooManyDecimals`   | ``   |             |

<!-- TSDOC_END -->
