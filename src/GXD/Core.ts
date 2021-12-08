import { Camera, Clock, Object3D, PerspectiveCamera, Scene, WebGLRenderer, WebGLRendererParameters, } from "three";
import { int, BOOL, FALSE, TRUE } from "../Common/types";

import { ByteReader } from "../Common/ByteReader";
import { Zlib } from "../Common/Zlib";

//import { ArcballControls } from "three/examples/jsm/controls/ArcballControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";


export class GXD
{
	public static Camera: Camera;
	public static Scene: Scene;
	public static RenderEngine: WebGLRenderer;
	public static Controller: DragControls | FirstPersonControls | FlyControls | OrbitControls | PointerLockControls | TrackballControls | TransformControls;
	public static Clock: Clock;

	static Init( parameters?: WebGLRendererParameters ): BOOL
	{
		GXD.RenderEngine = new WebGLRenderer( parameters ? parameters : {alpha:false, depth:true, stencil:false, antialias:true, premultipliedAlpha:true} );
		GXD.RenderEngine.setPixelRatio( window.devicePixelRatio );
		GXD.RenderEngine.setSize( window.innerWidth, window.innerHeight );
		GXD.RenderEngine.domElement.id = "renderCanvas";
		GXD.Clock = new Clock();
		GXD.Clock.autoStart = true;
	
		document.documentElement.style["overflow"] = "hidden";
		document.documentElement.style.overflow = "hidden";
		document.documentElement.style.width = "100%";
		document.documentElement.style.height = "100%";
		document.documentElement.style.margin = "0";
		document.documentElement.style.padding = "0";
		document.body.style.overflow = "hidden";
		document.body.style.width = "100%";
		document.body.style.height = "100%";
		document.body.style.margin = "0";
		document.body.style.padding = "0";
		document.body.style.backgroundColor = "black";
		document.body.appendChild( GXD.RenderEngine.domElement );


        GXD.Camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        GXD.Camera.position.set( 0, 15, -60 );
        GXD.Camera.lookAt( 0, 15, 0 );
		GXD.Scene = new Scene();

		return TRUE;
	}

	public static Add( object: Object3D )
	{
		GXD.Scene.add( object );
	}
	public static Remove( object: Object3D )
	{
		GXD.Scene.remove( object );
	}

	public static Update( delta: number )
	{
		if( GXD.Controller )
		{
			var type = typeof( GXD.Controller );
			switch( type )
			{
				//case typeof( ArcballControls ):
				//{
				//	(GXD.Controller as ArcballControls).update();
				//}
				//break;
				//case typeof( DragControls ):
				//{
					//(GXD.Controller as controller.DragControls);
				//}
				//break;
				case typeof( FirstPersonControls ):
				{
					(GXD.Controller as FirstPersonControls).update( delta );
				}
				break;
				case typeof( FlyControls ):
				{
					(GXD.Controller as FlyControls).update( delta );
				}
				break;
				case typeof( OrbitControls ):
				{
					(GXD.Controller as OrbitControls).update();
				}
				break;
				//case typeof( controller.PointerLockControls ):
				//{
				//	(GXD.Controller as controller.PointerLockControls).update();
				//}
				//break;
				case typeof( TrackballControls ):
				{
					(GXD.Controller as TrackballControls).update();
				}
				break;
				//case typeof( controller.TransformControls ):
				//{
				//	(GXD.Controller as controller.TransformControls).update();
				//}
				//break;
			}
		}
	}
}