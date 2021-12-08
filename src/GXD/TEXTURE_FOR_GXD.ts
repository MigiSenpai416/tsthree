import { ByteReader, ToArrayBuffer } from "../Common/ByteReader";
import { Zlib, ZLibDataPtr } from "../Common/Zlib";
import { BOOL, TRUE, FALSE, int, DWORD, BytePtr, UINT } from "../Common/types";
import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader";
import { CompressedPixelFormat, CompressedTexture, LinearFilter, PixelFormat } from "three";

export function MAKEFOURCC(ch0:string, ch1:string, ch2:string, ch3:string)
{
    return ( ch0.charCodeAt(0) | (ch1.charCodeAt(0) << 8) | (ch2.charCodeAt(0) << 16) | (ch3.charCodeAt(0) << 24 ) );
}

enum D3DFORMAT
{
    D3DFMT_UNKNOWN              =  0,

    D3DFMT_R8G8B8               = 20,
    D3DFMT_A8R8G8B8             = 21,
    D3DFMT_X8R8G8B8             = 22,
    D3DFMT_R5G6B5               = 23,
    D3DFMT_X1R5G5B5             = 24,
    D3DFMT_A1R5G5B5             = 25,
    D3DFMT_A4R4G4B4             = 26,
    D3DFMT_R3G3B2               = 27,
    D3DFMT_A8                   = 28,
    D3DFMT_A8R3G3B2             = 29,
    D3DFMT_X4R4G4B4             = 30,
    D3DFMT_A2B10G10R10          = 31,
    D3DFMT_A8B8G8R8             = 32,
    D3DFMT_X8B8G8R8             = 33,
    D3DFMT_G16R16               = 34,
    D3DFMT_A2R10G10B10          = 35,
    D3DFMT_A16B16G16R16         = 36,

    D3DFMT_A8P8                 = 40,
    D3DFMT_P8                   = 41,

    D3DFMT_L8                   = 50,
    D3DFMT_A8L8                 = 51,
    D3DFMT_A4L4                 = 52,

    D3DFMT_V8U8                 = 60,
    D3DFMT_L6V5U5               = 61,
    D3DFMT_X8L8V8U8             = 62,
    D3DFMT_Q8W8V8U8             = 63,
    D3DFMT_V16U16               = 64,
    D3DFMT_A2W10V10U10          = 67,

    D3DFMT_UYVY                 = MAKEFOURCC('U', 'Y', 'V', 'Y'),
    D3DFMT_R8G8_B8G8            = MAKEFOURCC('R', 'G', 'B', 'G'),
    D3DFMT_YUY2                 = MAKEFOURCC('Y', 'U', 'Y', '2'),
    D3DFMT_G8R8_G8B8            = MAKEFOURCC('G', 'R', 'G', 'B'),
    D3DFMT_DXT1                 = MAKEFOURCC('D', 'X', 'T', '1'),
    D3DFMT_DXT2                 = MAKEFOURCC('D', 'X', 'T', '2'),
    D3DFMT_DXT3                 = MAKEFOURCC('D', 'X', 'T', '3'),
    D3DFMT_DXT4                 = MAKEFOURCC('D', 'X', 'T', '4'),
    D3DFMT_DXT5                 = MAKEFOURCC('D', 'X', 'T', '5'),

    D3DFMT_D16_LOCKABLE         = 70,
    D3DFMT_D32                  = 71,
    D3DFMT_D15S1                = 73,
    D3DFMT_D24S8                = 75,
    D3DFMT_D24X8                = 77,
    D3DFMT_D24X4S4              = 79,
    D3DFMT_D16                  = 80,

    D3DFMT_D32F_LOCKABLE        = 82,
    D3DFMT_D24FS8               = 83,

/* D3D9Ex only -- */
//#if !defined(D3D_DISABLE_9EX)

    /* Z-Stencil formats valid for CPU access */
    D3DFMT_D32_LOCKABLE         = 84,
    D3DFMT_S8_LOCKABLE          = 85,

//#endif // !D3D_DISABLE_9EX
/* -- D3D9Ex only */


    D3DFMT_L16                  = 81,

    D3DFMT_VERTEXDATA           =100,
    D3DFMT_INDEX16              =101,
    D3DFMT_INDEX32              =102,

    D3DFMT_Q16W16V16U16         =110,

    D3DFMT_MULTI2_ARGB8         = MAKEFOURCC('M','E','T','1'),

    // Floating point surface formats

    // s10e5 formats (16-bits per channel)
    D3DFMT_R16F                 = 111,
    D3DFMT_G16R16F              = 112,
    D3DFMT_A16B16G16R16F        = 113,

    // IEEE s23e8 formats (32-bits per channel)
    D3DFMT_R32F                 = 114,
    D3DFMT_G32R32F              = 115,
    D3DFMT_A32B32G32R32F        = 116,

    D3DFMT_CxV8U8               = 117,

/* D3D9Ex only -- */
//#if !defined(D3D_DISABLE_9EX)

    // Monochrome 1 bit per pixel format
    D3DFMT_A1                   = 118,

    // 2.8 biased fixed point
    D3DFMT_A2B10G10R10_XR_BIAS  = 119,


    // Binary format indicating that the data has no inherent type
    D3DFMT_BINARYBUFFER         = 199,
    
//#endif // !D3D_DISABLE_9EX
/* -- D3D9Ex only */


    D3DFMT_FORCE_DWORD          =0x7fffffff
}

enum D3DRESOURCETYPE {
    D3DRTYPE_SURFACE                =  1,
    D3DRTYPE_VOLUME                 =  2,
    D3DRTYPE_TEXTURE                =  3,
    D3DRTYPE_VOLUMETEXTURE          =  4,
    D3DRTYPE_CUBETEXTURE            =  5,
    D3DRTYPE_VERTEXBUFFER           =  6,
    D3DRTYPE_INDEXBUFFER            =  7,           //if this changes, change _D3DDEVINFO_RESOURCEMANAGER definition


    D3DRTYPE_FORCE_DWORD            = 0x7fffffff
}


enum D3DXIMAGE_FILEFORMAT
{
    D3DXIFF_BMP         = 0,
    D3DXIFF_JPG         = 1,
    D3DXIFF_TGA         = 2,
    D3DXIFF_PNG         = 3,
    D3DXIFF_DDS         = 4,
    D3DXIFF_PPM         = 5,
    D3DXIFF_DIB         = 6,
    D3DXIFF_HDR         = 7,       //high dynamic range formats
    D3DXIFF_PFM         = 8,       //
    D3DXIFF_FORCE_DWORD = 0x7fffffff

};

export class D3DXIMAGE_INFO
{
    Width: UINT;
    Height: UINT;
    Depth: UINT;
    MipLevels: UINT;
    Format: D3DFORMAT;
    ResourceType: D3DRESOURCETYPE;
    ImageFileFormat: D3DXIMAGE_FILEFORMAT;
    Set( r?: ByteReader )
    {
        if( !r )
        {
            var data = new Uint8Array( 28 );
            r = new ByteReader( data );
        }
        this.Width = r.ReadUInt();
        this.Height = r.ReadUInt();
        this.Depth = r.ReadUInt();
        this.MipLevels = r.ReadUInt();
        this.Format = r.ReadInt();
        this.ResourceType = r.ReadUInt();
        this.ImageFileFormat = r.ReadUInt();
    }
}

export class TEXTURE_FOR_GXD
{
	mCheckValidState: BOOL;
	mFileDataSize: DWORD;
	mFileData: BytePtr;
	mTextureInfo: D3DXIMAGE_INFO;
	mProcessModeCase: int;
	mAlphaModeCase: int;
    mOrgAlphaModeCase: int;
	mTexture;//IDirect3DTexture9*
    constructor( r?: ByteReader )//r from AssignArray
    {
        this.mTextureInfo = new D3DXIMAGE_INFO();
        this.Free();
    }
    Init(): void
    {
        this.Free();
    }
    Free(): void
    {
        this.mCheckValidState = FALSE;
        this.mFileData = null;
        this.mFileDataSize = 0;
        this.mProcessModeCase = -1;
        this.mAlphaModeCase = 0;
        this.mOrgAlphaModeCase = 0;
        this.mTexture = 0;
        this.mTextureInfo.Set();
    }
    CheckTwoPowerNumber( tNumber: int ): int
    {
        if ( tNumber < 1 )
            return 0;
        for ( var i = 1; ; i *= 2 )
        {
            if ( i == tNumber )
            return 1;
            if ( i > tNumber )
            break;
        }
        return 0;
    }

    Load( r: ByteReader, tCheckCreateTexture: BOOL, tCheckRemoveFileData: BOOL ): BOOL
    {
        return this.Load2( "s1", r, tCheckCreateTexture, tCheckRemoveFileData );
    }
    Load2( name: string, r: ByteReader, tCheckCreateTexture: BOOL, tCheckRemoveFileData: BOOL ): BOOL
    {
        console.log( `Checking ${name}...` );
        if ( this.mCheckValidState )
            return FALSE;
        this.mFileDataSize = r.ReadInt();
        console.log( "this.mFileDataSize = ", this.mFileDataSize );
        if( !this.mFileDataSize )
            return TRUE;
        var z: ZLibDataPtr = new ZLibDataPtr( r );
        if( !Zlib.Decompress( z ) )
        {
            this.Free();
            return FALSE;
        }
        //console.log( z.tOriginal );
        var sr: ByteReader = new ByteReader( z.tOriginal );
        this.mFileData = sr.ReadBytePtr( this.mFileDataSize );
        if( this.mFileData.length != this.mFileDataSize )
        {
            this.Free();
            return FALSE;
        }
        //var tr = new ByteReader( this.mFileData );
        //this.mTextureInfo.Set( tr );
        //this.mFileData = tr.GetRemainData();
        //console.log(this.mFileData);

        this.mProcessModeCase = sr.ReadInt();
        this.mAlphaModeCase = sr.ReadInt();
        
        try
        {        
            var ddsLoader = new MyDDS();
            this.mCompressTexture = ddsLoader.loadFromBuffer( this.mFileData );
            this.mCompressTexture.wrapT = 1006;
            //this.mCompressTexture.wrapS = 1006;
            //console.log( "this.mCompressTexture = ", this.mCompressTexture );
        }
        catch( e )
        {
            console.error( e );
            return FALSE;
        }

        if ( tCheckCreateTexture )
        {
            //switch ( mGXD.mTextureOptionValue )
            //{
            //    case 0:
            //    ....
            //}
        }
        else
        {
        }
        
        this.mCheckValidState = TRUE;
        if( tCheckRemoveFileData )
        {
            this.mFileData = null;
        }

        return TRUE;
    }

    mCompressTexture: CompressedTexture;
    GetTexture()
    {
        return this.mCompressTexture;
    }
}

interface textureI
{
    width?:  number,
    height?: number,
    format?: PixelFormat | CompressedPixelFormat,
    mipmaps?: object[]
}
class MyDDS extends DDSLoader
{
    loadFromBuffer( buffer ){
		const scope = this;
		const texture = new CompressedTexture( [], 0, 0 );

		const texDatas = scope.parse( ToArrayBuffer( buffer ).buffer, true );
		texture.image.width = texDatas.width;
		texture.image.height = texDatas.height;
		texture.mipmaps = texDatas.mipmaps as ImageData[];

        console.log(`texDatas.mipmapCount = ${texDatas.mipmapCount}`);
		if ( texDatas.mipmapCount === 1 ) {
			texture.minFilter = LinearFilter;
		}
        
		texture.format = texDatas.format as PixelFormat;
		texture.needsUpdate = true;

		return texture;
	}


    loadFromBuffer2( buffer ) {
        
		const scope = this;
		const images: textureI[] = [];
		const texture = new CompressedTexture( [], 0, 0);

		const texDatas = scope.parse( ToArrayBuffer( buffer ).buffer, true );

        console.log("texDatas.isCubemap=",texDatas.isCubemap, "texDatas.isCubemap=", texDatas.isCubemap );
		if (texDatas.isCubemap) {
			const faces = texDatas.mipmaps.length / texDatas.mipmapCount;

			for (let f = 0; f < faces; f++) {
				images[f] = {
					mipmaps: []
				};

				for (let i = 0; i < texDatas.mipmapCount; i++) {
					images[f].mipmaps.push(texDatas.mipmaps[f * texDatas.mipmapCount + i]);
					images[f].format = texDatas.format;
					images[f].width = texDatas.width;
					images[f].height = texDatas.height;
				}
			}

			texture.image = { width: images[0].width, height: images[0].height };
            texture.mipmaps = images[0].mipmaps as ImageData[];
		} else {
			texture.image.width = texDatas.width;
			texture.image.height = texDatas.height;
			texture.mipmaps = texDatas.mipmaps as ImageData[];
		}

		if (texDatas.mipmapCount === 1) {
			texture.minFilter = LinearFilter;
		}

		texture.format = texDatas.format as PixelFormat;
		texture.needsUpdate = true;

		return texture;
    }
}