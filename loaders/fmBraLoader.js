//  fmBraLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var hfBraUrl = skinnedFolder + "HF_BraLayer_FBK05_v01.js";

//    var fmBraAsset  = skinnedFolder + "HF_BraLayer_FBK05_v01.js";

//    var assetName = "fmBra";
//    var assetKey  = "aw3d.outfit.female.bra";
//    var assetUrl  = skinnedFolder + "HF_BraLayer_FBK05_v01.js";

    $getOutfit({
        name: "fmBra",
        key : "fmBra",
        url : hfBraUrl, 

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
            index: 0, // is multimaterial.
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
        asset.material.materials[ index ].bumpScale = 0.05;
        asset.material.materials[ index ].transparent = true;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].color.setHex(0xffffff);

    });
