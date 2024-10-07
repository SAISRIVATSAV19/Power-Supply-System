const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;


app.use(express.urlencoded()) //middleware





// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
