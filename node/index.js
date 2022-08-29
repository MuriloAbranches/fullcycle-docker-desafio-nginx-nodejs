const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Murilo')`
connection.query(sql)

let peoples
const select = 'SELECT name FROM people'
connection.query(select, (error, results, fields) => {
    if (error) throw error;
    peoples = results
});

connection.end()

app.get('/', (req, res) => {

    var names = peoples.reduce((previous, current, index) => {
        let html = `<p>${current.name}</p>\n`
        return index == 0 ? current.name : previous + html
    }, '')

    res.send(
        `<h1>Full Cycle Rocks!</h1>
        <h3>Lista de nomes cadastrada no banco de dados.</h3>
        <ul>
        ${names}
        </ul>
    `)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
