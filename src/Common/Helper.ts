import { ByteReader } from "./ByteReader";
import { BOOL, DWORD, FALSE, int } from "./types";

export const int1 = [ 0 ];
export const int2 = [ 0, 0 ];
export const int3 = [ 0, 0, 0 ];
export const int4 = [ 0, 0, 0, 0 ];
export const int10 = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

export const float1 = [ 0.0 ];
export const float2 = [ 0.0, 0.0 ];
export const float3 = [ 0.0, 0.0, 0.0 ];
export const float4 = [ 0.0, 0.0, 0.0, 0.0 ];

export function Assign( T: any ) : any
{
    var t = typeof( T );
    //if( t === 'function' && T === MESHEFFECT2_FOR_GXD )
    //{
    //    return new MESHEFFECT2_FOR_GXD();
    //}
    return undefined;
}
export function AssignBOOL() : BOOL
{
    return FALSE;
}

export function AssignInt() : int
{
    return 0;
}

export function AssignDWORD() : DWORD
{
    return 0;
}

export function AssignArray( T: any, num: number, r?: ByteReader ) : Array<any>
{
    var t = [];

    if( (typeof T).concat( "constructor" ) !== 'functionconstructor' )
    {
        throw new Error( `${T} is not a constructor` );
    }

    for( let i = 0; i < num; i++ )
    {
        t.push( new T(r) );
    }

    return t;
}
