// Copyright (c) 2024 Trevor Manz. All rights reserved. MIT License.

/**
 * Make an assertion.
 *
 * @example
 * ```ts
 * const value: boolean = Math.random() <= 0.5;
 * assert(value, "value is greater than than 0.5!");
 * value // true
 * ```
 *
 * @param expression The expression to test.
 * @param msg The optional message to display if the assertion fails.
 * @throws an {@link Error} if `expression` is not truthy.
 */
export function assert(expression: unknown, msg = ""): asserts expression {
	if (!expression) throw new Error(msg);
}
