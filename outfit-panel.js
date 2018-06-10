//  outfit-panel.js

    var avatarOutfitButtonSelector = "#avatar-outfit-button";

    $(avatarOutfitButtonSelector).on("click", function(){

    //  Open outfit editor panel 
    //  dialog only if this is active.

        if (!this.active) return;

    //  Define the dialog target. 
    //  Here target is the local player outfit: object.

        if ( !!localPlayer && !!localPlayer.outfit ) {

            target = localPlayer.outfit;

        } else {

            return;
        }

        var outfitEditorPanelComponent = componentsFolder + "outfit-editor-panel.html";        
        $OutfitEditorPanel.load(outfitEditorPanelComponent, function(resoponse, status, xhr){
            if (status == "error")   console.error( status, xhr.status, xhr.statusText );
            if (status == "success") debugMode && console.log("Outfit Editor Panel:", status);
            $OutfitEditorPanel.dialog( "option", {title: "Outfit Editor"} );
            showAvaliableOutfitOptions();  // IMPORTANT //
        });
    });
