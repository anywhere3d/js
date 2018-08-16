//  jquery-getFunction.js

/*  Usage:
 *  Return the jqXHR object,
 *  so we can chain callbacks. 
 *  var jqXHR = $.getFunction( "ajax/test.js" )
 *  .then(function( script, textStatus, jqXHR ) {
 *      console.log( textStatus );
 *  }).fail(function(err){
 *      console.error( "error" );
 *  }).always(function() {
 *      console.log( "complete" );
 *  });
 */
 
// Define a $.getFunction() method 
// that allows fetching a function script;

jQuery.getFunction = function( url, options ) {
//  Allow user to set any option
//  except for dataType, cache, and url.
    options = $.extend( options || {}, {
        url: url,
        cache: false,
        dataType: "script"
    });
 
//  Use $.ajax() since it is more flexible than $.getScript.
//  Return the jqXHR object so we can chain callbacks.
    return jQuery.ajax( options );
};

// Define a $.getFunction() method 
// that allows fetching a cached function script;

jQuery.getCachedFunction = function( url, options ) {
//  Allow user to set any option
//  except for dataType, cache, and url.
    options = $.extend( options || {}, {
        url: url,
        cache: true,
        dataType: "script"
    });
 
//  Use $.ajax() since it is more flexible than $.getScript
//  Return the jqXHR object so we can chain callbacks
    return jQuery.ajax( options );
};
