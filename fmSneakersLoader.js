//  fmSneakersLoader.js

    var debugMode;

//    var fmSneakersAsset  = assetsFolder + "HF_SneakersShoes_ABK04_v01.js";

//    var assetName = "fmSneakers";
//    var assetKey  = "aw3d.avatar.female.shoes.sneakers";
//    var assetUrl  = assetsFolder + "HF_SneakersShoes_ABK04_v01.js";

    $getOutfit({

        name: "fmSneakers",
        key : "fmSneakers",
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













