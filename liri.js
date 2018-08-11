var dotenv = require("dotenv").config();
var request = require("request");
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require("omdb");
var fs = require("fs");
if(process.argv[2]==="my-tweets") {
    tweets(process.argv[3]);
}else if (process.argv[2]==="spotify-this-song") {
    spotit(process.argv[3]);
}else if (process.argv[2]==="movie-this") {
    ombd(process.argv[3]);
}else if (process.argv[2]=== "do-what-it-says") {
    doit();
}else {
    console.log("This is not a valid command.");
}
function tweets(person) {
    var client = new Twitter(keys.twitter);
    var param = {screen_name: person, count: 20};

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
 function spotit(song) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'artist,track,album', query: song, limit: 1}, function(err,data) {
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
 function ombd (movie) {
    request("http://www.omdbapi.com/?t=" + movie + "&apikey=1966280d", function(error, response, body) {
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year Realeased : " + JSON.parse(body).Year);
    console.log("IMDB Rating : " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  })
}
function doit() {
    fs.readFile('random.txt', "UTF-8", function read(err, data) {
        if (err) {
            throw err;
        }    
        var array = data.split(",");
        if(array[0]==="spotify-this-song"){
            spotit(array[1]);
        }else if (array[0]==="my-tweets") {
            tweets(array[1]);
        }else if(array[0]==="movie-this") {
            ombd(array[1]);
        }
        
    });
}