import { BufferAttribute, BufferGeometry, Group, Int16BufferAttribute, Material, Mesh, MeshBasicMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshStandardMaterial, ShaderMaterial } from "three";
import { ByteReader, CopyArray } from "../../Common/ByteHelper";
import { BOOL, BytePtr, DWORD, FALSE, TRUE, WORD, int, UINT, float, BuiltinShaderAttributeName } from "../../Common/types";
import { Zlib, ZLibDataPtr } from "../../Common/Zlib";
import { GXD } from "../Core";
import { LOAD_FOR_GXD } from "../LOAD_FOR_GXD";
import { SKININDEX_FOR_GXD } from "../SKIN_FOR_GXD";
import { TEXTURE_FOR_GXD } from "../TEXTURE_FOR_GXD";

class SKINEFFECT2_FOR_GXD
{
	mAnimationMapInfo: int[];//2
	mRadiationInfo: int[];//10
	mBillboardInfo: int [];//2
    mUnk: int [];//3
    constructor( r: ByteReader )
    {
        this.mAnimationMapInfo = [ r.ReadInt(), r.ReadInt() ];
        this.mRadiationInfo = [ r.ReadInt(), r.ReadInt(), r.ReadInt(), r.ReadInt(), r.ReadInt(), r.ReadInt(), r.ReadInt(), r.ReadInt(), r.ReadInt(), r.ReadInt() ];
        this.mBillboardInfo = [ r.ReadInt(), r.ReadInt() ];
        this.mUnk = [ r.ReadInt(), r.ReadInt(), r.ReadInt() ];
    }
}

class SKINVERTEX2_FOR_GXD
{
  mV: float[];//3
  mW: float[];//4
  mB: DWORD;//
  mN1: float[];//3
  mN2: float[];//3
  mN3: float[];//3
  mT: float[];//2
  constructor( r: ByteReader )
  {
    this.mV = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
    this.mW = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
    this.mB = r.ReadUInt();
    this.mN1 = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
    this.mN2 = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
    this.mN3 = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
    this.mT = [ r.ReadFloat(), r.ReadFloat() ];
  }
}

class SKINSHADOWVERTEX2_FOR_GXD
{
    mV: float[];//3
    mW: float[];//4
    mB: DWORD;//
    constructor( r: ByteReader )
    {
        this.mV = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
        this.mW = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
        this.mB = r.ReadUInt();
    }
}


export class SOBJECT2_FOR_GXD extends LOAD_FOR_GXD
{
    mCheckValidState: BOOL;
    mSkinNum: int;
    mSKin: SKIN2_FOR_GXD[];
    constructor()
    {
        super();
        this.Free();
    }
    Init(): void
    {
        this.Free();
    }
    Free(): void
    {
        this.mCheckValidState = FALSE;
        this.mSkinNum = 0;
        for( var i = 0; i < this.mSkinNum; i++ )
        {
            this.mSKin[i].Free();
        }
        this.mSKin = [];
    }
    
	Load( r: ByteReader, tCheckCreateTexture: BOOL, tCheckRemoveFileData: BOOL ) : BOOL
	{
		if( this.mCheckValidState )
			return FALSE;
		this.mCheckValidState = TRUE;
        var tResult: int[] = [0];
        if( !this.LoadHeader( r, tResult ) )
        {
            console.log( `!this.LoadHeader( ${r}, ${tResult[0]} )` );
            return FALSE;
        }
        console.log( `this.LoadHeader( ${r}, ${tResult[0]} )` );

        var tCheckValid: int[] = [0];
        var tCheckCompress: int[] = [0];
        if( tResult[0] == 3 )//SOBJECT3
        {
            if( !this.LoadExtraHeader( r, tCheckValid, tCheckCompress ) )
            {
                console.log( `!this.LoadExtraHeader( ${r}, ${tCheckValid[0]}, ${tCheckCompress[0]} )` );
                return FALSE;
            }
            console.log( `this.LoadExtraHeader( ${r}, ${tCheckValid[0]}, ${tCheckCompress[0]} )` );
            if( tCheckCompress[0] == 1 )
            {
                if( !this.LoadCompressedChunk( r ) )
                {
                    return FALSE;
                }
            }
        }
		return TRUE;
	}

    LoadHeader( r: ByteReader, tResult: int[] ): BOOL
    {
        var Buffer = r.ReadString( 8 );
        if( Buffer.length == 8 && Buffer.substr(0, 7) == "SOBJECT" )
        {
            tResult[0] = parseInt( Buffer[7] );
            if( tResult[0] == 2 || tResult[0] == 3 )//SOBJECT2 or SOBJECT3
            {
                return TRUE;
            }
        }
        return FALSE;
    }

    LoadExtraHeader( r: ByteReader, tCheckValid: int[], tCheckCompress: int[] ) : BOOL
    {
        //00 01 02 03 04 05 06 07 08 09 0A 0B
        //53 4F 42 4A 45 43 54 33 01 01 00 00
        //check offset 08 and 09
        //08 09 0A 0B
        //01 01 00 00
        var Buffer = r.ReadBytePtr(4);
        tCheckValid[0] = Buffer[0];
        tCheckCompress[0] = Buffer[1];
        if( tCheckValid[0] == 1 && ( tCheckCompress[0] == 0 || tCheckCompress[0] == 1 ) )
        {
            return TRUE;
        }
        return FALSE;
    }

    LoadCompressedChunk( r: ByteReader ) : BOOL
    {
        var z = new ZLibDataPtr( r );
        if( !Zlib.Decompress( z ) )
        {
            console.log( `!Zlib.Decompress( ${z} ) ` );
            return FALSE;
        }
        var sr = new ByteReader( z.tOriginal );
        this.mSkinNum = sr.ReadInt();
        console.log( `this.mSkinNum = ${this.mSkinNum}` );
        if( !this.mCheckValidState )
        {
            return TRUE;
        }
        for( var i = 0; i < this.mSkinNum; i++ )
        {
            this.mSKin[i] = new SKIN2_FOR_GXD();
        }
        for( var i = 0; i < this.mSkinNum; i++ )
        {
            if( !this.mSKin[i].Load2( sr, i ) )
            {
                return FALSE;
            }
        }

        return TRUE;
    }
}

export class SKIN2_FOR_GXD
{
    mCheckValidState: BOOL
    mLODStepNum: int;
    mEffect: SKINEFFECT2_FOR_GXD;
    mVertexBufferForBillboard: SKINVERTEX2_FOR_GXD[];
    mVertexNum: number[];
    mVertexBuffer: SKINVERTEX2_FOR_GXD[][];
    mTrisNum: number[];
    mIndexBuffer: SKININDEX_FOR_GXD[][];
    mShadowVertexBuffer: SKINSHADOWVERTEX2_FOR_GXD[][];
    mShadowIndexBuffer: SKININDEX_FOR_GXD[][];
    mShadowEdgeBuffer: SKININDEX_FOR_GXD[][];
    mDiffuseMap: TEXTURE_FOR_GXD;
    mNormalMap: TEXTURE_FOR_GXD;
    mSpecularMap: TEXTURE_FOR_GXD;
    mAnimationMapNum: int;
    constructor()
    {
        this.Free();
    }
    Init(): void
    {
        this.Free();
    }
    Free(): void
    {
        this.mCheckValidState = FALSE;
        this.mVertexBufferForBillboard = [];
        this.mVertexNum = [];
        this.mVertexBuffer = [];
        this.mTrisNum = [];
        this.mIndexBuffer = [];
        this.mShadowVertexBuffer = [];
        this.mShadowIndexBuffer = [];
        this.mShadowEdgeBuffer = [];
    }

    Load2( r: ByteReader, tSkinNum: number ): BOOL
    {
        if( this.mCheckValidState )
        {
            return FALSE;
        }
        this.mCheckValidState = r.ReadBOOL();
        if( !this.mCheckValidState )
        {
            return TRUE;
        }

        this.mEffect = new SKINEFFECT2_FOR_GXD( r );
        this.mVertexBufferForBillboard = [ new SKINVERTEX2_FOR_GXD( r ), new SKINVERTEX2_FOR_GXD( r ), new SKINVERTEX2_FOR_GXD( r ), new SKINVERTEX2_FOR_GXD( r ) ];
        this.mLODStepNum = r.ReadInt();
        console.log( "Skin = ", tSkinNum, "LOD = ", this.mLODStepNum );
        
        let i, j;
        for ( i = 0; i < this.mLODStepNum; i++ )
        {
            this.mVertexNum[i] = 0;
            this.mVertexBuffer[i] = [];
            this.mTrisNum[i] = 0;
            this.mIndexBuffer[i] = [];
        }
        if( this.mLODStepNum > 0 )
        {
            this.mMesh = [];
            for ( i = 0; i < this.mLODStepNum; i++ )
            {
                this.mMesh[i] = null;
                this.mVertexNum[i] = r.ReadInt();
                this.mVertexBuffer[i] = [];
                for( j = 0; j < this.mVertexNum[i]; j++ )
                {
                    this.mVertexBuffer[i][j] = new SKINVERTEX2_FOR_GXD( r );
                }
                this.mTrisNum[i] = r.ReadInt();
                console.log( "LOD = ", i, "VertexNum = ", this.mVertexNum[i], "mTrisNum = ", this.mTrisNum[i] );
                this.mIndexBuffer[i] = [];
                for( j = 0; j < this.mTrisNum[i]; j++ )
                {
                    this.mIndexBuffer[i][j] = new SKININDEX_FOR_GXD( r );
                }
                this.mShadowVertexBuffer[i] = [];
                for( j = 0; j < this.mVertexNum[i]; j++ )
                {
                    this.mShadowVertexBuffer[i][j] = new SKINSHADOWVERTEX2_FOR_GXD( r );
                }
                this.mShadowIndexBuffer[i] = [];
                for( j = 0; j < this.mTrisNum[i]; j++ )
                {
                    this.mShadowIndexBuffer[i][j] = new SKININDEX_FOR_GXD( r );
                }
                this.mShadowEdgeBuffer[i] = [];
                for( j = 0; j < this.mTrisNum[i]; j++ )
                {
                    this.mShadowEdgeBuffer[i][j] = new SKININDEX_FOR_GXD( r );
                }
            }
        }

        this.mDiffuseMap = new TEXTURE_FOR_GXD();
        if( !this.mDiffuseMap.Load2( "Diffues", r, TRUE, FALSE ) )
        {
            return FALSE;
        }
        this.mNormalMap = new TEXTURE_FOR_GXD();
        if( !this.mNormalMap.Load2( "Normal", r, TRUE, FALSE ) )
        {
            return FALSE;
        }
        this.mSpecularMap = new TEXTURE_FOR_GXD();
        if( !this.mSpecularMap.Load2( "Specular", r, TRUE, FALSE ) )
        {
            return FALSE;
        }

        var uniforms = {    // custom uniforms (your textures)
            tOne: { type: "t1", value: this.mDiffuseMap.GetTexture() },
            tSec: { type: "t2", value: this.mSpecularMap.GetTexture() },
            tThree: { type: "t3", value: this.mNormalMap.GetTexture() },
        };
        var vertShader = `
        varying vec2 vUv;
        void main()
        {
            vUv = uv;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_Position = projectionMatrix * mvPosition;
        }
        `;
        var fragShader = `
        #ifdef GL_ES
        precision highp float;
        #endif
    
        uniform sampler2D tOne;
        uniform sampler2D tSec;
        uniform sampler2D tThree;
    
        varying vec2 vUv;
    
        void main(void)
        {
            vec3 c;
            vec4 Ca = texture2D(tOne, vUv);
            vec4 Cb = texture2D(tSec, vUv);
            vec4 Cc = texture2D(tThree, vUv);
            c = Ca.rgb * Ca.a + Cb.rgb * Cb.a + Cc.rgb * Cc.a * (1.0 - Ca.a);  // blending equation
            gl_FragColor= vec4(c, 1.0);
        }
        `;
    
        this.mShaderMaterial = new ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertShader,
            fragmentShader: fragShader
        });
        
        //this.mPhongMaterial = new MeshPhongMaterial({ map: this.mDiffuseMap.GetTexture(), normalMap: this.mNormalMap.GetTexture(), specularMap: this.mSpecularMap.GetTexture(), color:"#0F0F" });
        //this.mMatcapMaterial = new MeshMatcapMaterial( { map: this.mDiffuseMap.GetTexture(), normalMap: this.mNormalMap.GetTexture(), bumpMap: this.mSpecularMap.GetTexture() } );
        //this.mStandardMaterial = new MeshStandardMaterial( { map: this.mDiffuseMap.GetTexture(), normalMap: this.mNormalMap.GetTexture(), bumpMap: this.mNormalMap.GetTexture() } );
        //this.mNormalMaterial = new MeshNormalMaterial( { normalMap: this.mNormalMap.GetTexture(), bumpMap: this.mSpecularMap.GetTexture() });

        this.mMaterial = new MeshBasicMaterial( { map: this.mDiffuseMap.GetTexture() } );// { map: this.mDiffuseMap.GetTexture() } );
        
        for ( i = 0; i < this.mLODStepNum; i++ )
        {
            this.mMesh[i] = new Mesh( this.ToMesh( i ), this.mShaderMaterial );
            this.mMesh[i].position.set( 0, 5, 0 );
            this.mMesh[i].visible = true;
            GXD.Add( this.mMesh[i] );
        }

        this.mAnimationMapNum = r.ReadInt();
        console.log( "Skin = ", tSkinNum, "mAnimationMapNum = ", this.mAnimationMapNum );
        if( this.mAnimationMapNum < 1 )
            return TRUE;

        /*
        for( i = 0; i < this.mAnimationMapNum; i++ )
        {
            this.mAnimationMap[i] = new TEXTURE_FOR_GXD();
            this.mAnimationMap[i].Load( r );
        }
        */
        
        return TRUE;
    }

    mNormalMaterial: MeshNormalMaterial;
    mStandardMaterial: MeshStandardMaterial;
    mMatcapMaterial: MeshMatcapMaterial;
    mPhongMaterial: MeshPhongMaterial;
    mShaderMaterial: ShaderMaterial;
    mMaterial: MeshBasicMaterial;
    mMesh: Mesh[];
    ToMesh( lod: number ): BufferGeometry
    {
        var geometry: BufferGeometry = new BufferGeometry();

        var positions: Float32Array = new Float32Array( this.mVertexNum[lod] * 3 );
        var normals: Float32Array = new Float32Array( this.mVertexNum[lod] * 3 );
        var uvs: Float32Array = new Float32Array( this.mVertexNum[lod] * 2 );
        var indices: Uint16Array = new Uint16Array( this.mTrisNum[lod] * 3 );
        for( var i = 0; i < this.mVertexNum[lod]; i++ )
        {
            const idx = i*3;
            CopyArray( positions, idx, this.mVertexBuffer[lod][i].mV, 0, 3 );            
            CopyArray( normals, idx, this.mVertexBuffer[lod][i].mN3, 0, 3 );   

            const idx2 = i*2;
            CopyArray( uvs, idx2, this.mVertexBuffer[lod][i].mT, 0, 2 );
        }
        for( var i = 0; i < this.mTrisNum[lod]; i++ )
        {
            CopyArray( indices, i*3, this.mIndexBuffer[lod][i].mFace, 0, 3 );
        }
        ///*
        //D3DVERTEXELEMENT9 elements_d3dvertex[] =
        //{
        //    {0,  0, D3DDECLTYPE_FLOAT3, D3DDECLMETHOD_DEFAULT, D3DDECLUSAGE_POSITION, 0},
        //    {0, 12, D3DDECLTYPE_FLOAT4, D3DDECLMETHOD_DEFAULT, D3DDECLUSAGE_BLENDWEIGHT, 0},
        //    {0, 28, D3DDECLTYPE_D3DCOLOR, D3DDECLMETHOD_DEFAULT, D3DDECLUSAGE_BLENDINDICES, 0},
        //    {0, 32, D3DDECLTYPE_FLOAT3, D3DDECLMETHOD_DEFAULT, D3DDECLUSAGE_TANGENT, 0},
        //    {0, 44, D3DDECLTYPE_FLOAT3, D3DDECLMETHOD_DEFAULT, D3DDECLUSAGE_BINORMAL, 0},
        //    {0, 56, D3DDECLTYPE_FLOAT3, D3DDECLMETHOD_DEFAULT, D3DDECLUSAGE_NORMAL, 0},
        //    {0, 68, D3DDECLTYPE_FLOAT2, D3DDECLMETHOD_DEFAULT, D3DDECLUSAGE_TEXCOORD, 0},
        //    D3DDECL_END()
        //};
        //    mV: float[];
        //    mW: float[];
        //    mB: DWORD;
        //    mN1: float[];
        //    mN2: float[];
        //    mN3: float[];
        //    mT: float[];
        //*/

        geometry.setAttribute(BuiltinShaderAttributeName.position, new BufferAttribute(positions, 3));
        geometry.setAttribute(BuiltinShaderAttributeName.normal, new BufferAttribute(normals, 3));
        geometry.setAttribute(BuiltinShaderAttributeName.uv, new BufferAttribute(uvs, 2));
        geometry.setIndex( new BufferAttribute( indices, 1 ) );
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.normal.needsUpdate = true;
        geometry.attributes.uv.needsUpdate = true;
        geometry.index.needsUpdate = true;
        geometry.computeTangents();
        
        return geometry;
    }
}
