import { Signature } from "../crypto/index.js";
import type { BigNumberish, BytesLike } from "../utils/index.js";
import type { SignatureLike } from "../crypto/index.js";
import type { AccessList } from "./index.js";
export interface TransactionLike<A = string> {
    /**
     *  The recipient address or ``null`` for an ``init`` transaction.
     */
    to?: null | A;
    /**
     *  The sender.
     */
    from?: null | A;
    /**
     *  The nonce.
     */
    nonce?: null | number;
    /**
     *  The maximum amount of energy that can be used.
     */
    energyLimit?: null | BigNumberish;
    /**
     *  The energy price for legacy and berlin transactions.
     */
    energyPrice?: null | BigNumberish;
    /**
     *  The data.
     */
    data?: null | string;
    /**
     *  The value (in wei) to send.
     */
    value?: null | BigNumberish;
    /**
     *  The chain ID the transaction is valid on.
     */
    networkId?: null | BigNumberish;
    /**
     *  The transaction hash.
     */
    hash?: null | string;
    /**
     *  The signature provided by the sender.
     */
    signature?: null | SignatureLike;
}
/**
 *  A **Transaction** describes an operation to be executed on
 *  Ethereum by an Externally Owned Account (EOA). It includes
 *  who (the [[to]] address), what (the [[data]]) and how much (the
 *  [[value]] in ether) the operation should entail.
 *
 *  @example:
 *    tx = new Transaction()
 *    //_result:
 *
 *    tx.data = "0x1234";
 *    //_result:
 */
export declare class Transaction implements TransactionLike<string> {
    #private;
    /**
     *  The transaction type.
     *
     *  If null, the type will be automatically inferred based on
     *  explicit properties.
     */
    get type(): null | number;
    set type(value: null | number | string);
    /**
     *  The name of the transaction type.
     */
    get typeName(): null | string;
    /**
     *  The ``to`` address for the transaction or ``null`` if the
     *  transaction is an ``init`` transaction.
     */
    get to(): null | string;
    set to(value: null | string);
    /**
     *  The transaction nonce.
     */
    get nonce(): number;
    set nonce(value: BigNumberish);
    /**
     *  The energy limit.
     */
    get energyLimit(): bigint;
    set energyLimit(value: BigNumberish);
    /**
     *  The energy price.
     *
     *  On legacy networks this defines the fee that will be paid. On
     *  EIP-1559 networks, this should be ``null``.
     */
    get energyPrice(): null | bigint;
    set energyPrice(value: null | BigNumberish);
    /**
     *  The transaction data. For ``init`` transactions this is the
     *  deployment code.
     */
    get data(): string;
    set data(value: BytesLike);
    /**
     *  The amount of ether (in wei) to send in this transactions.
     */
    get value(): bigint;
    set value(value: BigNumberish);
    /**
     *  The chain ID this transaction is valid on.
     */
    get networkId(): bigint;
    set networkId(value: BigNumberish);
    /**
     *  If signed, the signature for this transaction.
     */
    get signature(): null | string;
    set signature(value: null | SignatureLike);
    /**
     *  Creates a new Transaction with default values.
     */
    constructor();
    /**
     *  The transaction hash, if signed. Otherwise, ``null``.
     */
    get hash(): null | string;
    /**
     *  The pre-image hash of this transaction.
     *
     *  This is the digest that a [[Signer]] must sign to authorize
     *  this transaction.
     */
    get unsignedHash(): string;
    /**
     *  The sending address, if signed. Otherwise, ``null``.
     */
    get from(): null | string;
    /**
     *  The public key of the sender, if signed. Otherwise, ``null``.
     */
    get fromPublicKey(): null | string;
    /**
     *  Returns true if signed.
     *
     *  This provides a Type Guard that properties requiring a signed
     *  transaction are non-null.
     */
    isSigned(): this is (Transaction & {
        type: number;
        typeName: string;
        from: string;
        signature: Signature;
    });
    /**
     *  The serialized transaction.
     *
     *  This throws if the transaction is unsigned. For the pre-image,
     *  use [[unsignedSerialized]].
     */
    get serialized(): string;
    /**
     *  The transaction pre-image.
     *
     *  The hash of this is the digest which needs to be signed to
     *  authorize this transaction.
     */
    get unsignedSerialized(): string;
    /**
     *  Return the most "likely" type; currently the highest
     *  supported transaction type.
     */
    inferType(): number;
    /**
     *  Validates the explicit properties and returns a list of compatible
     *  transaction types.
     */
    inferTypes(): Array<number>;
    /**
     *  Returns true if this transaction is a legacy transaction (i.e.
     *  ``type === 0``).
     *
     *  This provides a Type Guard that the related properties are
     *  non-null.
     */
    isLegacy(): this is (Transaction & {
        type: 0;
        energyPrice: bigint;
    });
    /**
     *  Returns true if this transaction is berlin hardform transaction (i.e.
     *  ``type === 1``).
     *
     *  This provides a Type Guard that the related properties are
     *  non-null.
     */
    isBerlin(): this is (Transaction & {
        type: 1;
        energyPrice: bigint;
        accessList: AccessList;
    });
    /**
     *  Returns true if this transaction is london hardform transaction (i.e.
     *  ``type === 2``).
     *
     *  This provides a Type Guard that the related properties are
     *  non-null.
     */
    isLondon(): this is (Transaction & {
        type: 2;
        accessList: AccessList;
        maxFeePerEnergy: bigint;
        maxPriorityFeePerEnergy: bigint;
    });
    /**
     *  Create a copy of this transaciton.
     */
    clone(): Transaction;
    /**
     *  Return a JSON-friendly object.
     */
    toJSON(): any;
    /**
     *  Create a **Transaction** from a serialized transaction or a
     *  Transaction-like object.
     */
    static from(tx?: string | TransactionLike<string>): Transaction;
}
//# sourceMappingURL=transaction.d.ts.map