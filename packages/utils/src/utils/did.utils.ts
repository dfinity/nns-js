import { assertNonNullish } from "./asserts.utils";
import { nonNullish } from "./nullish.utils";

/**
 * Converts a value into a Candid-style variant representation of an optional value.
 *
 * @template T The type of the value.
 * @param {T | null | undefined} value - The value to convert into a Candid-style variant.
 * @returns {[] | [T]} A Candid-style variant representation: an empty array for `null` and `undefined` or an array with the value.
 */
export const toNullable = <T>(value?: T | null): [] | [T] => {
  return nonNullish(value) ? [value] : [];
};

/**
 * Extracts the value from a Candid-style variant representation of an optional value.
 *
 * @template T The type of the value.
 * @param {[] | [T]} value - A Candid-style variant representing an optional value.
 * @returns {T | undefined} The extracted value, or `undefined` if the array is empty.
 */
export const fromNullable = <T>(value: [] | [T]): T | undefined => {
  return value?.[0];
};

/**
 * Extracts the value from a Candid-style variant representation of an optional value,
 * ensuring the value is defined. Throws an error if the array is empty or the value is nullish.
 *
 * @template T The type of the value.
 * @param {[] | [T]} value - A Candid-style variant representing an optional value.
 * @returns {T} The extracted value.
 * @throws {Error} If the array is empty or the value is nullish.
 */
export const fromDefinedNullable = <T>(value: [] | [T]): T => {
  const result = fromNullable(value);

  assertNonNullish(result);

  return result;
};
