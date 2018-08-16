//  asset-editor-panel.js

    var debugMode;

    var target;       // IMPORTANT //
    var textureSize;  // IMPORTANT //

//  Every dialoge panel point to a target object that can be 
//  mesh, geometry, face, vertex, object3d, material, texture
//  or whatever and deals with this target only.

    var assetEditorPanelHtml = '<div id="asset-editor-panel" title="Editor">';
    var $AssetEditorPanel = $(assetEditorPanelHtml).dialog({ 
        autoOpen: false, 
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'fade', duration: 500 },
    });

/*
    var dialogOption = {
        width:    616,
        minWidth: 616,
        maxWidth: 616,
        height:   600,
        minHeight:600,
        maxHeight:600
    };
*/

    $AssetEditorPanel.on( "dialogopen", function( event, ui ) {
        $AssetEditorPanel.active = true;
        debugMode && console.log( "dialog opened:", $AssetEditorPanel.active );
        debugMode && console.log( "target:", !!target );
    });

    $AssetEditorPanel.on( "dialogclose", function( event, ui ) {
        $AssetEditorPanel.active = false;
        $AssetEditorPanel.contents().remove();
        target = undefined;
        debugMode && console.log( "dialog closed:", !$AssetEditorPanel.active );
        debugMode && console.log( "target:", target );
    });


    $AssetEditorPanel.loadMaterialPanel = function(title, size){

        if ( target instanceof THREE.MeshStandardMaterial ) {
            var standardMaterialPanelComponent = componentsFolder + "standard-material-panel.html";        
            $AssetEditorPanel.load(standardMaterialPanelComponent, function(resoponse, status, xhr){
                if (status == "error")   console.error( status, xhr.status, xhr.statusText );
                if (status == "success") debugMode && console.log("Standard Material Panel:", status);
                $AssetEditorPanel.dialog( "option", {title: title + " (standard)"} );
            //  Settings.
                textureSize = size || 256;
            });
            return;
        }
    
        if ( target instanceof THREE.MeshLambertMaterial ) {
            var lambertMaterialPanelComponent = componentsFolder + "lambert-material-panel.html";        
            $AssetEditorPanel.load(lambertMaterialPanelComponent, function(resoponse, status, xhr){
                if (status == "error")   console.error( status, xhr.status, xhr.statusText );
                if (status == "success") debugMode && console.log("Lambert Material Panel:", status);
                $AssetEditorPanel.dialog( "option", {title:  title + " (lambert)"} );
            //  Settings.
                textureSize = size || 256;
            });
            return;
        }

        if ( target instanceof THREE.MeshPhongMaterial ) {
            var phongMaterialPanelComponent = componentsFolder + "phong-material-panel.html";        
            $AssetEditorPanel.load(phongMaterialPanelComponent, function(resoponse, status, xhr){
                if (status == "error")   console.error( status, xhr.status, xhr.statusText );
                if (status == "success") debugMode && console.log("Phong Material Panel:", status);
                $AssetEditorPanel.dialog( "option", {title:  title + " (phong)"} );
            //  Settings.
                textureSize = size || 256;
            });
            return;
        }

    };
