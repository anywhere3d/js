//  outfitLoader.js

/*!
* @author anywhere3d
* http://anywhere3d.org
* MIT License
*/

    Avatars = {};

    function initOutfitAsset( json ){

        var loader = new THREE.JSONLoader();
        var object = loader.parse( json );

        object.materials.forEach( function ( material ) {
            material.skinning = true;
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














