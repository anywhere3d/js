//  avatar-skin-panel.js

    var avatarSkinButtonSelector = "#avatar-skin-button";

    $(avatarSkinButtonSelector).on("click", function(){

    //  Open outfit editor panel 
    //  dialog only if this is active.

        if (!this.active) return;

    //  Define the dialog target. 
    //  Here target is material: MeshLambertMaterial.

        if ( !!localPlayer 
          && !!localPlayer.outfit 
          && !!localPlayer.outfit.body
          && !!localPlayer.outfit.body.material
        ){

            if ( !!localPlayer.outfit.body.material.materials ){
                target = localPlayer.outfit.body.material.materials[0]; // IMPORTANT //
            } else { 
                target = localPlayer.outfit.body.material;              // IMPORTANT //
            }

        } else {

            return;
        }

        if ( target instanceof THREE.MeshStandardMaterial ) {
            var standardMaterialPanelComponent = componentsFolder + "standard-material-panel.html";        
            $OutfitEditorPanel.load(standardMaterialPanelComponent, function(resoponse, status, xhr){
                if (status == "error")   console.error( status, xhr.status, xhr.statusText );
                if (status == "success") debugMode && console.log("Standard Material Panel:", status);
                $OutfitEditorPanel.dialog( "option", {title: "Avatar Skin (standard)"} );
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
                $OutfitEditorPanel.dialog( "option", {title: "Avatar Skin (lambert)"} );
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
                $OutfitEditorPanel.dialog( "option", {title: "Avatar Skin (phong)"} );
            //  Settings.
                textureSize = 512;
            });
            return;
        }

    });
