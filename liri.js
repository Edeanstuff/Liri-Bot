var dotenv = require("dotenv").config();
var request = require("request");
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require("omdb");
if(process.argv[2]==="my-tweets") {
    console.log("you are looking at my tweets");
    tweets();
}else if (process.argv[2]==="spotify-this-song") {
    console.log("you are looking up a song.")
    spotit();
}else if (process.argv[2]==="movie-this") {
    console.log("movie thing")
}else if (process.argv[2]=== "do-what-it-says") {
    console.log("do your thing");
}else {
    console.log("This is not a valid command.");
}
function tweets() {
    var client = new Twitter(keys.twitter);
    var param = {screen_name: process.argv[3], count: 20};

     client.get('statuses/user_timeline/', param, function(error, 
     tweets, response) {
         if (error) {
            console.log(tweets);
             throw error;
         } else {
             for(i=0;i<tweets.length;i++){
                console.log("Tweet " + i);
                console.log("--------------------------")
                console.log(tweets[i].text);

             }
         }
     });
 }
 function spotit() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'artist,track,album', query: process.argv[3], limit: 1}, function(err,data) {
        if (err) {
            throw err;
        }else {
      console.log("Name of song: " + data.tracks.items[0].name);
      console.log("Name of Artist: " + data.tracks.items[0].artists[0].name); 
      console.log("External: " + data.tracks.items[0].external_urls.spotify); 
      console.log("Album Name: "+ data.tracks.items[0].album.name); 
        }
      });
 }