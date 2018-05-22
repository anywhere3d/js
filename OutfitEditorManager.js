//  OutfitEditorManager.js


//  1.Show avaliable outfit options.

    $(helpersSelector).on("click", function(){
        showAvaliableOutfitOptions();
    });


//  2.Reset color and active of all helpers.

    $OutfitEditorPanel.on( "dialogclose", function( event, ui ) {
        $OutfitEditorPanel.active = false;
        $(helpersSelector).find("a").css("color", "");
        for (var i = 0; i < $(helpersSelector).length; i++){
            $(helpersSelector)[i].active = false;
        }
    });


//  3.Toggle current helper active and reset others active.

    $(helpersSelector).on("click", function(){
        for (var i = 0; i < $(helpersSelector).length; i++){
            if ( $(helpersSelector)[i] == this ) {
                 this.active = !this.active;
            } else {
                $(helpersSelector)[i].active = false;
            }       
        }
    });


//  4.Reset all helpers color.

    $(helpersSelector).on("click", function(){
        $(helpersSelector).find("a").css("color", "");
    });


//  5.Close outfit editor panel.

    $(helpersSelector).on("click", function(){
        if ( !this.active ) $OutfitEditorPanel.dialog("close");
    });


//  6.Finaly color active helper.

    $(helpersSelector).on("click", function(){
        if (this.active) $(this).find("a").css("color", "limegreen");
    });


    function showAvaliableOutfitOptions(){
    //  version: webspaces-0.1.5-v0.1

        if ( localPlayer.outfit.getGender("male") ){

            $(maleAssetSelector).show();
            $(femaleAssetSelector).hide();
            $(unisexAssetSelector).show();

        } else if ( localPlayer.outfit.getGender("female") ){

            $(maleAssetSelector).hide();
            $(femaleAssetSelector).show();
            $(unisexAssetSelector).show();

        } else {
        
            $(maleAssetSelector).hide();
            $(femaleAssetSelector).hide();
            $(unisexAssetSelector).hide();
        }

    //  Show avaliable buttons.
        
        if ( !!localPlayer.outfit.hairs ) 
             $(avatarHairsButtonSelector).show();
        else $(avatarHairsButtonSelector).hide();

        if ( !!localPlayer.outfit.bra ) 
             $(outfitBraButtonSelector).show();
        else $(outfitBraButtonSelector).hide();

        if ( !!localPlayer.outfit.panties ) 
             $(outfitPantiesButtonSelector).show();
        else $(outfitPantiesButtonSelector).hide();

        if ( !!localPlayer.outfit.boxers )
             $(outfitBoxersButtonSelector).show();
        else $(outfitBoxersButtonSelector).hide();

        if ( !!localPlayer.outfit.tshirt )
             $(outfitTshirtButtonSelector).show();
        else $(outfitTshirtButtonSelector).hide();

        if ( !!localPlayer.outfit.tshirt
          && !!localPlayer.outfit.tshirt.material 
          && !!localPlayer.outfit.tshirt.material.materials 
          && localPlayer.outfit.tshirt.material.materials.length > 1 )
             $(outfitTshirtStampButtonSelector).show();
        else $(outfitTshirtStampButtonSelector).hide();

        if ( !!localPlayer.outfit.skirt )
             $(outfitSkirtButtonSelector).show();
        else $(outfitSkirtButtonSelector).hide();

        if ( !!localPlayer.outfit.trousers )
             $(outfitTrousersButtonSelector).show();
        else $(outfitTrousersButtonSelector).hide();

        if ( !!localPlayer.outfit.dress )
             $(outfitDressButtonSelector).show();
        else $(outfitDressButtonSelector).hide();

        if ( !!localPlayer.outfit.shoes )
             $(outfitShoesButtonSelector).show();
        else $(outfitShoesButtonSelector).hide();

    }

