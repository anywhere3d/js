//  avatar-gender-panel.js

    var avatarGenderButtonSelector = "#avatar-gender-button";

    $(avatarGenderButtonSelector).on("click", function(){

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

        var outfitGenderPanelComponent = componentsFolder + "outfit-gender-panel.html";        
        $OutfitEditorPanel.load(outfitGenderPanelComponent, function(resoponse, status, xhr){
            if (status == "error")   console.error( status, xhr.status, xhr.statusText );
            if (status == "success") debugMode && console.log("Outfit Gender Panel:", status);
            $OutfitEditorPanel.dialog( "option", {title: "Avatar Gender"} );
        });
    });
