/**
 *  Resolves to a new object that is a copy of %%value%%, but with all
 *  values resolved.
 */
export declare function resolveProperties<T>(value: {
    [P in keyof T]: T[P] | Promise<T[P]>;
}): Promise<T>;
/**
 *  Assigns the %%values%% to %%target%% as read-only values.
 *
 *  It %%types%% is specified, the values are checked.
 */
export declare function defineProperties<T>(target: T, values: {
    [K in keyof T]?: T[K];
}, types?: {
    [K in keyof T]?: string;
}): void;
export declare function checkProperties(object: any, properties: {
    [name: string]: boolean;
}): void;
//# sourceMappingURL=properties.d.ts.map