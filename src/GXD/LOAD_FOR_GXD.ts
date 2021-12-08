import { ByteReader } from "../Common/ByteReader";
import { MOTION_FOR_GXD } from "./MOTION_FOR_GXD";
import { SKIN_FOR_GXD } from "./SKIN_FOR_GXD";
import { SOBJECT_FOR_GXD } from "./SOBJECT_FOR_GXD";
import { BOOL, BytePtr, FALSE, TRUE } from "../Common/types";
import { SOBJECT2_FOR_GXD } from "./2/SOBJECT2_FOR_GXD";
import { WORLD_FOR_GXD } from "./WORLD_FOR_GXD";

const HOST_URL: string = "http://127.0.0.1/";
enum LOAD_STATE {
    NONE = 1,
    ERROR = 2,
    LOADING = 3,
    DONE = 4,
};

class AssetData
{
    name: string;
    data: BytePtr;
    constructor( name: string, data: BytePtr)
    {
        this.name = name;
        this.data = new Uint8Array( data );
    }
}

export class AssetBundle
{
    private static mLoadingList: string[] = [];
    private static mLoadedList: AssetData[] = [];
    static IsLoading( tFileName: string ): BOOL
    {
        return AssetBundle.mLoadingList.indexOf( tFileName ) > -1;
    }
    static RegisterLoad( tFileName: string )
    {
        AssetBundle.mLoadingList.push( tFileName );
    }
    static RemoveLoad( tFileName: string )
    {
        if( AssetBundle.mLoadingList.length === 1 )
        {
            AssetBundle.mLoadingList = [];
            return;
        }
        function arrayRemove(arr, value) {     
            return arr.filter(function(ele){ 
                return ele != value; 
            });
        }
        AssetBundle.mLoadingList = arrayRemove(AssetBundle.mLoadingList, tFileName);
    }
    static LoadFileName( tFileName: string ): AssetData
    {
        for( var i = 0; i < AssetBundle.mLoadedList.length; i++ )
        {
            if( AssetBundle.mLoadedList[i].name === tFileName )
            {
                return AssetBundle.mLoadedList[i];
            }
        }
        return null;
    }
    static Add( data: AssetData )
    {
        AssetBundle.RemoveLoad( data.name );
        AssetBundle.mLoadedList.push( data );
    }
}

export class LOAD_FOR_GXD
{
    mAssetIsValid: BOOL = FALSE;
    LoadUrl( tClass: SKIN_FOR_GXD | SOBJECT_FOR_GXD | SOBJECT2_FOR_GXD | MOTION_FOR_GXD, tFileName: string, tCheckCreateTexture: BOOL = FALSE, tCheckRemoveFileData: BOOL = FALSE )
    {
        if( tClass.mAssetIsValid )
        {
            return;
        }
        if( AssetBundle.IsLoading( tFileName ) )
        {
            return;
        }
        var asset = AssetBundle.LoadFileName( tFileName );
        if( asset )
        {
            return tClass.Load( new ByteReader( asset.data ), tCheckCreateTexture, tCheckRemoveFileData );
        }
        AssetBundle.RegisterLoad( tFileName );
        var wr = new XMLHttpRequest();
        wr.responseType = "arraybuffer";
        wr.onreadystatechange = function() {
            if( this.readyState == LOAD_STATE.DONE )
            {
                tClass.mAssetIsValid = TRUE;
                var asset = new AssetData( tFileName, this.response );
                AssetBundle.Add( asset );
                return tClass.Load( new ByteReader( asset.data ), tCheckCreateTexture, tCheckRemoveFileData );
            }
        }
        wr.open( "GET", HOST_URL + tFileName );
        wr.send( null );
	}

    LoadWorldUrl( tClass: WORLD_FOR_GXD, tFileName: string, callbackName: string = "WG" )
    {
        if( tClass.mAssetIsValid )
        {
            return;
        }
        if( AssetBundle.IsLoading( tFileName ) )
        {
            return;
        }
        var asset = AssetBundle.LoadFileName( tFileName );
        if( asset )
        {
            tClass.mAssetIsValid = TRUE;
            tClass.LoadWGCallback( new ByteReader( new Uint8Array( asset.data ) ) );
        }
        AssetBundle.RegisterLoad( tFileName );
        var wr = new XMLHttpRequest();
        wr.responseType = "arraybuffer";
        wr.onreadystatechange = function() {
            if( this.readyState == LOAD_STATE.DONE )
            {
                tClass.mAssetIsValid = TRUE;
                tClass.LoadWGCallback( new ByteReader( new Uint8Array( this.response ) ) );
                return;
            }
        }
        wr.open( "GET", HOST_URL + tFileName );
        wr.send( null );
	}
}