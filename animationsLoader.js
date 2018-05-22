//  animationsLoader.js

    var debugMode;

    var Animations       = {}; // object.
    var MaleAnimations   = {}; // object.
    var FemaleAnimations = {}; // object.
    
    var animationsFolder = "/animations/";

//  Skeleton.
    var _idleURL = animationsFolder + "basic_idle_animation_3sec.js";
    var _walkURL = animationsFolder + "basic_walkcycle_animation_1sec_v1.js";
    var _runURL  = animationsFolder + "basic_walkcycle_animation_1sec.js";
    var _jumpURL = animationsFolder + "basic_jumping_animation_1.5sec.js";

    $.getJSON( _idleURL, function(data){
        Animations[ "idle" ] = data;
    });
    $.getJSON( _walkURL, function(data){
        Animations[ "walk" ] = data;
    });
    $.getJSON( _runURL, function(data){
        Animations[ "run" ] = data;
    });
    $.getJSON( _jumpURL, function(data){
        Animations[ "jump" ] = data;
    });


//  Male.
    var hm_idleURL = animationsFolder + "male_idle_animation_3sec.js";
    var hm_walkURL = animationsFolder + "male_walkcycle_animation_1sec_v1.js";
    var hm_runURL  = animationsFolder + "male_walkcycle_animation_1sec.js";
    var hm_jumpURL = animationsFolder + "male_jumping_animation_2sec_v5.js";

    $.getJSON( hm_idleURL, function(data){
        MaleAnimations[ "idle" ] = data;
    });
    $.getJSON( hm_walkURL, function(data){
        MaleAnimations[ "walk" ] = data;
    });
    $.getJSON( hm_runURL, function(data){
        MaleAnimations[ "run" ] = data;
    });
    $.getJSON( hm_jumpURL, function(data){
        MaleAnimations[ "jump" ] = data;
    });


//  Female.
    var hf_idleURL = animationsFolder + "female_idle_animation_3sec_v2.js";
    var hf_walkURL = animationsFolder + "female_walkcycle_animation_1sec_v4.js";
    var hf_runURL  = animationsFolder + "female_walkcycle_animation_1sec_v3.js";
    var hf_jumpURL = animationsFolder + "female_jumping_animation_2sec_v8.js";

    $.getJSON( hf_idleURL, function(data){
        FemaleAnimations[ "idle" ] = data;
    });
    $.getJSON( hf_walkURL, function(data){
        FemaleAnimations[ "walk" ] = data;
    });
    $.getJSON( hf_runURL, function(data){
        FemaleAnimations[ "run" ] = data;
    });
    $.getJSON( hf_jumpURL, function(data){
        FemaleAnimations[ "jump" ] = data;
    });












