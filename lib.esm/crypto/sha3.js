import { Logger } from "../logger/logger.js";
import { arrayify } from "../utils/data.js";
import { createHash, createHmac } from "./crypto.js";
const logger = new Logger('sha3/0.0.1');
const _sha256 = function (data) {
    return createHash("sha256").update(data).digest();
};
const _sha512 = function (data) {
    return createHash("sha512").update(data).digest();
};
// @ts-ignore
let __sha256 = _sha256;
// @ts-ignore
let __sha512 = _sha512;
let locked256 = false, locked512 = false;
/**
 *  Compute the cryptographic SHA2-256 hash of %%data%%.
 *
 *  @_docloc: api/crypto:Hash Functions
 *  @returns DataHexstring
 *
 *  @example:
 *    sha256("0x")
 *    //_result:
 *
 *    sha256("0x1337")
 *    //_result:
 *
 *    sha256(new Uint8Array([ 0x13, 0x37 ]))
 *    //_result:
 *
 */
export var SupportedAlgorithm;
(function (SupportedAlgorithm) {
    SupportedAlgorithm["sha256"] = "sha256";
    SupportedAlgorithm["sha512"] = "sha512";
})(SupportedAlgorithm || (SupportedAlgorithm = {}));
;
export function ripemd160(data) {
    return "0x" + createHash("ripemd160").update(Buffer.from(arrayify(data))).digest("hex");
}
export function sha256(data) {
    return "0x" + createHash("sha3-256").update(Buffer.from(arrayify(data))).digest("hex");
}
export function computeHmac(algorithm, key, data) {
    const d = Buffer.from(arrayify(data));
    const k = Buffer.from(arrayify(key));
    if (algorithm === SupportedAlgorithm.sha256) {
        return "0x" + createHmac("sha3-256", k).update(d).digest("hex");
    }
    else if (algorithm === SupportedAlgorithm.sha512) {
        return "0x" + createHmac("sha3-512", k).update(d).digest("hex");
    }
    logger.throwError("unsupported algorithm - " + algorithm, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "computeHmac",
        algorithm: algorithm
    });
    return "";
}
sha256._ = _sha256;
sha256.lock = function () { locked256 = true; };
sha256.register = function (func) {
    if (locked256) {
        throw new Error("sha256 is locked");
    }
    __sha256 = func;
};
Object.freeze(sha256);
/**
 *  Compute the cryptographic SHA2-512 hash of %%data%%.
 *
 *  @_docloc: api/crypto:Hash Functions
 *  @returns DataHexstring
 *
 *  @example:
 *    sha512("0x")
 *    //_result:
 *
 *    sha512("0x1337")
 *    //_result:
 *
 *    sha512(new Uint8Array([ 0x13, 0x37 ]))
 *    //_result:
 */
export function sha512(data) {
    return "0x" + createHash("sha3-512").update(Buffer.from(arrayify(data))).digest("hex");
}
sha512._ = _sha512;
sha512.lock = function () { locked512 = true; };
sha512.register = function (func) {
    if (locked512) {
        throw new Error("sha512 is locked");
    }
    __sha512 = func;
};
Object.freeze(sha256);
//# sourceMappingURL=sha3.js.map