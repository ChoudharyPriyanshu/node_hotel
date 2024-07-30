/* // FS AND OS 
  let fs= require('fs'); 
let os = require('os');

let user = os.userInfo();
console.log(user.username);
fs.appendFile('greeting.txt', "hii " + user.username + "\n", ()=>{console.log("file is created ")}); 

// IMPORTING OTHER FILE

let notes = require("./notes.js");
let age = notes.age;
let result = notes.add(2,5);

 console.log(age, result);
 

 // LODASH pakage 
  let arr =[ "name", "name",1,1,2,3,4];
  let _ = require('lodash');
  let ans = _.uniq(arr);
  console.log(ans);

  console.log(_.isString('1')); */
   
  //JSON 
 /* const jsonstring = '{ "name" : " priyanshu"   , "age" : 19 }'
  const jsonobject = JSON.parse(jsonstring);
  console.log(jsonobject);

 const jsonobj = {
  name: "priyanshu" ,
  age : 18 
 }
 const jsonstr = JSON.stringify(jsonobj);
 console.log(jsonstr);
 
 console.log(typeof jsonstr);

 console.log(typeof jsonobject); */

 //CREATING SERVER

const express = require('express');
const app = express();
const db = require('./db');



const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('welcome to my hotel')
})
 
//import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemsRoutes');
//use the router 
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.listen(3000 ,()=>{
  console.log('server is listening at 3000 port');
 
});