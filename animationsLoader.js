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

        $getJSON(options);

        function $getJSON(options){

            var url = options.url;
            var key = options.key;
            var name = options.name;
            var animations = options.obj;

            $.getJSON( url, function(data){
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

        if (!result) {

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

                    if (!result) 
                        var err = "Error: No results."
                        console.log(err);
                        throw Error(err);
                    else 
                        console.log("success");

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

            if ( !!localPlayer && !!localPlayer.outfit )
                localPlayer.outfit.AnimationsHandler.refresh();
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

/*
    if ( !!window.localStorage ){

        if ( !!localStorage["aw3d.animation.idle"] )
            Animations[ "idle" ] = fromLocalStore("aw3d.animation.idle");
        else $.getJSON( sk_idleURL, function(data){
            Animations[ "idle" ] = data;
            toLocalStore("aw3d.animation.idle", data);
        });

        if ( !!localStorage["aw3d.animation.walk"] )
            Animations[ "walk" ] = fromLocalStore("aw3d.animation.walk");
        else $.getJSON( sk_walkURL, function(data){
            Animations[ "walk" ] = data;
            toLocalStore("aw3d.animation.walk", data);
        });

        if ( !!localStorage["aw3d.animation.run"] )
            Animations[ "run"  ] = fromLocalStore("aw3d.animation.run");
        else $.getJSON( sk_runURL, function(data){
            Animations[ "run" ] = data;
            toLocalStore("aw3d.animation.run", data);
        });

        if ( !!localStorage["aw3d.animation.jump"] )
            Animations[ "jump" ] = fromLocalStore("aw3d.animation.jump");
        else $.getJSON( sk_jumpURL, function(data){
            Animations[ "jump" ] = data;
            toLocalStore("aw3d.animation.jump", data);
        });

    } else {

        $.getJSON( sk_idleURL, function(data){
            Animations[ "idle" ] = data;
            toLocalStore("aw3d.animation.idle", data);
        });
        $.getJSON( sk_walkURL, function(data){
            Animations[ "walk" ] = data;
            toLocalStore("aw3d.animation.walk", data);
        });
        $.getJSON( sk_runURL, function(data){
            Animations[ "run" ] = data;
            toLocalStore("aw3d.animation.run", data);
        });
        $.getJSON( sk_jumpURL, function(data){
            Animations[ "jump" ] = data;
            toLocalStore("aw3d.animation.jump", data);
        });

    }
*/

/*
    if ( !!window.localStorage ){

        if ( !!localStorage["aw3d.animation.male.idle"] )
            MaleAnimations[ "idle" ] = fromLocalStore("aw3d.animation.male.idle");
        else $.getJSON( hm_idleURL, function(data){
            MaleAnimations[ "idle" ] = data;
            toLocalStore("aw3d.animation.male.idle", data);
        });

        if ( !!localStorage["aw3d.animation.male.walk"] )
            MaleAnimations[ "walk" ] = fromLocalStore("aw3d.animation.male.walk");
        else $.getJSON( hm_walkURL, function(data){
            MaleAnimations[ "walk" ] = data;
            toLocalStore("aw3d.animation.male.walk", data);
        });

        if ( !!localStorage["aw3d.animation.male.run"] )
            MaleAnimations[ "run" ] = fromLocalStore("aw3d.animation.male.run");
        else $.getJSON( hm_runURL, function(data){
            MaleAnimations[ "run" ] = data;
            toLocalStore("aw3d.animation.male.run", data);
        });

        if ( !!localStorage["aw3d.animation.male.jump"] )
            MaleAnimations[ "jump" ] = fromLocalStore("aw3d.animation.male.jump");
        else $.getJSON( hm_jumpURL, function(data){
            MaleAnimations[ "jump" ] = data;
            toLocalStore("aw3d.animation.male.jump", data);
        });

    } else {
    
        $.getJSON( hm_idleURL, function(data){
            MaleAnimations[ "idle" ] = data;
            toLocalStore("aw3d.animation.male.idle", data);
        });
    
        $.getJSON( hm_walkURL, function(data){
            MaleAnimations[ "walk" ] = data;
            toLocalStore("aw3d.animation.male.walk", data);
        });
    
        $.getJSON( hm_runURL, function(data){
            MaleAnimations[ "run" ] = data;
            toLocalStore("aw3d.animation.male.run", data);
        });
    
        $.getJSON( hm_jumpURL, function(data){
            MaleAnimations[ "jump" ] = data;
            toLocalStore("aw3d.animation.male.jump", data);
        });

    }
*/

/*
    if ( !!window.localStorage ){

        if ( !!localStorage["aw3d.animation.female.idle"] )
            FemaleAnimations[ "idle" ] = fromLocalStore("aw3d.animation.female.idle");
        else $.getJSON( hf_idleURL, function(data){
            FemaleAnimations[ "idle" ] = data;
            toLocalStore("aw3d.animation.female.idle", data);
        });

        if ( !!localStorage["aw3d.animation.female.walk"] )
            FemaleAnimations[ "walk" ] = fromLocalStore("aw3d.animation.female.walk");
        else $.getJSON( hf_walkURL, function(data){
            FemaleAnimations[ "walk" ] = data;
            toLocalStore("aw3d.animation.female.walk", data);
        });

        if ( !!localStorage["aw3d.animation.female.run"] )
            FemaleAnimations[ "run" ] = fromLocalStore("aw3d.animation.female.run");
        else $.getJSON( hf_runURL, function(data){
            FemaleAnimations[ "run" ] = data;
            toLocalStore("aw3d.animation.female.run", data);
        });

        if ( !!localStorage["aw3d.animation.female.jump"] )
            FemaleAnimations[ "jump" ] = fromLocalStore("aw3d.animation.female.jump");
        else $.getJSON( hf_jumpURL, function(data){
            FemaleAnimations[ "jump" ] = data;
            toLocalStore("aw3d.animation.female.jump", data);
        });

    } else {
        
        $.getJSON( hf_idleURL, function(data){
            FemaleAnimations[ "idle" ] = data;
            toLocalStore("aw3d.animation.female.idle", data);
        });
        
        $.getJSON( hf_walkURL, function(data){
            FemaleAnimations[ "walk" ] = data;
            toLocalStore("aw3d.animation.female.walk", data);
        });
        
        $.getJSON( hf_runURL, function(data){
            FemaleAnimations[ "run" ] = data;
            toLocalStore("aw3d.animation.female.run", data);
        });
        
        $.getJSON( hf_jumpURL, function(data){
            FemaleAnimations[ "jump" ] = data;
            toLocalStore("aw3d.animation.female.jump", data);
        });

    }
*/

/*
    function toLocalStore(key, data){
        return localStorage[key] = JSON.stringify(data);
    }

    function fromLocalStore(key){
        return JSON.parse( localStorage[key] );
    }
*/


/*
    if ( !store.has("Animations") ){

        $.getJSON(animationsFolder + "basic_idle_animation_3sec.js", function(data){
        	store.add("Animations", {"idle": data});
        });
        $.getJSON(animationsFolder + "basic_walkcycle_animation_1sec_v1.js", function(data){
        	store.add("Animations", {"walk": data});
        });
        $.getJSON(animationsFolder + "basic_walkcycle_animation_1sec.js", function(data){
        	store.add("Animations", {"run": data});
        });
        $.getJSON(animationsFolder + "basic_jumping_animation_1.5sec.js", function(data){
        	store.add("Animations", {"jump": data});
        });

        Animations = store("Animations");

    } else {

        var AnimationsKeys = Object.keys( store("Animations") );

        if ( !AnimationsKeys.includes("idle") ) {
            console.log("getJSON idle");
            $.getJSON(animationsFolder + "basic_idle_animation_3sec.js", function(data){
                store.add("Animations", {"idle": data});
            }).then( function(){
                console.log("store idle");
                Animations = store("Animations");            
            });
        }
    
        if ( !AnimationsKeys.includes("walk") ) {
            console.log("getJSON walk");
            $.getJSON(animationsFolder + "basic_walkcycle_animation_1sec_v1.js", function(data){
            	store.add("Animations", {"walk": data});
            }).then( function(){
                console.log("store walk");
                Animations = store("Animations");            
            });
        }
    
        if ( !AnimationsKeys.includes("run") ) {
            console.log("getJSON run");
            $.getJSON(animationsFolder + "basic_walkcycle_animation_1sec.js", function(data){
            	store.add("Animations", {"run": data});
            }).then( function(){
                console.log("store run");
                Animations = store("Animations");            
            });
        }
    
        if ( !AnimationsKeys.includes("jump") ) {
            console.log("getJSON jump");
            $.getJSON(animationsFolder + "basic_jumping_animation_1.5sec.js", function(data){
            	store.add("Animations", {"jump": data});
            }).then( function(){
                console.log("store jump");
                Animations = store("Animations");
            });
        }

    }

        Animations = store("Animations");
*/



