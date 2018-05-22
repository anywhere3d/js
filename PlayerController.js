//  Player.js

    /*!
    * @author anywhere3d
    * http://anywhere3d.org
    * MIT License
    */

    var world;
    var debugMode;
    var AnimationPanelControls;


    var Player = function(){

        this.getdata = function(){
        //  Collect position, direction, nickname, and gender.
            var data = {};
            data.playerid  = socket.id;
            data.nickname  = this.nickname;
            data.gender    = this.outfit.getGender();
            data.direction = this.outfit.direction.rotation.y;
            data.position  = this.outfit.direction.position.toArray();

        //  Collect outfits data.
            var outfit = this.outfit;
            var outfits = this.outfit.outfits;
            outfits.forEach( function( name ){
                if (!!outfit[name]) 
                    data[name] = outfit.getdata(name);
            });
    
            debugMode && console.log("player data:", data);
            return data;
        };

    //  Remote player set data.
        this.setdata = function( data ){
            
            if (!data.playerid || data.playerid != this.playerid) return;
            this.playerid = data.playerid;
            this.nickname = data.nickname;
            this.outfit.setGender( data.gender );
            this.outfit.direction.rotation.y = data.direction;
            this.outfit.direction.position.fromArray(data.position);

            if (data.action != undefined) {
                this.outfit.AnimationsHandler.stop();
                this.outfit.AnimationsHandler.play( data.action );
            }
        };

    };

//  PlayerHolder is a THREE.Object3D. 
//  Rotation of playerHolder do not rotate "outfit[name]".
//  At init time "outfit[name].geometry Y" has rotated Math.PI/2.

//        localPlayer.holder, 
//        localPlayer.holderHelper,
//        localPlayer.directionPointer,
//        localPlayer.sphere,
//        localPlayer.pointer,

    var localPlayer = new Player();
    
    localPlayer.holder = AW3D.PlayerHolder(); // IMPORTANT //
    localPlayer.holderHelper = AW3D.PlayerHolderHelper();
    scene.add( localPlayer.holder, localPlayer.holderHelper );

    localPlayer.directionPointer = AW3D.DirectionPointer();
    localPlayer.sphere = AW3D.PlayerSphere();
    localPlayer.holder.add( localPlayer.directionPointer, localPlayer.sphere ); 

//    localPlayer.pointer = AW3D.PlayerPointer();
//    scene.add(localPlayer.pointer);

    localPlayer.outfit = AW3D.Outfit( localPlayer ); // IMPORTANT //
    debugMode && console.log( "localPlayer.outfit:", localPlayer.outfit );








//  MW cameraControls.js

    /*!
    * @author anywhere3d
    * http://anywhere3d.org
    * MIT License
    */

//  Camera offsets.

    var cameraControls;

    var hatOffset    = 30;
    var headOffset   = 25;
    var torsoOffset  = 20;
    var hipsOffset   = 15;
    var legsOffset   = 10;
    var socksOffset  =  5;
    var shoesOffset  =  0;
    var groundOffset =  0;

//  var radius = 36; 

//  MW TPS cameraControl.js

    cameraControls = new MW.TPSCameraControl(camera, localPlayer.holder, {
        el: renderer.domElement,               // html renderer element.
        offset: new THREE.Vector3( 0, 15, 0 ), // eye height.
        radius: 40,      // default: 37 // (distance of the character to the camera).
        minRadius: 6,    // default: 10 // (can take and negative values, yes!!!).
        maxRadius: 100,  // default: 64, runtime: 40.
        rigidObjects: [] // collition objects for the camera.
    });

    function cameraOffset(offset){
        if (!!cameraControls) cameraControls.offset.y = offset;
    }

//  The "updated" event is fired by "cameraControls.update()"
//  Used in "keyInputControls.js" and "joystickControls.js" event listeners.








//  AW3D PlayerController.js

    /*!
    * @author anywhere3d
    * http://anywhere3d.org
    * MIT License
    */

    localPlayer.controller = new MW.CharacterController( localPlayer.holder, localPlayer.radius );

//  localPlayer.controller.center.y = 1;  // VERY IMPORTANT //
//  var x = Math.random() - 0.5; x = Math.ceil(x * 500); localPlayer.controller.center.x = x;
//  var z = Math.random() - 0.5; z = Math.ceil(z * 500); localPlayer.controller.center.z = z;
//  Player Controller random initial position.

    localPlayer.controller.radius   = 1;  // VERY IMPORTANT //
    localPlayer.controller.center.set(-100, 1, 200);
    debugMode && console.log( "initial position:", localPlayer.controller.center );


    localPlayer.controller.getdata = function(action){

        var data = {};
        data.playerid = socket.id;
        data.radius = this.radius;
        data.isGrounded = this.isGrounded;
        data.isOnSlope = this.isOnSlope;
        data.isIdling  = this.isIdling;
        data.isJumping = this.isJumping;
        data.isRunning = this.isRunning;
        data.isWalking = this.isWalking;
        data.direction = this.direction;
        data.movementSpeed = this.movementSpeed;
        data.jumpStartTime = this.jumpStartTime;
        data.position = this.center.toArray();
        if (!!action) data.action = action;

        return data;
    };

    world.add( localPlayer.controller );

    debugMode && console.log( 
        "world.characterPool length:", world.characterPool.length, 
        "index:", world.characterPool.indexOf( localPlayer.controller )
    );


/*
 *  PlayerController - How it works.
 *  --------------------------------

 *     MW.CharacterController.events(): (internal)
 *     this.dispatchEvent( { type: 'startIdling' } );
 *     this.dispatchEvent( { type: 'startRunning' } );
 *     this.dispatchEvent( { type: 'startJumping' } );
 *     this.dispatchEvent( { type: 'startSliding' } );
 *     this.dispatchEvent( { type: 'startFalling' } );
 *     this.dispatchEvent( { type: 'endJumping' } );

 * When "playerController" has been added in "world", every CharacterController
 * in "world.characterPool" is updating via "CharacterController.update(dt)" at
 * every "world.step(dt)". Depending on status of "playerController" at every (dt)
 * step, it dispatch events. Catching this events with events listeners we can
 * handle things. We handle "playerController" from its proterties, not from its
 * events. PlayerController dispatch (sent) events, does not receive.
 * You can add/remove your custom events listeners or dispatch custom event 
 * from "playerController" using the "addEventListener( type, function)"
 * "removeEventListener( type, function)" or "dispatchEvent({type:name})".
 * It is not recomented to use jquery "$(playerController).on(type, function)",
 * style to add/remove events listeners on PlayerController.

 * On the other side, when the socket event received, we send the controller data
 * to the "remotePlayerController" which is updating via "world.step(dt)" and updates
 * the remote outfit. The "remotePlayerController" also dispatch an event but as we
 * dont have add event listeners to "remotePlayerController" the events should be not
 * received and will be lost (hopefully).
 */
//  ----------------------------------------------------------------------------  //

/* Remote players MUST NOT been added in world. 
 * From now on playerController.js sent the socket messages, 
 * not the keyInputControls.js*.
 * keyInputControls.js sent socket messages ONLY at direction change.
 * DO NOT USE jquery event listeners style here.
*/

    localPlayer.controller.addEventListener("startIdling",  onStartIdling);
    localPlayer.controller.addEventListener("startRunning", onStartRunning);
    localPlayer.controller.addEventListener("startJumping", onStartJumping);
    localPlayer.controller.addEventListener("endJumping",   onEndJumping);
    localPlayer.controller.addEventListener("startSliding", onStartSliding);
    localPlayer.controller.addEventListener("startFalling", onStartFalling);

    function onStartIdling(){
    //  debugMode && console.log( "localPlayer.controller:", "startIdling:" );
    //  Send move player mesasge to server.
    }

    function onStartRunning(){
    //  debugMode && console.log( "localPlayer.controller:", "startRunning:" );
    //  Send move player mesasge to server.
    }

    function onStartJumping(){
        localPlayer.outfit.AnimationsHandler.weightOff("idle", "walk", "run");
    //  debugMode && console.log( "localPlayer.controller:", "startJumping:" );
    //  Send startJumping message to server.
    }

    function onEndJumping(){
        localPlayer.outfit.AnimationsHandler.weightOn("idle", "walk", "run");
    
    //  Hack: Overwriting player controller jump.
    //  Stoping automate walk on landing. 
    //  Handles outfit animation on end of jumping when 
    //  move key released and controller is on air (jump).

        if ( debugMode) {
        //  console.log("joystick 1 controls is not active:", !joystick1.isActive );
        //  console.log("keyInputControls is not keyholded:", !keyInputControls.isMoveKeyHolded );
        //  console.log("AnimationPanelControls not active:", !AnimationPanelControls.isActive );
        }

        if ( !joystick1.isActive 
          && !keyInputControls.isMoveKeyHolded
          && !AnimationPanelControls.isActive ){

            localPlayer.outfit.AnimationsHandler.stop();        
            localPlayer.controller.isRunning = false;
            localPlayer.controller.isWalking = false;
            localPlayer.controller.isIdling  = true;
            localPlayer.controller.movementSpeed = 0;
            localPlayer.outfit.AnimationsHandler.play("idle");
            localPlayer.controller.dispatchEvent({type:"startIdling"});

        } else {

            localPlayer.outfit.AnimationsHandler.stop();
            localPlayer.controller.isRunning = true;
            localPlayer.controller.isWalking = true;
            localPlayer.controller.isIdling  = false;
            localPlayer.controller.movementSpeed = 28;
            localPlayer.outfit.AnimationsHandler.play("walk");
            localPlayer.controller.dispatchEvent({type:"startRunning"});
        }

    //  debugMode && console.log( "localPlayer.controller:", "endJumping:" );

    //  Player controller "endJumping" listener is the only that
    //  send socket control event to server. All other control events
    //  (move/jump/idle) send from input/joystick/action controllers.

    //  Send startJumping message to server.
        if ( joystick1.isActive 
          || keyInputControls.isMoveKeyHolded 
          || AnimationPanelControls.isActive ){

            if (!!controlsChannel) controlsChannel.publish({ 
                playerid : socket.id,
                direction: localPlayer.outfit.direction.rotation.y,
                position : localPlayer.outfit.direction.position.toArray(),
                action   : "walk",
            });

        } else {

            if (!!controlsChannel) controlsChannel.publish({ 
                playerid : socket.id,
                direction: localPlayer.outfit.direction.rotation.y,
                position : localPlayer.outfit.direction.position.toArray(),
                action   : "idle",
            });
        }
        
    }
    
    function onStartSliding(){
    //  debugMode && console.log( "localPlayer.controller:", "startSliding:" );
    }
    
    function onStartFalling(){
    //  debugMode && console.log( "localPlayer.controller:", "startFalling:" );
    }




/*
//  -------------------- DEPRECATED --------------------  //

    localPlayer.getdata = function(){

    //  Collect position and gender to websocket server.

        var data = {}; // localPlayer.controller.getdata();
        data.playerid  = socket.id;
        data.nickname  = this.nickname;
        data.gender    = this.outfit.getGender();
        data.direction = this.outfit.direction.rotation.y;
        data.position  = this.outfit.direction.position.toArray();

        var outfit = this.outfit;
        var outfits = this.outfit.outfits;
        outfits.forEach( function( name ){

            if (!!outfit[name]) data[name] = outfit.getdata(name);
        
        });

        debugMode && console.log("local player data:", data);

        return data;

    };

    localPlayer.getdata = function(){

    //  Collect position and gender to websocket server.

        var data = {}; // localPlayer.controller.getdata();
        data.playerid  = socket.id;
        data.nickname  = this.nickname;
        data.gender    = this.outfit.getGender();
        data.direction = this.outfit.direction.rotation.y;
        data.position  = this.outfit.position.toArray();

    //  Collect outfit materials data.

        switch ( localPlayer.outfit.getGender() ){

            case "male": {
                data.body     = this.outfit.getdata("body");
                data.hairs    = this.outfit.getdata("hairs");
                data.tshirt   = this.outfit.getdata("tshirt");
                data.trousers = this.outfit.getdata("trousers");
                data.shoes    = this.outfit.getdata("shoes");
                break;
            }

            case "female": {
                data.body  = this.outfit.getdata("body");
                data.hairs = this.outfit.getdata("hairs");
                data.dress = this.outfit.getdata("dress");
                break;
            }

            case false: {
                data.body  = this.outfit.getdata("body");
                break;
            }
                
            default:
                data.body  = this.outfit.getdata("body");
        }
        
        debugMode && console.log("local player data:", data);
        
        return data;
        
    }
//  ----------------------------------------------------  //
*/
