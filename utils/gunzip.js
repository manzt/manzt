/**
 * Decompresses a gzipped Uint8Array or ReadableStream into a Uint8Array.
 *
 * Uses the browser's built-in `DecompressionStream` for gzip decompression.
 *
 * Usage
 * @example
 * ```typescript
 * const compressed = new Uint8Array([
 *   0x1f, 0x8b, 0x08, 0x00, 0x1e, 0xc0, 0x7e, 0x67, 0x00, 0x03, 0xf3, 0x48,
 *   0xcd, 0xc9, 0xc9, 0xd7, 0x51, 0x28, 0xcf, 0x2f, 0xca, 0x49, 0x51, 0x04,
 *   0x00, 0xe6, 0xc6, 0xe6, 0xeb, 0x0d, 0x00, 0x00, 0x00
 * ]);
 * const decompressed = await gunzip(compressed);
 * console.log(new TextDecoder().decode(decompressed)); // "Hello, world!"
 * ```
 *
 * @param {Uint8Array | ReadableStream<Uint8Array>} compressed - The gzipped data to decompress.
 * @returns {Promise<Uint8Array>} The decompressed data.
 */
export async function gunzip(compressed) {
	let stream = compressed instanceof ReadableStream
		? compressed
		: new ReadableStream({
			start(controller) {
				controller.enqueue(compressed);
				controller.close();
			},
		});

	let reader = stream
		.pipeThrough(new DecompressionStream("gzip"))
		.getReader();

	/** @type {Array<Uint8Array>} */
	let buffers = [];
	let totalSize = 0;
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		}
		buffers.push(value);
		totalSize += value.length;
	}

	// If only one chunk, return it directly
	if (buffers.length === 1) {
		return buffers[0];
	}

	// Otherwise merge all chunks into a single Uint8Array
	let index = 0;
	let output = new Uint8Array(totalSize);
	for (let buffer of buffers) {
		output.set(buffer, index);
		index += buffer.length;
	}

	return output;
}
