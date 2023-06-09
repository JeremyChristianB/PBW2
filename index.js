import express from "express";
import path from "path";
import bodyParser from 'body-parser';

const PORT = 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.resolve('public')))
app.use(bodyParser.urlencoded({extended: true}))

app.listen(PORT, () => {
    console.log(`Server currently listening on port ${PORT}`);
});

//masuk ke halaman home pertamanya
app.get('/views/login', (req,res) =>{
    res.send("Masuk halaman login");
})

app.post('/', (req,res) =>{

})
