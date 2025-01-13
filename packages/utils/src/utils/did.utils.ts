import { assertNonNullish } from "./asserts.utils";
import { nonNullish } from "./nullish.utils";

export const toNullable = <T>(value?: T | null): [] | [T] => {
  return nonNullish(value) ? [value] : [];
};

export const fromNullable = <T>(value: [] | [T]): T | undefined => {
  return value?.[0];
};

export const fromDefinedNullable = <T>(value: [] | [T]): T => {
  const result = fromNullable(value);

  assertNonNullish(result);

  return result;
};

/**
 * Extracts the value from a nullish Candid-style variant representation.
 *
 * @template T The type of the value.
 * @param {([] | [T]) | undefined} value - A Candid-style variant or `undefined`.
 * @returns {T | undefined} The extracted value, or `undefined` if the input is nullish or the array is empty.
 */
export const fromNullishNullable = <T>(
  value: ([] | [T]) | undefined,
): T | undefined => fromNullable(value ?? []);
