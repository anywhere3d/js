//  outfit-skirt-panel.js

    var outfitSkirtButtonSelector = "#outfit-skirt-button";

    $(outfitSkirtButtonSelector).on("click", function(){

    //  Open outfit editor panel 
    //  dialog only if this is active.

        if (!this.active) return;

    //  Define the dialog target. 
    //  Here target is material: MeshStandardMaterial.

        if ( !!localPlayer 
          && !!localPlayer.outfit 
          && !!localPlayer.outfit.skirt
          && !!localPlayer.outfit.skirt.material
        ){

            target = localPlayer.outfit.skirt.material; // IMPORTANT //

        } else {

            return;
        }

        if ( target instanceof THREE.MeshStandardMaterial ) {
            var standardMaterialPanelComponent = componentsFolder + "standard-material-panel.html";        
            $OutfitEditorPanel.load(standardMaterialPanelComponent, function(resoponse, status, xhr){
                if (status == "error")   console.error( status, xhr.status, xhr.statusText );
                if (status == "success") debugMode && console.log("Standard Material Panel:", status);
                $OutfitEditorPanel.dialog( "option", {title: "Outfit Skirt (standard)"} );
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
                $OutfitEditorPanel.dialog( "option", {title: "Outfit Skirt (lambert)"} );
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
                $OutfitEditorPanel.dialog( "option", {title: "Outfit Skirt (phong)"} );
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
            $OutfitEditorPanel.dialog( "option", {title: "Outfit Skirt"} );
        //  Settings.
            textureSize = 512;
        });
*/


