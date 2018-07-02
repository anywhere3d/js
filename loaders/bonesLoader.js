//  bonesLoader.js

    var debugMode;

    var skinnedFolder = "/skinned/";
    var bonesUrl = skinnedFolder + "Bones_ABK04_v02.js";

    $getBones({
        name: "bones",
        key : "bones",
        obj : Avatars,
        url : bonesUrl, 
    });

    function $getBones( options ){

        var url  = options.url;
        var key  = options.key;
        var name = options.name;
        var object = options.obj;

        CacheStorage.getItem(url).then(function(result){

        //  debugMode && console.log("result:", result);

            if ( !result || JSON.stringify(result) == "{}" ) {

                debugMode && console.log("Bones:", "Getting from web.");

                return $getJSON( options );

            } else {

                debugMode && console.log("Bones:", "Getting from cache.");

                object[ name ] = result;

            }

        }).catch(function(err) {
            console.error(err);
        });

        function $getJSON(options){

            var url  = options.url;
            var key  = options.key;
            var name = options.name;
            var object = options.obj;

            return $.getJSON( url, function(data){

                CacheStorage.setItem(url, data).then(function(result){

                    if (!result) {
                        var err = [ 
                            "AW3D Cache Error:", 
                            "No result returned:", 
                            result,
                        ].join(" ");
                        console.error(err);
                        throw Error(err);


                    } else if ( JSON.stringify(result) == "{}" ) {
                        var err = [ 
                            "AW3D Cache Warning:", 
                            "empty object returned:", 
                            JSON.stringify(result),
                        ].join(" ");
                        console.warn(err);
                        throw Error(err);

                    } else {
                        console.log("AW3D Cache:", "success!");
                        object[ name ] = result;
                    }

                }).catch(function(err) {
                    console.log(err);
                    throw Error(err);
                });

            });
        }
    }
