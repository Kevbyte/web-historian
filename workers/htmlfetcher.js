// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');
var fs = require('fs');

// exports.fetch = function(){
//   var results = [];

//   archive.readListOfUrls(function(urls){
//     console.log("readListOfUrls", urls)
//     _.each(urls, function(url){
//         archive.isUrlArchived(archive.paths.archivedSites+"/"+url, function(isPresent){
//           if(!isPresent){
//             archive.downloadUrls([])
//           }
//         })
//     });
    
//   });

// };
archive.readListOfUrls(archive.downloadUrls);