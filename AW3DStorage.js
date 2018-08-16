//  AW3DStorage.js

//  AW3D IndexedDB collections.

    var localForageScript = "/js/localforage.js";
    $.getScript( localForageScript, function(script, status, xhr){
        debugMode && console.log("localforage:", status);

    //  Create collections.

        var CacheStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "cache",
            version: 1.0
        });

        var BoneStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "bones",
            version: 1.0
        });

        var PoseStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "poses",
            version: 1.0
        });

        var AnimationStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "animations",
            version: 1.0
        });

        var GeometryStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "geometries",
            version: 1.0
        });

        var MaterialStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "material",
            version: 1.0
        });

        var TextureStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "textures",
            version: 1.0
        });

        var SkyboxStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "skyboxes",
            version: 1.0
        });

        var SkydomeStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "skydomes",
            version: 1.0
        });

        var GalleryStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "gallery",
            version: 1.0
        });

        var ImageStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "images",
            version: 1.0
        });

        var OutfitStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "outfits",
            version: 1.0
        });

        var DnaStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "dna",
            version: 1.0
        });

        var UserStorage = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: "user",
            version: 1.0
        });

        CacheStorage.ready().then(function() {
            console.log("[CacheStorage ready]:", CacheStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[CacheStorage Error]:", err); 
        });
    
        BoneStorage.ready().then(function() {
            console.log("[BoneStorage ready]:", BoneStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[BoneStorage Error]:", err); 
        });
    
        PoseStorage.ready().then(function() {
            console.log("[PoseStorage ready]:", PoseStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[PoseStorage Error]:", err); 
        });
    
        AnimationStorage.ready().then(function() {
            console.log("[AnimationStorage ready]:", AnimationStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[AnimationStorage Error]:", err); 
        });
    
        GeometryStorage.ready().then(function() {
            console.log("[GeometryStorage ready]:", GeometryStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[GeometryStorage Error]:", err); 
        });
    
        MaterialStorage.ready().then(function() {
            console.log("[MaterialStorage ready]:", MaterialStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[MaterialStorage Error]:", err); 
        });
    
        TextureStorage.ready().then(function() {
            console.log("[TextureStorage ready]:", TextureStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[TextureStorage Error]:", err); 
        });
    
        SkyboxStorage.ready().then(function() {
            console.log("[SkyboxStorage ready]:", SkyboxStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[SkyboxStorage Error]:", err); 
        });
    
        SkydomeStorage.ready().then(function() {
            console.log("[SkydomeStorage ready]:", SkydomeStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[SkydomeStorage Error]:", err); 
        });
    
        GalleryStorage.ready().then(function() {
            console.log("[GalleryStorage ready]:", GalleryStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[GalleryStorage Error]:", err); 
        });
    
        ImageStorage.ready().then(function() {
            console.log("[ImageStorage ready]:", ImageStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[ImageStorage Error]:", err); 
        });
    
        OutfitStorage.ready().then(function() {
            console.log("[OutfitStorage ready]:", OutfitStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[OutfitStorage Error]:", err); 
        });
    
        DnaStorage.ready().then(function() {
            console.log("[DnaStorage ready]:", DnaStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[DnaStorage Error]:", err); 
        });
    
        UserStorage.ready().then(function() {
            console.log("[UserStorage ready]:", UserStorage.driver()); // <-- asyncStorage
        }).catch(function (err) {
            console.error("[UserStorage Error]:", err); 
        });

    });


    function createStorage( name, version ){
        return localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "anywhere3d",
            storeName: name,
            version: version || 1.0
        });
    }


