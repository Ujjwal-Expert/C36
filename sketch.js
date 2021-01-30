/*as of now, ball movements are async(ball mov differs from one browser to another)
Goal: To make the ball movement syncho

Before: How to read and write data
Ujjwal:1
Section:B

JSON data structure: key:value

on--- read data from database on("value", function(data){})
update--- update some 
set-- .set().. delete all then it will update the new data into the database
*/

var position;
var ball;
function setup(){
    createCanvas(600,600);

    ball = createSprite(200,200,20,20);

    database = firebase.database();
    //readDB();
    
    var dbRef = database.ref('ball/position');
    dbRef.on("value", readPosition, showError);

}

function draw(){
    background("white");

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    if(keyDown(RIGHT_ARROW)){
        writePosition(+1,0);
    }
    if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    
    drawSprites();

}

function writePosition(x,y){
    var dbRef= database.ref('ball/position').set({
        'x':position.x + x,
        'y': position.y + y
    })
}

function readPosition(data){
   

    
        position = data.val();
        console.log(position);

        ball.x = position.x;
        ball.y = position.y;



    
}

function showError(){
    console.log("Error in writing to the database");
}