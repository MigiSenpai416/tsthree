import Pako = require("pako");
import { int, BOOL, FALSE, TRUE } from "../Common/types";
import { ByteReader } from "./ByteHelper";

export class ZLibDataPtr
{
	tOriginalSize: int;
	tOriginal: Uint8Array;
	tCompressSize: int;
	tCompress: Uint8Array;
	constructor( r: ByteReader )
	{
		this.tOriginalSize = r.ReadInt();
		this.tCompressSize = r.ReadInt();
		this.tCompress = r.ReadBytePtr( this.tCompressSize );
	}
}

export class Zlib
{
    static Decompress( tData: ZLibDataPtr ) : BOOL
    {
		try
		{
			tData.tOriginal = Pako.inflate( tData.tCompress );
			if( tData.tOriginal.length == tData.tOriginalSize )
			{
				return TRUE;
			}
		}
		catch( e )
		{
			console.log( e );
		}
		console.log( `failed to decompress: ${tData.tOriginalSize},${tData.tCompressSize}` );
		return FALSE;
    }
}