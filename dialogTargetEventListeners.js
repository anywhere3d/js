//  dialogTargetEventListeners.js

    function targetremoveInputEventListener(selector){
        $(selector).off("input");
    }

    function targetremoveChangeEventListener(selector){
        $(selector).off("change");
    }

    function targetremoveClickEventListener(selector){
        $(selector).off("click");
    }

    function targetInputEventListener(selector, option){
        $(selector).on("input", function(){
            target[ option ] = parseFloat( this.value );
        });
    }

    function targetChangeEventListener(selector, option){
        $(selector).on("change", function(){
            target[ option ] = parseFloat( this.value );
        });
    }

    function targetCheckedEventListener(selector, option){
        $(selector).on("click", function(){
            target[ option ] = this.checked;
        });
    }

    function targetClickFileInputEventListener(selector, fileinputSelector){
        $(selector).on( "click", function(){
            if (!target) return;
            $(fileinputSelector).val("");  // reset Filelist.
            $(fileinputSelector).click();  // open file input window.
        });
    }

    function targetDesktopMapFileInputEventListener(selector, map, callback){

        $(selector).on("change", function(e){

            if (!target) return;
            if ( e.currentTarget.files.length == 0 ) return;

        //  Get file, name and extension.
            var file = e.currentTarget.files[0];
            var filename = file.name;
            debugMode && console.log("filename:", filename);

            var ext = filename.split( "." ).pop().toLowerCase();
            var name = filename.split( "." ); name.pop(); 
            name = name.join( "." ).replace(/\W/g, "_");
            debugMode && console.log("name:", name, "extension:", ext);

        //  File Reader.
            var reader = new FileReader();
            reader.onerror = onReaderError;
            reader.onload = onReaderLoad;
            reader.readAsDataURL(file);

            function onReaderError(err){
                console.error(err);
            }
    
            function onReaderLoad(event){
                var img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = onImageLoad;
                img.src = reader.result;
            }
    
            function onImageLoad(){
                var canvas = makeFixedPowerOfTwo( this, textureSize ); // "this" is "img".
                if (!!canvas){
                    var texture = new THREE.Texture( canvas );
                    texture.name = name;
                    texture.sourceFile = null;  //  "/desktop/fakepath/" + file.name;
                    debugMode && console.log( "Texture has been created:", texture );
    
                //  Dispose old texture.
                    if (!!target[ map ]) {
                        deallocateTextures( target[ map ] );
                        target[ map ] = null;
                    }

                //  Apply texture.
                    target[ map ] = texture;
                    target[ map ].needsUpdate = true;
                    target.needsUpdate = true;

                //  callback.
                    if (!!callback) callback();
                }
    
            //  Delete image.
                $(this).remove(); debugMode && console.log( "Texture image has been removed." );
            }

        });
    }

    function targetRemoveTextureEventListener(importSelector, removeSelector, map){
        $(removeSelector).on("click", function(){
            if (!!target[ map ]) {
            //  Dispose texture.
                deallocateTextures( target[ map ] );
                target[ map ] = null;
                target.needsUpdate = true;
            //  Show import button.
                $(importSelector).show();
                $(removeSelector).hide();
            }
        });
    }

    function toggleImportRemoveButton(importSelector, removeSelector, map){
        if (!!target[ map ]) {
            $(importSelector).hide();
            $(removeSelector).show();
        } else {
            $(importSelector).show();
            $(removeSelector).hide();
        }
    }
