// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');


exports.fetch = function(){
  var results = [];
  archive.readListOfUrls(function(urls){
    urls.each(function(url){
      if(isUrlInList(url, function(){
        
      }))
    })
  })
}