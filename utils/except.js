/**
 * @typedef {new (...args: any[]) => Error} ErrorConstructor
 */

/**
 * @template T
 * @typedef {T extends new (...args: any[]) => infer R ? R : never} InstanceType
 */

/**
 * @template {ReadonlyArray<new (...args: any[]) => any>} T
 * @typedef {InstanceType<T[number]>} UnionInstanceType
 */

/**
 * Ensures an error matches expected type(s), otherwise rethrows.
 *
 * Unmatched errors bubble up, like Python's `except`. Narrows error types for
 * type-safe property access.
 *
 * Usage
 * @example
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
 * @template {ReadonlyArray<ErrorConstructor>} E
 * @param {unknown} error - The error to check
 * @param {E} errors - Expected error type(s)
 * @throws The original error if it doesn't match expected type(s)
 * @returns {asserts error is UnionInstanceType<E>}
 */
export function except(error, ...errors) {
	if (!errors.some((ErrorClass) => error instanceof ErrorClass)) {
		throw error;
	}
}
