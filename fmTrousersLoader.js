//  fmTrousersLoader.js

    var debugMode;

//    var fmTrousersAsset  = assetsFolder + "HF_Trousers_FBK05_v02.js";

//    var assetName = "fmTrousers";
//    var assetKey  = "aw3d.outfit.female.trousers";
//    var assetUrl  = assetsFolder + "HF_Trousers_FBK05_v02.js";

    $getOutfit({
        name: "fmTrousers",
        key : "fmTrousers",
        url : assetsFolder + "HF_Trousers_FBK05_v02.js", 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Female hairs map options.
        var mapOptions = {
            id   : "E9YKax0",
            ext  : "jpg",
            name : "HF_Trousers",
            asset: asset,
        //  index: null, // is not multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  mapOptions.url = "https://i.imgur.com/PdjMvia.png";
    //  mapOptions.url = "https://i.imgur.com/ejSGU9j.png"; // zebra    //
    //  mapOptions.url = "https://i.imgur.com/E9YKax0.jpg"; // folklore //

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
        asset.material.bumpScale = -0.01;
        asset.material.displacementBias = 0;
        asset.material.displacementScale = 0;
        asset.material.color.setHex(0xffffff);

    });
