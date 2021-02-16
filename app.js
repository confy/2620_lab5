/*
 Authors:
 Your name and student #:Adrian McFarlane A00957549
 Your Partner's Name and student #:Xinyue(Ingrid) Zeng A00937032
 (Make sure you also specify on the Notion Doc)
*/
const fs = require('fs')
const express = require("express");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
    let movieList = req.body.movies.split(",")
    res.render("pages/index", { movies: movieList })
})

app.get("/myListQueryString", (req, res) => {
    // Add  implementation here
    let movieList = [req.query.movie1, req.query.movie2]
    res.render("pages/index", { movies: movieList })
});

app.get("/search/:movieName", (req, res) => {
    let search = req.params.movieName
    fs.readFile("./movieDescriptions.txt", (err, data) => {
        if (err) {
            console.log("Error reading movie")
        } else {
            let movieDescriptions = data.toString()
            let movieList = movieDescriptions.split("\n")
            let moviesObj = {}

            movieList.forEach((movie) => {
                currMovie = movie.split(":")
                moviesObj[currMovie[0]] = currMovie[1]
            })

            let movieDesc = null
            if (search in moviesObj) {
                movieDesc = moviesObj[search]
            }

            res.render("pages/searchResult", { foundMovie: [search, movieDesc] })
        }
    })


});

app.listen(3000, () => {
    console.log("Server is running on port 3000 🚀");
});