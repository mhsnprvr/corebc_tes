import { BytesLike } from '../utils/data';
import { SupportedAlgorithm } from './sha3';
export declare function ripemd160(data: BytesLike): string;
export declare function sha256(data: BytesLike): string;
export declare function sha512(data: BytesLike): string;
export declare function computeHmac(algorithm: SupportedAlgorithm, key: BytesLike, data: BytesLike): string;
//# sourceMappingURL=browser-sha3.d.ts.map