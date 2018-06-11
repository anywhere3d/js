//  animationsLoader.js

    var debugMode;

    var Animations       = {}; // object.
    var MaleAnimations   = {}; // object.
    var FemaleAnimations = {}; // object.
    
    var animationsFolder = "/animations/";

    function $getAnimation( options ){

        var url = options.url;
        var key = options.key;
        var name = options.name;
        var animations = options.obj;

        return $getJSON(options);

        function $getJSON(options){

            var url = options.url;
            var key = options.key;
            var name = options.name;
            var animations = options.obj;

            return $.getJSON( url, function(data){
                animations[ name ] = data;
                if ( !!localPlayer && !!localPlayer.outfit )
                    localPlayer.outfit.AnimationsHandler.refresh();
            });
        }

    }

//  Skeleton.
    var sk_idleURL = animationsFolder + "basic_idle_animation_3sec.js";
    var sk_walkURL = animationsFolder + "basic_walkcycle_animation_1sec_v1.js";
    var sk_runURL  = animationsFolder + "basic_walkcycle_animation_1sec.js";
    var sk_jumpURL = animationsFolder + "basic_jumping_animation_1.5sec.js";

    AW3Dstore.getItem("Animations").then(function(result){

        debugMode && console.log("result:", result);

        if ( !result || JSON.stringify(result) == "{}" ) {

            debugMode && console.log("Animations:", "Getting from web");

            Promise.all([
                $getAnimation({
                    url:sk_idleURL, 
                    key:"idle", 
                    name:"idle", 
                    obj:Animations
                }),

                $getAnimation({
                    url:sk_walkURL, 
                    key:"walk", 
                    name:"walk", 
                    obj:Animations
                }),

                $getAnimation({
                    url:sk_runURL, 
                    key:"run", 
                    name:"run", 
                    obj:Animations
                }),

                $getAnimation({
                    url:sk_jumpURL, 
                    key:"jump", 
                    name:"jump", 
                    obj:Animations
                })

            ]).then(function(){

                AW3Dstore.setItem("Animations", Animations)
                .then(function(result){

                    if (!result) {
                        var err = "Error: No result:" + result;
                        console.log(err);
                        throw Error(err);

                    } else if ( JSON.stringify(result) == "{}" ) {
                        var err = "Error: empty object:" + JSON.stringify(result);
                        console.log(err);
                        throw Error(err);

                    } else {
                        console.log("success:", result);
                    }

                }).catch(function(err) {
                    console.log(err);
                    throw Error(err);
                });

            }).catch(function(err) {
                console.log(err);
            });

        } else {

            debugMode && console.log("Animations:", "Getting from AW3D Store");

            Animations = result;

            //if ( !!localPlayer && !!localPlayer.outfit )
            //  localPlayer.outfit.AnimationsHandler.refresh();
        }

    }).catch(function(err) {
        console.error(err);
    });

//  Male.
    var hm_idleURL = animationsFolder + "male_idle_animation_3sec.js";
    var hm_walkURL = animationsFolder + "male_walkcycle_animation_1sec_v1.js";
    var hm_runURL  = animationsFolder + "male_walkcycle_animation_1sec.js";
    var hm_jumpURL = animationsFolder + "male_jumping_animation_2sec_v5.js";

    $getAnimation({
        url:hm_idleURL, 
        key:"aw3d.animation.male.idle", 
        name:"idle", 
        obj:MaleAnimations
    });

    $getAnimation({
        url:hm_walkURL, 
        key:"aw3d.animation.male.walk", 
        name:"walk", 
        obj:MaleAnimations
    });

    $getAnimation({
        url:hm_runURL, 
        key:"aw3d.animation.male.run", 
        name:"run", 
        obj:MaleAnimations
    });

    $getAnimation({
        url:hm_jumpURL, 
        key:"aw3d.animation.male.jump", 
        name:"jump", 
        obj:MaleAnimations
    });

//  Female.
    var hf_idleURL = animationsFolder + "female_idle_animation_3sec_v2.js";
    var hf_walkURL = animationsFolder + "female_walkcycle_animation_1sec_v4.js";
    var hf_runURL  = animationsFolder + "female_walkcycle_animation_1sec_v3.js";
    var hf_jumpURL = animationsFolder + "female_jumping_animation_2sec_v8.js";

    $getAnimation({
        url:hf_idleURL, 
        key:"aw3d.animation.female.idle", 
        name:"idle", 
        obj:FemaleAnimations
    });

    $getAnimation({
        url:hf_walkURL, 
        key:"aw3d.animation.female.walk", 
        name:"walk", 
        obj:FemaleAnimations
    });

    $getAnimation({
        url:hf_runURL, 
        key:"aw3d.animation.female.run", 
        name:"run", 
        obj:FemaleAnimations
    });

    $getAnimation({
        url:hf_jumpURL, 
        key:"aw3d.animation.female.jump", 
        name:"jump", 
        obj:FemaleAnimations
    });
