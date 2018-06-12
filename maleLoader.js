//  maleLoader.js

    var debugMode;

    console.warn("DEPRECATED:", "'maleLoader.js' is deprecated.");

//    var scriptsFolder  = "/scripts/";
//    var assetsFolder   = "/models/assets/";
//    var texturesFolder = "/models/textures/";

    var hmBodyAsset     = assetsFolder + "HM_BodyLayer_ABK04_v02.js";
    var hmHairsAsset    = assetsFolder + "HM_HairsMedium_MBK04_v01.js";
    var hmBoxersAsset   = assetsFolder + "HM_BoxersLayer_MBK04_v01.js";
    var hmTshirtAsset   = assetsFolder + "HM_Tshirt_MBK05_v01.js";
    var hmTrousersAsset = assetsFolder + "HM_Trousers_MBK04_v01.js";
    var hmSneakersAsset = assetsFolder + "HM_SneakersShoes_ABK04_v01.js";

//  --------------------------------------------------------------------------------------  //

//  Male body loader.js

    $.getJSON( hmBodyAsset ).then(function(json){

        var name = "hmBody";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

    //  Male body map.

        var skinMapId = "mAZgsw8";
        var skinMapName = "HM_Skin_Dark";
        var skinMapUrl = imgurQualityUrl(skinMapId, "jpg");
        debugMode && console.log("male skinMapUrl:", skinMapUrl);
    //  var skinMapUrl = "https://i.imgur.com/mAZgsw8.jpg";
        var skinMapImg = new Image();
        skinMapImg.crossOrigin = "anonymous";
        $(skinMapImg).one("load", function(){
            var texture = new THREE.Texture( skinMapImg );
            texture.name = skinMapName;
            texture.sourceFile = skinMapUrl;
            asset.material.materials[0].metalness = 0;
            asset.material.materials[0].roughness = 0.5;
            asset.material.materials[0].displacementBias = 0;
            asset.material.materials[0].displacementScale = 0;
            asset.material.materials[0].color.setHex(0xffffff);
            applyTexture( asset, texture, "map", 0 );
            $(skinMapImg).remove();
        });

        skinMapImg.src = skinMapUrl;

    //  Male body emissive map.

        var skinEmissId = "4h9rLSg";
        var skinEmissName = "HM_Skin_Mid";
        var skinEmissUrl = imgurQualityUrl(skinEmissId, "jpg");
        debugMode && console.log("male skinEmissUrl:", skinEmissUrl);
    //  var skinEmissUrl = "https://i.imgur.com/4h9rLSg.jpg";
        var skinEmissImg = new Image();
        skinEmissImg.crossOrigin = "anonymous";
        $(skinEmissImg).one("load", function(){
            var texture = new THREE.Texture( skinEmissImg );
            texture.name = skinEmissName;
            texture.sourceFile = skinEmissUrl;
            asset.material.materials[0].emissive.setHex(0xababab);
            applyTexture( asset, texture, "emissiveMap", 0 );
            $(skinEmissImg).remove();
        });

        skinEmissImg.src = skinEmissUrl;

    //  Male body normal map.

        var skinNrmId = "V6MSKOT";
        var skinNrmName = "HM_Skin_Nrm";
        var skinNrmUrl = imgurQualityUrl(skinNrmId, "jpg");
        debugMode && console.log("male skinNrmUrl:", skinNrmUrl);
    //  var skinEmissUrl = "https://i.imgur.com/V6MSKOT.jpg";
        var skinNrmImg = new Image();
        skinNrmImg.crossOrigin = "anonymous";
        $(skinNrmImg).one("load", function(){
            var texture = new THREE.Texture( skinNrmImg );
            texture.name = skinNrmName;
            texture.sourceFile = skinNrmUrl;
            asset.material.materials[0].normalScale.x = 4;
            asset.material.materials[0].normalScale.y = 2;
            applyTexture( asset, texture, "normalMap", 0 );
            $(skinNrmImg).remove();
        });

        skinNrmImg.src = skinNrmUrl;

    //  Male eyes emissive map.

        var eyesEmissId = "VybEXWo";
        var eyesEmissName = "HM_Eyes";
        var eyesEmissUrl = imgurQualityUrl(eyesEmissId, "png");
        debugMode && console.log("male eyesEmissUrl:", eyesEmissUrl);
    //  var eyesEmissUrl = "https://i.imgur.com/VybEXWo.png";
        var eyesEmissImg = new Image();
        eyesEmissImg.crossOrigin = "anonymous";
        $(eyesEmissImg).one("load", function(){
            var texture = new THREE.Texture( eyesEmissImg );
            texture.name = eyesEmissName;
            texture.sourceFile = eyesEmissUrl;
            asset.material.materials[1].bumpScale = 0;
            asset.material.materials[1].displacementBias = 0;
            asset.material.materials[1].displacementScale = 0;
            asset.material.materials[1].color.setHex(0xffffff);
            asset.material.materials[1].emissive.setHex(0x8d8d8d);
            applyTexture( asset, texture, "map", 1 );
            applyTexture( asset, texture, "emissiveMap", 1 );
            $(eyesEmissImg).remove();
        });

        eyesEmissImg.src = eyesEmissUrl;

    });

//  --------------------------------------------------------------------------------------  //

//  Male hairs loader.js

    $.getJSON( hmHairsAsset ).then(function(json){

        var name = "hmHairs";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

        var hairsMapId = "vej91Wb";
        var hairsMapName = "HM_Hairs";
        var hairsMapUrl = imgurQualityUrl(hairsMapId, "png");
        debugMode && console.log("male hairsMapUrl:", hairsMapUrl);
    //  var hairsMapUrl = "https://i.imgur.com/vej91Wb.png";
        var hairsMapImg = new Image();
        hairsMapImg.crossOrigin = "anonymous";
        $(hairsMapImg).one("load", function(){
            var texture = new THREE.Texture( hairsMapImg );
            texture.name = hairsMapName;
            texture.sourceFile = hairsMapUrl;
            asset.material.bumpScale = 0.05;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.color.setHex(0xffffff);
            applyTexture( asset, texture, "map");
            applyTexture( asset, texture, "bumpMap");
            $(hairsMapImg).remove();
        });

        hairsMapImg.src = hairsMapUrl;

    });

//  --------------------------------------------------------------------------------------  //

//  Male boxers loader.js

    $.getJSON( hmBoxersAsset ).then(function(json){

        var name = "hmBoxers";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

        var boxersMapId = "aG9Sd8q";
        var boxersMapName = "HM_Boxers";
        var boxersMapUrl = imgurQualityUrl(boxersMapId, "png");
        debugMode && console.log("male boxersMapUrl:", boxersMapUrl);
    //  var boxersMapUrl = "https://i.imgur.com/aG9Sd8q.png";
        var boxersMapImg = new Image();
        boxersMapImg.crossOrigin = "anonymous";
        $(boxersMapImg).one("load", function(){
            var texture = new THREE.Texture( boxersMapImg );
            texture.name = boxersMapName;
            texture.sourceFile = boxersMapUrl;
            asset.material.metalness = 0;
            asset.material.roughness = 0.5;
            asset.material.bumpScale = -0.05;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.color.setHex(0xffffff);
            applyTexture( asset, texture, "map");
            applyTexture( asset, texture, "bumpMap");
            $(boxersMapImg).remove();
        });

        boxersMapImg.src = boxersMapUrl;

    });

//  --------------------------------------------------------------------------------------  //

//  Male tshirt loader.js

    $.getJSON( hmTshirtAsset ).then(function(json){

        var name = "hmTshirt";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

    //  var tshirtUrl = "https://i.imgur.com/PdjMvia.png";
        var tshirtId = "4TemDBo";
        var tshirtName = "HM_Tshirt";
        var tshirtUrl = imgurQualityUrl(tshirtId, "png");
        debugMode && console.log("male tshirtUrl:", tshirtUrl);
    //  var tshirtUrl = "https://i.imgur.com/4TemDBo.png";
        var tshirtImg = new Image();
        tshirtImg.crossOrigin = "anonymous";
        $(tshirtImg).one("load", function(){
            var texture = new THREE.Texture( tshirtImg );
            texture.name = tshirtName;
            texture.sourceFile = tshirtUrl;
            asset.material.materials[0].bumpScale = 0.05;
            asset.material.materials[0].displacementBias = 0;
            asset.material.materials[0].displacementScale = 0;
            asset.material.materials[0].color.setHex(0x000000);
            applyTexture( asset, texture, "map", 0);
            applyTexture( asset, texture, "bumpMap", 0);
            $(tshirtImg).remove();
        });

        tshirtImg.src = tshirtUrl;

    //  Tshirt Front material.

        var tshirtFrontId = "ihYtRLw";
        var tshirtFrontName = "HM_TshirtFront";
        var tshirtFrontUrl = imgurQualityUrl(tshirtFrontId, "png");
        debugMode && console.log("male tshirtFrontUrl:", tshirtFrontUrl);
    //  var tshirtFrontUrl = "https://i.imgur.com/ihYtRLw.png";
        var tshirtFrontImg = new Image();
        tshirtFrontImg.crossOrigin = "anonymous";
        $(tshirtFrontImg).one("load", function(){
            var texture = new THREE.Texture( tshirtFrontImg );
            texture.name = tshirtFrontName;
            texture.sourceFile = tshirtFrontUrl;
            asset.material.materials[1].bumpScale = -0.01;
            asset.material.materials[1].displacementBias = 0;
            asset.material.materials[1].displacementScale = 0;
            asset.material.materials[1].color.setHex(0x000000);
            asset.material.materials[1].emissive.setHex(0xffffff);
       //   applyTexture( asset, texture, "map", 1);
            applyTexture( asset, texture, "bumpMap", 1);
            applyTexture( asset, texture, "emissiveMap", 1);
            $(tshirtFrontImg).remove();
        });

        tshirtFrontImg.src = tshirtFrontUrl;

    });

//  --------------------------------------------------------------------------------------  //

//  Male trousers loader.js

    $.getJSON( hmTrousersAsset ).then(function(json){

        var name = "hmTrousers";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

        var trousersId = "ejSGU9j";
        var trousersName = "HM_Trousers";
        var trousersUrl = imgurQualityUrl(trousersId, "jpg");
        debugMode && console.log("male trousersUrl:", trousersUrl);
    //  var url = "https://i.imgur.com/ejSGU9j.png"; // zebra   //
        var trousersImg = new Image();
        trousersImg.crossOrigin = "anonymous";
        $(trousersImg).one("load", function(){
            var texture = new THREE.Texture( trousersImg );
            texture.name = trousersName;
            texture.sourceFile = trousersUrl;
            asset.material.bumpScale = -0.01;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.color.setHex(0xffffff);
            applyTexture( asset, texture, "map");
            applyTexture( asset, texture, "bumpMap");
            $(trousersImg).remove();
        });

        trousersImg.src = trousersUrl;

    });

//  --------------------------------------------------------------------------------------  //

//  Male sneakers shoes loader.js

    $.getJSON( hmSneakersAsset ).then(function(json){

        var name = "hmSneakers";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

    });

//  --------------------------------------------------------------------------------------  //

/*
    function applyTexture( asset, texture, map, index ){

        if (!asset) {
            onError( "body" ); 
            return;
        }

        if ( !!asset.material.materials && ( index != null && !isNaN(index) ) ) {

            asset.material.materials[index][map] = texture;
            asset.material.materials[index][map].needsUpdate = true;
            asset.material.materials[index].needsUpdate = true;

        } else {

            asset.material[map] = texture;
            asset.material[map].needsUpdate = true;
            asset.material.needsUpdate = true;
        }

        function onError( name ){
            var msg = "Outfit <b>" + name + "</b> have not been defined!";
            debugMode && console.error(msg);
            try { bootboxErrorAlert( msg ); } catch(err){ alert(msg); }
        }
    }
*/





















