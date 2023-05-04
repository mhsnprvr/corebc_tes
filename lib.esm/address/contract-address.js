import { concat, dataSlice, getBigInt, encodeRlp } from "../utils/index.js";
import { getAddress, getChecksumAddress } from "./address.js";
import { sha256 } from "../index.js";
import { hexDataLength, hexDataSlice } from "../utils/data.js";
import { Logger } from "../logger/logger.js";
import { removeHexPrefix } from "../transaction/address.js";
const logger = new Logger('contract-address/0.0.1');
// http://ethereum.stackexchange.com/questions/760/how-is-the-address-of-an-ethereum-contract-computed
/**
 *  Returns the address that would result from a ``CREATE`` for %%tx%%.
 *
 *  This can be used to compute the address a contract will be
 *  deployed to by an EOA when sending a deployment transaction (i.e.
 *  when the ``to`` address is ``null``).
 *
 *  This can also be used to compute the address a contract will be
 *  deployed to by a contract, by using the contract's address as the
 *  ``to`` and the contract's nonce.
 *
 *  @example
 *    from = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";
 *    nonce = 5;
 *
 *    getCreateAddress({ from, nonce });
 *    //_result:
 */
export function getCreateAddress(tx) {
    const from = getAddress(tx.from);
    const nonce = getBigInt(tx.nonce, "tx.nonce");
    let nonceHex = nonce.toString(16);
    if (nonceHex === "0") {
        nonceHex = "0x";
    }
    else if (nonceHex.length % 2) {
        nonceHex = "0x0" + nonceHex;
    }
    else {
        nonceHex = "0x" + nonceHex;
    }
    return getAddress(dataSlice(sha256(encodeRlp([from, nonceHex])), 12));
}
/**
 *  Returns the address that would result from a ``CREATE2`` operation
 *  with the given %%from%%, %%salt%% and %%initCodeHash%%.

 *  For a quick overview and example of ``CREATE2``, see [[link-ricmoo-wisps]].
 *
 *  @example
 *    // The address of the contract
 *    from = "0x8ba1f109551bD432803012645Ac136ddd64DBA72"
 *
 *    // The salt
 *    salt = id("HelloWorld")
 *
 *    getCreate2Address(from, salt, initCodeHash)
 *    //_result:
 */
export function getCreate2Address(from, salt, initCodeHash) {
    if (hexDataLength(salt) !== 32) {
        logger.throwArgumentError("salt must be 32 bytes", "salt", salt);
    }
    if (hexDataLength(initCodeHash) !== 32) {
        logger.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", initCodeHash);
    }
    const val = hexDataSlice(sha256(concat(["0xff", getAddress(from), salt, initCodeHash], true)), 12);
    console.log({ 'address/address/177=>should be string': val });
    const prefix = from.substring(2, 4);
    const checksum = getChecksumAddress(val, prefix);
    return "0x" + prefix + checksum + removeHexPrefix(val);
}
//# sourceMappingURL=contract-address.js.map