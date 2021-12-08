import { AssignBOOL } from "../../Common/Helper";
import { BOOL, float, int } from "../../Common/types";
import { LOAD_FOR_GXD } from "../LOAD_FOR_GXD";
import { TEXTURE_FOR_GXD } from "../TEXTURE_FOR_GXD";

export class MESHEFFECT2_FOR_GXD
{
	mAnimationMapInfo: int[];//4
	mRadiationInfo: int[];//10
	mUVScrollInfo: int[];//3
	mBillboardInfo: int[];//2
};

export class MESHSIZE2_FOR_GXD
{
	mBoxMin: float[];//3
	mBoxMax: float[];//3
	mCenter: float[];//3
	mRadius: float;
};

export class MESHVERTEX2_FOR_GXD
{
	mV: float[];//3
	mT: float[];//2
};

export class MESH2_FOR_GXD
{
	mCheckValidState: BOOL;
	mEffect: MESHEFFECT2_FOR_GXD;
	mFrameNum: int;
	mSize: MESHSIZE2_FOR_GXD[];//*
	mOpacity: float[] = [];//float*
	mVertexBufferForBillboard: MESHVERTEX2_FOR_GXD[];//[4];
	mLODStepNum: int;
	mVertexNum: int[];//int*
	mVertexBuffer: any[][];//IDirect3DVertexBuffer9**
	mTrisNum: int[] = [];//int*
	mIndexBuffer: any[][];//IDirect3DIndexBuffer9**
	mDiffuseMap: TEXTURE_FOR_GXD;
	mAnimationMapNum: int;
	mAnimationMap: TEXTURE_FOR_GXD[] = [];//*
};

export class MOBJECT2_FOR_GXD
{
	mCheckValidState: BOOL;
	mMeshNum: int;
	mMesh: MESH2_FOR_GXD[] = [];//*
};
