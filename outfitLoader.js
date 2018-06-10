//  outfitLoader.js


    var scriptsFolder  = "/scripts/";
    var assetsFolder = "/models/skinned/";
    var texturesFolder = "/models/textures/";

    Avatars = {};

    var initOutfitAsset = initSkinnedAsset;

//  Convert a SkinnedMesh toJSON:
//  THREE.SkinnedMesh.toJSON = function(){
    //  0.  var bones = this.geometry.bones;        // get the bones.
    //  1.  var json = this.toJSON();               // simple mesh json.
    //  2.  json.object.children.length = 0;        // delete children bones.
    //  3.  json.geometries[0].data.bones = bones;  // add bones to geometry.
    //      json.geometries[0].data.skinIndices ??? // get from json file.
    //      json.geometries[0].data.skinWeights ??? // get from json file.
    //      json.geometries[0].data.morphNormals ?  // get from json file.
    //      json.geometries[0].data.morphTargets ?  // get from json file.
    //  4.  json.object.type = "Mesh"               // change type to "Mesh".
    //  return json;
//  }

//  SkinnedMeshLoader = function(){

//      this.parse = function(json){
//          var loader = new THREE.ObjectLoader();
//          var mesh = loader.parse(json);
//          var geometry = mesh.geometry;
//          var material = mesh.material;
//          mesh.materials.forEach( function ( material ) {
//              material.skinning = true;   // IMPORTANT //
//          });
//          var skinned = new THREE.SkinnedMesh(geometry, material)
//          skinned.frustumCulled = false;        // VERY IMPORTANT // 
//          skinned.position.set( 0, 0, 0 );
//          skinned.rotation.set( 0, 0, 0 ); 
//          skinned.scale.set( 1, 1, 1 );
//          skinned.renderDepth = 1;
//      
//          return skinned;
//      };
//
//      return this.loader;
//  }

    function toLocalStore( key, data ){
        if (!window.localStorage) return;
        return localStorage[key] = JSON.stringify(data);
    }

    function fromLocalStore( key ){
        if (!window.localStorage) return;
        if ( !localStorage[key] ) return;
        return JSON.parse( localStorage[key] );
    }

    function $getOutfit(options, loadTextures){
    
        var url  = options.url;
        var key  = options.key;
        var name = options.name;

        $.getJSON( url ).then(function(json){

            if (!json) throw Error("json did not defined");
            Avatars[ name ] = initOutfitAsset( json );
        //  Avatars[ name ].geometry.sourceFile = url; // IMPORTANT //
            return Avatars[ name ];

        }).then(function(asset){
            loadTextures( asset )
        }).fail(function(err){
            console.error(err);
        });

    }

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

    function applyTexture( asset, texture, map, index ){

        if (!asset) {
            var name = name || "asset";
            onError( name ); 
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
/*
    function sceneAddLocalPlayerBody( name ){

        localPlayer.outfit.add( {"body": Avatars[ name ]} );
        var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
        localPlayer.controller.direction = frontAngle;
        localPlayer.outfit.update();
        scene.add(localPlayer.outfit.direction);
        debugMode && console.log("Local player outfit body has added.");

    }
*/
    function initSkinnedAsset( json ){

        var loader = new THREE.JSONLoader();
        var object = loader.parse( json );

        object.materials.forEach( function ( material ) {
            material.skinning = true;     // IMPORTANT //
        }); 

        var material;
        if ( object.materials.length == 1 ) {
            material = object.materials[0];
            material.skinning = true;                                    // IMPORTANT //
        } else if ( object.materials.length > 1 ) {
            material = new THREE.MeshFaceMaterial(object.materials);
            for (var i=0; i < material.materials.length; i++){
                material.materials[i].skinning = true;                   // IMPORTANT //
            }
        } else {
            material = new THREE.MeshStandardMaterial({skinning:true});  // IMPORTANT //
        }
    
        var geometry = object.geometry;
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();
        geometry.name = json.name;

        var skinned = new THREE.SkinnedMesh( geometry, material );
        skinned.frustumCulled = false;        // VERY IMPORTANT // 
        skinned.position.set( 0, 0, 0 );
        skinned.rotation.set( 0, 0, 0 ); 
        skinned.scale.set( 1, 1, 1 );
        skinned.renderDepth = 1;
    
        return skinned;
    }

    function initMeshAsset( json ){

        var loader = new THREE.JSONLoader();
        var object = loader.parse( json );

        object.materials.forEach( function ( material ) {
            material.skinning = false;    // IMPORTANT //
        }); 

        var material;
        if ( object.materials.length == 1 ) {
            material = object.materials[0];
            material.skinning = false;                                    // IMPORTANT //
        } else if ( object.materials.length > 1 ) {
            material = new THREE.MeshFaceMaterial(object.materials);
            for (var i=0; i < material.materials.length; i++){
                material.materials[i].skinning = false;                   // IMPORTANT //
            }
        } else {
            material = new THREE.MeshStandardMaterial({skinning:false});  // IMPORTANT //
        }
    
        var geometry = object.geometry;
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();
        geometry.name = json.name;

        var mesh = new THREE.Mesh( geometry, material );
        mesh.frustumCulled = false;        // VERY IMPORTANT // 
        mesh.position.set( 0, 0, 0 );
        mesh.rotation.set( 0, 0, 0 ); 
        mesh.scale.set( 1, 1, 1 );
        mesh.renderDepth = 1;
    
        return mesh;
    }

    function imgurQualityUrl(options){

        if (!options.id) return "https://i.imgur.com/ODeftia.jpg";

        var dot    = ".";
        var ext    = options.ext || "jpg";
        var id     = options.id || "ODeftia";
        var q      = options.quality || "original";
        var imgur  = "https://i.imgur.com/";

        return imgur + imgurId( id, q ) + dot + ext;

    }

    function imgurId(id, quality){

        switch (quality) {

            case null:
            case undefined:
            case "original":
                break;
    
            case "small":
                id += "s";
                break;
    
            case "big":
                id += "b";
                break;
    
            case "thumb":
                id += "t";
                break;
    
            case "medium":
                id += "m";
                break;
    
            case "large":
                id += "l";
                break;

            case "huge":
                id += "h";
                break;

            default:
                id;
        }

        return id;
    }


    function makePowerOfTwo( image, natural ) {
        var canvas = document.createElement( "canvas" );

        if ( natural ){
            canvas.width = THREE.Math.nearestPowerOfTwo( image.naturalWidth );
            canvas.height = THREE.Math.nearestPowerOfTwo( image.naturalHeight );
        } else {
            canvas.width = THREE.Math.nearestPowerOfTwo( image.width );
            canvas.height = THREE.Math.nearestPowerOfTwo( image.height );
        }
        var context = canvas.getContext( "2d" );
        context.drawImage( image, 0, 0, canvas.width, canvas.height );

        debugMode && console.warn( "outfitLoader:makePowerOfTwo(img):", 
            "Image resized to:", canvas.width, "x", canvas.height, 
        );

        return canvas;
    }

    function getAvatarAssetPromise( url, name ){
        debugMode && console.log("DEPRECTED:", 
            "getAvatarAssetPromise(url, name) is deprecated.",
            "Use instead $.getJSON( url ).then(function( asset ){});" 
        );
        return new Promise( function( resolve, reject ){
            $.getJSON( url, function(json){
            //  debugMode && console.log("json:", json);
                Avatars[ name ] = initOutfitAsset( json );
            //  debugMode && console.log( name, Avatars[ name ] );
                resolve( Avatars[ name ] );
            });
        });

    }







