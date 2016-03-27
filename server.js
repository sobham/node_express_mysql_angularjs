var express = require('express');
var bodyParser = require("body-parser");

var customers = require('./routes/customers.js'); 
var app = express();


var connection  = require('express-myconnection'); 
var mysql = require('mysql');


console.log(__dirname);

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
//var customers = require('./customers.js'); 
var mysql_connection = connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'node_expresss'

    },'pool');


//connection.connect();



app.use(mysql_connection);

console.log("mysql database connection established ");

//app.get('/', routes.index);
app.get('/customers', customers.list);
//app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.delete('/customers/:id', customers.delete_customer);

app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);



/*
connection.query("select * from register",function(err, rows , fields){

	if(!err){
	console.log("Register collection -->"+fields)

	}else{

		console.log(err)
	}


});*/

app.get('/', function(req, res){
	
	console.log("Hello World");


connection.query("select * from register",function(err, rows , fields){

	if(!err){
	console.log("Register collection -->"+rows);

	//res.send("First Request");
	res.json(rows);
	


	}else{

		console.log(err)
	}


});

});

app.listen(5000, function(){
console.log("Node starting at port 5000");

});
