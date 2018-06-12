//  fmTshirtLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var HFtshirtUrl = skinnedFolder + "HF_Tshirt_FBK05_v03.js";

//    var fmTshirt1Asset   = skinnedFolder + "HF_Tshirt_FBK05_v01.js";
//    var fmTshirt3Asset   = skinnedFolder + "HF_Tshirt_FBK05_v03.js";

    function $getFemaleTshirt(options, loadTextures, loadFrontTexture){
    
        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        AW3D_Cache.getItem(url).then(function( result ){ 

            if ( !result || JSON.stringify(result) == "{}" ) {

                debugMode && console.log("FemaleTshirt:", "Getting from web");

                return $getJSON(options);

            } else {

                debugMode && console.log("FemaleTshirt:", "Getting from cache");

                Avatars[ name ] = initSkinnedAsset( result );
                Avatars[ name ].geometry.sourceFile = url;
                loadTextures( Avatars[ name ] );
                loadFrontTexture( Avatars[ name ] );

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
                        Avatars[ name ].geometry.sourceFile = url;
                        loadTextures( Avatars[ name ] );
                        loadFrontTexture( Avatars[ name ] );
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

    $getFemaleTshirt({
        name: "fmTshirtFront",
        key : "fmTshirtFront",
        url : HFtshirtUrl, 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Female tshirt map options.
        var mapOptions = {
            id   : "4TemDBo",
            ext  : "png",
            name : "HF_Tshirt",
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
        asset.material.materials[0].bumpScale = 0.05;
        asset.material.materials[0].displacementBias = 0;
        asset.material.materials[0].displacementScale = 0;
        asset.material.materials[0].color.setHex(0xffffff);

    }, function loadFrontTexture(asset){

    //  Female hairs map options.
        var mapOptions = {
            id   : "i1ZaSpC",
            ext  : "png",
            name : "HF_TshirtFront",
            asset: asset,
            index: 1, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  var mapOptions.url = "https://i.imgur.com/i1ZaSpC.jpg";

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
        asset.material.materials[1].bumpScale = -0.01;
        asset.material.materials[1].displacementBias = 0;
        asset.material.materials[1].displacementScale = 0;
        asset.material.materials[1].color.setHex(0xffffff);

    });


