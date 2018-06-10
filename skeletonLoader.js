//  skeletonLoader.js

    var debugMode;

//    var skeletonAsset = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

//    var assetKey = "skeleton";
//    var assetName = "skeleton";
//    var assetUrl = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

    function $getSkeleton( options, loadTextures, sceneAddBody){

        debugMode && console.log("$getSkeleton()");

        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        $.getJSON( url ).then(function(json){

            if (!json) 
                throw Error("Error: json not defined.");

        //  Local Forage.
            AW3Dstore.setItem(key, json)
            .then(function (value) {
                console.log("value:", value);
                return value;
            });

        }).then(function(json){
            Avatars[ name ] = initOutfitAsset( json );
            return Avatars[ name ];

        }).then(function(asset){
            loadTextures( asset );

        }).then(function(){
            sceneAddBody( name )

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


    $getSkeleton({

        name: "skeleton",
        key : "skeleton.json",        
        url : skinnedFolder + "HF_MannySkeleton_ABK04_v01.js", 

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }

    //  Skeleton body map options.
        var mapOptions = {
            id   : "tjNZqbq",
            ext  : "jpg",
            name : "skeleton_map",
            asset: asset,
            index: null,
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  debugMode && console.log("skeleton mapOptions.url:", mapOptions.url);
    //  mapOptions.url = "https://i.imgur.com/tjNZqbq.jpg";

    //  Load texture.
        mapOptions.map = "map";
        textureMapLoader( mapOptions );

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

    }, function sceneAddBody( name ){

        var outfit = {"body": Avatars[ name ]};
        localPlayer.outfit.add( outfit );
        var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
        localPlayer.controller.direction = frontAngle;
        localPlayer.outfit.update();
        scene.add(localPlayer.outfit.direction);

    });

