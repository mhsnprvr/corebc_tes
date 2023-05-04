import { Contract, getDefaultProvider } from "../ethers.js";
import assert from "assert";
const contractData = {
    "deployer": "0xE78e48deF8A432Ed0e9287d5678496E759e8A564",
    "source": "pragma solidity ^0.4.20;\npragma experimental ABIEncoderV2;\n\ncontract TestContract {\n    struct TestStruct {\n        address p0;\n        uint256 p1;\n    }\n\n    struct TestStructParent {\n        address p0;\n        uint256 p1;\n        TestStruct child;\n    }\n\n    event Test(address p0, uint256 p2);\n    event TestP0(address indexed p0, uint256 p2);\n    event TestP0P1(address indexed p0, uint256 indexed p2);\n\n    event TestAnon(address p0, uint256 p2) anonymous;\n    event TestAnonP0(address indexed p0, uint256 p2) anonymous;\n    event TestAnonP0P1(address indexed p0, uint256 indexed p2) anonymous;\n\n    event TestIndexedString(string indexed p2, uint256 p1);\n\n    event TestV2(TestStruct indexed p0, TestStruct p1);\n    event TestV2Nested(TestStructParent indexed p0, TestStructParent p1);\n\n    /*\n    event TestV2Array(TestStruct indexed p0[2], TestStruct p1[2]);\n    event TestV2NestedArray(TestStructParent indexed p0[2], TestStructParent p1[2]);\n\n    event TestV2DynamicArray(TestStruct indexed p0[], TestStruct p1[]);\n    event TestV2NestedDynamicArray(TestStructParent indexed p0[], TestStructParent p1[]);\n    */\n\n    event TestHash(string name, bytes32 hash);\n\n    function testEvents(address p0, uint256 p1, string p2) public {\n\n        Test(p0, p1);\n        TestP0(p0, p1);\n        TestP0P1(p0, p1);\n\n        TestAnon(p0, p1);\n        TestAnonP0(p0, p1);\n        TestAnonP0P1(p0, p1);\n\n        TestIndexedString(p2, p1);\n\n        TestStruct memory testStruct;\n        testStruct.p0 = p0;\n        testStruct.p1 = p1;\n\n        TestStructParent memory testStructParent;\n        testStructParent.p0 = address(uint160(p0) + 1);\n        testStructParent.p1 = p1 + 1;\n        testStructParent.child = testStruct;\n\n        TestV2(testStruct, testStruct);\n        TestV2Nested(testStructParent, testStructParent);\n\n        TestHash(\"TestStructKeccak256\", keccak256(testStruct));\n        TestHash(\"TestStructParentKeccak256\", keccak256(testStructParent));\n    }\n\n    function testV2(TestStructParent p0) public pure returns (TestStructParent result) {\n        p0.p0 = address(uint160(p0.p0) + 0xf0);\n        p0.p1 += 0xf0;\n        p0.child.p0 = address(uint160(p0.child.p0) + 0x0f);\n        p0.child.p1 += 0x0f;\n\n        return p0;\n    }\n\n    function testSingleResult(uint32 p0) public pure returns (uint32 r0) {\n        r0 = p0 + 1;\n    }\n\n    function testMultiResult(uint32 p0) public pure returns (uint32 r0, uint32 r1) {\n        r0 = p0 + 1;\n        r1 = p0 + 2;\n    }\n}\n",
    "optimize": 1,
    "timestamp": 1528239748494,
    "bytecode": "0x6060604052341561000f57600080fd5b61088f8061001e6000396000f3006060604052600436106100615763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663132414eb811461006657806361096af31461009a57806370e4a0e6146100c6578063babf8901146100f1575b600080fd5b341561007157600080fd5b61008461007f36600461063d565b610111565b60405161009191906107b5565b60405180910390f35b34156100a557600080fd5b6100b86100b336600461063d565b610117565b6040516100919291906107c3565b34156100d157600080fd5b6100e46100df366004610617565b610124565b604051610091919061078b565b34156100fc57600080fd5b61010f61010a3660046105b2565b61017b565b005b60010190565b6001810191600290910190565b61012c610453565b8151600160a060020a0360f09182011683526020830181815101905250604082015151600f018260400151600160a060020a039091169052600f60408301516020018181510190525090919050565b610183610479565b61018b610453565b7f4ba54330f8090ac87ed0a0b470fd9c8a6bbec84bfe94f4fa7776d1dc27da9f9c85856040516101bc92919061073b565b60405180910390a184600160a060020a03167f02d0f5cbd3582d62980b4541ea596241400b46b70e62e8f5d4191b59e5256b79856040516101fd91906107a7565b60405180910390a28385600160a060020a03167f259f1a317c656f6d04907e133c9444121c489db10cc9ae0cb8e5089fb24579bd60405160405180910390a3848460405161024c92919061073b565b60405180910390a084600160a060020a03168460405161026c91906107a7565b60405180910390a18385600160a060020a031660405160405180910390a2826040518082805190602001908083835b602083106102ba5780518252601f19909201916020918201910161029b565b6001836020036101000a038019825116818451161790925250505091909101925060409150505180910390207f64c167146cf1edcaf437640ce9016042b5d80b35064b04ad29af4b8b1420db908560405161031591906107a7565b60405180910390a2600160a060020a03808616835260208084018690526001808801909216835290850190820152604080820183905282907fe85f025e05a85adc87cd1791754b085143ee32261f66e8b6118e8229b494dcdb9082905161037c9190610799565b60405180910390a2807fe0f519dd634b43e6774158c4064aeaeb81762b6577a8c8b8c65b53053fd915fc826040516103b4919061078b565b60405180910390a27fd8b63a613757c85c5a7bc41a52505a0a5d424f9c1a0cdb6d86c53af2f392d8188260405190815260200160405180910390206040516103fc9190610756565b60405180910390a17fd8b63a613757c85c5a7bc41a52505a0a5d424f9c1a0cdb6d86c53af2f392d818816040519081526020016040518091039020604051610444919061077b565b60405180910390a15050505050565b60806040519081016040908152600080835260208301528101610474610479565b905290565b604080519081016040526000808252602082015290565b600061049c8235610831565b9392505050565b6000601f82018390126104b557600080fd5b81356104c86104c382610809565b6107de565b915080825260208301602083018583830111156104e457600080fd5b6104ef838284610849565b50505092915050565b60006080828403121561050a57600080fd5b61051460606107de565b905060006105228484610490565b82525060206105338484830161059a565b602083015250604061054784828501610553565b60408301525092915050565b60006040828403121561056557600080fd5b61056f60406107de565b9050600061057d8484610490565b825250602061058e8484830161059a565b60208301525092915050565b600061049c823561083d565b600061049c8235610840565b6000806000606084860312156105c757600080fd5b60006105d38686610490565b93505060206105e48682870161059a565b925050604084013567ffffffffffffffff81111561060157600080fd5b61060d868287016104a3565b9150509250925092565b60006080828403121561062957600080fd5b600061063584846104f8565b949350505050565b60006020828403121561064f57600080fd5b600061063584846105a6565b61066481610831565b82525050565b6106648161083d565b601381527f546573745374727563744b656363616b32353600000000000000000000000000602082015260400190565b601981527f54657374537472756374506172656e744b656363616b32353600000000000000602082015260400190565b6080820181516106e3848261065b565b5060208201516106f6602085018261066a565b506040820151610709604085018261070f565b50505050565b60408201815161071f848261065b565b506020820151610709602085018261066a565b61066481610840565b60408101610749828561065b565b61049c602083018461066a565b6040808252810161076681610673565b9050610775602083018461066a565b92915050565b60408082528101610766816106a3565b6080810161077582846106d3565b60408101610775828461070f565b60208101610775828461066a565b602081016107758284610732565b604081016107d18285610732565b61049c6020830184610732565b6000604051905081810181811067ffffffffffffffff8211171561080157600080fd5b604052919050565b600067ffffffffffffffff82111561082057600080fd5b506020601f91909101601f19160190565b600160a060020a031690565b90565b63ffffffff1690565b828183375060009101525600a265627a7a72305820738426ffc61b45a331eec053537d02526e13fd71949a31290da38ec04e43f1f46c6578706572696d656e74616cf50037",
    "compiler": "0.4.20+commit.3155dd80",
    "functionHashes": {
        "testEvents(address,uint256,string)": "babf8901",
        "testMultiResult(uint32)": "61096af3",
        "testSingleResult(uint32)": "132414eb",
        "testV2((address,uint256,(address,uint256)))": "70e4a0e6"
    },
    "interface": "[{\"constant\":true,\"inputs\":[{\"name\":\"p0\",\"type\":\"uint32\"}],\"name\":\"testSingleResult\",\"outputs\":[{\"name\":\"r0\",\"type\":\"uint32\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"p0\",\"type\":\"uint32\"}],\"name\":\"testMultiResult\",\"outputs\":[{\"name\":\"r0\",\"type\":\"uint32\"},{\"name\":\"r1\",\"type\":\"uint32\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"components\":[{\"name\":\"p0\",\"type\":\"address\"},{\"name\":\"p1\",\"type\":\"uint256\"},{\"components\":[{\"name\":\"p0\",\"type\":\"address\"},{\"name\":\"p1\",\"type\":\"uint256\"}],\"name\":\"child\",\"type\":\"tuple\"}],\"name\":\"p0\",\"type\":\"tuple\"}],\"name\":\"testV2\",\"outputs\":[{\"components\":[{\"name\":\"p0\",\"type\":\"address\"},{\"name\":\"p1\",\"type\":\"uint256\"},{\"components\":[{\"name\":\"p0\",\"type\":\"address\"},{\"name\":\"p1\",\"type\":\"uint256\"}],\"name\":\"child\",\"type\":\"tuple\"}],\"name\":\"result\",\"type\":\"tuple\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"p0\",\"type\":\"address\"},{\"name\":\"p1\",\"type\":\"uint256\"},{\"name\":\"p2\",\"type\":\"string\"}],\"name\":\"testEvents\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"p0\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"p2\",\"type\":\"uint256\"}],\"name\":\"Test\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"p0\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"p2\",\"type\":\"uint256\"}],\"name\":\"TestP0\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"p0\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"p2\",\"type\":\"uint256\"}],\"name\":\"TestP0P1\",\"type\":\"event\"},{\"anonymous\":true,\"inputs\":[{\"indexed\":false,\"name\":\"p0\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"p2\",\"type\":\"uint256\"}],\"name\":\"TestAnon\",\"type\":\"event\"},{\"anonymous\":true,\"inputs\":[{\"indexed\":true,\"name\":\"p0\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"p2\",\"type\":\"uint256\"}],\"name\":\"TestAnonP0\",\"type\":\"event\"},{\"anonymous\":true,\"inputs\":[{\"indexed\":true,\"name\":\"p0\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"p2\",\"type\":\"uint256\"}],\"name\":\"TestAnonP0P1\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"p2\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"p1\",\"type\":\"uint256\"}],\"name\":\"TestIndexedString\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"components\":[{\"name\":\"p0\",\"type\":\"address\"},{\"name\":\"p1\",\"type\":\"uint256\"}],\"indexed\":true,\"name\":\"p0\",\"type\":\"tuple\"},{\"components\":[{\"name\":\"p0\",\"type\":\"address\"},{\"name\":\"p1\",\"type\":\"uint256\"}],\"indexed\":false,\"name\":\"p1\",\"type\":\"tuple\"}],\"name\":\"TestV2\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"components\":[{\"name\":\"p0\",\"type\":\"address\"},{\"name\":\"p1\",\"type\":\"uint256\"},{\"components\":[{\"name\":\"p0\",\"type\":\"address\"},{\"name\":\"p1\",\"type\":\"uint256\"}],\"name\":\"child\",\"type\":\"tuple\"}],\"indexed\":true,\"name\":\"p0\",\"type\":\"tuple\"},{\"components\":[{\"name\":\"p0\",\"type\":\"address\"},{\"name\":\"p1\",\"type\":\"uint256\"},{\"components\":[{\"name\":\"p0\",\"type\":\"address\"},{\"name\":\"p1\",\"type\":\"uint256\"}],\"name\":\"child\",\"type\":\"tuple\"}],\"indexed\":false,\"name\":\"p1\",\"type\":\"tuple\"}],\"name\":\"TestV2Nested\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"name\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"hash\",\"type\":\"bytes32\"}],\"name\":\"TestHash\",\"type\":\"event\"}]",
    "runtimeBytecode": "0x6060604052600436106100615763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663132414eb811461006657806361096af31461009a57806370e4a0e6146100c6578063babf8901146100f1575b600080fd5b341561007157600080fd5b61008461007f36600461063d565b610111565b60405161009191906107b5565b60405180910390f35b34156100a557600080fd5b6100b86100b336600461063d565b610117565b6040516100919291906107c3565b34156100d157600080fd5b6100e46100df366004610617565b610124565b604051610091919061078b565b34156100fc57600080fd5b61010f61010a3660046105b2565b61017b565b005b60010190565b6001810191600290910190565b61012c610453565b8151600160a060020a0360f09182011683526020830181815101905250604082015151600f018260400151600160a060020a039091169052600f60408301516020018181510190525090919050565b610183610479565b61018b610453565b7f4ba54330f8090ac87ed0a0b470fd9c8a6bbec84bfe94f4fa7776d1dc27da9f9c85856040516101bc92919061073b565b60405180910390a184600160a060020a03167f02d0f5cbd3582d62980b4541ea596241400b46b70e62e8f5d4191b59e5256b79856040516101fd91906107a7565b60405180910390a28385600160a060020a03167f259f1a317c656f6d04907e133c9444121c489db10cc9ae0cb8e5089fb24579bd60405160405180910390a3848460405161024c92919061073b565b60405180910390a084600160a060020a03168460405161026c91906107a7565b60405180910390a18385600160a060020a031660405160405180910390a2826040518082805190602001908083835b602083106102ba5780518252601f19909201916020918201910161029b565b6001836020036101000a038019825116818451161790925250505091909101925060409150505180910390207f64c167146cf1edcaf437640ce9016042b5d80b35064b04ad29af4b8b1420db908560405161031591906107a7565b60405180910390a2600160a060020a03808616835260208084018690526001808801909216835290850190820152604080820183905282907fe85f025e05a85adc87cd1791754b085143ee32261f66e8b6118e8229b494dcdb9082905161037c9190610799565b60405180910390a2807fe0f519dd634b43e6774158c4064aeaeb81762b6577a8c8b8c65b53053fd915fc826040516103b4919061078b565b60405180910390a27fd8b63a613757c85c5a7bc41a52505a0a5d424f9c1a0cdb6d86c53af2f392d8188260405190815260200160405180910390206040516103fc9190610756565b60405180910390a17fd8b63a613757c85c5a7bc41a52505a0a5d424f9c1a0cdb6d86c53af2f392d818816040519081526020016040518091039020604051610444919061077b565b60405180910390a15050505050565b60806040519081016040908152600080835260208301528101610474610479565b905290565b604080519081016040526000808252602082015290565b600061049c8235610831565b9392505050565b6000601f82018390126104b557600080fd5b81356104c86104c382610809565b6107de565b915080825260208301602083018583830111156104e457600080fd5b6104ef838284610849565b50505092915050565b60006080828403121561050a57600080fd5b61051460606107de565b905060006105228484610490565b82525060206105338484830161059a565b602083015250604061054784828501610553565b60408301525092915050565b60006040828403121561056557600080fd5b61056f60406107de565b9050600061057d8484610490565b825250602061058e8484830161059a565b60208301525092915050565b600061049c823561083d565b600061049c8235610840565b6000806000606084860312156105c757600080fd5b60006105d38686610490565b93505060206105e48682870161059a565b925050604084013567ffffffffffffffff81111561060157600080fd5b61060d868287016104a3565b9150509250925092565b60006080828403121561062957600080fd5b600061063584846104f8565b949350505050565b60006020828403121561064f57600080fd5b600061063584846105a6565b61066481610831565b82525050565b6106648161083d565b601381527f546573745374727563744b656363616b32353600000000000000000000000000602082015260400190565b601981527f54657374537472756374506172656e744b656363616b32353600000000000000602082015260400190565b6080820181516106e3848261065b565b5060208201516106f6602085018261066a565b506040820151610709604085018261070f565b50505050565b60408201815161071f848261065b565b506020820151610709602085018261066a565b61066481610840565b60408101610749828561065b565b61049c602083018461066a565b6040808252810161076681610673565b9050610775602083018461066a565b92915050565b60408082528101610766816106a3565b6080810161077582846106d3565b60408101610775828461070f565b60208101610775828461066a565b602081016107758284610732565b604081016107d18285610732565b61049c6020830184610732565b6000604051905081810181811067ffffffffffffffff8211171561080157600080fd5b604052919050565b600067ffffffffffffffff82111561082057600080fd5b506020601f91909101601f19160190565b600160a060020a031690565b90565b63ffffffff1690565b828183375060009101525600a265627a7a72305820738426ffc61b45a331eec053537d02526e13fd71949a31290da38ec04e43f1f46c6578706572696d656e74616cf50037",
    "transactionHash": "0x19d1edeaa4f9b40cd0f08e8896bba04d1e74b97ddf4dabaa36e852512edf189d",
    "contractAddress": "0x94d28bB6cd09f0488039a1870FbDB496Bc6ce98B",
    "blockHash": "0xa5d83b96fb8002004d31ab6a5e20c48f6928169dae8bc70257b115f950e9d39c",
    "blockNumber": 2411314
};
const provider = getDefaultProvider('https://api.avax.network/ext/bc/C/rpc');
const contract = (function () {
    return new Contract(contractData.contractAddress, contractData.interface, provider);
})();
describe('Test Contract Objects', function () {
    it('can create contract', function () {
        assert.equal(contract.target, contractData.contractAddress, "contractAddress");
    });
});
//# sourceMappingURL=test-contract.js.map