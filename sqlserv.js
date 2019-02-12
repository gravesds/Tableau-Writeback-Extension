var Connection = require('tedious').Connection;
var config = {
    userName: 'testuser',
    password: 'test',
    server: 'localhost'
};

var connection =  new Connection(config);
connection.on('connect', function (err) {
    console.log('connected!');
    console.log(err);
    executeStatement();
    //connection.close();
});

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES; 
function executeStatement() { 
    request = new Request("SELECT * FROM DG_SANDPIT.PLAY.People", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
            if (column.value === null) {  
            console.log('NULL');  
            } else {  
            result+= column.value + " ";  
            }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    connection.execSql(request);  
}  