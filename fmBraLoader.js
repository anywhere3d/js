//  fmBraLoader.js

    var debugMode;

//    var fmBraAsset  = assetsFolder + "HF_BraLayer_FBK05_v01.js";

//    var assetName = "fmBra";
//    var assetKey  = "aw3d.outfit.female.bra";
//    var assetUrl  = assetsFolder + "HF_BraLayer_FBK05_v01.js";

    $getOutfit({

        name: "fmBra",
        key : "fmBra",
        url : assetsFolder + "HF_BraLayer_FBK05_v01.js", 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Female hairs map options.
        var mapOptions = {
            id   : "vKKf5bJ",
            ext  : "png",
            name : "HF_BraLayer",
            asset: asset,
        //  index: null, // is not multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  mapOptions.url = "https://i.imgur.com/vKKf5bJ.jpg";

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
        asset.material.bumpScale = 0.05;
        asset.material.transparent = true;
        asset.material.displacementBias = 0;
        asset.material.displacementScale = 0;
        asset.material.color.setHex(0xffffff);

    });
