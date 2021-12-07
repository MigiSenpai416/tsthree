import Pako = require("pako");
import { int, BOOL, FALSE, TRUE } from "../Common/types";
import { ByteReader } from "./ByteHelper";

export class ZLibDataPtr
{
	tOriginalSize: int = 0;
	tOriginal: Uint8Array;//as ref ptr
	tCompressSize: int = 0;
	tCompress: Uint8Array;//as ref ptr
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