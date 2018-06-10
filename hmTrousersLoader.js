//  hmTrousersLoader.js

    var debugMode;

//    var hmTrousersAsset = assetsFolder + "HM_Trousers_MBK04_v01.js";

//    var assetName = "hmTrousers";
//    var assetKey  = "aw3d.avatar.male.trousers";
//    var assetUrl  = assetsFolder + "HM_Trousers_MBK04_v01.js";

    function $getMaleTrousers(options, loadTextures){
    
        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        $.getJSON( url ).then(function(json){

            if (!json) throw Error("json did not defined");
            Avatars[ name ] = initOutfitAsset( json );
            return Avatars[ name ];

        }).then(function(asset){
            loadTextures( asset )
        }).fail(function(err){
            console.error(err);
        });

    }

    $getMaleTrousers({

        name: "hmTrousers",
        key : "aw3d.avatar.male.trousers",
        url : assetsFolder + "HM_Trousers_MBK04_v01.js", 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }


    //  Male hairs map options.
        var mapOptions = {
            id   : "8LrZxW4",
            ext  : "jpg",
            name : "HM_Trousers",
            asset: asset,
        //  index: null, // is not multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  debugMode && console.log("male mapOptions.url:", mapOptions.url);
    //  mapOptions.url = "https://i.imgur.com/8LrZxW4.png"; // jeans
    //  mapOptions.url = "https://i.imgur.com/ejSGU9j.jpg"; // zebra


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
            applyTexture( asset, texture, "map" );
            applyTexture( asset, texture, "bumpMap" );
            applyTexture( asset, texture, "emissiveMap" );
            $(img).remove();
        });

        img.src = url;

    //  Material settings.
        asset.material.bumpScale = 0.05;
        asset.material.displacementBias = 0;
        asset.material.displacementScale = 0;
        asset.material.color.setHex(0x000000);
        asset.material.emissive.setHex(0xffffff);

    });



