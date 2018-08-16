//  form-panel.js

    var debugMode;

    var form_target; // IMPORTANT //
    var formOptions; // IMPORTANT //

    var formPanelHtml = '<div id="form-panel" title="Form Panel">';

    var $FormPanel = $(formPanelHtml).dialog({ 
        autoOpen: false, 
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'fade', duration: 500 },
    });

    $FormPanel.on( "dialogopen", function( event, ui ) {
        keyInputControls.Off();
        $FormPanel.active = true;
        debugMode && console.log( "dialog opened:", $FormPanel.active );
        debugMode && console.log( "form_target:", form_target );
        debugMode && console.log( "formOptions:", formOptions );
    });

    $FormPanel.on( "dialogclose", function( event, ui ) {
        keyInputControls.On();
        $FormPanel.active = false;
        $FormPanel.contents().remove();
        form_target = undefined;
        formOptions = undefined;
        debugMode && console.log( "dialog closed:", !$FormPanel.active );
        debugMode && console.log( "form_target:", form_target );
        debugMode && console.log( "formOptions:", formOptions );
    });

    $FormPanel.loadForm = function(component, option){
        var formComponent = componentsFolder + component; 
        $FormPanel.load(formComponent, function(response, status, xhr){
            debugMode && console.log("form component:", status);
            if ( !!option ) $FormPanel.dialog( "option", option );
        });
    }

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




