//  skeletonLoader.js

    var debugMode;

//    var skeletonAsset = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

//    var assetKey = "skeleton";
//    var assetName = "skeleton";
//    var assetUrl = skinnedFolder + "HF_MannySkeleton_ABK04_v01.js";

//  More simple solution. Using service-worker for caching all data.

    function $getSkeleton( options, loadTextures, sceneAddBody){

        debugMode && console.log("$getSkeleton()");

        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        $.getJSON( url ).then(function(json){

        //  Local Forage.
        //  AW3Dstore (key, json);

            if (!json) throw Error("json did not defined");
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
    function $getSkeleton( options, loadTextures, sceneAddBody){

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
                    loadTextures( asset );
    
                }).then(function(){
                    sceneAddBody( name )
    
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
                    loadTextures( asset );
    
                }).then(function(){
                    sceneAddBody( name )
    
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
                loadTextures( asset );
    
            }).then(function(){
                sceneAddBody( name )
    
            }).fail(function(err){
                console.error(err);
            });
    
        }

    }

//  imgur Urls and ids are IMPORTANT now on.  /

/*
    function sceneAddLocalPlayerBody( name ){
        var outfit = {"body": Avatars[ name ]};
        localPlayer.outfit.add( outfit );
        var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
        localPlayer.controller.direction = frontAngle;
        localPlayer.outfit.update();
        scene.add(localPlayer.outfit.direction);
    }
*/
//  toLocalStore( ["aw3d", "avatar", assetName].join("."), json);

/*
    if ( !!window.localStorage ){

        var key = ["aw3d", "avatar", assetName].join(".");

        if ( !!localStorage[key] ){

            $.Deferred().resolve( fromLocalStore(key) )
            .then(function(json){

                if (!json) throw Error("json did not defined");

                var name = assetName;
                Avatars[ name ] = initOutfitAsset( json );
                return Avatars[ name ];

            }).then(function(asset){

                if (!asset) {
                    var error = [
                        "asset",
                        assetName, 
                        "did not defined."
                    ].join(" ");
                    throw Error( error );
                }

            //  var mapUrl = "https://i.imgur.com/tjNZqbq.jpg";
            //  imgur Urls and ids are IMPORTANT now on      //

                var imgurOptions = {
                    ext    : "jpg",
                    id     : "tjNZqbq",
                    quality: "original",
                };

                var mapUrl = imgurQualityUrl( imgurOptions );
                debugMode && console.log("mapUrl:", mapUrl);

                var textureOptions = {
                    url  : mapUrl,
                    asset: asset,
                    map  : "map",
                    name : "skeleton_map",
                }
                
                textureMapLoader( textureOptions );

            }).then(function(){

            //  Add avatar akeleton.
                var name = assetName;
                var outfit = { "body": Avatars[ name ] };
                localPlayer.outfit.add( outfit );

            //  Add outfit to scene.
                var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
                localPlayer.controller.direction = frontAngle;
                localPlayer.outfit.update();
                scene.add(localPlayer.outfit.direction);

            }).fail(function(err){

            //  BE CAREFULL: "$.Deferred()" promise,
            //  uses ".fail(function(err){});" 
            //  instead of ".catch(function(err){})";
                console.error(err);

            });

        } else {
        
            $.getJSON( assetUrl ).then(function(json){

                if (!json) throw Error("json did not defined");

                var name = assetName;
                Avatars[ name ] = initOutfitAsset( json );

                toLocalStore(key, json);
                return Avatars[ name ];
            
            }).then(function(asset){

                if (!asset) {
                    var error = [
                        "asset",
                        assetName, 
                        "did not defined."
                    ].join(" ");
                    throw Error( error );
                }

            //  var mapUrl = "https://i.imgur.com/tjNZqbq.jpg";
            //  imgur Urls and ids are IMPORTANT now on      //

                var imgurOptions = {
                    ext    : "jpg",
                    id     : "tjNZqbq",
                    quality: "original",
                };

                var mapUrl = imgurQualityUrl( imgurOptions );
                debugMode && console.log("mapUrl:", mapUrl);

                var textureOptions = {
                    url  : mapUrl,
                    asset: asset,
                    map  : "map",
                    name : "skeleton_map",
                }
                
                textureMapLoader( textureOptions );

            }).then(function(){

            //  Add avatar akeleton.
                var name = assetName;
                var outfit = { "body": Avatars[ name ] };
                localPlayer.outfit.add( outfit );

            //  Add outfit to scene.
                var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
                localPlayer.controller.direction = frontAngle;
                localPlayer.outfit.update();
                scene.add(localPlayer.outfit.direction);

            }).fail(function(err){

            //  BE CAREFULL: "$.getJSON()" promise,
            //  uses ".fail(function(err){});" 
            //  instead of ".catch(function(err){})";
                console.error(err);

            });
        
        }

    } else {

//  if ( !window.localStorage) {
    
        $.getJSON( assetUrl ).then(function(json){

            if (!json) throw Error("json did not defined");

        //  console.log("json:", json);
            var name = assetName;
            Avatars[ name ] = initOutfitAsset( json );
            return Avatars[ name ];
            
        }).then(function(asset){

            if (!asset) throw Error("asset did not defined");

        //  var mapUrl = "https://i.imgur.com/tjNZqbq.jpg";
        //  imgur Urls and ids are IMPORTANT now on      //

            var imgurOptions = {
                ext    : "jpg",
                id     : "tjNZqbq",
                quality: "original",
            };

            var mapUrl = imgurQualityUrl( imgurOptions );
            debugMode && console.log("mapUrl:", mapUrl);

        //  Load texture.
            var url = mapUrl;
            var map = "map";
            var name = "skeleton_map";

            var img = new Image();
            img.crossOrigin = "anonymous";
            $(img).one("load", function (){
                var texture = new THREE.Texture( img ); // or canvas //
                texture.name = name;
                texture.sourceFile = url;
                applyTexture( asset, texture, map );
                $(img).remove();
            });

            img.src = url;

        }).then(function(){
    
        //  Add avatar akeleton.
            var name = assetName;
            var outfit = { "body": Avatars[ name ] };
            localPlayer.outfit.add( outfit );

        //  Add outfit to scene.
            var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
            localPlayer.controller.direction = frontAngle;
            localPlayer.outfit.update();
            scene.add(localPlayer.outfit.direction);

        }).fail(function(err){

        //  BE CAREFULL: "$.getJSON()" promise,
        //  uses ".fail(function(err){});" 
        //  instead of ".catch(function(err){})";
            console.error(err);

        });

    }
*/

/*
    function toLocalStore( key, data ){
        if (!window.localStorage) return;
        return localStorage[key] = JSON.stringify(data);
    }

    function fromLocalStore( key ){
        if (!window.localStorage) return;
        if ( !localStorage[key] ) return;
        return JSON.parse( localStorage[key] );
    }
*/

/*
function imgurQualityUrl(id, ext, quality){

    if (!id) return "https://i.imgur.com/ODeftia.jpg";
    var ext    = ext || "jpg";
    var map_id = id || "ODeftia";
    var q      = quality || "original";
    var imgur  = "https://i.imgur.com/";

    switch (q) {

        case null:
        case undefined:
        case "original":
            break;

        case "small":
            map_id += "s";
            break;

        case "big":
            map_id += "b";
            break;

        case "thumb":
            map_id += "t";
            break;

        case "medium":
            map_id += "m";
            break;

        case "large":
            map_id += "l";
            break;

        case "huge":
            map_id += "h";
            break;

        default:
            map_id;
    }

    return imgur + map_id + "." + ext;
}
*/


//  DebugTest.
//    localStorage.findItem(assetKey).then(function(result){
//        debugMode && console.log( "localStorage.findItem:", result );
//    });


//  Script functions.
//    var makePowerOfTwoScript = scriptsFolder + "makePowerOfTwo.js";    
//    var setEncodedLocalScript = scriptsFolder + "setEncodedItemToLocalStorage.js";
//    var getDecodedLocalScript = scriptsFolder + "getDecodedItemFromLocalStorage.js";

//    $.getScript(makePowerOfTwoScript);
//    $.getScript(setEncodedLocalScript);
//    $.getScript(getDecodedLocalScript);


//  if ( !localStorage.getItem(assetKey) ){

//      debugMode && console.log(false);

//  } else {

//      $.getScript(getDecodedLocalScript, function( script, textStatus, jqxhr ){
/*
            debugMode && console.log(true);
        //  debugMode && console.log( getDecodedItemFromLocalStorage(assetKey) );
    
            var json = getDecodedItemFromLocalStorage(assetKey);
            debugMode && console.log("json:", json);
    
            Avatars[ assetName ] = initOutfitAsset( json );
    
            var img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = function (){
    
                var canvas = makePowerOfTwo( img );
                if (!!canvas){
                    var texture = new THREE.Texture( canvas );
                    texture.name = "skeleton_default";
                    texture.sourceFile = img.src;
                    apply( Avatars[ assetName ], texture );
                    $(img).remove();
                }
        
                function apply( asset, texture, i ){
                    if (!asset) {
                        var msg = "Outfit <b>" + "body" + "</b> have not been defined!";
                        bootboxErrorAlert( msg ); return;
                    }
        
                    if ( !!asset.material.materials && ( i != null && !isNaN(i) ) ) {
                        asset.material.materials[i].map = texture;
                        asset.material.materials[i].map.needsUpdate = true;
                        asset.material.materials[i].needsUpdate = true;
        
                    } else {
                        asset.material.map = texture;
                        asset.material.map.needsUpdate = true;
                        asset.material.needsUpdate = true;
                    }
                }
    
            };
    
            img.src = localStorage.getItem( textureUrl );
    
        //  Add avatar akeleton.
            sceneAddOutfitSkeleton();
*/
//      });
//  }


/*
    getAvatarAssetPromise( skeletonAsset, "skeleton" ).then( function(asset){

        var url = skeletonTexture;

        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = onImageLoad;
        img.src = url;

        function onImageLoad(){
            var canvas = makePowerOfTwo( img );
            if (!!canvas){
                var texture = new THREE.Texture( canvas );
                texture.name = "skeleton_default";
                texture.sourceFile = img.src;
                apply( texture );
                $(img).remove();
            }
        }

        function apply( texture, i ){

            if (!asset) {
                var msg = "Outfit <b>body</b> have not been defined!";
                bootboxErrorAlert( msg ); return;
            }

            if ( !!asset.material.materials && ( i != null && !isNaN(i) ) ) {

                asset.material.materials[i].map = texture;
                asset.material.materials[i].map.needsUpdate = true;
                asset.material.materials[i].needsUpdate = true;

            } else {

                asset.material.map = texture;
                asset.material.map.needsUpdate = true;
                asset.material.needsUpdate = true;
            }

        }

    }).then( addAvatarSkeleton ).then(function(){

    //    var texture = new THREE.Texture(logo);
    //    var material = new THREE.SpriteMaterial({map:texture});
    //    var sprite = new THREE.Sprite(material);
    //    sprite.scale.set(10,10,1);
    //    sprite.position.set(5,31,0);
    //    localPlayer.outfit.direction.add(sprite);
    //    sprite.material.map.needsUpdate = true;

    });

*/


/*
    if (debugMode){
        localPlayer.outfit.set( {body: Avatars[ "skeleton" ]} );
        var x = Math.random() - 0.5; x = Math.ceil(x * 500); localPlayer.controller.center.x = x;
        var z = Math.random() - 0.5; z = Math.ceil(z * 500); localPlayer.controller.center.z = z;
        debugMode && console.log( "initial position:", localPlayer.controller.center );
        localPlayer.outfit.direction.add( localPlayer.outfit.skeleton );
        scene.add(localPlayer.outfit.direction);
        localPlayer.holder.visible = false;
        localPlayer.pointer.visible = false;
        var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
        localPlayer.controller.direction = frontAngle;
        localPlayer.outfit.update();
    }
*/

