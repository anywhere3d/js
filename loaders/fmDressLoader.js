//  fmDressLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var fmDressUrl = skinnedFolder + "HF_Dress_FBK05_v03.js";

//    var fmDressAsset = skinnedFolder + "HF_Dress_FBK05_v03.js";

//    var assetName = "fmDress";
//    var assetKey  = "aw3d.outfit.female.dress";
//    var assetUrl  = skinnedFolder + "HF_Dress_FBK05_v03.js";

    $getOutfit({
        name: "fmDress",
        key : "fmDress",
        url : fmDressUrl, 

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Female hairs map options.
        var mapOptions = {
            id   : "L0QPW24",
            ext  : "png",
            name : "HF_Dress",
            asset: asset,
            index: 0, // is multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  var mapOptions.url = "https://i.imgur.com/Gl5NqHY.png";
    //  var mapOptions.url = "https://i.imgur.com/L0QPW24.png";

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
            applyTexture( asset, texture, "emissiveMap", index );
            $(img).remove();
        });

        img.src = url;

    //  Material settings.
        asset.material.materials[ index ].bumpScale = -0.05;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].transparent = true;
        asset.material.materials[ index ].color.setHex(0xffffff);
        asset.material.materials[ index ].emissive.setHex(0x7d7979);

    });
