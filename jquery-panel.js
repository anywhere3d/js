//  jquery-panel.js

    var debugMode;

//  Every jquery panel point to a scope object that can be 
//  mesh, geometry, face, vertex, object3d, material, texture
//  scene, html element, form, object, array, or whatever and
//  deals with this scope only.

    var scope; //  IMPORTANT //

    var jqueryPanelHtml = '<div id="jquery-panel" title="JQuery Panel">';

    var $jQueryPanel = $(jqueryPanelHtml).dialog({ 
        autoOpen: false, 
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'fade', duration: 500 },
    });

    $jQueryPanel.on( "dialogopen", function( event, ui ) {
        $jQueryPanel.active = true;
        debugMode && console.log( "dialog opened:", $jQueryPanel.active );
        debugMode && console.log( "scope:", !!scope );
    });

    $jQueryPanel.on( "dialogclose", function( event, ui ) {
        $jQueryPanel.active = false;
        $jQueryPanel.contents().remove();
        scope = undefined;
        debugMode && console.log( "dialog closed:", !$jQueryPanel.active );        
        debugMode && console.log( "scope:", scope );
    });

    $jQueryPanel.loadComponent = function(component, option){
        var jQueryComponent = componentsFolder + component; 
        $jQueryPanel.load(jQueryComponent, function(resoponse, status, xhr){
            debugMode && console.log("jquery component:", status);
            if ( !!option ) $FormPanel.dialog( "option", option );
        });
    }


























