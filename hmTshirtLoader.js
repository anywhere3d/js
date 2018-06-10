//  hmTshirtLoader.js

    var debugMode;

//    var hmTshirtAsset = assetsFolder + "HM_Tshirt_MBK05_v01.js";

//    var assetName = "hmTshirt";
//    var assetKey  = "aw3d.avatar.male.tshirt";
//    var assetUrl  = assetsFolder + "HM_Tshirt_MBK05_v01.js";

    function $getMaleTshirt(options, loadTextures, loadFrontTexture){
    
        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        $.getJSON( url ).then(function(json){

            if (!json) throw Error("json did not defined");
            Avatars[ name ] = initOutfitAsset( json );
            return Avatars[ name ];

        }).then(function(asset){
            loadTextures( asset );
            loadFrontTexture(asset);
        }).fail(function(err){
            console.error(err);
        });

    }

    $getMaleTshirt({

        name: "hmTshirt",
        key : "aw3d.avatar.male.tshirt",
        url : assetsFolder + "HM_Tshirt_MBK05_v01.js", 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }


    //  Male tshirt map options.
        var mapOptions = {
            id   : "4TemDBo",
            ext  : "png",
            name : "HM_Tshirt",
            asset: asset,
            index: 0, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  var mapOptions.url = "https://i.imgur.com/4TemDBo.png";

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
        asset.material.materials[0].metalness = 0;
        asset.material.materials[0].roughness = 0.4;
        asset.material.materials[0].bumpScale = 0.05;
        asset.material.materials[0].displacementBias = 0;
        asset.material.materials[0].displacementScale = 0;
        asset.material.materials[0].color.setHex(0x177694);


    }, function loadFrontTexture(asset){


    //  Male tshirt front map options.
        var mapOptions = {
            id   : "ihYtRLw",
            ext  : "png",
            name : "HM_TshirtFront",
            asset: asset,
            index: 1, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  var mapOptions.url = "https://i.imgur.com/ihYtRLw.png";

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
            applyTexture( asset, texture, "emissiveMap", index );
            $(img).remove();
        });

        img.src = url;

    //  Material settings.
        asset.material.materials[1].bumpScale = -0.01;
        asset.material.materials[1].displacementBias = 0;
        asset.material.materials[1].displacementScale = 0;
        asset.material.materials[1].color.setHex(0x000000);
        asset.material.materials[1].emissive.setHex(0xffffff);

    });




