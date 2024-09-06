const express = require("express")
const app = express();
const PORT = 3000;

// body parsing middleware
app.use(express.json());
app.use(require("morgan")("dev"))

//api routes
app.use("/api",require("./api"));

// error handling middleware
app.use((error,req,res,next)=>{
    res.status(res.status||500).send({error:error})
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})