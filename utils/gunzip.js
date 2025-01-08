/**
 * Decompresses a gzipped Uint8Array into a Uint8Array.
 *
 * This function uses the browser's built-in `DecompressionStream` to handle gzip decompression.
 *
 * Usage
 * @example
 * ```typescript
 * const response = await fetch("https://example.com/data.gz");
 * const compressed = new Uint8Array(await response.arrayBuffer());
 * const decompressed = await gunzip(compressed);
 * console.log(new TextDecoder().decode(decompressed)); // Logs the decompressed text
 * ```
 *
 * @param {Uint8Array} compressedBytes - The gzipped data to decompress.
 * @returns {Promise<Uint8Array>} - A promise that resolves to the decompressed data.
 */
export async function gunzip(compressedBytes) {
	const { value } = await new ReadableStream({
		start(controller) {
			controller.enqueue(compressedBytes);
			controller.close();
		},
	})
		.pipeThrough(new DecompressionStream("gzip"))
		.getReader()
		.read();

	if (!value) {
		throw new Error("Decompression failed: No data returned.");
	}

	return value;
}
