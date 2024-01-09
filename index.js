// Import necessary modules
import express from "express";
import axios from "axios";

// Create constants for module applications
const app = express();
const port = 3000;
const apiURL = "https://api.weather.gov/gridpoints/FWD/33,96/forecast?units=us"

// Call middleware
app.use(express.static("public"));
app.set('view engine', 'ejs');

// GET request to access home page
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(apiURL, {
          headers: {
            "User-Agent": "Weatherapp/1.0 (MyEmail@gmail.com)",
          }
        });
         
        // Render the EJS template with the data
        res.render("index.ejs", { display : response.data });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        
        // Render the EJS template with an error message
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

// Initiate port listening to start Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
