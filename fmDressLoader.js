//  fmDressLoader.js

    var debugMode;

//    var fmDressAsset = assetsFolder + "HF_Dress_FBK05_v03.js";

//    var assetName = "fmDress";
//    var assetKey  = "aw3d.outfit.female.dress";
//    var assetUrl  = assetsFolder + "HF_Dress_FBK05_v03.js";

    $getOutfit({
        name: "fmDress",
        key : "fmDress",
        url : assetsFolder + "HF_Dress_FBK05_v03.js", 

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Female hairs map options.
        var mapOptions = {
            id   : "Gl5NqHY",
            ext  : "png",
            name : "HF_Dress",
            asset: asset,
        //  index: null, // is not multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  var mapOptions.url = "https://i.imgur.com/Gl5NqHY.png";

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
        asset.material.bumpScale = -0.05;
        asset.material.displacementBias = 0;
        asset.material.displacementScale = 0;
        asset.material.transparent = true;
        asset.material.color.setHex(0xffffff);

    });

