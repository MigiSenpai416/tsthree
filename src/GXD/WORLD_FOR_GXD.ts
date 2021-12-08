import { BufferAttribute, BufferGeometry, Group, Material, Mesh, MeshBasicMaterial } from "three";
import { ByteReader, CopyArray } from "../Common/ByteReader";
import { AssignArray } from "../Common/Helper";
import { BOOL, BuiltinShaderAttributeName, DWORD, FALSE, float, int, TRUE, DataType } from "../Common/types";
import { Zlib, ZLibDataPtr } from "../Common/Zlib";
import { D3DXVECTOR3 } from "../Math/D3D9Math";
import { GXD } from "./Core";
import { LOAD_FOR_GXD } from "./LOAD_FOR_GXD";
import { MOTION_FOR_GXD } from "./MOTION_FOR_GXD";
import { TEXTURE_FOR_GXD } from "./TEXTURE_FOR_GXD";


export class PARTICLEVERTEX_FOR_GXD
{
	mV: float[];//3
	mC: DWORD;
	mT: float[];//2
    //constructor( r: ByteReader )
    //{
    //    this.mV = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
    //    this.mC = r.ReadDWORD();
    //    this.mT = [ r.ReadFloat(), r.ReadFloat() ];
    //}
};

export class PARTICLE_FOR_GXD
{
	mCheckValidState: BOOL;
	mOneLifeTime: float;
	mLocation: float[];//3
	mVelocity: float[];//3
	mWeight: float;
	mSize: float;
	mColor: float[];//4
    //constructor( r: ByteReader )
    //{
    //    this.mCheckValidState = r.ReadBOOL();
    //    this.mOneLifeTime = r.ReadFloat();
    //    this.mLocation = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
    //    this.mVelocity = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
    //    this.mWeight = r.ReadFloat();
    //    this.mSize = r.ReadFloat();
    //    this.mColor = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
    //}
};

export class PSYSTEM_FOR_GXD
{
	mCheckValidState: BOOL;
	mTexture: TEXTURE_FOR_GXD;
	mMotion: MOTION_FOR_GXD;
	mTotalLifeTime: float;
	mFrameRatio: float;
	mEmitRate: float;
	mEmitSort: float;
	mEmitRadius: float;
	mEmitRange: float[];//3
	mOneLifeTime: float;
	mMinRandomVelocity: float[];//3
	mMaxRandomVelocity: float[];//3
	mWeight: float;
	mSize: float;
	mMinColor: float[];//4
	mMaxColor: float[];//4
	mMainForce: float[];//3
	mMinRandomForce: float[];//3
	mMaxRandomForce: float[];//3
	mWeightDelta: float;
	mSizeDelta: float;
	mColorDelta: float[];//4
    //constructor( r: ByteReader )
    //{
    //    this.mCheckValidState = r.ReadBOOL();
    //    this.mTexture = new TEXTURE_FOR_GXD;
    //    this.mMotion MOTION_FOR_GXD;
    //    this.mTotalLifeTime: float;
    //    this.mFrameRatio: float;
    //    this.mEmitRate: float;
    //    this.mEmitSort: float;
    //    this.mEmitRadius: float;
    //    this.mEmitRange: float[];//3
    //    this.mOneLifeTime: float;
    //    this.mMinRandomVelocity: float[];//3
    //    this.mMaxRandomVelocity: float[];//3
    //    this.mWeight: float;
    //    this.mSize: float;
    //    this.mMinColor: float[];//4
    //    this.mMaxColor: float[];//4
    //    this.mMainForce: float[];//3
    //    this.mMinRandomForce: float[];//3
    //    this.mMaxRandomForce: float[];//3
    //    this.mWeightDelta: float;
    //    this.mSizeDelta: float;
    //    this.mColorDelta: float[];//4
    //}
	
};

export class POBJECT_FOR_GXD
{
	mScaleValue: D3DXVECTOR3;
	mCheckValidState: BOOL;
	mPSystem: PSYSTEM_FOR_GXD[];//PSYSTEM_FOR_GXD*
	mTotalLifeTime: float;
	mCoord: float[];//3
	mAngle: float[];//3
	mEmitParticleNum: float;
	mMaxParticleNum: int;
	mParticle: PARTICLE_FOR_GXD[];//PARTICLE_FOR_GXD*
};

export class SKYBOXVERTEX_FOR_GXD
{
	mV: float[];//3
	mT: float[];//2
};

export class LENSFLAREVERTEX_FOR_GXD
{
	mV: float[];//4
	mT: float[];//2
};

export class SKY_FOR_GXD
{
	mCheckValidState: BOOL;
	mTextureForSkyBox: TEXTURE_FOR_GXD[];//TEXTURE_FOR_GXD[6]
	mLensFlareShapeRatio: float;
	mTextureForLensFlare: TEXTURE_FOR_GXD[];//TEXTURE_FOR_GXD[10];
	mPostFarPlane: float;
	mSkyBoxVertexBuffer: SKYBOXVERTEX_FOR_GXD[];//SKYBOXVERTEX_FOR_GXD[24];
	mLensFlareVertexBuffer: LENSFLAREVERTEX_FOR_GXD[];//LENSFLAREVERTEX_FOR_GXD[4];
};

export class WORLDVERTEX_FOR_GXD
{
	mV: float[];//3
	mN: float[];//3
	mT1: float[];//2
	mT2: float[];//2
    constructor( r?: ByteReader )
    {
        if( !( r instanceof ByteReader ) )
        {
            r = new ByteReader( new Uint8Array( 4*(3+3+2+2) ) );
        }
        this.mV = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
        this.mN = [ r.ReadFloat(), r.ReadFloat(), r.ReadFloat() ];
        this.mT1 = [ r.ReadFloat(), r.ReadFloat() ];
        this.mT2 = [ r.ReadFloat(), r.ReadFloat() ];
    }
};

export class WORLDINTEX_FOR_GXD
{
	w1: DWORD;
    w2: DWORD;
    w3: DWORD;
};

//struct G3WTRIS_FOR_GXD
//{
//	int mTextureIndex;
//	int mVertexIndex[3];
//	int mUVIndex[3];
//};

//struct G3WMESH_FOR_GXD
//{
//	char mName[256];
//	int mVertexNum;
//	int mUVNum;
//	int mTrisNum;
//	float *mVertex;
//	float *mUV;
//	G3WTRIS_FOR_GXD *mTris;
//};

export class WORLDTRIS_FOR_GXD
{
	mTextureIndex: int;
	mVertex: WORLDVERTEX_FOR_GXD[];//3;
	mPlaneInfo: float[];//4
	mSphereInfo: float[];//4
    constructor( r: ByteReader )
    {
        this.mTextureIndex = r.ReadInt();
        this.mVertex = AssignArray( WORLDVERTEX_FOR_GXD, 3, r );
        this.mPlaneInfo = r.Reads( 4, DataType.Float32 );
        this.mSphereInfo = r.Reads( 4, DataType.Float32 );
    }
};

export class QUADTREENODE_FOR_GXD
{
	mBoxMin: float[];//3
	mBoxMax: float[];//3
	mTrisNum: int;
	mTrisIndex: int[];//int*
	mChildNodeIndex: int[];//4
    constructor( r: ByteReader )
    {
        this.mBoxMin = r.Reads( 3, DataType.Float32 );
        this.mBoxMax = r.Reads( 3, DataType.Float32 );
        this.mTrisNum = r.ReadInt();
        this.mTrisIndex = [];
        var mTrisIndexNum = r.ReadInt();
        if( mTrisIndexNum )
        {
            for( let i = 0; i < this.mTrisNum; i++ )
            {
                this.mTrisIndex[i] = r.ReadInt();
            }
        }
        this.mChildNodeIndex = r.Reads( 4, DataType.Int32 );
        return this;
    }
};

export class MOBJECTINFO_FOR_GXD
{
	mIndex: int;
	mCoord: float[];//3
	mAngle: float[];//3
	mFrame: float;
	mPostTimeForEffect: float;
};

export class POBJECTINFO_FOR_GXD
{
	mIndex: int;
	mCoord: float[];//3
	mAngle: float[];//3
	mParticle: POBJECT_FOR_GXD;
};



export class WORLD_FOR_GXD extends LOAD_FOR_GXD
{

	mWaterWaveTextureSize: int;

	//BOOL GetXCoordWithTris( int tTrisIndex, float y, float z, float *x );
	//BOOL GetYCoordWithTris( int tTrisIndex, float x, float z, float *y );
	//BOOL GetZCoordWithTris( int tTrisIndex, float x, float y, float *z );
	//BOOL CheckPointInTris( int tTrisIndex, float tPoint[3] );
	//BOOL CheckPointInTrisWithoutYCoord( int tTrisIndex, float tPoint[3] );
	//BOOL CheckPointInWorldWithoutYCoord( float tPoint[3] );
	//BOOL CheckRayInTris( int tTrisIndex, float tQ[3], float tV[3], float tCoord[3], BOOL tCheckTwoSide );
	//BOOL CheckSegmentInTris( int tTrisIndex, float tQ[3], float tV[3], float tCoord[3], BOOL tCheckTwoSide );
//
	//LPDIRECT3DVERTEXBUFFER9		m_pVertexBuffer;
	//LPDIRECT3DINDEXBUFFER9*		m_ppIndexBuffer;	
//
	m_dwpIndexNumOfTexture: DWORD[];
//
	////2010.12.09 : 김성수 : MObject 일괄 랜더링을 위한 정보 변수
	//LPMOBJECTINFO_FOR_MULTIDRAW		m_MObjectMultiInfo;
//
	//// WO파일에 있는 MObject 들의 스케일 값을 저장할 클래스
	//CWorldMobjectScale m_MObjectScale;
//
	//float GetMinXWithWorldTris( WORLDTRIS_FOR_GXD *tWorldTris );
	//float GetMinYWithWorldTris( WORLDTRIS_FOR_GXD *tWorldTris );
	//float GetMinZWithWorldTris( WORLDTRIS_FOR_GXD *tWorldTris );
	//float GetMaxXWithWorldTris( WORLDTRIS_FOR_GXD *tWorldTris );
	//float GetMaxYWithWorldTris( WORLDTRIS_FOR_GXD *tWorldTris );
	//float GetMaxZWithWorldTris( WORLDTRIS_FOR_GXD *tWorldTris );
//
//
	mCheckValidState: BOOL;
	mLoadSort: int;
	mTextureNum: int;
	mTexture: TEXTURE_FOR_GXD[];//*
	mWaterWaveTexture: [];//IDirect3DTexture9*
	//TEXTURE_FOR_GXD mShadowTexture;
	//int mG3WMeshNum;
	//G3WMESH_FOR_GXD *mG3WMesh;
	mWorldTrisNum: int;
	mWorldTris: WORLDTRIS_FOR_GXD[];
	//int mMObjectNum;
	//MOBJECT_FOR_GXD *mMObject;
	//char *mMObjectFileName;
	//int mMObjectInfoNum;
	//MOBJECTINFO_FOR_GXD *mMObjectInfo;
	//int mPSystemNum;
	//PSYSTEM_FOR_GXD *mPSystem;
	//char *mPSystemFileName;
	//int mPObjectInfoNum;
	//POBJECTINFO_FOR_GXD *mPObjectInfo;
	mTotalQuadtreeNodeNum: int;
	mMaxQuadtreeNodeLeafNum: int;
	mQuadtree: QUADTREENODE_FOR_GXD[];//*
	mTextureTrisPostIndex: int[];//*
	//int mSaveDrawQuadtreeNodeNum;
	mSaveDrawQuadtreeNodeIndex: int[];
	mSaveDrawWorldTrisFlag:int [];

	constructor()
    {
        super();
        this.Free();
    }
    //~WORLD_FOR_GXD( void );

	//void Init( void );
	Free(): void
    {
        
	this.mWaterWaveTextureSize = 0;

        //LPDIRECT3DVERTEXBUFFER9		m_pVertexBuffer;
        //LPDIRECT3DINDEXBUFFER9*		m_ppIndexBuffer;	
    //
        this.m_dwpIndexNumOfTexture = [];
    //
        ////2010.12.09 : 김성수 : MObject 일괄 랜더링을 위한 정보 변수
        //LPMOBJECTINFO_FOR_MULTIDRAW		m_MObjectMultiInfo;
    //
        //// WO파일에 있는 MObject 들의 스케일 값을 저장할 클래스
        //CWorldMobjectScale m_MObjectScale;
    //


        this.mCheckValidState = FALSE;
        this.mLoadSort = 0;
        this.mTextureNum = 0;
        this.mTexture = [];
        this.mWaterWaveTexture = [];//*
        //TEXTURE_FOR_GXD mShadowTexture;
        //int mG3WMeshNum;
        //G3WMESH_FOR_GXD *mG3WMesh;
        this.mWorldTrisNum = 0;
        this.mWorldTris = [];
        //int mMObjectNum;
        //MOBJECT_FOR_GXD *mMObject;
        //char *mMObjectFileName;
        //int mMObjectInfoNum;
        //MOBJECTINFO_FOR_GXD *mMObjectInfo;
        //int mPSystemNum;
        //PSYSTEM_FOR_GXD *mPSystem;
        //char *mPSystemFileName;
        //int mPObjectInfoNum;
        //POBJECTINFO_FOR_GXD *mPObjectInfo;
        this.mTotalQuadtreeNodeNum = 0;
        this.mMaxQuadtreeNodeLeafNum = 0;
        this.mQuadtree = [];
        this.mTextureTrisPostIndex = [];
        //int mSaveDrawQuadtreeNodeNum;
        this.mSaveDrawQuadtreeNodeIndex = [];
        this.mSaveDrawWorldTrisFlag = [];
        this.mLoadingWG = 0;
    }
//
	//BOOL LoadFromG3W( char *tFileName );
	//BOOL CreateQuadtree( void );
	//BOOL RecursionForCreateQuadtree( int tParentNodeIndex, int tChildNodeSortIndex, int tMaxQuadtreeDepth, int tPresentQuadtreeDepth );
//
	//BOOL SaveWG( char *tFileName );
	//BOOL SaveWG2( char *tFileName );
	//BOOL SaveWM( char *tFileName );
	//BOOL SaveWM2( char *tFileName );
	//BOOL SaveWO( char *tFileName );
	//BOOL SaveWO2( char *tFileName, int tLODStepNum );
	//BOOL SaveWP( char *tFileName );
	//BOOL SaveWP2( char *tFileName );
//
    mLoadingWG: int;
    curReader: ByteReader;
    Destroy(): BOOL
    {
        this.curReader = null;
        this.Free();
        return FALSE;
    }
	LoadWG( tFileName: string, tCheckCreateTexture: BOOL = TRUE, tCheckRemoveFileData: BOOL = TRUE )
    {
        this.mLoadingWG = 1;
        this.LoadWorldUrl( this, tFileName );
    }
	LoadWGCallback( r: ByteReader ): BOOL
    {
        this.curReader = r;
        this.mLoadingWG = 2;
        var z: ZLibDataPtr = new ZLibDataPtr( r );
        if( !Zlib.Decompress( z ) )
        {
            return this.Destroy();
        }

        var sr = new ByteReader( z.tOriginal );

        this.mWorldTrisNum = sr.ReadInt();
        this.mWorldTris = AssignArray( WORLDTRIS_FOR_GXD, this.mWorldTrisNum, sr );
        this.mTotalQuadtreeNodeNum = sr.ReadInt();
        this.mMaxQuadtreeNodeLeafNum = sr.ReadInt();
        console.log( this.mWorldTrisNum, this.mTotalQuadtreeNodeNum );

        let i;
        this.mQuadtree = AssignArray( QUADTREENODE_FOR_GXD, this.mTotalQuadtreeNodeNum, sr );
        //for ( i = 0; i < this.mTotalQuadtreeNodeNum; i++ )
        //{
        //    this.mQuadtree[i] = new QUADTREENODE_FOR_GXD( sr );
        //}
        console.log( "sr", sr );
        
        r = r.GetRemain();
        console.log( r );

        this.mTextureNum = r.ReadInt();
        console.log( "this.mTextureNum", this.mTextureNum );
        this.mTexture = AssignArray( TEXTURE_FOR_GXD, this.mTextureNum, r )
        this.mMaterial = [];
        for ( i = 0; i < this.mTextureNum; i++ )
        {
            if ( !this.mTexture[i].Load( r, TRUE, TRUE ) )
            {
                return this.Destroy();
            }
            this.mMaterial[i] = new MeshBasicMaterial( { map: this.mTexture[i].GetTexture() } );
        }

        this.mTextureTrisPostIndex = r.Reads( this.mTextureNum, DataType.Int32 );
        console.log( "reader is end", r.IsEnd() );

        for ( i = 0; i < this.mTextureNum && this.mTexture[i].mProcessModeCase != 3; ++i )
        ;
        if ( i < this.mTextureNum )
            this.MakeWaterWaveTexture();

        for( i = 0; i < this.mMaxQuadtreeNodeLeafNum; i++ )
            this.mSaveDrawQuadtreeNodeIndex[i] = 0;
        for( i = 0; i < this.mWorldTrisNum; i++ )
            this.mSaveDrawWorldTrisFlag[i] = 0;


        this.m_dwpIndexNumOfTexture[i] = 0;

        this.mMesh = [];
        var group: Group = new Group();
        group.matrixAutoUpdate = false;
        for ( i = 0; i < this.mWorldTrisNum; i++ )
        {
            this.mMesh[i] = new Mesh( this.CreateMesh( this.mWorldTris[i] ) );
            this.mMesh[i].material = this.mMaterial[this.mWorldTris[i].mTextureIndex];
            group.add( this.mMesh[i] );
        }
        GXD.Scene.add( group );

        this.Destroy();
        
        GXD.RenderEngine.render( GXD.Scene, GXD.Camera );

        return TRUE;
    }
    
    mMesh: Mesh[];
    mMaterial: MeshBasicMaterial[];
    CreateMesh( wtris: WORLDTRIS_FOR_GXD )
    {
        var geometry: BufferGeometry = new BufferGeometry();

        const vidx = wtris.mVertex.length;
        var positions: Float32Array = new Float32Array( vidx * 3 );
        var normals: Float32Array = new Float32Array( vidx * 3 );
        var uvs: Float32Array = new Float32Array( vidx * 2 );
        //var uv2: Float32Array = new Float32Array( vidx * 2 );
        //var indices: Uint16Array = new Uint16Array( this.mTrisNum[lod] * 3 );
        for( var i = 0; i < vidx; i++ )
        {
            const idx = i*3;
            CopyArray( positions, idx, wtris.mVertex[i].mV, 0, 3 );            
            CopyArray( normals, idx, wtris.mVertex[i].mN, 0, 3 );   

            const idx2 = i*2;
            CopyArray( uvs, idx2, wtris.mVertex[i].mT1, 0, 2 );
            //CopyArray( uv2, idx2, wtris.mVertex[i].mT2, 0, 2 );
        }
        //for( var i = 0; i < this.mTrisNum[lod]; i++ )
        //{
        //    CopyArray( indices, i*3, this.mIndexBuffer[lod][i].mFace, 0, 3 );
        //}

        geometry.setAttribute(BuiltinShaderAttributeName.position, new BufferAttribute(positions, 3));
        geometry.setAttribute(BuiltinShaderAttributeName.normal, new BufferAttribute(normals, 3));
        geometry.setAttribute(BuiltinShaderAttributeName.uv, new BufferAttribute(uvs, 2));
        //geometry.setAttribute(BuiltinShaderAttributeName.color, new BufferAttribute(uv2, 2));
        //geometry.setIndex( new BufferAttribute( indices, 1 ) );
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.normal.needsUpdate = true;
        geometry.attributes.uv.needsUpdate = true;
        //geometry.index.needsUpdate = true;
       // geometry.computeTangents();
        return geometry;
    }

	//BOOL LoadWM( char *tFileName );
	//BOOL LoadWO( char *tFileName, BOOL tCheckCreateTexture, BOOL tCheckRemoveFileData );
//
	////-----------------------//
	////월드내 스케일 정보 관련//
	////-----------------------//
	//BOOL LoadWS( char *tFileName);
	//BOOL SaveWS( char *tFileName);
	//BOOL InitWS( );
	//BOOL InsertMObjectScale();
	//BOOL SetMObjectScale(WORD wIndex , FLOAT fRate);
	//VOID ClearLastScaleRate()
	//{
	//	m_MObjectScale.ClearLastScaleRate();
	//	return;
	//}
	//const FLOAT GetScaleRateX(WORD wIndex)
	//{
	//	return m_MObjectScale.GetScaleRateX(wIndex);
	//}
	//const FLOAT GetScaleRateY(WORD wIndex)
	//{
	//	return m_MObjectScale.GetScaleRateY(wIndex);
	//}
	//const FLOAT GetScaleRateZ(WORD wIndex)
	//{
	//	return m_MObjectScale.GetScaleRateZ(wIndex);
	//}
	//const FLOAT GetLastScaleRateX()
	//{
	//	return m_MObjectScale.GetLastScaleRateX();
	//}
	//const FLOAT GetLastScaleRateY()
	//{
	//	return m_MObjectScale.GetLastScaleRateY();
	//}
	//const FLOAT GetLastScaleRateZ()
	//{
	//	return m_MObjectScale.GetLastScaleRateZ();
	//}
	////-----------------------//
	////-----------------------//
	////-----------------------//
//
	//void FreeMObjectInfo( void );
	//BOOL LoadWP( char *tFileName, BOOL tCheckCreateTexture, BOOL tCheckRemoveFileData );
	//void FreePObjectInfo( void );
	//void Update( float tFrameRatio, float tTime );
	//void Draw( int tDrawSort, BOOL tCheckDrawWaterEffect, float tWaterEffectValue, BOOL tCheckDrawCameraSpecularEffect, float tPostLimitCoord[3], float tPostLimitLength, float tPostLengthRatioForBlendValue );
	//void RecursionForDraw( int tParentNodeIndex );
	//void DrawWithWM( void );
	//void RecursionForDrawWithWM( int tParentNodeIndex );
	MakeWaterWaveTexture(): BOOL
    {
        //double v2; // [esp+20h] [ebp-5Ch]
        //float v3; // [esp+30h] [ebp-4Ch]
        //float v4; // [esp+34h] [ebp-48h]
        //double v5; // [esp+38h] [ebp-44h]
        //float v6; // [esp+40h] [ebp-3Ch]
        //float v7; // [esp+44h] [ebp-38h]
        //float X; // [esp+48h] [ebp-34h]
        //char v10; // [esp+53h] [ebp-29h]
        //char v11; // [esp+53h] [ebp-29h]
        //char v12; // [esp+53h] [ebp-29h]
        //BYTE *v13; // [esp+54h] [ebp-28h]
        //float v14; // [esp+58h] [ebp-24h]
        //char v15; // [esp+5Fh] [ebp-1Dh]
        //char v16; // [esp+5Fh] [ebp-1Dh]
        //char v17; // [esp+5Fh] [ebp-1Dh]
        //float v19; // [esp+64h] [ebp-18h]
        //float v21; // [esp+6Ch] [ebp-10h]        
        var v22 = {
            pBits: 0,
            Pitch: 0
        };//D3DLOCKED_RECT;
        //BYTE *v23; // [esp+78h] [ebp-4h]
      
        if ( this.mWaterWaveTexture.length )
          return FALSE;
        //if ( D3DXCreateTexture(
        //       mGXD.mGraphicDevice,
        //       this->mWaterWaveTextureSize,
        //       this->mWaterWaveTextureSize,
        //       1,
        //       0,
        //       60,
        //       1,
        //       &this->mWaterWaveTexture) < 0 )
        //  return 0;
        //if ( ((*this->mWaterWaveTexture)->LockRect)(this->mWaterWaveTexture, 0, &v22, 0, 0) >= 0 )
        {
          //  let i, j;
          //var v13 = v22.pBits;
          //for ( i = 0; i < this.mWaterWaveTextureSize; ++i )
          //{
          //  v23 = v13;
          //  for ( j = 0; j < this.mWaterWaveTextureSize; j++ )
          //  {
          //    v21 = j / this.mWaterWaveTextureSize - 0.5;
          //    v14 = i / this->mWaterWaveTextureSize - 0.5;
          //    X = v21 * v21 + v14 * v14;
          //    v19 = sqrtf(X);
          //    v7 = v19 * 360.0;
          //    v6 = -v19 * 1.0;
          //    v5 = cosf(v7) * 64.0;
          //    v10 = (expf(v6) * v5);
          //    v4 = (v21 + v14) * 180.0;
          //    v11 = (cosf(v4) * 32.0) + v10;
          //    v3 = (v21 * 1.0 - v14) * 90.0;
          //    v12 = (cosf(v3) * 16.0) + v11;
          //    v2 = sinf(v7) * 64.0;
          //    v15 = (expf(v6) * v2);
          //    v16 = (sinf(v4) * 32.0) + v15;
          //    v17 = (sinf(v3) * 16.0) + v16;
          //    *v23++ = v12;
          //    *v23++ = v17;
          //  }
          //  v13 += v22.Pitch;
          //}
          //if ( ((*this->mWaterWaveTexture)->UnlockRect)(this->mWaterWaveTexture, 0) >= 0 )
            return TRUE;
        }
        //((*this->mWaterWaveTexture)->Release)(this->mWaterWaveTexture);
        this.mWaterWaveTexture = [];
        return FALSE;
    }
	//BOOL MakeShadowTexture( char *tFileName );
//
	//BOOL ScreenCoordToWorldCoord( int tX, int tY, int *tTrisIndex, float tCoord[3], BOOL tCheckTwoSide );
	//BOOL RecursionForScreenCoordToWorldCoord( int tParentNodeIndex, float tQ[3], float tV[3], int *tTrisIndex, float tCoord[3], BOOL tCheckTwoSide );
	//BOOL TestRayInWorld( float tSCoord[3], float tECoord[3], BOOL tCheckTwoSide );
	//BOOL RecursionForTestRayInWorld( int tParentNodeIndex, float tQ[3], float tV[3], BOOL tCheckTwoSide );
	//BOOL FindRayInWorld( float tSCoord[3], float tECoord[3], int *tTrisIndex, float tCoord[3], BOOL tCheckTwoSide );
	//BOOL RecursionForFindRayInWorld( int tParentNodeIndex, float tQ[3], float tV[3], int *tTrisIndex, float tCoord[3], BOOL tCheckTwoSide );
	//BOOL TestSegmentInWorld( float tSCoord[3], float tECoord[3], BOOL tCheckTwoSide );
	//BOOL RecursionForTestSegmentInWorld( int tParentNodeIndex, float tQ[3], float tV[3], BOOL tCheckTwoSide );
	//BOOL FindSegmentInWorld( float tSCoord[3], float tECoord[3], int *tTrisIndex, float tCoord[3], BOOL tCheckTwoSide );
	//BOOL RecursionForFindSegmentInWorld( int tParentNodeIndex, float tQ[3], float tV[3], int *tTrisIndex, float tCoord[3], BOOL tCheckTwoSide );
//
	//BOOL FindCameraInWorld( float tCameraLook[3], float tCameraEye[3], float tCameraRadius, float tCameraCoord[3] );
	//BOOL RecursionForFindCameraInWorld( int tParentNodeIndex, float tCameraLook[3], float tCameraEye[3], float tCameraRadius, float tCameraCoord[3] );
	//BOOL TestCameraInWorldMObject( float tCameraLook[3], float tCameraEye[3] );
//
	//BOOL GetYCoord( float x, float z, float *y, BOOL tCheckExistPostYCoord, float tPostYCoord, BOOL tCheckTwoSide, BOOL tCheckOnlyOne );
	//void Path( float tSCoord[3], float tECoord[3], float tSpeed, float tPostTime, float tResult[3] );
	//BOOL Move( float tSCoord[3], float tECoord[3], float tSpeed, float tPostTime, BOOL *tCheckArrival );
    //BOOL Move2 (float tSCoord[3], float tECoord[3], float tSpeed, float tPostTime, BOOL *tCheckArrival);
//
    //bool    SetUpAtlasUV (D3DXMATRIX& viewmatrix, D3DXMATRIX& projmatrix);

};