//  fmTailDressLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var fmTailDressUrl = skinnedFolder + "HF_LongTailDress_FBK05_v03.js";

//    var fmTailDressAsset = skinnedFolder + "HF_LongTailDress_FBK05_v03.js";

//    var assetName = "fmTailDress";
//    var assetKey  = "aw3d.outfit.female.taildress";
//    var assetUrl  = skinnedFolder + "HF_LongTailDress_FBK05_v03.js";

    $getOutfit({
        name: "fmTailDress",
        key : "fmTailDress",
        url : fmTailDressUrl, 

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Female hairs map options.
        var mapOptions = {
            id   : "LtN1F8y",
            ext  : "png",
            name : "HF_LongTailDress",
            asset: asset,
            index: 0, // is multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  var mapOptions.url = "https://i.imgur.com/LtN1F8y.png";

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
        asset.material.materials[ index ].bumpScale = 0.05;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].color.setHex(0xffffff);

    });
