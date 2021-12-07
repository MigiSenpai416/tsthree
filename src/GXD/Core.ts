import { Camera, Object3D, PerspectiveCamera, Scene, WebGLRenderer, WebGLRendererParameters, } from "three";
import { int, BOOL, FALSE, TRUE } from "../Common/types";

import { ByteReader } from "../Common/ByteHelper";
import { Zlib } from "../Common/Zlib";


export class GXD
{
	public static Camera: Camera;
	public static Scene: Scene;
	public static RenderEngine: WebGLRenderer;

	static Init( parameters?: WebGLRendererParameters ): BOOL
	{
		GXD.RenderEngine = new WebGLRenderer( parameters ? parameters : {alpha:false, depth:true, stencil:false, antialias:true, premultipliedAlpha:true} );
		GXD.RenderEngine.setPixelRatio( window.devicePixelRatio );
		GXD.RenderEngine.setSize( window.innerWidth, window.innerHeight );
		GXD.RenderEngine.domElement.id = "renderCanvas";
	
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


        GXD.Camera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
        GXD.Camera.position.set( 0, 15, -30 );
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

}