//  fmSneakersLoader.js

    var debugMode;

//    var fmSneakersAsset  = assetsFolder + "HF_SneakersShoes_ABK04_v01.js";

//    var assetName = "fmSneakers";
//    var assetKey  = "aw3d.avatar.female.shoes.sneakers";
//    var assetUrl  = assetsFolder + "HF_SneakersShoes_ABK04_v01.js";

    function $getFemaleSneakers(options, loadTextures){
    
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
            loadTextures( asset )
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


    $getFemaleSneakers({

        name: "fmSneakers",
        key : "aw3d.avatar.female.shoes.sneakers",
        url : assetsFolder + "HF_SneakersShoes_ABK04_v01.js", 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Material settings.
        asset.material.metalness = 0;
        asset.material.roughness = 0.5;
        asset.material.bumpScale = -0.05;
        asset.material.displacementBias = 0;
        asset.material.displacementScale = 0;
        asset.material.color.setHex(0xffffff);

    });













