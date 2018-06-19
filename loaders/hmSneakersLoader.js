//  hmSneakersLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var hmSneakersUrl = skinnedFolder + "HM_SneakersShoes_ABK04_v01.js";

//    var hmSneakersAsset = skinnedFolder + "HM_SneakersShoes_ABK04_v01.js";

//    var assetName = "hmSneakers";
//    var assetKey  = "aw3d.avatar.male.shoes.sneakers";
//    var assetUrl  = skinnedFolder + "HM_SneakersShoes_ABK04_v01.js";

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

    $getOutfit({

        name: "hmSneakers",
        key : "hmSneakers",
        url : hmSneakersUrl, 

    }, function loadTextures(asset){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

        var mapOptions = {
        //  id   : "",
        //  ext  : "jpg",
        //  name : "HM_SNEAKERS",
            asset: asset,
            index: 0, // multimaterial.
            quality: "original",
        };

    //  Set imgur url.
    //  mapOptions.url = imgurQualityUrl( mapOptions );

    //  Load texture.
        //var url   = mapOptions.url;
        //var map   = mapOptions.map;
        //var name  = mapOptions.name;
        var index = mapOptions.index;
        var asset = mapOptions.asset;
/*
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).one("load", function (){
            var texture = new THREE.Texture( img ); // or canvas //
            texture.name = name;
            texture.sourceFile = url;
            applyTexture( asset, texture, "map", index );
            applyTexture( asset, texture, "bumpMap", index );
            applyTexture( asset, texture, "emissiveMap", index );
            $(img).remove();
        });
        img.src = url;
*/
    //  Material settings.
        asset.material.materials[ index ].metalness = 0;
        asset.material.materials[ index ].roughness = 0.5;
        asset.material.materials[ index ].bumpScale = -0.05;
        asset.material.materials[ index ].displacementBias = 0;
        asset.material.materials[ index ].displacementScale = 0;
        asset.material.materials[ index ].color.setHex(0xffffff);

    });




