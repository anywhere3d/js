//  fmSneakersLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var fmSneakersUrl = skinnedFolder + "HF_SneakersShoes_ABK04_v01.js";

//    var fmSneakersAsset  = skinnedFolder + "HF_SneakersShoes_ABK04_v01.js";

//    var assetName = "fmSneakers";
//    var assetKey  = "aw3d.avatar.female.shoes.sneakers";
//    var assetUrl  = skinnedFolder + "HF_SneakersShoes_ABK04_v01.js";

    $getOutfit({

        name: "fmSneakers",
        key : "fmSneakers",
        url : fmSneakersUrl, 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

        var mapOptions = {
        //  id   : "",
        //  ext  : "",
        //  name : "",
            asset: asset,
            index: 0, // is multimaterial.
        //  quality: "original",
        };

    //  Set imgur url.
    //  mapOptions.url = imgurQualityUrl( mapOptions );

    //  Load texture.
    //  var url   = mapOptions.url;
    //  var map   = mapOptions.map;
    //  var name  = mapOptions.name;
        var index = mapOptions.index;
        var asset = mapOptions.asset;

    //  var img = new Image();
    //  img.crossOrigin = "anonymous";
    //  $(img).one("load", function (){
    //      var texture = new THREE.Texture( img ); // or canvas //
    //      texture.name = name;
    //      texture.sourceFile = url;
    //      applyTexture( asset, texture, "map", index );
    //      applyTexture( asset, texture, "bumpMap", index );
    //      $(img).remove();
    //  });

    //  img.src = url;

    //  Material settings.
        asset.material.materials[ index ].metalness = 0;
        asset.material.materials[ index ].roughness = 0.5;
        asset.material.materials[ index ].bumpScale = -0.05;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].color.setHex(0xffffff);

    });












