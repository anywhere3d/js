//  outfit-trousers-panel.js

    var outfitTrousersButtonSelector = "#outfit-trousers-button";

    $(outfitTrousersButtonSelector).on("click", function(){

    //  Open outfit editor panel 
    //  dialog only if this is active.

        if (!this.active) return;

    //  Define the dialog target. 
    //  Here target is material: MeshStandardMaterial.

        if ( !!localPlayer 
          && !!localPlayer.outfit 
          && !!localPlayer.outfit.trousers
          && !!localPlayer.outfit.trousers.material
        ){

            target = localPlayer.outfit.trousers.material; // IMPORTANT //

        } else {

            return;
        }

        if ( target instanceof THREE.MeshStandardMaterial ) {
            var standardMaterialPanelComponent = componentsFolder + "standard-material-panel.html";        
            $OutfitEditorPanel.load(standardMaterialPanelComponent, function(resoponse, status, xhr){
                if (status == "error")   console.error( status, xhr.status, xhr.statusText );
                if (status == "success") debugMode && console.log("Standard Material Panel:", status);
                $OutfitEditorPanel.dialog( "option", {title: "Outfit Trousers (standard)"} );
            //  Settings.
                textureSize = 512;
            });
            return;
        }
    
        if ( target instanceof THREE.MeshLambertMaterial ) {
            var lambertMaterialPanelComponent = componentsFolder + "lambert-material-panel.html";        
            $OutfitEditorPanel.load(lambertMaterialPanelComponent, function(resoponse, status, xhr){
                if (status == "error")   console.error( status, xhr.status, xhr.statusText );
                if (status == "success") debugMode && console.log("Lambert Material Panel:", status);
                $OutfitEditorPanel.dialog( "option", {title: "Outfit Trousers (lambert)"} );
            //  Settings.
                textureSize = 512;
            });
            return;
        }

        if ( target instanceof THREE.MeshPhongMaterial ) {
            var phongMaterialPanelComponent = componentsFolder + "phong-material-panel.html";        
            $OutfitEditorPanel.load(phongMaterialPanelComponent, function(resoponse, status, xhr){
                if (status == "error")   console.error( status, xhr.status, xhr.statusText );
                if (status == "success") debugMode && console.log("Phong Material Panel:", status);
                $OutfitEditorPanel.dialog( "option", {title: "Outfit Trousers (phong)"} );
            //  Settings.
                textureSize = 512;
            });
            return;
        }

    });

/*
        var standardMaterialPanelComponent = componentsFolder + "standard-material-panel.html";        
        $OutfitEditorPanel.load(standardMaterialPanelComponent, function(resoponse, status, xhr){
            if (status == "error")   console.error( status, xhr.status, xhr.statusText );
            if (status == "success") debugMode && console.log("Standard Material Panel:", status);
            $OutfitEditorPanel.dialog( "option", {title: "Outfit Trousers"} );
        //  Settings.
            textureSize = 512;
        });
*/
