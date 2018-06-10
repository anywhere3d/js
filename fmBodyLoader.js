//  fmBodyLoader.js

    var debugMode;

//    var fmBodyAsset = assetsFolder + "HF_BodyLayer_ABK04_v02.js";

//    var assetName = "fmBody";
//    var assetKey = "aw3d.avatar.female.body";
//    var assetUrl = assetsFolder + "HF_BodyLayer_ABK04_v02.js";

//  More simple solution. Using service-worker for caching all data.

    function $getFemaleBody(options, loadTextures){
    
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

    $getFemaleBody({
        name: "fmBody",
        key : "fmBody",
        url : assetsFolder + "HF_BodyLayer_ABK04_v02.js", 

    }, function loadTextures( asset ){

        if (!asset) {
            var error = [
                "asset", name, "did not defined."
            ].join(" ");
            throw Error( error );
        }


    //  Female body map options.
        var mapOptions = {
            id   : "pRYCYkb",
            ext  : "jpg",
            name : "HF_Skin_SemiDark_v1",
            asset: asset,
            index: 0, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        mapOptions.url = imgurQualityUrl( mapOptions );
    //  debugMode && console.log("female mapOptions.url:", mapOptions.url);
    //  mapOptions.url = "https://i.imgur.com/pRYCYkb.jpg";


    //  Load texture.
        mapOptions.map = "map";
        textureMapLoader( mapOptions );


    //  Female body emissive map options.
        var emissOptions = {
            id   : "jc8chBX",
            ext  : "jpg",
            name : "HF_Skin_Mid",
            asset: asset,
            index: 0, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        emissOptions.url = imgurQualityUrl( emissOptions );
    //  debugMode && console.log("female emissOptions.url:", emissOptions.url);
    //  emissOptions.url = "https://i.imgur.com/jc8chBX.jpg";


    //  Load texture.
        emissOptions.map = "emissiveMap";
        textureMapLoader( emissOptions );


    //  Material settings.
        asset.material.materials[0].metalness = 0;
        asset.material.materials[0].roughness = 0.6;
        asset.material.materials[0].displacementBias = 0;
        asset.material.materials[0].displacementScale = 0;
        asset.material.materials[0].color.setHex(0xffffff);
        asset.material.materials[0].emissive.setHex(0xb3b2b2);


    //  Female eyes emissive map.
        var eyesOptions = {
            id   : "Si5QWl0",
            ext  : "png",
            name : "HF_Eyes",
            asset: asset,
            index: 1, // multimaterial index.
            quality: "original",
        };

    //  Set imgur url.
        eyesOptions.url = imgurQualityUrl( eyesOptions );
    //  debugMode && console.log("female eyesOptions.url:", eyesOptions.url);
    //  eyesOptions.url = "https://i.imgur.com/Si5QWl0.png";


    //  Load texture.
        var url   = eyesOptions.url;
        var map   = eyesOptions.map;
        var name  = eyesOptions.name;
        var index = eyesOptions.index;
        var asset = eyesOptions.asset;

        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).one("load", function (){
            var texture = new THREE.Texture( img ); // or canvas //
            texture.name = name;
            texture.sourceFile = url;
            applyTexture( asset, texture, "map", 1 );
            applyTexture( asset, texture, "emissiveMap", 1 );
            $(img).remove();
        });

        img.src = url;


    //  Material settings.
        asset.material.materials[1].bumpScale = 0;
        asset.material.materials[1].displacementBias = 0;
        asset.material.materials[1].displacementScale = 0;
        asset.material.materials[1].color.setHex(0xffffff);
        asset.material.materials[1].emissive.setHex(0x8d8d8d);

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

    });
















/*!
* @author anywhere3d
* http://anywhere3d.org
* MIT License
*/

/*!
*  How to use:
*  --------------
*
*      $getAsset(
*          options, 
*          loadTextures( asset ){
*              ...........
*          },
*          optionalfunc1(){
*              ........... 
*          },
*          optionalfunc2(){
*              ........... 
*          }
*      );
*  
*  argument "options":
*    options.key : the key of json data in localStorage,
*    options.url : the url of asset json file.
*    options.name: the key name of asset in Avatars object.
*    You can add additional properties in options if you need.
*
*  argument "loadTexture":
*    a chain callback function of type function( asset ),
*    used in promise chain to setup the textures of asset maps.
*    It takes "asset" as argument and you can use it to load 
*    and apply textures or/and set parameters to asset materials.
*
*  You can add additional functions as arguments if you need 
*  more tasks in the promise chain.
*
*  The function looks if window support localeStorage and if so,
*  try to upload the json data from localStorage using the 
*  "options.key" argument. If key does not exist in localStorage 
*  then fetch the data from the json file using the $.getJSON(url) 
*  method with "options.url" as "url" argument, and store the 
*  json data to the localStorage under the key "options.key".
*  
*  Use the "loadTextures()" chain callback to load textures and 
*  set asset material properties. You can use an additional callback 
*  like "sceneAddAsset()" if you want to add the asset in the scene.
*  You also can use as manny additional chain callbacks as you need.
*  (by modifing the promise chain of the $getAsset function).
*
*  Useful to know: "$getAsset()" use the "store2.js" library
*  ["https://github.com/nbubna/store"] to manage localStorage.
*/

/*
    function $getFemaleBody(options, loadTextures){
    
        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        if ( !!window.localStorage ){

            if ( store.has(key) ){

                console.log("loading from store key:", key);

                $.Deferred().resolve( store(key) ).then(function(json){

                    if (!json) throw Error("json did not defined");
                    Avatars[ name ] = initOutfitAsset( json );
                    return Avatars[ name ];

                }).then(function(asset){
                    loadTextures( asset )
                }).fail(function(err){
                    console.error(err);
                });

            } else {

                $.getJSON( url ).then(function(json){

                    if (!json) throw Error("json did not defined");
                    Avatars[ name ] = initOutfitAsset( json );
                    store(key, json);
                    return Avatars[ name ];

                }).then(function(asset){
                    loadTextures( asset )
                }).fail(function(err){
                    console.error(err);
                });

            }

        } else {

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

    }
*/












