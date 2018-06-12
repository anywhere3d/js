//  skeletonLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var bonesUrl = skinnedFolder + "Bones_ABK04_v02.js";
    var mannyUrl = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

//    var skeletonAsset = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

//    var assetKey = "skeleton";
//    var assetName = "skeleton";
//    var assetUrl = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

    $getBones({
        name: "bones",
        key : "bones",
        obj : Avatars,
        url : bonesUrl, 
    });

    function $getBones( options ){

        var url  = options.url;
        var key  = options.key;
        var name = options.name;
        var object = options.obj;

        AW3D_Cache.getItem(url).then(function(result){

        //  debugMode && console.log("result:", result);

            if ( !result || JSON.stringify(result) == "{}" ) {

                debugMode && console.log("Bones:", "Getting from web");

                return $getJSON( options );

            } else {

                debugMode && console.log("Bones:", "Getting from cache");

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

                AW3D_Cache.setItem(url, data).then(function(result){

                    if (!result) {
                        var err = [ 
                            "AW3D Cache Error:", 
                            "No result returned:", 
                            result,
                        ].join(" ");
                        console.error(err);
                        throw Error(err);


                    } else if ( JSON.stringify(result) == "{}" ) {
                        var err = [ 
                            "AW3D Cache Warning:", 
                            "empty object returned:", 
                            JSON.stringify(result),
                        ].join(" ");
                        console.warn(err);
                        throw Error(err);

                    } else {
                        console.log("AW3D Cache:", "success!");
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

        AW3D_Cache.getItem(url).then(function( result ){ 

            if ( !result || JSON.stringify(result) == "{}" ) {

                debugMode && console.log("Skeleton:", "Getting from web");
                
                return $getJSON(options);

            } else {

                debugMode && console.log("Skeleton:", "Getting from cache");

                Avatars[ name ] = initSkinnedAsset( result );
                Avatars[ name ].geometry.sourceFile = url;
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

                AW3D_Cache.setItem(url, json).then(function(result){

                    if (!result) {
                        var err = [ 
                            "AW3D Cache Error:", 
                            "No result returned:", 
                            result,
                        ].join(" ");
                        console.error(err);
                        throw Error(err);

                    } else if ( JSON.stringify(result) == "{}" ) {
                        var err = [ 
                            "AW3D Cache Warning:", 
                            "empty object returned:", 
                            JSON.stringify(result),
                        ].join(" ");
                        console.warn(err);
                        throw Error(err);

                    } else {
                        console.log("AW3D Cache:", "success!");
                        Avatars[ name ] = initSkinnedAsset( result );
                        Avatars[ name ].geometry.sourceFile = url;
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
        url : mannyUrl, 

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

        var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
        localPlayer.controller.direction = frontAngle;
        localPlayer.outfit.add( {"body": Avatars[ name ]} );
        localPlayer.outfit.AnimationsHandler.refresh();
        localPlayer.outfit.update();
        scene.add(localPlayer.outfit.direction);

    });

