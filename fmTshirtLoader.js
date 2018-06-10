//  fmTshirtLoader.js

    var debugMode;

//    var fmTshirt1Asset   = assetsFolder + "HF_Tshirt_FBK05_v01.js";
//    var fmTshirt3Asset   = assetsFolder + "HF_Tshirt_FBK05_v03.js";

    function $getFemaleTshirt(options, loadTextures, loadFrontTexture){
    
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
            loadFrontTexture(asset);
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

    $getFemaleTshirt({

        name: "fmTshirtFront",
        key : "aw3d.avatar.female.tshirt.front",
        url : assetsFolder + "HF_Tshirt_FBK05_v03.js", 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }


    //  Female tshirt map options.
        var mapOptions = {
            id   : "4TemDBo",
            ext  : "png",
            name : "HF_Tshirt",
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
        asset.material.materials[0].bumpScale = 0.05;
        asset.material.materials[0].displacementBias = 0;
        asset.material.materials[0].displacementScale = 0;
        asset.material.materials[0].color.setHex(0xffffff);

    }, function loadFrontTexture(asset){

    //  Female hairs map options.
        var mapOptions = {
            id   : "i1ZaSpC",
            ext  : "png",
            name : "HF_TshirtFront",
            asset: asset,
            index: 1, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  var mapOptions.url = "https://i.imgur.com/i1ZaSpC.jpg";

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
        asset.material.materials[1].bumpScale = -0.01;
        asset.material.materials[1].displacementBias = 0;
        asset.material.materials[1].displacementScale = 0;
        asset.material.materials[1].color.setHex(0xffffff);

    });




















