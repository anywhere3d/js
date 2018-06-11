//  fmSandalShoesLoader.js

    var debugMode;

//    var fmSandalAsset = assetsFolder + "HF_SandalShoes_ABK06_v02.js";

//    var assetName = "fmSandal";
//    var assetKey  = "aw3d.outfit.female.shoes.sandal";
//    var assetUrl  = assetsFolder + "HF_SandalShoes_ABK06_v02.js";

    $getOutfit({
        name: "fmSandal",
        key : "fmSandal",
        url : assetsFolder + "HF_SandalShoes_ABK06_v02.js", 

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Female hairs map options.
        var mapOptions = {
            id   : "tjNZqbq",
            ext  : "jpg",
            name : "HF_SandalShoes",
            asset: asset,
        //  index: null, // is not multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  var mapOptions.url = "https://i.imgur.com/tjNZqbq.png";

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
        asset.material.bumpScale = 0.05;
        asset.material.displacementBias = 0;
        asset.material.displacementScale = 0;
        asset.material.color.setHex(0xffffff);

    });

