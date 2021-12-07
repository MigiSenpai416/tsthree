import { BOOL, BYTE, byte, BytePtr, DWORD, FALSE, short, TRUE, UINT, UShort, float, int } from "../Common/types";
import { D3DXVECTOR3 } from "../Math/D3D9Math";

enum DataType {
	Int8 = 0,
	Uint8,
	Int16,
	Uint16,
	Int32,
	Uint32,
	Float32,
	Float64
}

export class ByteReader
{
	private data: BytePtr;
	private offset: int;
	constructor( data: BytePtr, offset?: int )
	{
		this.data = data;
		this.offset = offset || 0;
	}
	GetOffset(): int { return this.offset; }
	SetOffset( offset: int ){ this.offset = offset; }
	GetRemain(): ByteReader
	{
		this.data = this.data.slice( this.offset, this.offset+(this.data.length-this.offset) );
		this.offset = 0;
		return this;
	}
	GetRemainData(): Uint8Array
	{
		this.data = this.data.slice( this.offset, this.offset+(this.data.length-this.offset) );
		return this.data;
	}
	CheckValid( tNumberToCheck: int ): BOOL
	{
		return this.offset + tNumberToCheck <= this.data.length;
	}
	AddReadSize( readSize: int )
	{
		this.offset += readSize;
	}
	Get( length: number, type: DataType ) : byte | BYTE | int | DWORD | UINT | short | UShort
	{
		if( !this.CheckValid(length) )
		{
			throw Error( `error: length, (${this.offset}+${length}) > ${this.data.length}` );
		}
		var view = new DataView( new ArrayBuffer( length ) );
		for( var i = 0; i < length; i++ )
		{
			switch( type )
			{
			case DataType.Int8: view.setInt8( i, this.data[(this.offset+(length-1-i))] ); break;
			case DataType.Uint8: view.setUint8( i, this.data[(this.offset+(length-1-i))] ); break;
			case DataType.Int16: view.setInt8( i, this.data[(this.offset+(length-1-i))] ); break;
			case DataType.Uint16: view.setUint8( i, this.data[(this.offset+(length-1-i))] ); break;
			case DataType.Int32: view.setInt8( i, this.data[(this.offset+(length-1-i))] ); break;
			case DataType.Uint32: view.setUint8( i, this.data[(this.offset+(length-1-i))] ); break;
			case DataType.Float32: view.setInt8( i, this.data[(this.offset+(length-1-i))] ); break;
			case DataType.Float64: view.setUint8( i, this.data[(this.offset+(length-1-i))] ); break;
			default: return 0;
			}
		}
		this.AddReadSize(view.byteLength);
		switch( type )
		{
		case DataType.Int8: return view.getInt8(0);
		case DataType.Uint8: return view.getUint8(0);
		case DataType.Int16: return view.getInt16(0);
		case DataType.Uint16: return view.getUint16(0);
		case DataType.Int32: return view.getInt32(0);
		case DataType.Uint32: return view.getUint32(0);
		case DataType.Float32: return view.getFloat32(0);
		case DataType.Float64: return view.getFloat64(0);
		default: return 0;
		}
	}
	ReadByte(): byte
	{
		return this.Get( 1, DataType.Int8 );
	}
	ReadBYTE(): BYTE
	{
		return this.Get( 1, DataType.Uint8 );
	}
	ReadBytePtr( NumOfReadBytes: int ): BytePtr
	{
		if( !this.CheckValid(NumOfReadBytes) )
		{
			throw Error( `error: length, (${this.offset}+${NumOfReadBytes}) > ${this.data.length}` );
		}
		var value: BytePtr = new Uint8Array( this.data.slice( this.offset, this.offset+NumOfReadBytes ) );
		this.AddReadSize(NumOfReadBytes);
		return value;
	}
	ReadBOOL(): BOOL
	{
		return ( this.ReadInt() === 1 ? TRUE : FALSE );
	}
	ReadShort(): int
	{
		return this.Get( 2, DataType.Int16 );
	}
	ReadUShort(): int
	{
		return this.Get( 2, DataType.Uint16 );
	}
	ReadInt(): int
	{
		return this.Get( 4, DataType.Int32 );
	}
	ReadUInt(): UINT
	{
		return this.Get( 4, DataType.Uint32 );
	}
	ReadFloat(): float
	{
		return this.Get( 4, DataType.Float32 );
	}
	ReadAt( offset: number ) : number
	{
		return this.Get( 4, DataType.Int32 );
	}
	ReadString( NumOfReadBytes: int ): string
	{
		var view = new DataView( ToArrayBuffer( this.ReadBytePtr( NumOfReadBytes ) ).buffer );
		var str = new TextDecoder("utf8").decode( view );
		return str;
	}
}

export function CopyArray( dst, dstOffset, src, srcOffset, numToCopy )
{
	for( var i = 0; i < numToCopy; i++ )
	{
		dst[dstOffset+i] = src[srcOffset+i];
	}
}

export function ToArrayBuffer( data: Uint8Array )
{
	var uint8 = new Uint8Array( data );
    const buffer = new ArrayBuffer( uint8.length );
    const view = new DataView( buffer );
    for( let i = 0; i < uint8.length; i++ )
    {
        view.setUint8( i, uint8[i] );
    }
    return view;
}

export function Vector3ToArray( pV: D3DXVECTOR3, arr: Array<number> | Float32Array, index: number ): void
{
	arr[index*3+0] = pV.x;
	arr[index*3+1] = pV.y;
	arr[index*3+2] = pV.z;
}