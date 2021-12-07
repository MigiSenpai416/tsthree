import { SKIN2_FOR_GXD, SOBJECT2_FOR_GXD } from "./GXD/2/SOBJECT2_FOR_GXD";
import { GXD } from "./GXD/Core";
import { MOTION_FOR_GXD } from "./GXD/MOTION_FOR_GXD";
import { SOBJECT_FOR_GXD } from "./GXD/SOBJECT_FOR_GXD";

class App {
    hair:SOBJECT_FOR_GXD;
    face:SOBJECT_FOR_GXD;
    body:SOBJECT_FOR_GXD;
    foot:SOBJECT_FOR_GXD;
    weapon:SOBJECT_FOR_GXD;
    motion:MOTION_FOR_GXD[];
    custom: SOBJECT2_FOR_GXD[] = [];
    constructor() {
        GXD.Init();
        this.main();
        window.onresize = () => {
            GXD.RenderEngine.setSize( window.innerWidth, window.innerHeight, false );
        };
    }
    main() {
        this.hair = new SOBJECT_FOR_GXD();
        this.face = new SOBJECT_FOR_GXD();
        this.body = new SOBJECT_FOR_GXD();
        this.foot = new SOBJECT_FOR_GXD();
        this.weapon = new SOBJECT_FOR_GXD();
        this.motion = [];
        this.motion[0] = new MOTION_FOR_GXD();
        this.motion[1] = new MOTION_FOR_GXD();
        
        this.Load();

        
        var fps = 30;
        var tFrame = 1;
        var dTime = 0.0;
        var tCurrMotion = 0;

        GXD.RenderEngine.setAnimationLoop( () => {

        //function renderAnimationLoop() {            
        //    setTimeout( () =>
        //    {
                dTime += ( fps * 0.01 );
                tFrame = Math.floor( dTime * 1 );
                if( this.motion[tCurrMotion].mCheckValidState && tFrame >= this.motion[tCurrMotion].mFrameNum  ) {
                    dTime = 1;
                    tFrame = 1;
                    tCurrMotion++;
                    if( tCurrMotion == 2 )
                        tCurrMotion = 0;
                }
                this.Draw( tFrame, this.motion[tCurrMotion] );
                tFrame++;

                GXD.RenderEngine.autoClear = true;
                GXD.RenderEngine.render( GXD.Scene, GXD.Camera );
        //        this.renderAnimationLoop();
        //    }, 1000 / 30 );
        //}
        //renderAnimationLoop();

        } );
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

        //this.Load2( [ "C001001001.SOBJECT", "C001002001.SOBJECT", "C001003010.SOBJECT", "C001004005.SOBJECT", "C001005035.SOBJECT" ] );//char
        //this.Load2( [ "N001001001.SOBJECT" ] );//npc
        //this.Load2( [ "M001001001.SOBJECT", "M001002001.SOBJECT", "M001003001.SOBJECT" ] );//monster
        //this.Load2( [ "P001006001.SOBJECT" ] );//pet
        //this.Load2( [ "L001001020.SOBJECT" ]);//deco
        //this.Load2( [ "H001001009.SOBJECT" ] );//deco? nangin?
        this.Load2( [ "Y028001.SOBJECT" ] );//animal / mount
    }
    Load2( file: ArrayLike<string> )
    {
        for( var i = 0; i < file.length; i++ )
        {
            this.custom[i] = new SOBJECT2_FOR_GXD();
            this.custom[i].LoadUrl( this.custom[i], "2/"+file[i] );
        }
    }
    Draw(tFrame, tMotion)
    {
        //for( var i = 0; i < this.hair.mSkinNum; i++ )
        //    this.hair.DrawForSelect  ( i, tFrame, [ 0, 0, 0 ], [ 0, 0, 0], tMotion, 20.0 );
        //for( var i = 0; i < this.face.mSkinNum; i++ )
        //    this.face.DrawForSelect  ( i, tFrame, [ 0, 0, 0 ], [ 0, 0, 0], tMotion, 20.0 );        
        //for( var i = 0; i < this.body.mSkinNum; i++ )
        //    this.body.DrawForSelect  ( i, tFrame, [ 0, 0, 0 ], [ 0, 0, 0], tMotion, 20.0 ); 
        //for( var i = 0; i < this.foot.mSkinNum; i++ )
        //    this.foot.DrawForSelect  ( i, tFrame, [ 0, 0, 0 ], [ 0, 0, 0], tMotion, 20.0 );
        //for( var i = 0; i < this.weapon.mSkinNum; i++ )
        //    this.weapon.DrawForSelect( i, tFrame, [ 0, 0, 0 ], [ 0, 0, 0], tMotion, 20.0 );

        this.Draw2( this.custom );
    }
    Draw2( sobject2List: ArrayLike<SOBJECT2_FOR_GXD> )
    {
        for( var z = 0; z < sobject2List.length; z++ )
        {
            const sobject2 = sobject2List[z];
            if( sobject2.mSKin instanceof Array && sobject2.mSKin[0] instanceof SKIN2_FOR_GXD && sobject2.mSKin[0].mMesh instanceof Array )
            {
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
