//  hmHairsLoader.js

    var debugMode;

//    var assetName = "hmHairs";
//    var assetKey  = "aw3d.avatar.male.hairs";
//    var assetUrl  = assetsFolder + "HM_HairsMedium_MBK04_v01.js";

    function $getMaleHairs(options, loadTextures){
    
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

    $getMaleHairs({
        name: "hmHairs",
        key : "aw3d.avatar.male.hairs",
        url : assetsFolder + "HM_HairsMedium_MBK04_v01.js", 

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }


    //  Male hairs map options.
        var mapOptions = {
            id   : "vej91Wb",
            ext  : "png",
            name : "HM_Hairs",
            asset: asset,
        //  index: null, // is not multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  debugMode && console.log("male mapOptions.url:", mapOptions.url);
    //  mapOptions.url = "https://i.imgur.com/vej91Wb.png";


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





