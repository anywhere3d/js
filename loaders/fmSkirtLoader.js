//  fmSkirtLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var fmSkirtUrl = skinnedFolder + "HF_Skirt_FBK05_v02.js";

//    var fmSkirtAsset = skinnedFolder + "HF_Skirt_FBK05_v02.js";

//    var assetName = "fmSkirt";
//    var assetKey  = "aw3d.outfit.female.skirt";
//    var assetUrl  = skinnedFolder + "HF_Skirt_FBK05_v02.js";

    $getOutfit({
        name: "fmSkirt",
        key : "fmSkirt",
        url : fmSkirtUrl, 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Female hairs map options.
        var mapOptions = {
            id   : "8sNMbmV",
            ext  : "jpg",
            name : "HF_Skirt",
            asset: asset,
            index: 0, // is multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  mapOptions.url = "https://i.imgur.com/8sNMbmV.jpg";

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
        asset.material.materials[ index ].transparent = false;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].color.setHex(0xffffff);

    });
