import { sha256 } from "../ethers.js";
import { toUtf8Bytes } from "../utils/index.js";

/**
 *  A simple hashing function which operates on UTF-8 strings to
 *  compute an 32-byte identifier.
 *
 *
 *  @example:
 *    id("hello world")
 *    //_result:
 */
export function id(value: string): string {
    return sha256(toUtf8Bytes(value));
}
