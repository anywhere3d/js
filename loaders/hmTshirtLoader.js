//  hmTshirtLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var hmTshirtUrl = skinnedFolder + "HM_Tshirt_MBK05_v01.js";

//    var hmTshirtAsset = skinnedFolder + "HM_Tshirt_MBK05_v01.js";

//    var assetName = "hmTshirt";
//    var assetKey  = "aw3d.avatar.male.tshirt";
//    var assetUrl  = skinnedFolder + "HM_Tshirt_MBK05_v01.js";

    function $getMaleTshirt(options, loadTextures, loadStamp){
    
        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        CacheStorage.getItem(url).then(function( result ){ 

            if ( !result || JSON.stringify(result) == "{}" ) {

                debugMode && console.log("MaleTshirt:", "Getting from web.");

                return $getJSON(options);

            } else {

                debugMode && console.log("MaleTshirt:", "Getting from cache.");

                Avatars[ name ] = initSkinnedAsset( result );
                Avatars[ name ].geometry.sourceFile = url;
                loadTextures( Avatars[ name ] );
                loadStamp( Avatars[ name ] );

            }

        }).catch(function(err) {
            console.error(err);
        });

        function $getJSON(options){

            var url  = options.url;
            var key  = options.key;
            var name = options.name;

            $.getJSON( url ).then(function(json){

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
                        Avatars[ name ] = initSkinnedAsset( result );
                        Avatars[ name ].geometry.sourceFile = url;
                        if (!!loadTextures) loadTextures( Avatars[ name ] );
                        if ( !!loadStamp )  loadStamp( Avatars[ name ] );
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

    $getMaleTshirt({

        name: "hmTshirt",
        key : "hmTshirt",
        url : hmTshirtUrl, 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }


    //  Male tshirt map options.
        var mapOptions = {
            id   : "4TemDBo",
            ext  : "png",
            name : "HM_Tshirt",
            asset: asset,
            index: 0, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  var mapOptions.url = "https://i.imgur.com/4TemDBo.png";

    //  Load texture.
        var url   = mapOptions.url;
        var map   = mapOptions.map;
        var name  = mapOptions.name;
        var index = mapOptions.index;
        var asset = mapOptions.asset;

        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).one("load", function (){
            var texture = new THREE.Texture( img ); // or canvas //
            texture.name = name;
            texture.sourceFile = url;
            applyTexture( asset, texture, "map", index );
            applyTexture( asset, texture, "bumpMap", index );
            $(img).remove();
        });

        img.src = url;

    //  Material settings.
        asset.material.materials[ index ].metalness = 0;
        asset.material.materials[ index ].roughness = 0.4;
        asset.material.materials[ index ].bumpScale = 0.05;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].color.setHex(0x000000);
        asset.material.materials[ index ].emissive.setHex(0x010614);


    }, function loadStamp(asset){


    //  Male tshirt front map options.
        var mapOptions = {
            id   : "6n4GaHQ",
            ext  : "jpg",
            name : "AW3D_TSHIRT_STAMP",
            asset: asset,
            index: 1, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  var mapOptions.url = "https://i.imgur.com/ihYtRLw.png";
    //  var mapOptions.url = "https://i.imgur.com/6n4GaHQ.jpg";

    //  Load texture.
        var url   = mapOptions.url;
        var map   = mapOptions.map;
        var name  = mapOptions.name;
        var index = mapOptions.index;
        var asset = mapOptions.asset;

        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).one("load", function (){
            var texture = new THREE.Texture( img ); // or canvas //
            texture.name = name;
            texture.sourceFile = url;
            applyTexture( asset, texture, "map", index );
            applyTexture( asset, texture, "emissiveMap", index );
            $(img).remove();
        });

        img.src = url;

    //  Material settings.
        asset.material.materials[ index ].bumpScale = -0.01;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].color.setHex(0x000000);
        asset.material.materials[ index ].emissive.setHex(0xffffff);

    });



