//  hmSneakersLoader.js

    var debugMode;

//    var hmSneakersAsset = assetsFolder + "HM_SneakersShoes_ABK04_v01.js";

//    var assetName = "hmSneakers";
//    var assetKey  = "aw3d.avatar.male.shoes.sneakers";
//    var assetUrl  = assetsFolder + "HM_SneakersShoes_ABK04_v01.js";

    function $getMaleSneakers(options, loadTextures){
    
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

    $getMaleSneakers({

        name: "hmSneakers",
        key : "aw3d.avatar.male.shoes.sneakers",
        url : assetsFolder + "HM_SneakersShoes_ABK04_v01.js", 

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





