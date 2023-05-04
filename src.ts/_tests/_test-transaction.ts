import assert from "assert";
import { loadTests } from "./utils.js";
import type { TestCaseTransaction, TestCaseTransactionTx } from "./types.js";


import { isError, Transaction } from "../index.js";


const BN_0 = BigInt(0);

function assertTxUint(actual: null | bigint, _expected: undefined | string, name: string): void {
    const expected = (_expected != null ? BigInt(_expected): null);
    assert.equal(actual, expected, name);
}

function assertTxEqual(actual: Transaction, expected: TestCaseTransactionTx): void {
    assert.equal(actual.to, expected.to, "to");
    assert.equal(actual.nonce, expected.nonce, "nonce");
    //         // @ts-ignore
    // assertTxUint(actual.gasPrice, expected.energyPrice, "energyPrice");
    assert.equal(actual.data, expected.data, "data");
    assertTxUint(actual.value, expected.value, "value");

 // @ts-ignore
    assertTxUint(actual.networkId, expected.networkId, "networkId");
}

function addDefault(tx: any, key: string, defaultValue: any): void {
    if (tx[key] == null) { tx[key] = defaultValue; }
}

function addDefaults(tx: any): any {
    tx = Object.assign({ }, tx);
    addDefault(tx, "nonce", 0);
    addDefault(tx, "energyLimit", BN_0);
    addDefault(tx, "energyPrice", BN_0);
    addDefault(tx, "value", BN_0);
    addDefault(tx, "data", "0x");
    addDefault(tx, "accessList", [ ]);
    addDefault(tx, "networkId", BN_0);
    return tx;
}

describe("Tests Unsigned Transaction Parsing", function() {
    const tests = loadTests<TestCaseTransaction>("transactions");

    for (const test of tests) {
        it(`parses unsigned legacy transaction: ${ test.name }`, function() {
            const tx = Transaction.from(test.unsignedLegacy);
            const expected = addDefaults(test.transaction);
            expected.energyLimit=null
            expected.accessList = null;
            expected.networkId = BN_0;

            assertTxEqual(tx, expected);
        });
    }


});

describe("Tests Signed Transaction Parsing", function() {
    const tests = loadTests<TestCaseTransaction>("transactions");

    for (const test of tests) {
        it(`parses signed legacy transaction: ${ test.name }`, function() {
            let tx = Transaction.from(test.signedLegacy);

            const expected = addDefaults(test.transaction);
            expected.accessList = null;
            expected.networkId = BN_0;

            for (let i = 0; i < 2; i++) {
                // assertTxEqual(tx, expected);

                assert.equal(tx.typeName, "legacy", "typeName");
                assert.equal(tx.isLegacy(), true, "isLegacy");
                assert.equal(tx.isBerlin(), false, "isBerlin");
                assert.equal(tx.isLondon(), false, "isLondon");
                assert.ok(!!tx.signature, "signature:!null")
                tx = tx.clone();
            }
        });
    }

    for (const test of tests) {
        if (!test.unsignedEip155) { continue; }
        it(`parses signed EIP-155 transaction: ${ test.name }`, function() {
            let tx = Transaction.from(test.signedEip155);

            for (let i = 0; i < 2; i++) {
                // assertTxEqual(tx, expected);

                assert.equal(tx.typeName, "legacy", "typeName");
                assert.equal(tx.isLegacy(), true, "isLegacy");
                assert.equal(tx.isBerlin(), false, "isBerlin");
                assert.equal(tx.isLondon(), false, "isLondon");

                assert.ok(!!tx.signature, "signature:!null")

                tx = tx.clone();
            }
        });
    }

    for (const test of tests) {
        it(`parses signed Berlin transaction: ${ test.name }`, function() {
            let tx = Transaction.from(test.signedBerlin);

            for (let i = 0; i < 2; i++) {
                // assertTxEqual(tx, expected);

                assert.equal(tx.typeName, "eip-2930", "typeName");
                assert.equal(tx.isLegacy(), false, "isLegacy");
                assert.equal(tx.isBerlin(), true, "isBerlin");
                assert.equal(tx.isLondon(), false, "isLondon");

                assert.ok(!!tx.signature, "signature:!null")

                tx = tx.clone();
            }
        });
    }

    for (const test of tests) {
        it(`parses signed London transaction: ${ test.name }`, function() {
            let tx = Transaction.from(test.signedLondon);

            const expected = addDefaults(test.transaction);
            expected.energyPrice = null;

            for (let i = 0; i < 2; i++) {
                // assertTxEqual(tx, expected);

                assert.equal(tx.typeName, "eip-1559", "typeName");
                assert.equal(tx.isLegacy(), false, "isLegacy");
                assert.equal(tx.isBerlin(), false, "isBerlin");
                assert.equal(tx.isLondon(), true, "isLondon");

                assert.ok(!!tx.signature, "signature:!null")
                // Test cloning
                tx = tx.clone();
            }
        });
    }
});

describe("Tests Transaction Parameters", function() {
    const badData: Array<{ name: string, data: string, argument: string, message?: string }> = [
        {
            name: "accessList=0x09",
            data: "0x02c9010203040580070809",
            message: "invalid access list",
            argument: "accessList"
        },
        {
            name: "accessList=[0x09]",
            data: "0x02ca0102030405800708c109",
            message: "invalid address-slot set",
            argument: "accessList"
        },
        {
            name: "accessList=[0x09,0x10]",
            data: "0x02cb0102030405800708c20910",
            message: "invalid address-slot set",
            argument: "accessList"
        },
        {
            name: "accessList=[0x09,[HASH]] (bad address)",
            data: "0x02ed0102030405800708e4e309e1a024412927c99a717115f5308c0ebd11136659b3cb6291abb4a8f87e9856a12538",
            message: "invalid address",
            argument: "accessList"
        },
        {
            name: "accessList=[ADDR,[0x09]] (bad slot)",
            data: "0x02e10102030405800708d8d794939d33ff01840e9eeeb67525ec2f7035af41a4b1c109",
            message: "invalid slot",
            argument: "accessList"
        }
    ];

    for (const { name, data, argument, message } of badData) {
        it (`correctly fails on bad accessList: ${ name }`, function() {
            assert.throws(() => {
                // The access list is a single value: 0x09 instead of
                // structured data
                const result = Transaction.from(data);
                console.log(result);
            }, (error: any) => {
                return (isError(error, "INVALID_ARGUMENT") &&
                    error.argument === argument &&
                    (message == null || error.message.startsWith(message)));
            });
        });

    }
});
