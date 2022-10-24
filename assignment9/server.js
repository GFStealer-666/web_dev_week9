const { rejects } = require('assert');
const fs = require('fs');
const http = require('http');
const { resolve } = require('path');

const hostname = 'localhost';
const port = 3000;


const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    //ทำการเรียกใช้ promise ในนี้นะ
    //แสดงผลของ json ใหม่ที่เพิ่มจำนวนเสื้อผ้าไปแล้วบน browser
    //ผล json ที่ได้บน browser จะไม่สวย ดังนั้นเราสามารถแก้ได้โดยกำหนด argument ใน JSON.stringify()
    // จะได้ JSON.stringify(<ชื่อตัวแปร JS object>, null, " ")  โดย json string ที่ได้จะมี การเว้นวรรคและบรรทัด#
    readMsg().then(editJson).then(writeMsg).then(readNewMsg).then
    ((out) => res.end(out));
    
  });

let readMsg = () => {
    return new Promise((resolve,reject) => {
        fs.readFile('cloth1.json' , 'utf-8' , (err ,cloth_info) => {
            if(err)
                reject (err);
            else{
                resolve(cloth_info);
            }           
        })
    })
    // อ่านไฟล์ cloth1.json
}

// จำนวนเสื้อผ้าตามที่กำหนด
let editJson = (data) => { 
    const stock = {
        item1: 2,
        item2: 3,
        item3: 5,
        item4: 2,
        item5: 5,
        item6: 8,
        item7: 1,
        item8: 9,
        item9: 0
    }
    return new Promise((resolve,reject ) => {
        fs.writeFile('new_cloth.json' , 'utf-8' ,(err)=>{
            if(err){
                reject(err);
            }
            else {
                var jsondata = JSON.parse(data);
                var clothkeys = Object.keys(jsondata);
                // console.log(jsondata);
                // console.log(datakeys.length);
                var stockInfo = Object.keys(stock);
                // console.log(stock[stockInfo[0]]); 
                for(var sk = 0 ; sk < clothkeys.length ; sk++){
                    var newStockValue = stock[stockInfo[sk]].toString();
                    // console.log(newStockValue);
                    jsondata[clothkeys[sk]]["available"] = newStockValue;
                   

                }
                var newJsonString = JSON.stringify(jsondata , null , " ");
                // console.log(jsondata);
                // console.log("new json string" + newJsonString);
                resolve(newJsonString);
                // console.log(newJsonString);
            }
        })
    })
    
}

let writeMsg = (data) =>{
    //ทำการเขียนไฟล์ใหม่ขึ้นมา
    return new Promise((resolve , reject)=>{
        fs.writeFile('new_cloth.json' , data,(err) =>{
            if(err)
                reject(err);
            else 
                resolve(data);

        })
    })
}

let readNewMsg = (data) => {
    return new Promise((resolve , reject)=>{
        fs.readFile('new_cloth.json', 'utf8' ,(err,data)=>{
            if(err){
                reject(err);    
            }           
            else
                resolve(data);
        })
    })
}

server.listen(port, hostname, () => {
console.log(`Server running at   http://${hostname}:${port}/`);
});




