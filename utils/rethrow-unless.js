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
 *   rethrowUnless(err, DatabaseError, NetworkError);
 *   err // DatabaseError | NetworkError
 * }
 * ```
 *
 * @template {ReadonlyArray<new (...args: any[]) => Error>} E
 * @param {unknown} error - The error to check
 * @param {E} errors - Expected error type(s)
 * @throws The original error if it doesn't match expected type(s)
 * @returns {asserts error is E[number] extends new (...args: any[]) => infer R ? R : never}
 */
export function rethrowUnless(error, ...errors) {
	if (!errors.some((ErrorClass) => error instanceof ErrorClass)) {
		throw error;
	}
}
