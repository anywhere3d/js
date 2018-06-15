//  AW3D.js

    var debugMode;

/*!
* @author anywhere3d
* http://anywhere3d.org
* MIT License
*/

    var AW3D = { VERSION: '0.2.0' };

//  Player Holder.
    AW3D.PlayerHolder = function (){
        var holder = new THREE.Object3D();
        holder.position.set( 0, 1, 0 ); // startPoint.
        holder.name = "PLAYER_HOLDER";
        return holder;
    }

//  Player Holder Helper.
    AW3D.PlayerHolderHelper = function (){
        var helper = new THREE.BoxHelper();
        helper.name = "PLAYER_HOLDER_HELPER";
        helper.visible = debugMode || false;
        return helper;
    }

//  Player Controller Direction pointer.
    AW3D.DirectionPointer = function (){
        var geometry = new THREE.CylinderGeometry( 0, 1, 20, 12 );
        geometry.rotateX( Math.PI / 2 );  //  BE CAREFULL: is not "mesh.rotation.y = -Math.PI". //
        var material = new THREE.MeshStandardMaterial({color:0x00ff00});
        var pointer = new THREE.Mesh(geometry, material);
        pointer.position.set(0, 15, 0);
        pointer.name = "PLAYER_DIRECTION";
        pointer.visible = debugMode || false;
        return pointer;
    }

//  Player Sphere.
    AW3D.PlayerSphere = function (){
        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry( 15, 8, 4 ),
            new THREE.MeshBasicMaterial( { color: 0xff0000,  wireframe: true} )
        ); 
        sphere.position.y = 12.5;
        sphere.name = "PLAYER_SPHERE";
        sphere.visible = debugMode || false;
        return sphere;
    }

//  Player pointer.
    AW3D.PlayerPointer = function (){
        var geometry = new THREE.CylinderGeometry( 0, 1, 20, 12 );
        geometry.rotateX( Math.PI / 2 );  //  BE CAREFULL: is not "mesh.rotation.y = -Math.PI". //
        var material = new THREE.MeshNormalMaterial();
        var pointer = new THREE.Mesh(geometry, material);
        pointer.position.set(0, 40, 0);
        pointer.name = "PLAYER_POINTER";
        pointer.visible = debugMode || false;
        return pointer;
    }



//  AW3D.Outfit.js

/*!
* @author anywhere3d
* http://anywhere3d.org
* MIT License
*/

    AW3D.Outfit = function( player ){
        
        var player = player || localPlayer;

        var outfit = {
    
            direction: new THREE.Object3D(),
        
        //  If outfits are children of direction we do not need 
        //  updatePosition() or updateRotation(). Just use outfit.update() [direction].
        
            update: function(){
            
            //  var self = this;

            //  Update avatar rotation y.

                var direction = player.controller.direction - Math.PI;

                this.direction.rotation.y = direction;

            //  Update avatar position.

                var x = player.controller.center.x;
                var y = player.controller.center.y - player.controller.radius;
                var z = player.controller.center.z;
                
            //  var position = new THREE.Vector3(x, y, z);
            //  this.direction.position.copy( position );

                this.direction.position.set( x, y, z );
            },

            

        //  Update avatar position.

            updatePosition: function(){
                
                console.warn("DEPRECATED:", 
                    "outfit.updatePosition() is deprecated.", 
                    "Use outfit.update() instead." );

                this.update();
            },


        //  Update avatar rotation.
        
            updateRotation: function( y ){

                console.warn("DEPRECATED:", 
                    "outfit.updateRotation(y) is deprecated.", 
                    "Use outfit.update() instead." );

                this.update();
            },


            addToScene: function(name, asset){

                console.warn("DEPRECATED", 
                    "outfit.addToScene(name, asset) is deprecated.", 
                    "Use outfit.direction.add(asset) instead." );

                if ( !name || name == null || !asset ) return;
                this[ name ] = asset.clone();
                this.direction.add( this[ name ] );
                this.AnimationsHandler.refresh();

            },


            addsToScene: function(){

                console.warn("DEPRECATED:", 
                    "outfit.addsToScene() is deprecated.", 
                    "Use native threejs add() function.",
                    "e.g. outfit.direction.add(arg1, arg2, ..., argN) instead." );

                for (var i in arguments){
                    var name = Object.keys(arguments[i])[0];
                    var asset = Object.values(arguments[i])[0];
                    if ( !name || name == null || !asset ) continue;
                    this[ name ] = asset.clone();
                    this.direction.add( this[ name ] );
                }

                this.AnimationsHandler.refresh();

            },


            set: function(){

            //  Object style argument: "{name: asset}".
            //  debugMode && console.log("outfit.set(arguments):", arguments);

                for (var i in arguments){

                    var name = Object.keys(arguments[i])[0];
                    var asset = Object.values(arguments[i])[0];
                //  debugMode && console.log(name + ":", asset);

                    if ( !name || name == null || !asset ) continue;
                    if (!!this[ name ]) this.remove( name );

                    this[ name ] = asset.clone();
                }

                this.AnimationsHandler.refresh();

            },

            add: function(){

            //  Object style argument: "{name: asset}".
            //  debugMode && console.log("outfit.add(arguments):", arguments);

            //  TODO: outfit.add([]) to exept also an array of arguments???.

                for (var i in arguments) {
                    
                    var name = Object.keys(arguments[i])[0];
                    var asset = Object.values(arguments[i])[0];
                //  debugMode && console.log(name + ":", asset);

                    if ( !name || name == null || !asset ) continue;
                    if (!!this[ name ]) this.remove( name );

                    this[ name ] = asset.clone();
                    this.direction.add( this[ name ] );
                }

                this.AnimationsHandler.refresh(); 

            },

        //  scene.remove() always returns "undefined" (does not throw error).

            remove: function(){

                if ( arguments.length == 0 ) return;
                
                var self = this;

                for (var i in arguments){
                    var name = arguments[i];
                    self.direction.remove( self[ name ] );

                //  Dispose geometry.
                //      self[ name ].geometry.dispose();
                //  Dispose materials.
                //  if ( !!self[ name ].material.materials ){
                //      self[ name ].material.materials.forEach(function(material){
                //  TODO: Dispose textures.
                //          material.dispose();
                //      });
                //  } else {
                //      self[ name ].material.dispose();
                //  }

                    self[ name ] = null;
                    delete self[ name ];
                }

                this.AnimationsHandler.refresh();

            },

            removeFromScene: function(){

                var self = this;

                if ( arguments.length == 0 ) {

                //  "aparts" has renamed to "outfits".
                    self.outfits.forEach( function( name ){
                        self.remove( name );
                    });

                } else {

                    for (var i in arguments){
                        self.remove( name );
                    }
                }
    
                this.AnimationsHandler.refresh();

            },


            removeTexture: function( outfit, map, index ){
            //  outfit: outfit name from outfits (e.g "body", "hair", "dress", etc.)
            //  map   : material map name (e.g. "map", "bumpMap", "normalMap", etc.)
            //  index : material index of multimaterial ("null" for simple material).

                if ( !this[ outfit ] ) return;
                if ( !this[ outfit ].material ) return;
            
            //  Material.
    
                if ( index == null || isNaN(index) || typeof(index) != "number" ) {
    
                    if ( !this[ outfit ].material[ map ] ) return;
    
                    this[ outfit ].material[ map ].dispose();
                    this[ outfit ].material[ map ] = null;
                    this[ outfit ].material.needsUpdate = true;
    
                    return;
                }
    
            //  MultiMaterial.
    
                if ( typeof(index) == "number" && index > -1 ) {
    
                    if ( !this[ outfit ].material.materials ) return;
                    if ( !this[ outfit ].material.materials[ index ] ) return;
                    if ( !this.body.material.materials[ index ][ map ] ) return;
    
                    this[ outfit ].material.materials[ index ][ map ].dispose();
                    this[ outfit ].material.materials[ index ][ map ] = null;
                    this[ outfit ].material.materials[ index ].needsUpdate = true;
                    
                    return;
                }
            },
    
            gender: {
                male    : false,
                female  : false,
                shemale : false,
                trans   : false,
            },
    
            genitals: { 
                vagina   : false,
                penis    : false,
                attached : false,
            },

        // "aparts" has renamed to "outfits".

            outfits: [
                "skeleton",
                "body", 
                "bodypaint",
                "makeup", 
                "hairs",
                "bra", 
                "panties", 
                "boxers", 
                "tshirt",
                "skirt",
                "trousers", 
                "dress", 
                "shoes",
                "coat", 
                "penis", 
                "vagina" 
            ],

            setGender: function( gender ){
                var self = this;
                Object.keys(this.gender).forEach( function( name ){
                    self.gender[ name ] = ( name == gender );
                });
            },
    
            getGender: function(){
                var self = this;
                if (arguments.length > 0){
                    return self.gender[ arguments[0] ];
                } else {
                    return Object.keys(this.gender).find( function( name ){
                        return self.gender[ name ];
                    });
                }
            },
    
            resetGender: function(){
                var self = this;
                Object.keys(this.gender).forEach( function( name ){
                    self.gender[ name ] = false;
                });
            },
    
            getdata: function( name ){

                if ( !name ) return;
                if ( !this[ name ] ) return;
                if ( !this.outfits.includes( name ) ) return;

                var data = {};

                data[ name ] = {}
                data[ name ].materials = [];

            //  Materials.

                if ( !!this[ name ].material.materials ){

                    this[ name ].material.materials.forEach( function(material, i){
                        data[ name ].materials.push( toJSON(material) );
                    });

                } else {

                    var material = this[ name ].material;
                    data[ name ].materials.push( toJSON(material) );

                }

                data[ name ].scale   = this[ name ].scale.toArray();
                data[ name ].visible = this[ name ].visible;

                return data[ name ];

                function toJSON( material ){
                    var json = {};
                    
                    json.type = material.type;
                    if (!!material.map) json.map = material.map.sourceFile;
                    if (!!material.aoMap) json.aoMap = material.aoMap.sourceFile;
                    if (!!material.envMap) json.envMap = material.envMap.sourceFile;
                    if (!!material.bumpMap) json.bumpMap = material.bumpMap.sourceFile;
                    if (!!material.alphaMap) json.alphaMap = material.alphaMap.sourceFile;
                    if (!!material.lightMap) json.lightMap = material.lightMap.sourceFile;
                    if (!!material.normalMap) json.normalMap = material.normalMap.sourceFile;
                    if (!!material.emissiveMap) json.emissiveMap = material.emissiveMap.sourceFile;
                    if (!!material.specularMap) json.specularMap = material.specularMap.sourceFile;
                    if (!!material.roughnessMap) json.roughnessMap = material.roughnessMap.sourceFile;
                    if (!!material.metalnessMap) json.metalnessMap = material.metalnessMap.sourceFile;
                    if (!!material.displacementMap) json.displacementMap = material.displacementMap.sourceFile;

                    var options = {}

                    options.uuid = material.uuid;
                    options.name = material.name;
                    options.color = material.color.getHex();
                    options.side = material.side;
                    options.opacity = material.opacity;
                    options.shading = material.shading;
                    options.emissive = material.emissive.getHex();
                    options.skinning = material.skinning;
                    options.shininess = material.shininess;
                    options.transparent = material.transparent;
                    options.roughness = material.roughness;
                    options.metalness = material.metalness;

                    if (!!material.roughnessMap) options.roughness = material.roughness;
                    if (!!material.metalnessMap) options.metalness = material.metalness;
                    if (!!material.specularMap) options.specular = material.specular.getHex();
                    if (!!material.uniforms) options.uniforms = material.uniforms;
                    if (!!material.vertexShader) options.vertexShader = material.vertexShader;
                    if (!!material.fragmentShader) options.fragmentShader = material.fragmentShader;
                    if (!!material.vertexColors) options.vertexColors = material.vertexColors;
                    if (!!material.bumpMap) options.bumpScale = material.bumpScale;
                    if (!!material.normalMap) options.normalScale = material.normalScale.toArray();
                    if (!!material.displacementMap) options.displacementScale = material.displacementScale;
                    if (!!material.displacementMap) options.displacementBias = material.displacementBias;
                    if (!!material.emissiveMap) options.emissiveIntensity = material.emissiveIntensity;
                    if (!!material.lightMap) options.lightMapIntensity = material.lightMapIntensity;
                    if (!!material.envMap) options.reflectivity = material.reflectivity;
                    if (!!material.aoMap) options.aoMapIntensity = material.aoMapIntensity;

                    json.options = options;
                    return json;
                }
            },


            toJSON: function(){

                var data = {};

                if ( arguments.length == 0 ) {

                    this.outfits.forEach( function( name, index ){
                        if ( !!player.outfit[ name ] ){
                            data[ name ] = player.outfit.getdata( name );
                        }
                    });

                } else {

                    for (var i = 0; i < arguments.length; i++){
                        var name = arguments[i];
                        if ( !!this[ name ] ) {
                            data[ name ] = this.getdata( name );
                        }
                    }

                }

                var data = JSON.stringify( data );

                if ( data === "{}" ) return null;

                else return JSON.parse( data );

            },

/*
 *  Outfit DNA is an object that contains the outfit data that needed to
 *  re-create the player oufit anywhere remotly. It is player outfit assets
 *  in transfered structure ( aka like .toJSON() ).
 *
 *  .toDNA(); .fromDNA(dna); Usage:
 *      dna = localPlayer.outfit.toDNA();
 *      player = new Player();
 *      player.outfit = new AW3D.Outfit(player);
 *      player.outfit.fromDNA( dna );
 *      player.outfit.add({body:player.outfit.body});
 *      scene.add(player.outfit.direction);
*/
            toDNA: function(){

                var dna = {};

                player.outfit.outfits.forEach( function( name ){
                    if ( !!player.outfit[ name ] ) {
                        dna[ name ] = {};
                        dna[ name ].name = name;
                        dna[ name ].visible   = player.outfit[ name ].visible;
                        dna[ name ].scale     = player.outfit[ name ].scale.toArray();
                        dna[ name ].geometry  = player.outfit[ name ].geometry.sourceFile;
                        dna[ name ].materials = player.outfit.getdata( name ).materials;
                    }
                });

                dna = JSON.stringify( dna );

                if ( dna === "{}" ) 
                    return null;
                else 
                    return JSON.parse( dna );
            },


            fromDNA: function(dna){

                var dna = dna;
                console.log(dna);

                for (var key in dna) {
                    test( key );
                }

                function test( key ){

                    debugMode && console.log("key:", key);
                    debugMode && console.log("dna[key]:", dna[key]);

                //  Copy dna item properties, to prevent overwritting.
                    var dnaOptions = {};
                    dnaOptions.key = key;
                    dnaOptions.obj = dna[ key ];
                    dnaOptions.url = dna[ key ].geometry;
                    debugMode && console.log("dnaOptions:", dnaOptions);

                    $.getJSON( dnaOptions.url ).then(function(json){

                        debugMode && console.log("dnaOptions.url:", dnaOptions.url);

                        var loader = new THREE.JSONLoader();
                        var geometry = loader.parse( json ).geometry;
                        geometry.sourceFile = dnaOptions.url; // IMPORTANT //
                        geometry.computeFaceNormals();
                        geometry.computeVertexNormals();
                        geometry.computeBoundingBox();
                        geometry.computeBoundingSphere();
                        geometry.name = json.name;

                        var multimaterial = new THREE.MultiMaterial();

                        dnaOptions.obj.materials.forEach( function(material, i) {

                            var options = material.options;

                        //  debugMode && console.log("dna key:", key, "\nmaterial:", material, "\noptions:", options);

                            var promises = [];

                            if (!!material.map) promises.push( loadMapTexture( "map" ) );
                            if (!!material.aoMap) promises.push( loadMapTexture( "aoMap" ) );
                            if (!!material.envMap) promises.push( loadMapTexture( "envMap" ) );
                            if (!!material.bumpMap) promises.push( loadMapTexture( "bumpMap" ) );
                            if (!!material.alphaMap) promises.push( loadMapTexture( "alphaMap" ) );
                            if (!!material.lightMap) promises.push( loadMapTexture( "lightMap" ) );
                            if (!!material.normalMap) promises.push( loadMapTexture( "normalMap" ) );
                            if (!!material.emissiveMap) promises.push( loadMapTexture( "emissiveMap" ) );
                            if (!!material.specularMap) promises.push( loadMapTexture( "specularMap" ) );
                            if (!!material.roughnessMap) promises.push( loadMapTexture( "roughnessMap" ) );
                            if (!!material.metalnessMap) promises.push( loadMapTexture( "metalnessMap" ) );
                            if (!!material.displacementMap) promises.push( loadMapTexture( "displacementMap" ) );

                            function loadMapTexture( name ){
                                return new Promise(function(resolve, reject){
                                    var src = material[ name ];
                                    debugMode && console.log("src:", src);
                                    var img = new Image();
                                    img.crossOrigin = "anonymous";
                                    $(img).one("load", function(){
                                        options[ name ] = new THREE.Texture( img );
                                        options[ name ].sourceFile = src;
                                        options[ name ].needsUpdate = true;
                                        $(img).remove();
                                        resolve( options[ name ] );
                                    });
                                    img.src = src;
                                });
                            }

                            Promise.all(promises).then(function(){

                                switch ( material.type ) {
                                    case "MeshBasicMaterial":
                                        multimaterial.materials.push( new THREE.MeshBasicMaterial( options ) );
                                        break;
                                    case "MeshDepthMaterial":
                                        multimaterial.materials.push( new THREE.MeshDepthMaterial( options ) );
                                        break;
                                    case "MeshLambertMaterial":
                                        multimaterial.materials.push( new THREE.MeshLambertMaterial( options ) ); 
                                        break;
                                    case "MeshNormalMaterial":
                                        multimaterial.materials.push( new THREE.MeshNormalMaterial( options ) ); 
                                        break;
                                    case "MeshPhongMaterial":
                                        multimaterial.materials.push( new THREE.MeshPhongMaterial( options ) ); 
                                        break;
                                    case "MeshPhysicalMaterial":
                                        multimaterial.materials.push( new THREE.MeshPhysicalMaterial( options ) ); 
                                        break;
                                    case "MeshStandardMaterial":
                                        multimaterial.materials.push( new THREE.MeshStandardMaterial( options ) ); 
                                        break;
                                    default:
                                        multimaterial.materials.push( new THREE.MeshFaceMaterial( options )); 
                                }

                                for (var j = 0; j < multimaterial.materials.length; j++){
                                    multimaterial.materials[ j ].needsUpdate = true;
                                }

                                debugMode && console.log( "multimaterial.materials:", multimaterial.materials );

                            }).catch(function(err){
                                console.error(err);
                            });

                        });

                        return { geometry:geometry, material:multimaterial };

                    }).then(function( results ){

                        debugMode && console.log( "results:", results );

                        player.outfit[ dnaOptions.key ] = new THREE.SkinnedMesh( results.geometry, results.material );
                    //  var skinned = player.outfit[ dnaOptions.key ];
                        player.outfit[ dnaOptions.key ].frustumCulled = false;
                        player.outfit[ dnaOptions.key ].position.set( 0, 0, 0 );
                        player.outfit[ dnaOptions.key ].rotation.set( 0, 0, 0 ); 
                        player.outfit[ dnaOptions.key ].scale.fromArray( dnaOptions.obj.scale );
                        player.outfit[ dnaOptions.key ].renderDepth = 1;

                    });

                }



            },

        /*  End of DNA  */

            promise: function( fn ){
                return new Promise(function(resolve, reject){
                    if ( !fn ) resolve();
                    if ( fn instanceof Function ) resolve( fn() );
                    else resolve();
                });
            },
    

            AnimationsHandler: [],
    
        };

    //  oufit.AnimationsHandler.

        outfit.AnimationsHandler.reset = function(){
            this.length = 0; // reset array.
        };
    
        outfit.AnimationsHandler.stop = function(){
            this.forEach( function( anim ){
                if (!!anim ) anim.stop();
            });
        };
    
        outfit.AnimationsHandler.jump = function(){
            this.forEach( function( anim ){
                if (!!anim ) anim.jump();
            });
        };
    
        outfit.AnimationsHandler.play = function(){
            for (var i in arguments){
                var name = arguments[i];
                this.forEach( function( anim ){
                    if (!!anim ) anim.play(name);
                });
            }
        };
    
        outfit.AnimationsHandler.weightOff = function(){
            for (var i in arguments){
                var name = arguments[i];
                this.forEach( function( anim ){
                    if (!!anim ) anim.weightOff(name);
                });
            }
        };
    
        outfit.AnimationsHandler.weightOn = function(){
            for (var i in arguments){
                var name = arguments[i];
                this.forEach( function( anim ){
                    if (!!anim ) anim.weightOn(name);
                });
            }
        };
    
        outfit.AnimationsHandler.refresh = function(){
        //  outfit.AnimationsHandler is an "OutfitAnimationHandler" (array).
    
            this.stop();
            this.fill(null);
            this.reset();
    
        //  "aparts" has renamed to "outfits".
            player.outfit.outfits.forEach( function(name, i){
                if ( !!player.outfit[ name ] ){
    
                    var handler = new AW3D.AnimationHandler( player.outfit[ name ], player.outfit.getGender() );
    
                //  debugMode && console.log( "new AW3D.AnimationHandler(" + name + ", " + player.outfit.getGender() + ")" );
    
                    player.outfit.AnimationsHandler.push( handler );
                }
            });
    
            player.outfit.AnimationsHandler.play("idle");
    
        };
        
        return outfit;
    
    };


