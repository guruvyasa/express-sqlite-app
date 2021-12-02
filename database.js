let sqlite3 = require('sqlite3')
let { open } = require("sqlite")

// you would have to import / invoke this in another file
async function openDb () {
  return open({
    filename: 'store.db',
    driver: sqlite3.Database
  })
}
async function getStudents(){
    let query = `select * from student`
    try {
        let db = await openDb()
        let students = await db.all(query)
        return students
        return "student created successfully!"
    } catch (error) {
        console.log(error)
        return []
    }
}

async function addStudent(name, phone){
    console.log(name, phone)
    let query = `insert into student values(NULL,?,?)`
    try {
        let db = await openDb()
        await db.run(query,[name,phone])
        return "student created successfully!"
    } catch (error) {
        return "error "+error
    }
}

async function createTable(){
    let query = `create table student(id integer primary key,name varchar(50) not null, phone varchar(10) not null)`
    try {
        let db = await openDb()
        await db.exec(query)
        console.log("table created successfully!")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
addStudent,
getStudents
}

// createTable()

