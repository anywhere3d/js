//  avatar-body-panel.js

    var avatarBodyButtonSelector = "#avatar-body-button";

    $(avatarBodyButtonSelector).on("click", function(){

    //  Open outfit editor panel 
    //  dialog only if this is active.

        if (!this.active) return;

    //  Define the dialog target. 
    //  Here target is the local player: object.

        if ( !!localPlayer 
          && !!localPlayer.outfit 
          && !!localPlayer.outfit.body 
        ){

            target = localPlayer.outfit.body;

        } else {

            return;
        }

        var outfitBodyPanelComponent = componentsFolder + "outfit-body-panel.html";
        $OutfitEditorPanel.load(outfitBodyPanelComponent, function(resoponse, status, xhr){
            if (status == "error")   console.error( status, xhr.status, xhr.statusText );
            if (status == "success") debugMode && console.log("Outfit Body Panel:", status);
            $OutfitEditorPanel.dialog( "option", {title: "Avatar Body"} );
        });
    });


/*
    var avatarBtnSelector = ".avatar-btn";
    $(avatarBtnSelector).on("click", function(){
        showAvaliableOutfitOptions();
    });
*/
