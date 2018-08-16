//  fmTshirtLoader_mtl.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var hfTshirtUrl = skinnedFolder + "HF_Tshirt_FBK05_v03.js";

//    var fmTshirt1Asset   = skinnedFolder + "HF_Tshirt_FBK05_v01.js";
//    var fmTshirt3Asset   = skinnedFolder + "HF_Tshirt_FBK05_v03.js";

    function $getFemaleTshirt(options, loadTextures, loadStamp){
    
        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        CacheStorage.getItem(url).then(function( result ){ 

            if ( !result || JSON.stringify(result) == "{}" ) {

                debugMode && console.log("FemaleTshirt:", "Getting from web.");

                return $getJSON(options);

            } else {

                debugMode && console.log("FemaleTshirt:", "Getting from cache.");

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

    $getFemaleTshirt({
        name: "fmTshirtFront",
        key : "fmTshirtFront",
        url : hfTshirtUrl, 

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
        asset.material.materials[ index ].bumpScale = 0.05;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].color.setHex(0xffffff);

    }, function loadStamp(asset){

    //  Female tshirt front map options.
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
        asset.material.materials[ index ].bumpScale = -0.01;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].color.setHex(0xffffff);

    });

/*
    function $getFemaleTshirt(options, loadTextures, loadStamp){
    
        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        CacheStorage.getItem(url).then(function( result ){ 

            if ( !result || JSON.stringify(result) == "{}" ) {

                debugMode && console.log("FemaleTshirt:", "Getting from web.");

                return $getJSON(options);

            } else {

                debugMode && console.log("FemaleTshirt:", "Getting from cache.");

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
*/
