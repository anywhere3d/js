//  fmHairsLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var fmHairsUrl = skinnedFolder + "HF_HairsMedium_FBK04_v02.js";

//    var fmHairsAsset = skinnedFolder + "HF_HairsMedium_FBK04_v02.js";

//    var assetName = "fmHairs";
//    var assetKey  = "aw3d.avatar.female.hairs";
//    var assetUrl  = skinnedFolder + "HF_HairsMedium_FBK04_v02.js";

    $getOutfit({
        name: "fmHairs",
        key : "fmHairs",
        url : fmHairsUrl, 

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Female hairs map options.
        var mapOptions = {
            id   : "DwdWLrb",
            ext  : "png",
            name : "HF_Hairs",
            asset: asset,
            index: 0, // is multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  mapOptions.url = "https://i.imgur.com/DwdWLrb.png";

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



/*
    function textureMapLoader( options ){

        var url   = options.url;
        var map   = options.map;
        var name  = options.name;
        var index = options.index;
        var asset = options.asset;

        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).one("load", function (){
            var texture = new THREE.Texture( img ); // or canvas //
            texture.name = name;
            texture.sourceFile = url;
            applyTexture( asset, texture, map, index );
            $(img).remove();
        });

        img.src = url;
        }
*/


