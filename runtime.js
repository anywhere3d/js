//  runtime.js

    var debugMode;
    var mouse = new THREE.Vector2();

    var rendererHalfWidth = renderer.domElement.width / 2;
    var rendererHalfHeight = renderer.domElement.height / 2;

    groundHelper.visible = debugMode;
    axisCustomHelper.visible = debugMode;

//  if (debugMode) {       
    //  controls = new THREE.EditorControls(camera);
    //  camera.lookAt(controls.center);
//  }

    animate();

    function animate(){

        windowAnimationFrameRequestID = requestAnimationFrame( animate );

        update();

        render();

    }

//  Event Listeners.

    $(window).on( "resize", onWindowResize );

    function onWindowResize() {

        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( container.clientWidth, container.clientHeight );
        
        rendererHalfWidth = renderer.domElement.width * 0.5;
        rendererHalfHeight = renderer.domElement.height * 0.5;

    }

    $(window).on( "mousemove", onMouseMove );

	function onMouseMove( event ) {
        //console.log(event);
		mouse.x = ( event.clientX - rendererHalfWidth );
		mouse.y = ( event.clientY - rendererHalfHeight );

	}
