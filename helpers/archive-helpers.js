var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var fetcher = require('../workers/htmlfetcher');
var request = require('../node_modules/request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(this.paths.list, {encoding: 'utf-8'}, function(err, data){
    callback(data.split('\n'));
  })
};

exports.isUrlInList = function(target, callback){
  this.readListOfUrls(function(url){
    if(url.indexOf(target) !== -1){
      callback(true);
    } else {
      callback(false);
    }
  })
};

exports.addUrlToList = function(url, callback){
  fs.appendFile(this.paths.list, url + "\n", function(){
    callback(url)
  })
};

exports.isUrlArchived = function(target, callback){
    if(this.paths.archivedSites + "/" + target){
      callback(true);
    } else {
      callback(false);
    }
};

exports.downloadUrls = function(data){
  _.each(data, function(url){
    if(!url){
      return;
    }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url))
  })
  return true;
};