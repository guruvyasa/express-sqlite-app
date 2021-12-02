let express = require("express")
let db = require("./database.js")
let app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({
    extended: true
  }));
app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/start",async (req, res)=>{
    let students = await db.getStudents()
    console.log(students)
    res.render("start",{students})
})

app.post("/addStudent",async (req,res)=>{
    let name = req.body.name
    let phone = req.body.phone
    let msg = await db.addStudent(name,phone)
    res.redirect("/start")

})

app.listen(3000, ()=>{
    console.log("server listening!!")
})