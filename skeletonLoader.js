//  skeletonLoader.js

    var debugMode;

    var scriptsFolder  = "/scripts/";
    var assetsFolder = "/models/assets/";
    var texturesFolder = "/models/textures/";

    var assetName = "skeleton";
    var assetKey = "aw3d.avatar.skeleton";

    var assetUrl = assetsFolder + "HF_MannySkeleton_ABK04_v01.js";
//  var mapUrl = texturesFolder + "wooden_roses.jpg";

/*  imgur Urls and ids are IMPORTANT now on */

    $.getJSON( assetUrl ).then(function(json){

    //  console.log("json:", json);
        var name = assetName;
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];
        
    }).then(function(asset){

        var ext = "jpg";
        var map_id = "tjNZqbq";
        var quality = "original";
        mapUrl = imgurQualityUrl(map_id, ext, quality);
    //  var mapUrl = "https://i.imgur.com/tjNZqbq.jpg";
        debugMode && console.log("mapUrl:", mapUrl);
        var mapImg = new Image();
        mapImg.crossOrigin = "anonymous";
        $(mapImg).one("load", function (){
            var texture = new THREE.Texture( mapImg ); // or canvas //
            texture.name = "skeleton_map";
            texture.sourceFile = mapUrl;
            apply( texture );
            $(mapImg).remove();
        });

        mapImg.src = mapUrl;

        function apply( texture, i ){

            if (!asset) {
                onError( "body" ); 
                return;
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

            function onError( name ){
                var msg = "Outfit <b>" + name + "</b> have not been defined!";
                debugMode && console.error(msg);
                bootboxErrorAlert( msg ); 
            }

        }

    }).then(function(){

    //  Add avatar akeleton.
        localPlayer.outfit.add( {"body": Avatars[ "skeleton" ]} );
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


    function sceneAddOutfitSkeleton(){
        localPlayer.outfit.add( {"body": Avatars[ "skeleton" ]} );
        var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
        localPlayer.controller.direction = frontAngle;
        localPlayer.outfit.update();
        scene.add(localPlayer.outfit.direction);
    }


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
