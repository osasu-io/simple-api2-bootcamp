document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", fetchMovie);
});

function fetchMovie() {
    const movieName = document.getElementById("movieInput").value.trim();
    const apiKey = "442a373d"; 

    if (movieName === "") {
        alert("Please enter a movie title.");
        return;
    }

    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch movie data");
            }
            return response.json();
        })
        .then(data => {
            if (data.Response === "False") {
                alert("Movie not found");
                return;
            }

            document.getElementById("movieTitle").textContent = data.Title;
            document.getElementById("movieYear").textContent = data.Year;
            document.getElementById("moviePlot").textContent = data.Plot;
            document.getElementById("moviePoster").src = data.Poster;
            document.getElementById("movieResult").style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching movie:", error);
            alert("There was a problem fetching the movie. Please try again later.");
        });
}
