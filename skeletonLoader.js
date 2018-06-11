//  skeletonLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";

//    var skeletonAsset = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

//    var assetKey = "skeleton";
//    var assetName = "skeleton";
//    var assetUrl = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

    $getBones({
        name: "bones",
        key : "bones",
        obj : Avatars,
        url : skinnedFolder + "Bones_ABK04_v02.js", 
    });

    function $getBones( options ){

        var url  = options.url;
        var key  = options.key;
        var name = options.name;
        var object = options.obj;

        AW3Dstore.getItem(url).then(function(result){

        //  debugMode && console.log("result:", result);

            if ( !result || JSON.stringify(result) == "{}" ) {

                debugMode && console.log("Bones:", "Getting from web");

                return $getJSON( options );

            } else {

                debugMode && console.log("Bones:", "Getting from AW3D Store");

                object[ name ] = result;

            }

        }).catch(function(err) {
            console.error(err);
        });

        function $getJSON(options){

            var url  = options.url;
            var key  = options.key;
            var name = options.name;
            var object = options.obj;

            return $.getJSON( url, function(data){

                AW3Dstore.setItem(url, data).then(function(result){

                    if (!result) {
                        var err = "Error: No result returned:" + result;
                        console.log(err);
                        throw Error(err);

                    } else if ( JSON.stringify(result) == "{}" ) {
                        var err = "Error: empty object:" + JSON.stringify(result);
                        console.log(err);
                        throw Error(err);

                    } else {
                        console.log("success:", result);
                        object[ name ] = result;
                    }

                }).catch(function(err) {
                    console.log(err);
                    throw Error(err);
                });

            });
        }
    }

    function $getSkeleton( options, loadTextures, sceneAddPlayer){

        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        AW3Dstore.getItem(url).then(function( result ){ 

            if ( !result || JSON.stringify(result) == "{}" ) {

                debugMode && console.log("Skeleton:", "Getting from web");
                
                return $getJSON(options);

            } else {

                debugMode && console.log("Skeleton:", "Getting from AW3D Store");

                Avatars[ name ] = initSkinnedAsset( result );
                loadTextures( Avatars[ name ] );
                sceneAddPlayer( name );
            }

        }).catch(function(err) {
            console.error(err);
        });

        function $getJSON(options){

            var url  = options.url;
            var key  = options.key;
            var name = options.name;

            $.getJSON( url ).then(function(json){

                AW3Dstore.setItem(url, json).then(function(result){

                    if (!result) {
                        var err = "Error: No result returned:" + result;
                        console.log(err);
                        throw Error(err);

                    } else if ( JSON.stringify(result) == "{}" ) {
                        var err = "Error: empty object:" + JSON.stringify(result);
                        console.log(err);
                        throw Error(err);

                    } else {
                        console.log("success:", result);
                        Avatars[ name ] = initSkinnedAsset( result );
                        loadTextures( Avatars[ name ] );
                        sceneAddPlayer( name );
                    }

                }).catch(function(err) {
                    console.log(err);
                    throw Error(err);
                });

            }).fail(function(err){
                console.error(err);
                throw Error(err);
            });

        }
    }

    $getSkeleton({

        name: "skeleton",
        key : "skeleton",        
        url : skinnedFolder + "HF_MannySkeleton_ABK04_v01.js", 

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Skeleton body map options.
        var mapOptions = {
            id   : "tjNZqbq",
            ext  : "jpg",
            name : "skeleton_map",
            asset: asset,
            index: null,
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  mapOptions.url = "https://i.imgur.com/tjNZqbq.jpg";

    //  Load texture.
        mapOptions.map = "map";
        textureMapLoader( mapOptions );

        function textureMapLoader( options ){

            var url   = options.url;
            var map   = options.map;
            var name  = options.name;
            var index = options.index;
            var asset = options.asset;

            var img = new Image();
            img.crossOrigin = "anonymous";
            $(img).one("load", function (){
                var texture = new THREE.Texture( img ); // or canvas //
                texture.name = name;
                texture.sourceFile = url;
                applyTexture( asset, texture, map, index );
                $(img).remove();
            });

            img.src = url;
        }

    }, function sceneAddPlayer( name ){

        scene.add(localPlayer.outfit.direction);
        var outfit = {"body": Avatars[ name ]};
        localPlayer.outfit.add( outfit );
        var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
        localPlayer.controller.direction = frontAngle;
        localPlayer.outfit.update();

    });








/*
    $.getJSON( url ).then(function(json){

        if (!json) throw Error("json not defined.");

    //  Local Forage.
        AW3Dstore.setItem(key, json).then(function (value) {
            debugMode && console.log(key, value);
            return value;

        }).catch( function(err){
            throw Error(err);

        }).then(function(json){
            Avatars[ name ] = initSkinnedAsset( json );
            return Avatars[ name ];

        }).then(function(asset){
            loadTextures( asset );

        }).then(function(){
            sceneAddBody( name );
        });

    }).fail(function(err){
        console.error(err);
    });
*/

/*
    function textureMapLoader( options ){

        var url   = options.url;
        var map   = options.map;
        var name  = options.name;
        var index = options.index;
        var asset = options.asset;

        var loader = new THREE.ImageLoader();
        loader.setCrossOrigin( "anonymous" );
        loader.load( url, function ( image ) {
            var texture = new THREE.Texture();
            texture.name = name;
            texture.image = image;
            texture.sourceFile = url;
            texture.needsUpdate = true;
            applyTexture( asset, texture, map, index );
        })
    }
*/

