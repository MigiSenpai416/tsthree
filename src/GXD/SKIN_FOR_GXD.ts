import { BufferAttribute, BufferGeometry, CompressedTexture, CompressedTextureLoader, LinearFilter, Matrix4, Mesh, MeshBasicMaterial, PixelFormat, ShaderMaterial, TextureLoader, Vector3 } from "three";
import { ByteReader, CopyArray, Vector3ToArray } from "../Common/ByteReader";
import { BuiltinShaderAttributeName } from "../Common/types";
import { Zlib, ZLibDataPtr } from "../Common/Zlib";
import { GXD } from "./Core";
import { LOAD_FOR_GXD } from "./LOAD_FOR_GXD";
import { MOTION_FOR_GXD } from "./MOTION_FOR_GXD";
import { TEXTURE_FOR_GXD } from "./TEXTURE_FOR_GXD";
import { BOOL, FALSE, TRUE, WORD, int, float } from "../Common/types";
import { D3DXMATRIX, D3DXMatrixScaling, D3DXVec3Normalize, D3DXVec3TransformCoord, D3DXVec3TransformNormal, D3DXVECTOR3 } from "../Math/D3D9Math";

export class SKINSIZE_FOR_GXD
{
	/**
	* @property float[3]
	*/
	mBoxMin: float[];
	/**
	* @property float[3]
	*/
	mBoxMax: float[];
	/**
	* @property float[3]
	*/
	mCenter: float[];
	/**
	* @property float
	*/
	mRadius: float;
	constructor( r: ByteReader )
	{
		this.mBoxMin = [r.ReadFloat(), r.ReadFloat(), r.ReadFloat()];
		this.mBoxMax = [r.ReadFloat(), r.ReadFloat(), r.ReadFloat()];
		this.mCenter = [r.ReadFloat(), r.ReadFloat(), r.ReadFloat()];
		this.mRadius = r.ReadFloat();
	}
}

export class SKINVERTEX_FOR_GXD
{
	/**
	* @property float[3]
	*/
    mV: float[];
	/**
	* @property float[3]
	*/
	mN: float[];
	/**
	* @property float[2]
	*/
	mT: float[];
	constructor( r: ByteReader )
	{
		this.mV = [r.ReadFloat(), r.ReadFloat(), r.ReadFloat()];
		this.mN = [r.ReadFloat(), r.ReadFloat(), r.ReadFloat()];
		this.mT = [r.ReadFloat(), r.ReadFloat()];
	}
}

export class SKININDEX_FOR_GXD
{
	/**
	 * @property WORD[3]
	 */
    mFace: WORD[];
	constructor( r: ByteReader )
	{
		this.mFace = [r.ReadUShort(), r.ReadUShort(), r.ReadUShort()];
	}
}

export class SKINWEIGHT_FOR_GXD
{
	/**
	* @property int[4]
	*/
	mBoneIndex: int[];
	/**
	* @property float[4]
	*/
	mBlendValue: float[];
	constructor( r: ByteReader )
	{
		this.mBoneIndex = [r.ReadInt(), r.ReadInt(), r.ReadInt(), r.ReadInt()];
		this.mBlendValue = [r.ReadFloat(), r.ReadFloat(), r.ReadFloat(), r.ReadFloat()];
	}
}

export class SKINEFFECT_FOR_GXD
{
	mCheckTwoSide : BOOL;
	mCheckRadiation : BOOL;
	mRadiationSpeed : float;
	/**
	* @property float[4]
	*/
	mRadiationLowLimit : float[];
	/**
	* @property float[4]
	*/
	mRadiationHighLimit : float[];
	mCheckLightBright : BOOL;
	mCheckCameraSpecularEffect : BOOL;
	mCameraSpecularEffectSort: int;
	/**
	* @property float[4]
	*/
	mCameraSpecularEffectMaterialValue : float[];
	mCameraSpecularEffectMaterialPower: float;
	mCameraSpecularEffectLightAddValue: float;
	mCheckTextureAnimation : BOOL;
	mTextureAnimationSpeed: float;
	mCheckUVScroll1 : BOOL;
	mUVScrollSort1: int;
	mUVScrollSpeed1: float;
	mCheckBillboard : BOOL;
	mBillboardSort: int;
	mCheckUVScroll2 : BOOL;
	mUVScrollSort2: int;
	mUVScrollSpeed2: float;
	constructor( r: ByteReader )
	{
		this.mCheckTwoSide = r.ReadBOOL();
		this.mCheckRadiation = r.ReadBOOL();
		this.mRadiationSpeed = r.ReadFloat();
		this.mRadiationLowLimit = [r.ReadFloat(), r.ReadFloat(), r.ReadFloat(), r.ReadFloat()];
		this.mRadiationHighLimit = [r.ReadFloat(), r.ReadFloat(), r.ReadFloat(), r.ReadFloat()];
		this.mCheckLightBright = r.ReadBOOL();
		this.mCheckCameraSpecularEffect = r.ReadBOOL();
		this.mCameraSpecularEffectSort = r.ReadInt();
		this.mCameraSpecularEffectMaterialValue = [r.ReadFloat(), r.ReadFloat(), r.ReadFloat(), r.ReadFloat()];
		this.mCameraSpecularEffectMaterialPower = r.ReadFloat();
		this.mCameraSpecularEffectLightAddValue = r.ReadFloat();
		this.mCheckTextureAnimation = r.ReadBOOL();
		this.mTextureAnimationSpeed = r.ReadFloat();
		this.mCheckUVScroll1 = r.ReadBOOL();
		this.mUVScrollSort1 = r.ReadInt();
		this.mUVScrollSpeed1 = r.ReadFloat();
		this.mCheckBillboard = r.ReadBOOL();
		this.mBillboardSort = r.ReadInt();
		this.mCheckUVScroll2 = r.ReadBOOL();
		this.mUVScrollSort2 = r.ReadInt();
		this.mUVScrollSpeed2 = r.ReadFloat();
	}
}


export class SKINMOTION_FOR_GXD
{
	/**
	* @property float[3]
	*/
	mMotionVertex: float[];
	/**
	* @property float[3]
	*/
	mMotionNormal: float[];
	constructor( r: SKINVERTEX_FOR_GXD )
	{
		this.mMotionVertex = [ r.mV[0], r.mV[1], r.mV[2] ];
		this.mMotionNormal = [ r.mN[0], r.mN[1], r.mN[2] ];
	}
}


export class SKIN_FOR_GXD extends LOAD_FOR_GXD
{
    mAssetIsValid: BOOL = FALSE;
//private:
	
	//SKINVERTEX_FOR_GXD mVertexBufferForBillboard[4];

	mCheckChangeNormalState: BOOL;
	mScaleValue: Vector3;		/** Scale ฐช. */
	mSize: SKINSIZE_FOR_GXD;
	mScaleKeyMatrix: D3DXMATRIX[];//D3DXMATRIX*

//public:
    mCheckValidState: BOOL;
    mEffect: SKINEFFECT_FOR_GXD;
	mVertexNum: number;
	mUVNum: number;
	mWeightNum: number;
	mTrisNum: number;
	mVertex: Float32Array;
	mNormal: Float32Array;
	mUV: Float32Array;
	mWeight: float[];
	mTris: WORD[];
	//mVertexBuffer: SKINVERTEX_FOR_GXD[];
    //mV: Float32Array;
    //mN: Float32Array;
    //mT: Float32Array;
	mWeightBuffer: SKINWEIGHT_FOR_GXD[];
	//mIndexBuffer: SKININDEX_FOR_GXD[];
    mIndexBuffer: Uint16Array;
	mMotionVertex: Float32Array;
	mMotionNormal: Float32Array;
	//mSkinMotion: SKINMOTION_FOR_GXD[];
    /**
     * @property {TEXTURE_FOR_GXD[2]}
     */
	mTexture: TEXTURE_FOR_GXD[];
	mTextureAnimationNum: int;
	//TEXTURE_FOR_GXD *mTextureAnimation;
    //DWORD       m_dwDyeingColor;

	//--------------------------------------------------------------------------------------------------------------------
	// SkinForGXDฟกผญ นวมธสภป ร฿ฐก วฯฑโ ภงวั บฏผ๖ ร฿ฐก
	// 2010.03.10 : ฑ่ผบผ๖
	///< DDS ฦฤภฯทฮ บฮลอ heightmapภป ภะพ๎ผญ bumpmapฟก ป็ฟ๋วา Normalmapภป ปผบวัดู.
    mBumpTexture: TEXTURE_FOR_GXD; ///< bumpmappingภป ภงวั normap ภป ภ๚ภๅวฯฑโ ภงวั บฏผ๖ : 2008.10.21 ฑ่ผบผ๖
    mSpeculerTexture: TEXTURE_FOR_GXD; ///< speculermappingภป ภงวั normap ภป ภ๚ภๅวฯฑโ ภงวั บฏผ๖ : 2010.05.17 : ฑ่ผบผ๖
    mbIsUseBumpmap: BOOL; ///< bumpmappingภป ป็ฟ๋วาม๖ฟก ด๋วั ฟฉบฮ : 2008.11.10 ฑ่ผบผ๖
    mbIsUseSpeculer: BOOL; ///< speculermappingภป ป็ฟ๋วาม๖ฟก ด๋วั ฟฉบฮ : 2010.05.17 : ฑ่ผบผ๖
	//BUMPEFFECT_FOR_GXD		mBumpEffect;
	//bool					m_bIsViewBumpLight;
	//--------------------------------------------------------------------------------------------------------------------
	mMesh: Mesh;
	
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
        //this.mVertexBuffer = [];
        this.mVertex = null;
        this.mNormal = null;
        this.mUV = null;
        this.mWeightBuffer = [];
        this.mIndexBuffer = null;
        this.mMotionVertex = null;
        this.mMotionNormal = null;
        //this.mSkinMotion = [];
        this.mTexture = [];
        this.mScaleValue = new Vector3( 1, 1, 1 );
        this.mScaleKeyMatrix = [];
        this.mTextureAnimationNum = 0;
        this.mbIsUseBumpmap = FALSE;
        this.mbIsUseSpeculer = FALSE;
        this.mBumpTexture = null;
        this.mSpeculerTexture = null;
        this.mMesh = null;
    }

	Load( r: ByteReader, tCheckCreateTexture: BOOL, tCheckRemoveFileData: BOOL ) : BOOL
	{
		if( this.mCheckValidState )
			return FALSE;
		this.mCheckValidState = r.ReadBOOL();
		if( !this.mCheckValidState )
			return TRUE;
		this.mCheckValidState = FALSE;

		var z: ZLibDataPtr = new ZLibDataPtr( r );
		if( !Zlib.Decompress( z ) )
		{
			return FALSE;
		}
		var sr = new ByteReader( z.tOriginal );

		this.mEffect = new SKINEFFECT_FOR_GXD( sr );
		this.mVertexNum = sr.ReadInt();
		this.mUVNum = sr.ReadInt();
		this.mWeightNum = sr.ReadInt();
		this.mTrisNum = sr.ReadInt();
		this.mSize = new SKINSIZE_FOR_GXD( sr );

		var str = "";
        str += "mVertexNum:"+ this.mVertexNum;
		str += "\tmUVNum:"+ this.mUVNum;
		str += "\tmWeightNum:"+ this.mWeightNum;
		str += "\tmTrisNum:"+ this.mTrisNum;
        console.log(str);

        this.mVertex = new Float32Array( this.mVertexNum*3 );
        this.mNormal = new Float32Array( this.mVertexNum*3 );
        this.mUV = new Float32Array( this.mVertexNum*2 );
        this.mIndexBuffer = new Uint16Array( this.mTrisNum*3 );
        this.mMotionVertex = new Float32Array( this.mVertexNum*3 );
        this.mMotionNormal = new Float32Array( this.mVertexNum*3 );
		for( var i = 0; i < this.mVertexNum; i++ )
		{
            var vtb = new SKINVERTEX_FOR_GXD( sr );
            CopyArray( this.mVertex, i*3, vtb.mV, 0, 3 );
            CopyArray( this.mNormal, i*3, vtb.mN, 0, 3 );
            CopyArray( this.mUV, i*2, vtb.mT, 0, 2 );

            CopyArray( this.mMotionVertex, i*3, vtb.mV, 0, 3 );
            CopyArray( this.mMotionNormal, i*3, vtb.mN, 0, 3 );
		}
		for( var i = 0; i < this.mVertexNum; i++ )
		{
			this.mWeightBuffer[i] = new SKINWEIGHT_FOR_GXD( sr );
		}
		for( var i = 0; i < this.mTrisNum; i++ )
		{
            var indexBuff = new SKININDEX_FOR_GXD( sr );
            CopyArray( this.mIndexBuffer, i*3, indexBuff.mFace, 0, 3 );
		}
        this.mTexture[0] = new TEXTURE_FOR_GXD();
        this.mTexture[1] = new TEXTURE_FOR_GXD();
        if( !this.mTexture[0].Load( r, tCheckCreateTexture, tCheckRemoveFileData ) || !this.mTexture[1].Load( r, tCheckCreateTexture, tCheckRemoveFileData ) )
        {
            return FALSE;
        }


        this.mTextureAnimationNum = r.ReadInt();
        //this.mbIsUseBumpmap = r.ReadBOOL();
        console.log( this.mTextureAnimationNum, this.mbIsUseBumpmap );

        if( this.mbIsUseBumpmap )
        {
            //lDistanceToMove = SetFilePointer(hFile, 0, 0, 1u);
            //r.SetOffset( r.GetOffset()-4 );
            //console.log( r.ReadInt() );

            //var rr = new ByteReader( r.GetRemainData() );
            //this.mBumpTexture = new TEXTURE_FOR_GXD();
            //if( !this.mBumpTexture.Load( rr, tCheckCreateTexture, tCheckRemoveFileData ) )
            //{
            //    this.mbIsUseBumpmap = FALSE;
            //}
        }

        //this.mbIsUseSpeculer = r.ReadBOOL();

        console.log( this.mbIsUseSpeculer );


        var uniforms = {    // custom uniforms (your textures)

        tOne: { type: "t", value: this.mTexture[0].GetTexture() },
        tSec: { type: "t", value: this.mTexture[1].GetTexture() }

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

        varying vec2 vUv;

        void main(void)
        {
            vec3 c;
            vec4 Ca = texture2D(tOne, vUv);
            vec4 Cb = texture2D(tSec, vUv);
            c = Ca.rgb * Ca.a + Cb.rgb * Cb.a * (1.0 - Ca.a);  // blending equation
            gl_FragColor= vec4(c, 1.0);
        }
        `;

        this.mShaderMaterial = new ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader: fragShader
        });


        this.mMaterial = new MeshBasicMaterial( { map: this.mTexture[0].GetTexture() } );
        this.mMesh = new Mesh( this.ToMesh(), this.mShaderMaterial );
        this.mMesh.position.set( 0, 0, 0 );
        this.mMesh.matrixAutoUpdate = false;
        GXD.Add( this.mMesh );


        this.mCheckValidState = TRUE;
		return TRUE;
	}
    mMaterial: MeshBasicMaterial;
    mShaderMaterial: ShaderMaterial;

    ToMesh(): BufferGeometry
    {
        var geometry: BufferGeometry;
        if( !(this.mMesh instanceof Mesh) )
            geometry = new BufferGeometry;
        else
            geometry = this.mMesh.geometry;
        geometry.setAttribute( BuiltinShaderAttributeName.position, new BufferAttribute( this.mVertex, 3 ) );
        geometry.setAttribute( BuiltinShaderAttributeName.normal, new BufferAttribute( this.mNormal, 3 ) );
        geometry.setAttribute( BuiltinShaderAttributeName.uv, new BufferAttribute( this.mUV, 2 ) );
        geometry.setIndex( new BufferAttribute( this.mIndexBuffer, 1 ) );
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.normal.needsUpdate = true;
        geometry.attributes.uv.needsUpdate = true;
        geometry.index.needsUpdate = true;
        return geometry;
    }

    ReadyForDraw( tFrame: int, tMotion: MOTION_FOR_GXD, tCheckCalculateNormal: BOOL )
    {
        //HANDLE v4; // eax
        //var v5: D3DXMATRIX; // eax
        //SIZE_T v6; // [esp+8h] [ebp-114h]
        //D3DXVECTOR3 v8; // [esp+18h] [ebp-104h] BYREF
        //D3DXVECTOR3 v9; // [esp+24h] [ebp-F8h] BYREF
        //D3DXVECTOR3 v10; // [esp+30h] [ebp-ECh] BYREF
        //D3DXVECTOR3 v11; // [esp+3Ch] [ebp-E0h] BYREF
        //D3DXVECTOR3 v12; // [esp+48h] [ebp-D4h] BYREF
        //D3DXVECTOR3 v13; // [esp+54h] [ebp-C8h] BYREF
        //D3DXMATRIX v14; // [esp+60h] [ebp-BCh] BYREF
        var pOut: D3DXVECTOR3; // [esp+A0h] [ebp-7Ch] BYREF
        var v16: D3DXVECTOR3; // [esp+ACh] [ebp-70h] BYREF
        var v17: D3DXVECTOR3; // [esp+ACh] [ebp-70h] BYREF
        var v18: D3DXVECTOR3; // [esp+ACh] [ebp-70h] BYREF
        var v19: D3DXMATRIX[] = []; // [esp+D0h] [ebp-4Ch]
        var v20: D3DXMATRIX; // [esp+D4h] [ebp-48h] BYREF
        var i: int; // [esp+118h] [ebp-4h]
      
        if ( this.mCheckValidState )
        {
          if ( tMotion.mCheckValidState )
          {
            if ( ( this.mScaleValue.x <= 0.9998999834060669
                || this.mScaleValue.x >= 1.000100016593933
                || this.mScaleValue.y <= 0.9998999834060669
                || this.mScaleValue.y >= 1.000100016593933
                || this.mScaleValue.z <= 0.9998999834060669
                || this.mScaleValue.z >= 1.000100016593933 )
              && !this.mScaleKeyMatrix.length )
            {
              this.mScaleKeyMatrix = new D3DXMATRIX[ tMotion.mBoneNum << 6 ];
            }
            let mi = tMotion.mBoneNum * tFrame;
            if( mi < 1 )
            {
                return;
            }
            //console.log(mi, this.mScaleKeyMatrix.length);
            for( i = 0; i < mi; i++){
                v19[i] = tMotion.mKeyMatrix[i+mi];
            }
            //v19 = tMotion.mKeyMatrix;
            //if ( this.mScaleKeyMatrix )
            //{
            //    v20 = D3DXMatrixScaling( v20, this.mScaleValue.x, this.mScaleValue.y, this.mScaleValue.z );
            //    for ( i = 0; i < tMotion.mBoneNum; i++ )
            //    {
            //        try {
            //        this.mScaleKeyMatrix[i] = v19[i].multiply( v20 );
            //        }
            //        catch( e )
            //        {
            //        console.error(mi, i, v19.length);
            //        }
            //    }
            //    v19 = this.mScaleKeyMatrix;
            //}
            for ( i = 0; i < this.mVertexNum; i++ )
            {
                var pos = i*3;
                var vcMotionVertex = D3DXVECTOR3.FromArray( this.mMotionVertex, pos );
                pOut = D3DXVec3TransformCoord( pOut, vcMotionVertex, v19[this.mWeightBuffer[i].mBoneIndex[0]] );
                v16 = D3DXVec3TransformCoord( v16, vcMotionVertex, v19[this.mWeightBuffer[i].mBoneIndex[1]] );
                if ( this.mWeightBuffer[i].mBlendValue[2] <= 0.0 )
                  v17 = new D3DXVECTOR3( 0.0, 0.0, 0.0 );
                else
                  v17 = D3DXVec3TransformCoord( v17, vcMotionVertex, v19[this.mWeightBuffer[i].mBoneIndex[2]] );
                if ( this.mWeightBuffer[i].mBlendValue[3] <= 0.0 )
                  v18 = new D3DXVECTOR3( 0.0, 0.0, 0.0 );
                else
                  v18 = D3DXVec3TransformCoord( v18, vcMotionVertex, v19[this.mWeightBuffer[i].mBoneIndex[3]] );
                this.mVertex[pos] = pOut.x * this.mWeightBuffer[i].mBlendValue[0]
                                             + v16.x * this.mWeightBuffer[i].mBlendValue[1]
                                             + v17.x * this.mWeightBuffer[i].mBlendValue[2]
                                             + v18.x * this.mWeightBuffer[i].mBlendValue[3];
                this.mVertex[pos+1] = pOut.y * this.mWeightBuffer[i].mBlendValue[0]
                                             + v16.y * this.mWeightBuffer[i].mBlendValue[1]
                                             + v17.y * this.mWeightBuffer[i].mBlendValue[2]
                                             + v18.y * this.mWeightBuffer[i].mBlendValue[3];
                this.mVertex[pos+2] = pOut.z * this.mWeightBuffer[i].mBlendValue[0]
                                             + v16.z * this.mWeightBuffer[i].mBlendValue[1]
                                             + v17.z * this.mWeightBuffer[i].mBlendValue[2]
                                             + v18.z * this.mWeightBuffer[i].mBlendValue[3];
                //break;
                //if ( tCheckCalculateNormal )
                //{
                //      this.mCheckChangeNormalState = TRUE;
                //      var vcMotionNormal = D3DXVECTOR3.FromArray( this.mMotionNormal, i * 3 );
                //      pOut = D3DXVec3TransformNormal( pOut, vcMotionNormal, v19[this.mWeightBuffer[i].mBoneIndex[0]] );
                //      v16 = D3DXVec3TransformNormal( v16, vcMotionNormal, v19[this.mWeightBuffer[i].mBoneIndex[1]] );
                //      if ( this.mWeightBuffer[i].mBlendValue[2] <= 0.0 )
                //          v17 = new D3DXVECTOR3( 0.0, 0.0, 0.0 );
                //      else
                //          v17 = D3DXVec3TransformNormal( v17, vcMotionNormal, v19[this.mWeightBuffer[i].mBoneIndex[2]] );
                //      if ( this.mWeightBuffer[i].mBlendValue[3] <= 0.0 )
                //        v18 = new D3DXVECTOR3( 0.0, 0.0, 0.0 );
                //      else
                //        v18 = D3DXVec3TransformNormal( v18, vcMotionNormal, v19[this.mWeightBuffer[i].mBoneIndex[3]] );
                //      this.mNormal[i*3+0] = pOut.x * this.mWeightBuffer[i].mBlendValue[0]
                //                                  + v16.x * this.mWeightBuffer[i].mBlendValue[1]
                //                                  + v17.x * this.mWeightBuffer[i].mBlendValue[2]
                //                                  + v18.x * this.mWeightBuffer[i].mBlendValue[3];
                //      this.mNormal[i*3+1] = pOut.y * this.mWeightBuffer[i].mBlendValue[0]
                //                                  + v16.y * this.mWeightBuffer[i].mBlendValue[1]
                //                                  + v17.y * this.mWeightBuffer[i].mBlendValue[2]
                //                                  + v18.y * this.mWeightBuffer[i].mBlendValue[3];
                //      this.mNormal[i*3+2] = pOut.z * this.mWeightBuffer[i].mBlendValue[0]
                //                                  + v16.z * this.mWeightBuffer[i].mBlendValue[1]
                //                                  + v17.z * this.mWeightBuffer[i].mBlendValue[2]
                //                                  + v18.z * this.mWeightBuffer[i].mBlendValue[3];
                //      var vcNormal = D3DXVECTOR3.FromArray( this.mNormal, i*3 );
                //      vcNormal = D3DXVec3Normalize( vcNormal, this.mNormal );
                //      Vector3ToArray( vcNormal, this.mNormal, i*3 );
                //}
                //else
                //{
                //    if ( this.mCheckChangeNormalState )
                //    {
                //      this.mCheckChangeNormalState = FALSE;
                //      CopyArray( this.mNormal, i*3, this.mMotionNormal, i*3, 3 );
                //    }
                //}
            }
          }
          else
          {
            for ( i = 0; i < this.mVertexNum; ++i )
            {
                CopyArray( this.mVertex, i*3, this.mMotionVertex, i*3, 3 );
                CopyArray( this.mNormal, i*3, this.mMotionNormal, i*3, 3 );
            }
          }
        }
        this.mMesh.geometry = this.ToMesh();
    }
    Draw()
    {

    }

    DrawForSelect( tCoord: float[], tAngle: float[] )
    {
        //struct D3DXMATRIX *v1; // eax
        //D3DXVECTOR3 pOut; // [esp+4h] [ebp-5Ch] BYREF
        //float v4; // [esp+10h] [ebp-50h]
        //float v5; // [esp+14h] [ebp-4Ch]
        //D3DXMATRIX v6; // [esp+18h] [ebp-48h] BYREF
        //D3DXVECTOR3 *v7; // [esp+5Ch] [ebp-4h]
      //
        //if ( this->mCheckValidState )
        //{
        //  D3DXVECTOR3::D3DXVECTOR3(&pOut);
        //  D3DXMATRIX::D3DXMATRIX(&v6);
        //  if ( this->mEffect.mCheckBillboard )
        //  {
        //    v1 = D3DXMatrixIdentity(&v6);
        //    ((*mGXD.mGraphicDevice)->SetTransform)(mGXD.mGraphicDevice, 256, v1);
        //    SKIN_FOR_GXD::GetCenterCoord(this, &pOut.x);
        //    D3DXVec3TransformCoord(&pOut, &pOut, &mGXD.mWorldMatrix);
        //    if ( this->mEffect.mBillboardSort == 1 )
        //      v7 = mGXD.mBillboardVertexInfoForAll;
        //    else
        //      v7 = mGXD.mBillboardVertexInfoForY;
        //    v4 = (this->mSize.mBoxMax[0] - this->mSize.mBoxMin[0]) * 0.5;
        //    v5 = (this->mSize.mBoxMax[1] - this->mSize.mBoxMin[1]) * 0.5;
        //    this->mVertexBufferForBillboard[0].mV[0] = pOut.x - v7->x * v4 - v7[1].x * v5;
        //    this->mVertexBufferForBillboard[0].mV[1] = pOut.y - v7->y * v4 - v7[1].y * v5;
        //    this->mVertexBufferForBillboard[0].mV[2] = pOut.z - v7->z * v4 - v7[1].z * v5;
        //    this->mVertexBufferForBillboard[1].mV[0] = pOut.x - v7->x * v4 + v7[1].x * v5;
        //    this->mVertexBufferForBillboard[1].mV[1] = pOut.y - v7->y * v4 + v7[1].y * v5;
        //    this->mVertexBufferForBillboard[1].mV[2] = pOut.z - v7->z * v4 + v7[1].z * v5;
        //    this->mVertexBufferForBillboard[2].mV[0] = v7->x * v4 + pOut.x - v7[1].x * v5;
        //    this->mVertexBufferForBillboard[2].mV[1] = v7->y * v4 + pOut.y - v7[1].y * v5;
        //    this->mVertexBufferForBillboard[2].mV[2] = v7->z * v4 + pOut.z - v7[1].z * v5;
        //    this->mVertexBufferForBillboard[3].mV[0] = v7->x * v4 + pOut.x + v7[1].x * v5;
        //    this->mVertexBufferForBillboard[3].mV[1] = v7->y * v4 + pOut.y + v7[1].y * v5;
        //    this->mVertexBufferForBillboard[3].mV[2] = v7->z * v4 + pOut.z + v7[1].z * v5;
        //    ((*mGXD.mGraphicDevice)->SetTexture)(mGXD.mGraphicDevice, 0, 0);
        //    CRenderStateMgr::SetRenderState(&mGXD.m_RenderStateMgr, 7, 0, ".\\S07_GXD.cpp", 2900);
        //    CRenderStateMgr::SetRenderState(&mGXD.m_RenderStateMgr, 8, 2u, ".\\S07_GXD.cpp", 2901);
        //    ((*mGXD.mGraphicDevice)->DrawPrimitiveUP)(mGXD.mGraphicDevice, 5, 2, this, 32);
        //    CRenderStateMgr::SetRenderState(&mGXD.m_RenderStateMgr, 8, 3u, ".\\S07_GXD.cpp", 2903);
        //    CRenderStateMgr::SetRenderState(&mGXD.m_RenderStateMgr, 7, 1u, ".\\S07_GXD.cpp", 2904);
        //    ((*mGXD.mGraphicDevice)->SetTransform)(mGXD.mGraphicDevice, 256, &mGXD.mWorldMatrix);
        //  }
        //  else
        //  {
        //    ((*mGXD.mGraphicDevice)->SetTexture)(mGXD.mGraphicDevice, 0, 0);
        //    CRenderStateMgr::SetRenderState(&mGXD.m_RenderStateMgr, 7, 0, ".\\S07_GXD.cpp", 2909);
        //    CRenderStateMgr::SetRenderState(&mGXD.m_RenderStateMgr, 8, 2u, ".\\S07_GXD.cpp", 2910);
        //    ((*mGXD.mGraphicDevice)->DrawIndexedPrimitiveUP)(
        //      mGXD.mGraphicDevice,
        //      4,
        //      0,
        //      this->mVertexNum,
        //      this->mTrisNum,
        //      this->mIndexBuffer,
        //      101,
        //      this->mVertexBuffer,
        //      32);
        //    CRenderStateMgr::SetRenderState(&mGXD.m_RenderStateMgr, 8, 3u, ".\\S07_GXD.cpp", 2912);
        //    CRenderStateMgr::SetRenderState(&mGXD.m_RenderStateMgr, 7, 1u, ".\\S07_GXD.cpp", 2913);
        //  }
        //}

        this.mMesh.position.x = tCoord[0];
        this.mMesh.position.y = tCoord[1];
        this.mMesh.position.z = tCoord[2];
        this.mMesh.rotation.x = tAngle[0];
        this.mMesh.rotation.y = tAngle[1];
        this.mMesh.rotation.z = tAngle[2];
    }
}