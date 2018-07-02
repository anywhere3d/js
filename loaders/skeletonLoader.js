//  skeletonLoader.js

    var debugMode;
    
    var skinnedFolder = "/skinned/";
    var componentsFolder = "/components/";
    var mannyUrl = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

//    var skeletonAsset = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

//    var assetKey = "skeleton";
//    var assetName = "skeleton";
//    var assetUrl = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

    function $getSkeleton( options, loadTextures, addPlayer ){

        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        CacheStorage.getItem(url).then(function( result ){ 

            if ( !result || JSON.stringify(result) == "{}" ) {

                debugMode && console.log("Skeleton:", "Getting from web.");
                
                return $getJSON(options);

            } else {

                debugMode && console.log("Skeleton:", "Getting from cache.");

                result.sourceFile = url;                    //  IMPORTANT  //

                Avatars[ name ] = initSkinnedAsset( result, url );

                if ( !Avatars[ name ].geometry.sourceFile ) {
                    Avatars[ name ].geometry.sourceFile = url;  //  IMPORTANT  //
                }

                if (!!loadTextures) loadTextures( Avatars[ name ] );
                if (!!addPlayer) addPlayer( name );

            }

        }).catch(function(err) {
            console.error(err);
        });

        function $getJSON(options){

            var url  = options.url;
            var key  = options.key;
            var name = options.name;

            $.getJSON( url ).then(function(json){

                json.sourceFile = url;  //  IMPORTANT  //

                CacheStorage.setItem(url, json).then(function(result){

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

                        Avatars[ name ] = initSkinnedAsset( result, url );
                        if ( !Avatars[ name ].geometry.sourceFile ) {
                            Avatars[ name ].geometry.sourceFile = url;  //  IMPORTANT  //
                        }

                        if (!!loadTextures) loadTextures( Avatars[ name ] );
                        if (!!addPlayer) addPlayer( name );

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
            index: 0, // multimaterial
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
            img.crossOrigin = "anonymous";             //  IMPORTANT  //
            $(img).one("load", function (){
                var texture = new THREE.Texture( img ); // or canvas //
                texture.name = name;
                texture.sourceFile = url;
                applyTexture( asset, texture, map, index );
                $(img).remove();
            });

            img.src = url;
        }

    }, function addPlayer( name ){

    //  Add player.

        var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
        localPlayer.controller.direction = frontAngle;

        if ( store.has("/user/outfits/json/current") ){

            var json = store.get("/user/outfits/json/current");
            localPlayer.outfit.fromJSON( json );
        
        //  Initialize skintone buttons.
            var skintoneButtonsSelector = "#skintone-buttons";
            var maleSkintoneButtonsComponent = componentsFolder + "male-skintone-buttons.html";
            var femaleSkintoneButtonsComponent = componentsFolder + "female-skintone-buttons.html";

            if ( json.gender == "male" ){
                $(skintoneButtonsSelector).load(maleSkintoneButtonsComponent, function(resoponse, status, xhr){
                    if (status == "error") console.error( status, xhr.status, xhr.statusText );
                }); 
            }

            if ( json.gender == "female" ){
                $(skintoneButtonsSelector).load(femaleSkintoneButtonsComponent, function(resoponse, status, xhr){
                    if (status == "error") console.error( status, xhr.status, xhr.statusText );
                });
            }

        } else {

            localPlayer.outfit.add( {"body": Avatars[ name ]} );   //  Used for clone asset from external resource.

        }

        localPlayer.outfit.AnimationsHandler.refresh();            //  "player.oufit.add()" include ".refresh()".
        scene.add(localPlayer.outfit.direction);
        localPlayer.outfit.update();



    });

/*
    function addPlayer( name ){

        var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
        localPlayer.controller.direction = frontAngle;
        localPlayer.outfit.add( {"body": Avatars[ name ]} );   //  Used for clone asset from external resource.
        localPlayer.outfit.AnimationsHandler.refresh();        //  "player.oufit.add()" include ".refresh()".
        scene.add(localPlayer.outfit.direction);
        localPlayer.outfit.update();

    }
*/
