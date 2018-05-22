//  femaleLoader.js

    var debugMode;

    var scriptsFolder  = "/scripts/";
    var assetsFolder = "/models/assets/";
    var texturesFolder = "/models/textures/";

//  Female Body.

    var fmBodyAsset      = assetsFolder + "HF_BodyLayer_ABK04_v02.js";
    var fmHairsAsset     = assetsFolder + "HF_HairsMedium_FBK04_v02.js";
    var fmBraAsset       = assetsFolder + "HF_BraLayer_FBK05_v01.js";
    var fmPantiesAsset   = assetsFolder + "HF_PantiesLayer_FBK05_v01.js";
    var fmDressAsset     = assetsFolder + "HF_Dress_FBK05_v03.js";
    var fmTailDressAsset = assetsFolder + "HF_LongTailDress_FBK05_v03.js";
    var fmTshirt1Asset   = assetsFolder + "HF_Tshirt_FBK05_v01.js";
    var fmTshirt3Asset   = assetsFolder + "HF_Tshirt_FBK05_v03.js";
    var fmSkirtAsset     = assetsFolder + "HF_Skirt_FBK05_v02.js";
    var fmTrousersAsset  = assetsFolder + "HF_Trousers_FBK05_v02.js";
    var fmSneakersAsset  = assetsFolder + "HF_SneakersShoes_ABK04_v01.js";
    var fmSandalAsset    = assetsFolder + "HF_SandalShoes_ABK06_v02.js";

    /*  imgur Urls and ids are IMPORTANT now on */

//    var eyesUrl = assetsFolder + "female/textures/HF_Eyes.jpg";
//    var skinDiffUrl = assetsFolder + "female/textures/HF_Skin_Dark.jpg";
//    var skinEmissUrl = assetsFolder + "female/textures/HF_Skin_Mid.jpg";
//    var hairsUrl = assetsFolder + "hairs/textures/HAIR133.png";
//    var sandalShoesUrl = texturesFolder + "wooden_roses.jpg";

//  --------------------------------------------------------------------------------------  //

//  Female Body.

    $.getJSON( fmBodyAsset ).then(function(json){

        var name = "fmBody";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

    //  Female body map.

        var skinMapId = "pRYCYkb";
        var skinMapName = "HF_Skin_SemiDark_v1";
        var skinMapUrl = imgurQualityUrl(skinMapId, "jpg");
        debugMode && console.log("skinMapUrl:", skinMapUrl);
    //  var skinMapUrl = "https://i.imgur.com/pRYCYkb.jpg";
        var skinMapImg = new Image();
        skinMapImg.crossOrigin = "anonymous";
        $(skinMapImg).one("load", function(){
            var texture = new THREE.Texture( skinMapImg );
            texture.name = "HF_Skin_SemiDark_v1";
            texture.sourceFile = skinMapUrl;
            asset.material.materials[0].metalness = 0;
            asset.material.materials[0].roughness = 0.6;
            asset.material.materials[0].displacementBias = 0;
            asset.material.materials[0].displacementScale = 0;
            asset.material.materials[0].color.setHex(0xffffff);
            apply( texture, "map", 0 );
            $(skinMapImg).remove();
        });

        skinMapImg.src = skinMapUrl;

    //  Female body emissive map.

        var skinEmissId = "jc8chBX";
        var skinEmissName = "HF_Skin_Mid";
        var skinEmissUrl = imgurQualityUrl(skinEmissId, "jpg");
        debugMode && console.log("skinEmissUrl:", skinEmissUrl);
    //  var skinEmissUrl = "https://i.imgur.com/jc8chBX.jpg";
        var skinEmissImg = new Image();
        skinEmissImg.crossOrigin = "anonymous";
        $(skinEmissImg).one("load", function(){
            var texture = new THREE.Texture( skinEmissImg );
            texture.name = "HF_Skin_Mid";
            texture.sourceFile = skinEmissUrl;
            asset.material.materials[0].emissive.setHex(0xababab);
            apply( texture, "emissiveMap", 0 );
            $(skinEmissImg).remove();
        });

        skinEmissImg.src = skinEmissUrl;

    //  Female eyes emissive map.

        var eyesEmissId = "Si5QWl0";
        var eyesEmissName = "HF_Eyes";
        var eyesEmissUrl = imgurQualityUrl(eyesEmissId, "png");
        debugMode && console.log("eyesEmissUrl:", eyesEmissUrl);
    //  var eyesEmissUrl = "https://i.imgur.com/Si5QWl0.png";
        var eyesEmissImg = new Image();
        eyesEmissImg.crossOrigin = "anonymous";
        $(eyesEmissImg).one("load", function(){
            var texture = new THREE.Texture( eyesEmissImg );
            texture.name = "HF_Eyes";
            texture.sourceFile = eyesEmissUrl;
            asset.material.materials[1].bumpScale = 0;
            asset.material.materials[1].displacementBias = 0;
            asset.material.materials[1].displacementScale = 0;
            asset.material.materials[1].color.setHex(0xffffff);
            asset.material.materials[1].emissive.setHex(0x8d8d8d);
            apply( texture, "map", 1 );
            apply( texture, "emissiveMap", 1 );
            $(eyesEmissImg).remove();
        });

        eyesEmissImg.src = eyesEmissUrl;

        function apply( texture, map, index ){

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
    });

//  --------------------------------------------------------------------------------------  //

//  Female Hairs.

    $.getJSON( fmHairsAsset ).then(function(json){

        var name = "fmHairsMedium";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

        var hairsMapId = "DwdWLrb";
        var hairsMapName = "HF_Hairs";
        var hairsMapUrl = imgurQualityUrl(hairsMapId, "png");
        debugMode && console.log("hairsMapUrl:", hairsMapUrl);
    //  var hairsMapUrl = "https://i.imgur.com/DwdWLrb.png";
        var hairsMapImg = new Image();
        hairsMapImg.crossOrigin = "anonymous";
        $(hairsMapImg).one("load", function(){
            var texture = new THREE.Texture( hairsMapImg );
            texture.name = "HF_Hairs";
            texture.sourceFile = hairsMapUrl;
            asset.material.bumpScale = 0.05;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.color.setHex(0xffffff);
            apply( texture, "map");
            apply( texture, "bumpMap");
            $(hairsMapImg).remove();
        });

        hairsMapImg.src = hairsMapUrl;

        function apply( texture, map, index ){

            if (!asset) {
                onError( "hairs" ); 
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

    });

//  --------------------------------------------------------------------------------------  //

//  Female Dress.

    $.getJSON( fmDressAsset ).then(function(json){

        var name = "fmDress";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

        var dressMapId = "Gl5NqHY";
        var dressMapName = "HF_Dress";
        var dressMapUrl = imgurQualityUrl(dressMapId, "png");
        debugMode && console.log("dressMapUrl:", dressMapUrl);
    //  var dressMapUrl = "https://i.imgur.com/Gl5NqHY.png";
        var dressMapImg = new Image();
        dressMapImg.crossOrigin = "anonymous";
        $(dressMapImg).one("load", function(){
            var texture = new THREE.Texture( dressMapImg );
            texture.name = "HF_Dress";
            texture.sourceFile = dressMapUrl;
            asset.material.bumpScale = -0.05;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.transparent = true;
            asset.material.color.setHex(0xffffff);
            apply( texture, "map");
            apply( texture, "bumpMap");
            $(dressMapImg).remove();
        });

        dressMapImg.src = dressMapUrl;

        function apply( texture, map, index ){

            if (!asset) {
                onError( "dress" ); 
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

    });

//  --------------------------------------------------------------------------------------  //

//  Female Tail Dress.

    $.getJSON( fmTailDressAsset ).then(function(json){

        var name = "fmTailDress";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

        var tailDressId = "LtN1F8y";
        var tailDressName = "HF_LongTailDress";
        var tailDressUrl = imgurQualityUrl(tailDressId, "png");
        debugMode && console.log("tailDressUrl:", tailDressUrl);
    //  var tailDressUrl = "https://i.imgur.com/LtN1F8y.png";
        var tailDressImg = new Image();
        tailDressImg.crossOrigin = "anonymous";
        $(tailDressImg).one("load", function(){
            var texture = new THREE.Texture( tailDressImg );
            texture.name = "HF_LongTailDress";
            texture.sourceFile = tailDressUrl;
            asset.material.bumpScale = 0.05;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.color.setHex(0xffffff);
            apply( texture, "map");
            apply( texture, "bumpMap");
            $(tailDressImg).remove();
        });

        tailDressImg.src = tailDressUrl;

        function apply( texture, map, index ){

            if (!asset) {
                onError( "tail dress" ); 
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

    });

//  --------------------------------------------------------------------------------------  //

//  Female Sandal shoes.

    $.getJSON( fmSandalAsset ).then(function(json){

        var name = "fmSandal";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

        var sandalShoesId = "tjNZqbq";
        var sandalShoesName = "HF_SandalShoes";
        var sandalShoesUrl = imgurQualityUrl(sandalShoesId, "jpg");
        debugMode && console.log("sandalShoesUrl:", sandalShoesUrl);
    //  var sandalShoesUrl = "https://i.imgur.com/tjNZqbq.jpg";
        var sandalShoesImg = new Image();
        sandalShoesImg.crossOrigin = "anonymous";
        $(sandalShoesImg).one("load", function(){
            var texture = new THREE.Texture( sandalShoesImg );
            texture.name = "HF_SandalShoes";
            texture.sourceFile = sandalShoesUrl;
            asset.material.bumpScale = 0.05;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.color.setHex(0xffffff);
            apply( texture, "map");
            apply( texture, "bumpMap");
            $(sandalShoesImg).remove();
        });

        sandalShoesImg.src = sandalShoesUrl;

        function apply( texture, map, index ){

            if (!asset) {
                onError( "sandal shoes" ); 
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

    });

//  --------------------------------------------------------------------------------------  //

//  Female Tshirt v1.

    $.getJSON( fmTshirt1Asset ).then(function(json){

        var name = "fmTshirt";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

    //  var tshirtUrl = "https://i.imgur.com/PdjMvia.png";
        var tshirtId = "4TemDBo";
        var tshirtName = "HF_Tshirt";
        var tshirtUrl = imgurQualityUrl(tshirtId, "png");
        debugMode && console.log("tshirtUrl:", tshirtUrl);
    //  var tshirtUrl = "https://i.imgur.com/4TemDBo.png";
        var tshirtImg = new Image();
        tshirtImg.crossOrigin = "anonymous";
        $(tshirtImg).one("load", function(){
            var texture = new THREE.Texture( tshirtImg );
            texture.name = "HF_Tshirt";
            texture.sourceFile = tshirtUrl;
            asset.material.bumpScale = 0.05;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.color.setHex(0xffffff);
            apply( texture, "map");
            apply( texture, "bumpMap");
            $(tshirtImg).remove();
        });

        tshirtImg.src = tshirtUrl;

        function apply( texture, map, index ){

            if (!asset) {
                onError( "tshirt" ); 
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

    });

//  --------------------------------------------------------------------------------------  //

//  Female Tshirt v3 (front).

    $.getJSON( fmTshirt3Asset ).then(function(json){

        var name = "fmTshirtFront";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

    //  Tshirt material.

    //  var tshirtUrl = "https://i.imgur.com/PdjMvia.png";
        var tshirtId = "4TemDBo";
        var tshirtName = "HF_Tshirt";
        var tshirtUrl = imgurQualityUrl(tshirtId, "png");
        debugMode && console.log("tshirtUrl:", tshirtUrl);
    //  var tshirtUrl = "https://i.imgur.com/4TemDBo.png";
        var tshirtImg = new Image();
        tshirtImg.crossOrigin = "anonymous";
        $(tshirtImg).one("load", function(){
            var texture = new THREE.Texture( tshirtImg );
            texture.name = "HF_Tshirt";
            texture.sourceFile = tshirtUrl;
            asset.material.materials[0].bumpScale = 0.05;
            asset.material.materials[0].displacementBias = 0;
            asset.material.materials[0].displacementScale = 0;
            asset.material.materials[0].color.setHex(0xffffff);
            apply( texture, "map", 0);
            apply( texture, "bumpMap", 0);
            $(tshirtImg).remove();
        });

        tshirtImg.src = tshirtUrl;

    //  Tshirt Front material.

        var tshirtFrontId = "i1ZaSpC";
        var tshirtFrontName = "HF_TshirtFront";
        var tshirtFrontUrl = imgurQualityUrl(tshirtFrontId, "jpg");
        debugMode && console.log("tshirtFrontUrl:", tshirtFrontUrl);
    //  var tshirtFrontUrl = "https://i.imgur.com/i1ZaSpC.jpg";
        var tshirtFrontImg = new Image();
        tshirtFrontImg.crossOrigin = "anonymous";
        $(tshirtFrontImg).one("load", function(){
            var texture = new THREE.Texture( tshirtFrontImg );
            texture.name = "HF_TshirtFront";
            texture.sourceFile = tshirtFrontUrl;
            asset.material.materials[1].bumpScale = -0.01;
            asset.material.materials[1].displacementBias = 0;
            asset.material.materials[1].displacementScale = 0;
            asset.material.materials[1].color.setHex(0xffffff);
            apply( texture, "map", 1);
            apply( texture, "bumpMap", 1);
            $(tshirtFrontImg).remove();
        });

        tshirtFrontImg.src = tshirtFrontUrl;

        function apply( texture, map, index ){

            if (!asset) {
                onError( "tshirt front" ); 
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

    });

//  --------------------------------------------------------------------------------------  //

//  Female trousers.

    $.getJSON( fmTrousersAsset ).then(function(json){

        var name = "fmTrousers";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

    //  var url = "https://i.imgur.com/PdjMvia.png";
    //  var url = "https://i.imgur.com/ejSGU9j.png"; // zebra   //
        var trousersId = "E9YKax0";
        var trousersName = "HF_Trousers";
        var trousersUrl = imgurQualityUrl(trousersId, "jpg");
        debugMode && console.log("trousersUrl:", trousersUrl);
    //  var url = "https://i.imgur.com/E9YKax0.jpg"; // folklore //
        var trousersImg = new Image();
        trousersImg.crossOrigin = "anonymous";
        $(trousersImg).one("load", function(){
            var texture = new THREE.Texture( trousersImg );
            texture.name = "HF_Trousers";
            texture.sourceFile = trousersUrl;
            asset.material.bumpScale = -0.01;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.color.setHex(0xffffff);
            apply( texture, "map");
            apply( texture, "bumpMap");
            $(trousersImg).remove();
        });

        trousersImg.src = trousersUrl;

        function apply( texture, map, index ){

            if (!asset) {
                onError( "tshirt front" ); 
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

    });

//  --------------------------------------------------------------------------------------  //

//  Female Bra Layer.

    $.getJSON( fmBraAsset ).then(function(json){

        var name = "fmBra";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

        var braLayerId = "vKKf5bJ";
        var braLayerName = "HF_BraLayer";
        var braLayerUrl = imgurQualityUrl(braLayerId, "png");
        debugMode && console.log("braLayerUrl:", braLayerUrl);
    //  var braLayerUrl = "https://i.imgur.com/vKKf5bJ.png";
        var braLayerImg = new Image();
        braLayerImg.crossOrigin = "anonymous";
        $(braLayerImg).one("load", function(){
            var texture = new THREE.Texture( braLayerImg );
            texture.name = "HF_BraLayer";
            texture.sourceFile = braLayerUrl;
            asset.material.bumpScale = 0.05;
            asset.material.transparent = true;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.color.setHex(0xffffff);
            apply( texture, "map");
            apply( texture, "bumpMap");
            $(braLayerImg).remove();
        });

        braLayerImg.src = braLayerUrl;

        function apply( texture, map, index ){

            if (!asset) {
                onError( "tshirt front" ); 
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

    });

//  --------------------------------------------------------------------------------------  //

//  Female Panties Layer.

    $.getJSON( fmPantiesAsset ).then(function(json){

        var name = "fmPanties";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

        var pantiesLayerId = "QEcWAOK";
        var pantiesLayerName = "HF_PantiesLayer";
        var pantiesLayerUrl = imgurQualityUrl(pantiesLayerId, "png");
        debugMode && console.log("pantiesLayerUrl:", pantiesLayerUrl);
    //  var pantiesLayerUrl = "https://i.imgur.com/QEcWAOK.png";
        var pantiesLayerImg = new Image();
        pantiesLayerImg.crossOrigin = "anonymous";
        $(pantiesLayerImg).one("load", function(){
            var texture = new THREE.Texture( pantiesLayerImg );
            texture.name = "HF_PantiesLayer";
            texture.sourceFile = pantiesLayerUrl;
            asset.material.bumpScale = 0.05;
            asset.material.transparent = true;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.color.setHex(0xffffff);
            apply( texture, "map");
            apply( texture, "bumpMap");
            $(pantiesLayerImg).remove();
        });

        pantiesLayerImg.src = pantiesLayerUrl;

        function apply( texture, map, index ){

            if (!asset) {
                onError( "tshirt front" ); 
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

    });

//  --------------------------------------------------------------------------------------  //

//  Female Skirt.

    $.getJSON( fmSkirtAsset ).then(function(json){

        var name = "fmSkirt";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

        var skirtId = "8sNMbmV";
        var skirtName = "HF_Skirt";
        var skirtUrl = imgurQualityUrl(skirtId, "jpg");
        debugMode && console.log("skirtUrl:", skirtUrl);
    //  var skirtUrl = "https://i.imgur.com/8sNMbmV.jpg";
        var SkirtImg = new Image();
        SkirtImg.crossOrigin = "anonymous";
        $(SkirtImg).one("load", function(){
            var texture = new THREE.Texture( SkirtImg );
            texture.name = "HF_Skirt";
            texture.sourceFile = skirtUrl;
            asset.material.bumpScale = 0.05;
            asset.material.transparent = false;
            asset.material.displacementBias = 0;
            asset.material.displacementScale = 0;
            asset.material.color.setHex(0xffffff);
            apply( texture, "map");
            apply( texture, "bumpMap");
            $(SkirtImg).remove();
        });

        SkirtImg.src = skirtUrl;
        function apply( texture, map, index ){

            if (!asset) {
                onError( "tshirt front" ); 
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

    });

//  --------------------------------------------------------------------------------------  //

//  Female Sneakers shoes.

    $.getJSON( fmSneakersAsset ).then(function(json){

        var name = "fmSneakers";
        Avatars[ name ] = initOutfitAsset( json );
        return Avatars[ name ];

    }).then( function(asset){

    //  imgur Urls and ids are IMPORTANT now on //

    });

//  --------------------------------------------------------------------------------------  //
