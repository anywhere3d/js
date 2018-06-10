//  hmBoxersLoader.js

    var debugMode;

//    var hmBoxersAsset = assetsFolder + "HM_BoxersLayer_MBK04_v01.js";

//    var assetName = "hmBoxers";
//    var assetKey  = "aw3d.avatar.male.boxers";
//    var assetUrl  = assetsFolder + "HM_BoxersLayer_MBK04_v01.js";

    function $getMaleBoxers(options, loadTextures){
    
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


    $getMaleBoxers({
        name: "hmBoxers",
        key : "aw3d.avatar.male.boxers",
        url : assetsFolder + "HM_BoxersLayer_MBK04_v01.js", 

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }


    //  Male hairs map options.
        var mapOptions = {
            id   : "aG9Sd8q",
            ext  : "png",
            name : "HM_Boxers",
            asset: asset,
        //  index: null, // is not multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  debugMode && console.log("male mapOptions.url:", mapOptions.url);
    //  mapOptions.url = "https://i.imgur.com/aG9Sd8q.png";

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
            $(img).remove();
        });

        img.src = url;

    //  Material settings.
        asset.material.metalness = 0;
        asset.material.roughness = 0.5;
        asset.material.bumpScale = -0.05;
        asset.material.displacementBias = 0;
        asset.material.displacementScale = 0;
        asset.material.color.setHex(0xffffff);

    });






