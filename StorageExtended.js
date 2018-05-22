//  StorageExtended.js
//  localStorage is an object.

/*  Usage: 
 *  storageAvailable("localStorage").then(function(boolean){});
 *  You can test for sessionStorage instead by calling 
 *  storageAvailable("sessionStorage") .then(function(boolean){});
 */
    function storageAvailable(type) {
        try {

            var storage = window[type];
            var x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;

        } catch(e) {

            return ( e instanceof DOMException 
                && ( e.code === 22                           //  everything except Firefox.
                || e.code === 1014                           //  Firefox.
                || e.name === "QuotaExceededError"           //  test name field too, because code might not be present (everything except Firefox).
                || e.name === "NS_ERROR_DOM_QUOTA_REACHED" ) //  Firefox.
                &&  storage.length !== 0 );                  //  acknowledge QuotaExceededError only if there's something already stored.

        }
    }
/*
 *  localStorage.find(key) promise. 
 *  Usage: localStorage.findItem(key).then(function(boolean){});
 *  You can test for sessionStorage instead by calling 
 *  storageAvailable(key).then(function(boolean){});
 */
    if ( storageAvailable("localStorage") ) {

        Storage.prototype.findItem = function(key){ 
            return new Promise(function(resolve, reject){
                resolve( !!localStorage.getItem(key) );
            });
        }

    } else {

        console.log("LocalStorage:", "not available!");
    }

