//  anywheredb.js

    var db_VERSION = 2;
    var db_NAME = "anywheredb";
    
    var db = new zango.Db( db_NAME, db_VERSION, {
        user: true,
        objects: true,
        geometries: true,
        materials: true,
        textures: true,
        images: true,
        files: true,
        assets: true,
        avatars: true,
        outfits: true,
        bones: true,
        poses: true,
        animations: true,
        gallery: true,        
        snapshots: true,
        skyboxes: true,
        players: true,
        scenes: true,
        demo: true,
        scratchpad: true,
    });


    db.open(function(err, database){
        if (err) console.log( err );
    }).then( function(){
/*
    //  console.log("Collections:");
        User = db.collection('user');              //  console.log(User.name );
        Objects = db.collection('objects');        //  console.log(Objects.name );
        Geometries = db.collection('geometries');  //  console.log(Geometries.name );
        Materials = db.collection('materials');    //  console.log(Materials.name );
        Textures = db.collection('textures');      //  console.log(Textures.name );
        Images = db.collection('images');          //  console.log(Images.name );
        Files = db.collection('files');            //  console.log(Files.name );
        Assets = db.collection('assets');          //  console.log(Assets.name );
    //  Avatars = db.collection('avatars');        //  console.log(Avatars.name );
    //  Outfits = db.collection('outfits');        //  console.log(Outfits.name );
        Bones = db.collection('bones');            //  console.log(Bones.name );
        Poses = db.collection('poses');            //  console.log(Poses.name );
    //  Animations = db.collection('animations');  //  console.log(Animations.name );
        Gallery = db.collection('gallery');        //  console.log(Gallery.name );
        Snapshots = db.collection('snapshots');    //  console.log(Snapshots.name );
        Skyboxes = db.collection('skyboxes');      //  console.log(Skyboxes.name );
        Players = db.collection('players');        //  console.log(Players.name );
        Scenes = db.collection('scenes');          //  console.log(Scenes.name );
        Demo = db.collection('demo');              //  console.log(Demo.name );
        Scratchpad = db.collection('scratchpad');  //  console.log(Scratchpad.name );
*/
        debugMode && console.log("Database %s opened and ready for use.", db.name);

    });

















