// Copyright (c) 2024 Trevor Manz. All rights reserved. MIT License.

// deno-lint-ignore no-explicit-any
type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : never;

// deno-lint-ignore no-explicit-any
type UnionInstanceType<T extends readonly (new (...args: any[]) => any)[]> =
	InstanceType<T[number]>;

/**
 * Ensures an error matches expected type(s), otherwise rethrows.
 *
 * Unmatched errors bubble up, like Python's `except`. Narrows error types for
 * type-safe property access.
 *
 * ```ts
 * class DatabaseError extends Error {}
 * class NetworkError extends Error {}
 *
 * try {
 *   await db.query();
 * } catch (err) {
 *   except(err, DatabaseError, NetworkError);
 *   err // DatabaseError | NetworkError
 * }
 * ```
 *
 * @param error - The error to check
 * @param errorClasses - Expected error type(s)
 * @throws The original error if it doesn't match expected type(s)
 */
export function except<
	// deno-lint-ignore no-explicit-any
	ErrorClasses extends readonly (new (...args: any[]) => Error)[],
>(
	error: unknown,
	...errorClasses: ErrorClasses
): asserts error is UnionInstanceType<ErrorClasses> {
	if (!errorClasses.some((ErrorClass) => error instanceof ErrorClass)) {
		throw error;
	}
}
