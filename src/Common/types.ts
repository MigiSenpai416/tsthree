export declare type byte = number;
export declare type BYTE = number;
export declare type BytePtr = Uint8Array;
export declare type short = number;
export declare type UShort = number;
export declare type WORD = number;
export declare type BOOL = boolean;
export declare type float = number;
export declare type FLOAT = float;
export declare type int = number;
export declare type DWORD = number;
export declare type UINT = number;
export const TRUE: boolean = true;
export const FALSE: boolean = false;

export enum DataType {
	Int8 = 0,
	Uint8,
	Int16,
	Uint16,
	Int32,
	Uint32,
	Float32,
	Float64
};

export const enum BuiltinShaderAttributeName {
    position = 'position',
    normal = 'normal',
    uv = 'uv',
    color = 'color',
    skinIndex = 'skinIndex',
    skinWeight = 'skinWeight',
    instanceMatrix = 'instanceMatrix',
    morphTarget0 = 'morphTarget0',
    morphTarget1 = 'morphTarget1',
    morphTarget2 = 'morphTarget2',
    morphTarget3 = 'morphTarget3',
    morphTarget4 = 'morphTarget4',
    morphTarget5 = 'morphTarget5',
    morphTarget6 = 'morphTarget6',
    morphTarget7 = 'morphTarget7',
    morphNormal0 = 'morphNormal0',
    morphNormal1 = 'morphNormal1',
    morphNormal2 = 'morphNormal2',
    morphNormal3 = 'morphNormal3',
}
