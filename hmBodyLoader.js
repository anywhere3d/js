//  hmBodyLoader.js

    var debugMode;

//    var hmBodyAsset = assetsFolder + "HM_BodyLayer_ABK04_v02.js";

//    var assetName = "hmBody";
//    var assetKey = "aw3d.avatar.male.body";
//    var assetUrl = assetsFolder + "HM_BodyLayer_ABK04_v02.js";

    $getOutfit({

        name: "hmBody",
        key : "aw3d.avatar.male.body",
        url : assetsFolder + "HM_BodyLayer_ABK04_v02.js",

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Male body map options.
        var mapOptions = {
            id   : "mAZgsw8",
            ext  : "jpg",
            name : "HM_Skin_Dark",
            asset: asset,
            index: 0, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  debugMode && console.log("male mapOptions.url:", mapOptions.url);
    //  mapOptions.url = "https://i.imgur.com/mAZgsw8.jpg";

    //  Load texture.
        mapOptions.map = "map";
        textureMapLoader( mapOptions );


    //  Male body emissive map options.
        var emissOptions = {
            id   : "4h9rLSg",
            ext  : "jpg",
            name : "HM_Skin_Mid",
            asset: asset,
            index: 0, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        emissOptions.url = imgurQualityUrl( emissOptions );
    //  debugMode && console.log("male emissOptions.url:", emissOptions.url);
    //  emissOptions.url = "https://i.imgur.com/4h9rLSg.jpg";


    //  Load texture.
        emissOptions.map = "emissiveMap";
        textureMapLoader( emissOptions );


    //  Male body normal map options.
        var normOptions = {
            id   : "V6MSKOT",
            ext  : "jpg",
            name : "HM_Skin_Nrm",
            asset: asset,
            index: 0, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        normOptions.url = imgurQualityUrl( normOptions );
    //  debugMode && console.log("male normOptions.url:", normOptions.url);
    //  normOptions.url = "https://i.imgur.com/V6MSKOT.jpg";


    //  Load texture.
        normOptions.map = "normalMap";
        textureMapLoader( normOptions );

    //  Material settings.
        asset.material.materials[0].metalness = 0;
        asset.material.materials[0].roughness = 0.5;
        asset.material.materials[0].displacementBias = 0;
        asset.material.materials[0].displacementScale = 0;
        asset.material.materials[0].color.setHex(0xffffff);
        asset.material.materials[0].emissive.setHex(0xababab);
        asset.material.materials[0].normalScale.x = 4;
        asset.material.materials[0].normalScale.y = 2;


    //  Male eyes emissive map options.
        var eyesOptions = {
            id   : "VybEXWo",
            ext  : "png",
            name : "HM_Eyes",
            asset: asset,
            index: 1, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        eyesOptions.url = imgurQualityUrl( eyesOptions );
    //  debugMode && console.log("male eyesOptions.url:", eyesOptions.url);
    //  eyesOptions.url = "https://i.imgur.com/VybEXWo.png";


    //  Load texture.
        var url   = eyesOptions.url;
        var map   = eyesOptions.map;
        var name  = eyesOptions.name;
        var index = eyesOptions.index;
        var asset = eyesOptions.asset;

        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).one("load", function (){
            var texture = new THREE.Texture( img ); // or canvas //
            texture.name = name;
            texture.sourceFile = url;
            applyTexture( asset, texture, "map", 1 );
            applyTexture( asset, texture, "emissiveMap", 1 );
            $(img).remove();
        });

        img.src = url;

    //  Material settings.
        asset.material.materials[1].bumpScale = 0;
        asset.material.materials[1].displacementBias = 0;
        asset.material.materials[1].displacementScale = 0;
        asset.material.materials[1].color.setHex(0xffffff);
        asset.material.materials[1].emissive.setHex(0x8d8d8d);

    });



/*
    function $getMaleBody(options, loadTextures){

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
*/
