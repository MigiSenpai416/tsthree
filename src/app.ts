import { SKIN2_FOR_GXD, SOBJECT2_FOR_GXD } from "./GXD/2/SOBJECT2_FOR_GXD";
import { WORLD_FOR_GXD } from "./GXD/WORLD_FOR_GXD";
import { GXD } from "./GXD/Core";
import { MOTION_FOR_GXD } from "./GXD/MOTION_FOR_GXD";
import { SOBJECT_FOR_GXD } from "./GXD/SOBJECT_FOR_GXD";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function UpdateScene()
{
    GXD.Update( GXD.Clock.getDelta() );
    GXD.RenderEngine.render( GXD.Scene, GXD.Camera );
}

export class App {
    constructor() {
        GXD.Init();
        this.main();

        window.onresize = () => {
            GXD.RenderEngine.setSize( window.innerWidth, window.innerHeight, false );
            UpdateScene();
        };
        window.onwheel = () => {
            UpdateScene();
        }
        window.onmousemove = () => {
            UpdateScene();
        }
        window.onmousedown = () => {
            UpdateScene();
        }
        window.onmouseup = () => {
            UpdateScene();
        }
    }
    main() {
        GXD.Controller = new OrbitControls( GXD.Camera, GXD.RenderEngine.domElement );

        //this.Load();

        //if (window.Worker) {
        //    const myWorker = new Worker("worker.js");
        //    myWorker.onmessage = function( e: any ) {
        //        if( e.data === "LoadWG" )
        //        {
        //            console.log("LoadWG");
        //            var world = new WORLD_FOR_GXD();
        //            world.LoadWG( "G03_GDATA/D07_GWORLD/Z001.WG" );
        //            world = null;
        //        }
        //        else if( e.data === "LoadSOBJECT" )
        //        {
        //            var file = "1/C001003000.SOBJECT";
        //            var sobject2 = new SOBJECT2_FOR_GXD();
        //            sobject2.LoadUrl( sobject2, file );
        //            setTimeout( () => {
        //                console.log( sobject2.mCheckValidState );
        //                if( sobject2.mCheckValidState )
        //                {
        //                    sobject2 = null;
        //                    return;
        //                }
        //                var sobject1 = new SOBJECT_FOR_GXD();
        //                sobject1.LoadUrl( sobject1, file );
        //            }, 1500 );
        //        }
        //    };
        //    //myWorker.postMessage( "LoadWG" );
        //    myWorker.postMessage( "LoadSOBJECT" );
        //}
        
        var fps = 30;
        var tFrame = 1;
        var dTime = 0.0;
        var tCurrMotion = 0;
        //GXD.RenderEngine.render( GXD.Scene, GXD.Camera );

//        GXD.RenderEngine.autoClear = true;
//        GXD.RenderEngine.setAnimationLoop( () => {
//
//        //function renderAnimationLoop() {            
//        //    setTimeout( () =>
//        //    {
//                dTime += ( fps * 0.01 );
//                tFrame = Math.floor( dTime * 1 );
//                if( this.motion[tCurrMotion].mCheckValidState && tFrame >= this.motion[tCurrMotion].mFrameNum  ) {
//                    dTime = 1;
//                    tFrame = 1;
//                    tCurrMotion++;
//                    if( tCurrMotion == 2 )
//                        tCurrMotion = 0;
//                }
//                this.Draw( tFrame, this.motion[tCurrMotion] );
//                tFrame++;
//
//                GXD.Update( GXD.Clock.getDelta() );
//
//                GXD.RenderEngine.render( GXD.Scene, GXD.Camera );
//        //        this.renderAnimationLoop();
//        //    }, 1000 / 30 );
//        //}
//        //renderAnimationLoop();
//
//        } );
    }

    Load()
    {
        //this.motion[0].LoadUrl( this.motion[0], "1/C001001002.MOTION" );//level-idle
        //this.motion[1].LoadUrl( this.motion[1], "1/C001001078.MOTION" );//master-idle
        //this.hair.LoadUrl( this.hair, "1/C001001001.SOBJECT" );
        //this.face.LoadUrl( this.face, "1/C001002001.SOBJECT" );
        //this.body.LoadUrl( this.body, "1/C001003000.SOBJECT" );
        //this.foot.LoadUrl( this.foot, "1/C001004001.SOBJECT" );
        //this.weapon.LoadUrl( this.weapon, "1/C001006035.SOBJECT" );

        //this.Load2( [ "C001001001.SOBJECT", "C001002001.SOBJECT", "A001001027.SOBJECT", "C001004005.SOBJECT", "C001005035.SOBJECT" ] );//char
        //this.Load2( [ "002/N001001001.SOBJECT" ] );//npc
        //this.Load2( [ "M001001001.SOBJECT", "M001002001.SOBJECT", "M001003001.SOBJECT" ] );//monster
        //this.Load2( [ "004/P001006001.SOBJECT" ] );//pet
        //this.Load2( [ "L001001020.SOBJECT" ]);//deco
        //this.Load2( [ "H001001009.SOBJECT" ] );//deco? nangin?
        //this.Load2( [ "Y028001.SOBJECT" ] );//animal / mount

        //this.world.LoadWG( "G03_GDATA/D07_GWORLD/Z071.WG" );
    }
    Load2( file: ArrayLike<string> )
    {
        //for( var i = 0; i < file.length; i++ )
        //{
        //    this.custom[i] = new SOBJECT2_FOR_GXD();
        //    this.custom[i].LoadUrl( this.custom[i], "G03_GDATA/D04_GSOBJECT/"+file[i] );
        //}
    }
    Draw(tFrame, tMotion)
    {
        //this.Draw1( tFrame, tMotion, this.hair );
        //this.Draw1( tFrame, tMotion, this.face );
        //this.Draw1( tFrame, tMotion, this.body );
        //this.Draw1( tFrame, tMotion, this.foot );
        //this.Draw1( tFrame, tMotion, this.weapon );

        //this.Draw2( this.custom );
    }
    Draw1( tFrame, tMotion, sobject1: SOBJECT_FOR_GXD )
    {
        for( var i = 0; i < sobject1.mSkinNum; i++ )
            sobject1.DrawForSelect( i, tFrame, [ 0, 0, 0 ], [ 0, 0, 0], tMotion, 20.0 );
    }
    Draw2( sobject2List: ArrayLike<SOBJECT2_FOR_GXD> )
    {
        for( var z = 0; z < sobject2List.length; z++ ) {
            const sobject2 = sobject2List[z];
            if( sobject2.mSKin instanceof Array && sobject2.mSKin[0] instanceof SKIN2_FOR_GXD && sobject2.mSKin[0].mMesh instanceof Array ) {
                for(var i = 0; i < sobject2.mSkinNum; i++){
                    for(var j = 0; j < sobject2.mSKin[i].mMesh.length; j++) {
                        sobject2.mSKin[i].mMesh[j].rotation.y += 0.01;
                    }
                }
            }
        }
    }
}

new App();