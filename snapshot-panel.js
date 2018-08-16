//  snapshot-panel.js

    var debugMode;

    var snapshot;

    var dialogAnimationFrameRequestID;
    var scriptsFolder = "/scripts/";
    var componentsFolder = "/components/";
    var snapshotDialogFooterSelector = "#ui-dialog-footer";
    var snapshotCancelButtonSelector = "#snapshot-cancel-button";

    var snapshotPanelHtml = '<div id="snapshot-panel" title="Snapshot Panel">';

    var snapshotSpinner = [
        '<div class="snapshot-spinner spinner-loading">',
            '<span class="img-helper"></span><img class="spin-img" src="https://i.imgur.com/7qG1W04.gif" />',
        '</div>'
    ].join("");

//  Create snapshot dialog.
    var $SnapshotPanel = $(snapshotPanelHtml).dialog({ 
        autoOpen: false, 
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'fade', duration: 500 },
    });

/*
    var snapshotFooterHtml = [
        '<div id="ui-dialog-footer">',
            '<a id="snapshot-shoot-button" class="btn btn-primary pull-right">Take snapshot</a>',
            '<a id="snapshot-cancel-button" class="btn btn-default">Close</a>',
        '</div>'
    ].join("");

    $SnapshotPanel.parent().append( snapshotFooterHtml );
*/

//  Dialog load component function.
    $SnapshotPanel.loadComponent = function(component, option){
        var snapshotComponent = componentsFolder + component; 
        $SnapshotPanel.load(snapshotComponent, function(response, status, xhr){
            debugMode && console.log("snapshot component:", status);
            if ( !!option ) $SnapshotPanel.dialog( "option", option );
        });
    }

    $SnapshotPanel.loadScript = function(script, option){
        var snapshotScript = scriptsFolder + script; 
        $.getScript(snapshotScript, function(script, status, xhr){
            debugMode && console.log("snapshot script:", status);
            if ( !!option ) $SnapshotPanel.dialog( "option", option );
        });
    }



//  On dialog open.


//  Define snapshot.
    $SnapshotPanel.on( "dialogopen", function( event, ui ) {

        snapshot = {};

    //  Snapshot dialog animate().
        snapshot.animate = function(){
            dialogAnimationFrameRequestID = requestAnimationFrame( snapshot.animate );
            update(); // is the same with animate() update.
            snapshot.renderer.render( scene, snapshot.camera );
        };

        $SnapshotPanel.active = true;
        debugMode && console.log( "snapshot dialog opened:", $SnapshotPanel.active );
        debugMode && console.log( "snapshot:", snapshot );

    });


//  Event listeners.
    $SnapshotPanel.on( "dialogopen", function( event, ui ) {

    //  Snapshot dialog on resize.
        $SnapshotPanel.on( "resize", function () {
            debugMode && console.log( "aspect:", snapshot.camera.aspect );
            snapshot.camera.aspect = $(this).width() / $(this).height();
            snapshot.camera.updateProjectionMatrix(); 
            snapshot.renderer.setSize( $(this).width(), $(this).height() );
        });
    
    //  Snapshot dialog control switches.
        $SnapshotPanel.on("mouseenter", function(e){
            if ( !!snapshot.controls && snapshot.controls instanceof THREE.EditorControls )  {
                snapshot.controls.enabled = true;
            }
        });
    
        $SnapshotPanel.on("mouseleave", function(e){
            if ( !!snapshot.controls && snapshot.controls instanceof THREE.EditorControls ) {
                snapshot.controls.enabled = false;
            }
        });

    });


//  Pause main window renderer.
    $SnapshotPanel.on( "dialogopen", function( event, ui ) {
//        window.cancelAnimationFrame( windowAnimationFrameRequestID );
//        debugMode && console.warn( 
//            "Main window animate has been paused while snapshot dialog is open.", 
//            "cancelAnimationFrameRequestID paused at:", windowAnimationFrameRequestID 
//        );
    });


//  Snapshot dialog init.
    $SnapshotPanel.on( "dialogopen", function( event, ui ) {

    //  keyInputControls.Off();

    //  Dialog camera and controls. We create independent camera for the snapshots.
        snapshot.camera = new FpsCamera(50, 1, 10000);
        snapshot.camera.aspect = $SnapshotPanel.width() / $SnapshotPanel.height();
        snapshot.camera.updateProjectionMatrix();
        snapshot.controls = new THREE.EditorControls( snapshot.camera );
        snapshot.controls.enabled = false;

    //  Dialog renderer init.
        snapshot.renderer = new THREE.WebGLRenderer({
            antialias: true, preserveDrawingBuffer: true,
        });

        snapshot.renderer.shadowMap.enabled = true;
        snapshot.renderer.setPixelRatio( window.devicePixelRatio );
        snapshot.renderer.setSize( $SnapshotPanel.width(), $SnapshotPanel.height() );

        $SnapshotPanel.append( snapshot.renderer.domElement );

        snapshot.camera.position.copy( camera.position );                // IMPORTANT  //
        if ( !!localPlayer && !!localPlayer.outfit && !!localPlayer.outfit.body ) {
            snapshot.controls.focus( localPlayer.outfit.body, true );    // IMPORTANT  //
        }
        snapshot.camera.lookAt( snapshot.controls.center );              // IMPORTANT  //

    //  Dialog animate.
        snapshot.animate(); 

        debugMode && console.log( 
            "dialogAnimationFrameRequestID starts at:", dialogAnimationFrameRequestID 
        );

    });



//  On dialog close.

/*
    $(snapshotCancelButtonSelector).on( "click", function(){
        $SnapshotPanel.dialog("close");
    });
*/

    $SnapshotPanel.on( "dialogclose", function( event, ui ) {

    //  Pause dialog panel renderer.
        window.cancelAnimationFrame( dialogAnimationFrameRequestID );
        debugMode && console.log(  
            "dialogAnimationFrameRequestID canceled at:", dialogAnimationFrameRequestID 
        );

        if ( !!snapshot && !!snapshot.controls ) snapshot.controls.dispose(); // IMPORTANT //

    //  DEVELOPER NOTE: You can keep the same renderer for different scenes. The renderer does not care   //
    //  what scene it will render. You can supply a different Scene everytime you call render() if you like. //

    //  Deallocate renderer to avoid memory leaks. // VERY IMPORTANT //
        if ( !!snapshot && !!snapshot.renderer ) deallocateRendererContext( snapshot.renderer );

    //  Remove event listeners.
        $SnapshotPanel.off( "resize" );
        $SnapshotPanel.off( "mouseenter" );
        $SnapshotPanel.off( "mouseleave" );

    //  Continue window requestAnimationFrame animate.
    //  animate();
        debugMode && console.log( 
            "windowAnimationFrameRequestID continue from:", windowAnimationFrameRequestID 
        );

    //  Restore window keyInput controls.
        keyInputControls.Off();

    //  Reset snapshot.
        snapshot = undefined;

    //  Remove contents ???.
        $SnapshotPanel.active = false;
        $SnapshotPanel.contents().remove();
        debugMode && console.log( "snapshot dialog closed:", !$SnapshotPanel.active );        
        debugMode && console.log( "snapshot:", snapshot );

    });


    function deallocateRendererContext( renderer ){
    //  sources: "https://stackoverflow.com/questions/21548247/clean-up-threejs-webgl-contexts",
    //  "https://github.com/mrdoob/three.js/blob/r78/src/renderers/WebGLRenderer.js#L308".
        renderer.forceContextLoss();
    //  Removes the "webglcontextlost" event listener.
        renderer.dispose();          
        renderer.context = null;
        renderer.domElement = null;
        renderer = null;
    }





