//  avatar-eyes-panel.js

    var avatarEyesButtonSelector = "#avatar-eyes-button";

    $(avatarEyesButtonSelector).on("click", function(){

    //  Open outfit editor panel 
    //  dialog only if this is active.

        if (!this.active) return;

    //  Define the dialog target. 
    //  Here target is material: MeshStandardMaterial.
    
        if ( !!localPlayer 
          && !!localPlayer.outfit 
          && !!localPlayer.outfit.body
          && !!localPlayer.outfit.body.material
          && !!localPlayer.outfit.body.material.materials
          && localPlayer.outfit.body.material.materials.length > 1 
        ){

            target = localPlayer.outfit.body.material.materials[1]; // IMPORTANT //

        } else {

            return;
        }

        if ( target instanceof THREE.MeshStandardMaterial ) {
            var standardMaterialPanelComponent = componentsFolder + "standard-material-panel.html";        
            $OutfitEditorPanel.load(standardMaterialPanelComponent, function(resoponse, status, xhr){
                if (status == "error")   console.error( status, xhr.status, xhr.statusText );
                if (status == "success") debugMode && console.log("Standard Material Panel:", status);
                $OutfitEditorPanel.dialog( "option", {title: "Avatar Eyes (standard)"} );
            //  Settings.
                textureSize = 128;
            });
            return;
        }
    
        if ( target instanceof THREE.MeshLambertMaterial ) {
            var lambertMaterialPanelComponent = componentsFolder + "lambert-material-panel.html";        
            $OutfitEditorPanel.load(lambertMaterialPanelComponent, function(resoponse, status, xhr){
                if (status == "error")   console.error( status, xhr.status, xhr.statusText );
                if (status == "success") debugMode && console.log("Lambert Material Panel:", status);
                $OutfitEditorPanel.dialog( "option", {title: "Avatar Eyes (lambert)"} );
            //  Settings.
                textureSize = 128;
            });
            return;
        }

        if ( target instanceof THREE.MeshPhongMaterial ) {
            var phongMaterialPanelComponent = componentsFolder + "phong-material-panel.html";        
            $OutfitEditorPanel.load(phongMaterialPanelComponent, function(resoponse, status, xhr){
                if (status == "error")   console.error( status, xhr.status, xhr.statusText );
                if (status == "success") debugMode && console.log("Phong Material Panel:", status);
                $OutfitEditorPanel.dialog( "option", {title: "Avatar Eyes (phong)"} );
            //  Settings.
                textureSize = 128;
            });
            return;
        }

    });

/*
        var standardMaterialPanelComponent = componentsFolder + "standard-material-panel.html";        
        $OutfitEditorPanel.load(standardMaterialPanelComponent, function(resoponse, status, xhr){
            if (status == "error")   console.error( status, xhr.status, xhr.statusText );
            if (status == "success") debugMode && console.log("Standard Material Panel:", status);
            $OutfitEditorPanel.dialog( "option", {title: "Avatar Eyes"} );
        //  Settings.
            textureSize = 128;
        });
*/
