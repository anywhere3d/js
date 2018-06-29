//  editor-panel.js

    var debugMode;

    var target;       // IMPORTANT //
    var textureSize;  // IMPORTANT //

//  Every dialoge panel point to a target object that can be 
//  mesh, geometry, face, vertex, object3d, material, texture
//  scene or whatever and deals with this target only.

    var editorPanelHtml = '<div id="editor-panel" title="Editor Panel">';
    var $EditorPanel = $(editorPanelHtml).dialog({ 
        autoOpen: false, 
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'fade', duration: 500 },
    });

    $EditorPanel.on( "dialogopen", function( event, ui ) {
        $EditorPanel.active = true;
        debugMode && console.log( "dialog opened:", $EditorPanel.active );
    });

    $EditorPanel.on( "dialogclose", function( event, ui ) {
        $EditorPanel.active = false;
        $EditorPanel.contents().remove();
        target = undefined;
        debugMode && console.log( "dialog closed:", !$EditorPanel.active );        
        debugMode && console.log( "target:", target );
    });


//    width:    616,
//    minWidth: 616,
//    maxWidth: 616,
//    height:   600,
//    minHeight:600,
//    maxHeight:600
