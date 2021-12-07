import { BOOL, FALSE, TRUE, float, int } from "../Common/types";
import { ByteReader } from "../Common/ByteHelper";
import { LOAD_FOR_GXD } from "./LOAD_FOR_GXD";
import { MOTION_FOR_GXD } from "./MOTION_FOR_GXD";
import { SKIN_FOR_GXD } from "./SKIN_FOR_GXD";

export class SOBJECT_FOR_GXD extends LOAD_FOR_GXD
{
	num: int = Math.random();
	mCheckValidState: BOOL;
	mSkinNum: int;
	mSkin: SKIN_FOR_GXD[];
	constructor()
	{
        super();
		this.Init();
	}
	Init(): void
	{
		this.mCheckValidState = FALSE;
		this.mSkinNum = 0;
		this.mSkin = [];
	}
	Load( r: ByteReader, tCheckCreateTexture: BOOL, tCheckRemoveFileData: BOOL ) : BOOL
	{
		if( this.mCheckValidState )
			return FALSE;
		this.mSkinNum = r.ReadInt();
		if( this.mSkinNum < 1 )
			return TRUE;
		for( var i = 0; i < this.mSkinNum; i++ )
		{
			this.mSkin[i] = new SKIN_FOR_GXD();
			this.mSkin[i].Init();
		}
		for( var i = 0; i < this.mSkinNum; i++ )
		{
			if( !this.mSkin[i].Load( r, tCheckCreateTexture, tCheckRemoveFileData ) )
			{
				return FALSE;
			}
		}
		this.mCheckValidState = TRUE;
		return TRUE;
	}

    Draw( )
    {
        //if( this.mSkin[0].mCheckValidState )
        //    return;
        //for( var i = 0; i < this.mSkinNum; i++ )
        //{
        //    this.mSkin[i].ReadyForDraw( 1, );
        //    this.mSkin[i].Draw();
        //}
    }

    /**
     * @param {int} tSelectSkinIndex
     * @param {float} tFrame
     * @param {float][3]} tCoord
     * @param {float[3]} tAngle
     * @param {MOTION_FOR_GXD*} tMotion
     * @param {float} tRangeForCulling
     */
    DrawForSelect( tSelectSkinIndex: int, tFrame: float, tCoord: float[], tAngle: float[], tMotion: MOTION_FOR_GXD, tRangeForCulling: float )
    {
        if( !this.mCheckValidState )
        {
            return;
        }
        if( tSelectSkinIndex < 0 || tSelectSkinIndex >= this.mSkinNum )
        {
            return;
        }
        if ( !tMotion.mCheckValidState || ( tFrame < 0 || tFrame >= tMotion.mFrameNum ) )
        {
            return;
        }
        //var v21: float[] = [ tCoord[0], tRangeForCulling * 0.5 + tCoord[1], tCoord[2] ];
        //if ( GXD::CheckSphereInFrustum(&mGXD, v21, tRangeForCulling * 0.5) )
        {
          //((*mGXD.mGraphicDevice)->SetFVF)(mGXD.mGraphicDevice, 274);
          //var v17 = new Matrix4().makeTranslation( tCoord[0], tCoord[1], tCoord[2] );
          //var v18 = Matrix.RotationX( tAngle[0] * 0.01745329238474369 );
          //var v19 = Matrix.RotationY( tAngle[1] * 0.01745329238474369 );
          //var v20 = Matrix.RotationZ( tAngle[2] * 0.01745329238474369 );
          //v20.multiply( v19 );
          //v20.multiply( v18 );
          //v17.multiply( v20 );
          //var v16 = [ v17.getTranslation().x, v17.getTranslation().y, v17.getTranslation().z ];
          //tCoord[0] = v16[0];
          //tCoord[1] = v16[1];
          //tCoord[2] = v16[2];
          //var v14 = Quaternion.FromRotationMatrix( v17 );
          //var v15 = [ v14.x, v14.y, v14.z ];
          //tAngle[0] = v15[0];
          //tAngle[1] = v15[1];
          //tAngle[2] = v15[2];
          //memcpy(&mGXD.mWorldMatrix, D3DXMATRIX::operator*(&v12, &v17), sizeof(mGXD.mWorldMatrix));
          //((*mGXD.mGraphicDevice)->SetTransform)(mGXD.mGraphicDevice, 256, &mGXD.mWorldMatrix);
          var i = tSelectSkinIndex;
          //for ( var i = 0; i < this.mSkinNum; i++ )
          {
            if ( i == tSelectSkinIndex && this.mSkin[i].mCheckValidState )
            {
              this.mSkin[i].ReadyForDraw(  tFrame, tMotion, FALSE );
              this.mSkin[i].DrawForSelect( tCoord, tAngle );
              return;
            }
          }
        }
    }
}