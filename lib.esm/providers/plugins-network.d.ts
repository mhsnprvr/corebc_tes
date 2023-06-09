import type { FeeData, Provider } from "./provider.js";
export declare class NetworkPlugin {
    readonly name: string;
    constructor(name: string);
    clone(): NetworkPlugin;
}
export type EnergyCostParameters = {
    txBase?: number;
    txCreate?: number;
    txDataZero?: number;
    txDataNonzero?: number;
    txAccessListStorageKey?: number;
    txAccessListAddress?: number;
};
export declare class EnergyCostPlugin extends NetworkPlugin implements EnergyCostParameters {
    readonly effectiveBlock: number;
    readonly txBase: number;
    readonly txCreate: number;
    readonly txDataZero: number;
    readonly txDataNonzero: number;
    readonly txAccessListStorageKey: number;
    readonly txAccessListAddress: number;
    constructor(effectiveBlock?: number, costs?: EnergyCostParameters);
    clone(): EnergyCostPlugin;
}
export declare class EnsPlugin extends NetworkPlugin {
    readonly address: string;
    readonly targetNetwork: number;
    constructor(address?: null | string, targetNetwork?: null | number);
    clone(): EnsPlugin;
}
export declare class FeeDataNetworkPlugin extends NetworkPlugin {
    #private;
    get feeDataFunc(): (provider: Provider) => Promise<FeeData>;
    constructor(feeDataFunc: (provider: Provider) => Promise<FeeData>);
    getFeeData(provider: Provider): Promise<FeeData>;
    clone(): FeeDataNetworkPlugin;
}
//# sourceMappingURL=plugins-network.d.ts.map