//  scene-editor-panel.js

    var debugMode;

    var target;       // IMPORTANT //
    var textureSize;  // IMPORTANT //

//  Every dialoge panel point to a target object that can be 
//  mesh, geometry, face, vertex, object3d, material, texture
//  scene or whatever and deals with this target only.

    var sceneEditorPanelHtml = '<div id="scene-editor-panel" title="Scene Editor">';
    var $SceneEditorPanel = $(sceneEditorPanelHtml).dialog({ 
        autoOpen: false, 
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'fade', duration: 500 },
    });

    $SceneEditorPanel.on( "dialogopen", function( event, ui ) {
        $SceneEditorPanel.active = true;
        debugMode && console.log( "dialog opened:", $SceneEditorPanel.active );
    });

    $SceneEditorPanel.on( "dialogclose", function( event, ui ) {
        $SceneEditorPanel.active = false;
        debugMode && console.log( "dialog closed:", !$SceneEditorPanel.active );
        $SceneEditorPanel.contents().remove();
    });

//    width:    616,
//    minWidth: 616,
//    maxWidth: 616,
//    height:   600,
//    minHeight:600,
//    maxHeight:600

