require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(cors({ origin: "http://localhost:3000" })); // Allow React app
app.use(express.json());


//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        //const results = await db.query("SELECT * FROM restaurants");
        const restaurantRatingData = await db.query("select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");

        
        res.status(200).json({
            status: "success",
            results: restaurantRatingData.rows.length,
            data: {
                restaurant: restaurantRatingData.rows,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});

//get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) =>{
    console.log(req.params.id);
    try{
        const restaurant = await db.query("select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id =$1",[
            req.params.id,
        ]);

        const reviews = await db.query("select * from reviews where restaurant_id = $1",[
            req.params.id,
        ]);
        console.log(reviews);

        res.status(200).json({
            status:"success",
            data:{
                restaurant: restaurant.rows[0],
                reviews : reviews.rows,
            },
        });
    } catch (err){
        console.log(err);
    }
});


//create a restaurant
app.post("/api/v1/restaurants", async(req, res) => {
    console.log(req.body);

    try{
        const results = await db.query("INSERT INTO restaurants (name,location,price_range) values($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range]);
        console.log(results);
        res.status(201).json({
            status:"success",
            data:{
                restaurant: results.rows[0],
            },
        });
    }
    catch (err){
        console.log(err);
    }
    
});

//update restaurant
app.put("/api/v1/restaurants/:id", async (req,res) => {

    try{
        const results = await db.query("update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *", 
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
        res.status(204).json({
            status:"success",
            data:{
                restaurant: results.rows[0],
            },
        });
    }catch(err) {
        console.log(err);
    }
    console.log(req.params.id);
    console.log(req.body); 
});

//delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await db.query("delete from restaurants where id = $1",[
            req.params.id,
        ]);
        res.status(204).json({
            status:"success",
        });
    }catch (err) {
        console.log(err);
    }
    
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query(
            "INSERT INTO reviews (restaurant_id, name, reviews, rating) VALUES ($1, $2, $3, $4) RETURNING *;",
            [req.params.id, req.body.name, req.body.reviews, req.body.rating]
        );
        console.log(newReview);
        res.status(201).json({
            status: 'success',
            data: {
                reviews: newReview.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});


const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});