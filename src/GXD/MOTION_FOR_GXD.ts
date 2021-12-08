import { LOAD_FOR_GXD } from "./LOAD_FOR_GXD";
import { BOOL, FALSE, int, TRUE } from "../Common/types";
import { Zlib, ZLibDataPtr } from "../Common/Zlib";
import { ByteReader } from "../Common/ByteReader";
import { D3DXMATRIX, D3DXMatrixRotationQuaternion, D3DXQUATERNION, D3DXVECTOR3 } from "../Math/D3D9Math";

export class MOTION_FOR_GXD extends LOAD_FOR_GXD
{
	mCheckValidState: BOOL;
	mFrameNum: int;
	mBoneNum: int;
	mKeyMatrix: D3DXMATRIX[] = [];

    constructor()
    {
        super();
        this.Free();
    }

    Init() : void
    {
        this.Free();
    }

    Free(): void
    {
        this.mCheckValidState = FALSE;
        this.mFrameNum = 0;
        this.mBoneNum = 0;
        this.mKeyMatrix = [];
    }

    Load( r: ByteReader, tCheckCreateTexture: BOOL, tCheckRemoveFileData: BOOL ) : BOOL
    {
        if ( this.mCheckValidState )
            return FALSE;

        var z: ZLibDataPtr = new ZLibDataPtr( r );
        if( !Zlib.Decompress( z ) )
        {
            return FALSE;
        }

        var sr: ByteReader = new ByteReader( z.tOriginal );
        this.mFrameNum = sr.ReadInt();
        this.mBoneNum = sr.ReadInt();
        console.log( "mFrameNum", this.mFrameNum );
        console.log( "mBoneNum", this.mBoneNum );

        for( var i = 0; i < this.mFrameNum * this.mBoneNum; i++ )
        {
            var mx: MOTION_MATRIX = new MOTION_MATRIX( sr );
            this.mKeyMatrix[i] = mx.GetMatrix();
        }
        if( this.mKeyMatrix.length != ( this.mFrameNum * this.mBoneNum ) )
        {
            this.Free();
            return FALSE;
        }
        this.mCheckValidState = TRUE;
        return TRUE;
    }
}

export class MOTION_MATRIX
{
    mQuaternion: D3DXQUATERNION = new D3DXQUATERNION;;
    mPosition: D3DXVECTOR3 = new D3DXVECTOR3;
    mMatrix: D3DXMATRIX = new D3DXMATRIX;
    constructor( r: ByteReader )
    {
        this.mQuaternion = new D3DXQUATERNION( r.ReadFloat(), r.ReadFloat(), r.ReadFloat(), r.ReadFloat() );
        this.mPosition = new D3DXVECTOR3( r.ReadFloat(), r.ReadFloat(), r.ReadFloat() );
    }
    GetMatrix() : D3DXMATRIX
    {
        this.mMatrix = D3DXMatrixRotationQuaternion( this.mMatrix, this.mQuaternion );
        //this.mMatrix.setPosition( this.mPosition.x, this.mPosition.y, this.mPosition.z );
        this.mMatrix.elements[ 12 ] = this.mPosition.x;//_41
        this.mMatrix.elements[ 13 ] = this.mPosition.y;//_42
        this.mMatrix.elements[ 14 ] = this.mPosition.z;//_43
        this.mMatrix.elements[ 15 ] = 1;//_44    
        return this.mMatrix;

    }
}