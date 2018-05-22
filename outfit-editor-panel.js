//  outfit-editor-panel.js

    var debugMode;

    var target;       // IMPORTANT //
    var textureSize;  // IMPORTANT //

//  Every dialoge panel point to a target object that can be 
//  mesh, geometry, face, vertex, object3d, material, texture
//  or whatever and deals with this target only.

    var outfitEditorPanelHtml = '<div id="outfit-editor-panel" title="Outfit Editor">';
    var $OutfitEditorPanel = $(outfitEditorPanelHtml).dialog({ 
        autoOpen: false, 
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'fade', duration: 500 },
        //    width:    616,
        //    minWidth: 616,
        //    maxWidth: 616,
        //    height:   600,
        //    minHeight:600,
        //    maxHeight:600
    });

    $OutfitEditorPanel.on( "dialogopen", function( event, ui ) {
        $OutfitEditorPanel.active = true;
        debugMode && console.log( "dialog opened:", $OutfitEditorPanel.active );
        showAvaliableOutfitOptions();
    });

    $OutfitEditorPanel.on( "dialogclose", function( event, ui ) {
        $OutfitEditorPanel.active = false;
        debugMode && console.log( "dialog closed:", !$OutfitEditorPanel.active );
        showAvaliableOutfitOptions();
    });

