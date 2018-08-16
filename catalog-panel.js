//  catalog-panel.js

    var debugMode;

//  Every dialoge panel point to a target object that can be 
//  mesh, geometry, face, vertex, object3d, material, texture
//  scene or whatever and deals with this target only.

    var catalogPanelHtml = '<div id="catalog-panel" title="Catalogue Panel">';
    var $CatalogPanel = $(catalogPanelHtml).dialog({ 
        autoOpen: false, 
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'fade', duration: 500 },
    });

    $CatalogPanel.on( "dialogopen", function( event, ui ) {
        $CatalogPanel.active = true;
        debugMode && console.log( "target:", target );
        debugMode && console.log( "dialog opened:", $CatalogPanel.active );
    });

    $CatalogPanel.on( "dialogclose", function( event, ui ) {
        $CatalogPanel.active = false;
        $CatalogPanel.contents().remove();
        debugMode && console.log( "target:", target );
        debugMode && console.log( "dialog closed:", !$CatalogPanel.active );
    });

//  Dialog load component function.
    $CatalogPanel.loadComponent = function(component, option){
        var catalogComponent = componentsFolder + component; 
        $CatalogPanel.load(catalogComponent, function(response, status, xhr){
            debugMode && console.log("catalog component:", status);
            if ( !!option ) $CatalogPanel.dialog( "option", option );
        });
    }

    $CatalogPanel.loadScript = function(script, option){
        var catalogScript = scriptsFolder + script; 
        $.getScript(catalogScript, function(script, status, xhr){
            debugMode && console.log("catalog script:", status);
            if ( !!option ) $CatalogPanel.dialog( "option", option );
        });
    }


//    width:    616,
//    minWidth: 616,
//    maxWidth: 616,
//    height:   600,
//    minHeight:600,
//    maxHeight:600


