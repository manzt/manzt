/**
 * Error thrown when an assertion fails.
 */
export class AssertionError extends Error {
	/** @param message The error message. */
	constructor(message: string) {
		super(message);
		this.name = "AssertionError";
	}
}

/**
 * Make an assertion.
 *
 * Usage
 * @example
 * ```ts
 * const value: boolean = Math.random() <= 0.5;
 * assert(value, "value is greater than than 0.5!");
 * value // true
 * ```
 *
 * @param expression - The expression to test.
 * @param msg - The optional message to display if the assertion fails.
 * @returns {asserts expression}
 * @throws an {@link Error} if `expression` is not truthy.
 */
export function assert(expression: unknown, msg = ""): asserts expression {
	if (!expression) throw new AssertionError(msg);
}
