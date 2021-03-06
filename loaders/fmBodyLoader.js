//  fmBodyLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var fmBodyUrl = skinnedFolder + "HF_BodyLayer_ABK04_v02.js";

//    var fmBodyAsset = skinnedFolder + "HF_BodyLayer_ABK04_v02.js";

//    var assetName = "fmBody";
//    var assetKey = "aw3d.avatar.female.body";
//    var assetUrl = skinnedFolder + "HF_BodyLayer_ABK04_v02.js";

    $getOutfit({
        name: "fmBody",
        key : "fmBody",
        url :  fmBodyUrl,

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Female body map options.
        var mapOptions = {
            id   : "pRYCYkb",
            ext  : "jpg",
            name : "HF_Skin_SemiDark_v1",
            asset: asset,
            index: 0, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  mapOptions.url = "https://i.imgur.com/pRYCYkb.jpg";

    //  Load texture.
        mapOptions.map = "map";
        textureMapLoader( mapOptions );

    //  Female body emissive map options.
        var emissOptions = {
            id   : "jc8chBX",
            ext  : "jpg",
            name : "HF_Skin_Mid",
            asset: asset,
            index: 0, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        emissOptions.url = imgurQualityUrl( emissOptions );
    //  emissOptions.url = "https://i.imgur.com/jc8chBX.jpg";

    //  Load texture.
        emissOptions.map = "emissiveMap";
        textureMapLoader( emissOptions );

    //  Material settings.
        var asset = mapOptions.asset;
        var index = mapOptions.index;

        asset.material.materials[ index ].metalness = 0;
        asset.material.materials[ index ].roughness = 0.6;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].color.setHex(0xffffff);
        asset.material.materials[ index ].emissive.setHex(0xb3b2b2);


    //  Female eyes emissive map.
        var eyesOptions = {
            id   : "Si5QWl0",
            ext  : "png",
            name : "HF_Eyes",
            asset: asset,
            index: 1, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        eyesOptions.url = imgurQualityUrl( eyesOptions );
    //  eyesOptions.url = "https://i.imgur.com/Si5QWl0.png";

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
        asset.material.materials[ index ].bumpScale = 0;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].color.setHex(0xffffff);
        asset.material.materials[ index ].emissive.setHex(0x8d8d8d);

    });

/*

//  (zargodb)

    $getOutfit({

        url : fmBodyUrl,
        col: "avatars",
        name: "fmBody",

        loadTextures: function( asset ){
    
            if (!asset) {
                var error = [
                    "asset", name, "did not defined."
                ].join(" ");
                throw Error( error );
            }
    
        //  Female body map options.
            var mapOptions = {
                id   : "pRYCYkb",
                ext  : "jpg",
                name : "HF_Skin_SemiDark_v1",
                asset: asset,
                index: 0, // multimaterial index.
                quality: "original",
            };
    
        //  Set imgur url.
            mapOptions.url = imgurQualityUrl( mapOptions );
        //  mapOptions.url = "https://i.imgur.com/pRYCYkb.jpg";
    
        //  Load texture.
            mapOptions.map = "map";
            textureMapLoader( mapOptions );
    
        //  Female body emissive map options.
            var emissOptions = {
                id   : "jc8chBX",
                ext  : "jpg",
                name : "HF_Skin_Mid",
                asset: asset,
                index: 0, // multimaterial index.
                quality: "original",
            };
    
        //  Set imgur url.
            emissOptions.url = imgurQualityUrl( emissOptions );
        //  emissOptions.url = "https://i.imgur.com/jc8chBX.jpg";
    
        //  Load texture.
            emissOptions.map = "emissiveMap";
            textureMapLoader( emissOptions );
    
        //  Material settings.
            var asset = mapOptions.asset;
            var index = mapOptions.index;
    
            asset.material.materials[ index ].metalness = 0;
            asset.material.materials[ index ].roughness = 0.6;
            asset.material.materials[ index ].displacementBias = 0;
            asset.material.materials[ index ].displacementScale = 0;
            asset.material.materials[ index ].color.setHex(0xffffff);
            asset.material.materials[ index ].emissive.setHex(0xb3b2b2);
    
    
        //  Female eyes emissive map.
            var eyesOptions = {
                id   : "Si5QWl0",
                ext  : "png",
                name : "HF_Eyes",
                asset: asset,
                index: 1, // multimaterial index.
                quality: "original",
            };
    
        //  Set imgur url.
            eyesOptions.url = imgurQualityUrl( eyesOptions );
        //  eyesOptions.url = "https://i.imgur.com/Si5QWl0.png";
    
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
            asset.material.materials[ index ].bumpScale = 0;
            asset.material.materials[ index ].displacementBias = 0;
            asset.material.materials[ index ].displacementScale = 0;
            asset.material.materials[ index ].color.setHex(0xffffff);
            asset.material.materials[ index ].emissive.setHex(0x8d8d8d);
    
        },

    });

*/
