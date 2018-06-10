//  fmSkirtLoader.js

    var debugMode;

//    var fmSkirtAsset = assetsFolder + "HF_Skirt_FBK05_v02.js";

//    var assetName = "fmSkirt";
//    var assetKey  = "aw3d.outfit.female.skirt";
//    var assetUrl  = assetsFolder + "HF_Skirt_FBK05_v02.js";

    function $getFemaleSkirt(options, loadTextures){
    
        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        $.getJSON( url ).then(function(json){

        //  Local Storage.
        //  addToLocalStorageAvatars(name, json);

            if (!json) throw Error("json did not defined");
            Avatars[ name ] = initOutfitAsset( json );
            return Avatars[ name ];

        }).then(function(asset){
            loadTextures( asset );
        }).fail(function(err){
            console.error(err);
        });

        function addToLocalStorageAvatars(key, data){
            var object = {};
            object[key] = data;
            console.log(object);
            store.add("Avatars", object);
        }

    }

    $getFemaleSkirt({

        name: "fmSkirt",
        key : "aw3d.avatar.female.skirt",
        url : assetsFolder + "HF_Skirt_FBK05_v02.js", 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Female hairs map options.
        var mapOptions = {
            id   : "8sNMbmV",
            ext  : "jpg",
            name : "HF_Skirt",
            asset: asset,
        //  index: null, // is not multimaterial.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  mapOptions.url = "https://i.imgur.com/8sNMbmV.jpg";

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
        asset.material.bumpScale = 0.05;
        asset.material.transparent = false;
        asset.material.displacementBias = 0;
        asset.material.displacementScale = 0;
        asset.material.color.setHex(0xffffff);

    });
