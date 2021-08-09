var groundImg,ground;
var rocketImg,player;

var asteriod1,asteriod2,asteriod3;
var AsteriodsG1;

var gameOver,gameOverImg;

var coinsG, coinsImg;

var starG, starImg;

var destroy,destroyImg;

var Points = 0;
var star = 0;

var gameState = "START";

var play, playbutton; 
var pause,pausebutton;
var exit, exitbutton;
var home, homebutton;
var next, nextbutton; 
var about, aboutbutton;

var firstgroundImg,firstground;


function preload(){
  
  groundImg = loadImage("bg/giphy.gif");
  
  rocketImg = loadImage("players/Rocket1.png");
  
  asteriod1 = loadImage("enemy/asteriod1.gif");
  asteriod2 = loadImage("enemy/asteriod2.gif");
  asteriod3 = loadImage("enemy/asteriod3.gif");
  
  gameOverImg = loadImage("players/gameover.png");
  
  coinsImg = loadImage("points/coins.gif");
  
  starImg = loadImage("points/star1.gif");
  
  destroyS = loadSound("sounds/sound1.wav");
  PointS = loadSound("sounds/sound2.wav");
  starS = loadSound("sounds/sound3.wav");
  musicX = loadSound("sounds/music1.mp3");

  playbutton = loadImage("buttons/playbutton.png");
  homebutton = loadImage("buttons/homebutton.png");
  exitbutton = loadImage("buttons/exitbutton.png");
  nextbutton = loadImage("buttons/nextbutton.png");
  aboutbutton = loadImage("buttons/aboutbutton.png");

  firstgroundImg = loadImage("bg/background1.gif");

}

function setup() {
 createCanvas(windowWidth, windowHeight);
  musicX.loop();
  
  ground = createSprite(width/2,height/2);
  ground.addImage("space",groundImg);
  ground.scale = 3;

  firstground = createSprite(width/2.3,height/2.6);
  firstground.addImage(firstgroundImg);
  firstground.scale = 2;
  firstground.visible = false;

  player = createSprite(width/2,0);
  player.addImage("Rocket",rocketImg);
  player.scale = 0.50;
  //player.debug = true;
  
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.4;
  
  coinsG = createGroup();
  starG = createGroup();
  AsteriodsG1 = createGroup();

  play = createSprite(20,height/4.96,10,10);
  play.addImage(playbutton);
  play.scale = 0.5;
  
  home = createSprite(20,height/11.90,10,10);
  home.addImage(homebutton);
  home.scale = 0.5;

  exit = createSprite(20,height/7,10,10);
  exit.addImage(exitbutton);
  exit.scale = 0.5;

  next = createSprite(20,height/5,10,10);
  next.addImage(nextbutton);
  next.scale = 0.5;

  about = createSprite(20,height/3.9,10,10);
  about.addImage(aboutbutton);
  about.scale = 0.5;

}

function draw() {

  if (gameState==="START"){

    firstground.visible = true;

    gameOver.visible = false;

    home.visible = false;
    next.visible = false;

    player.y = height/2;
    

    play.visible = true;
    
    exit.visible = true;

    if(mousePressedOver(play)){
      gameState="PLAY";
    }

  }
  
  if (gameState==="PLAY"){

    firstground.visible = false;
    
    play.visible = false;

    home.visible = true;

    next.visible = true;

    exit.visible = true;

    player.scale = 0.15;
    
    exit.x = 20;
    exit.y = height/7;
    exit.scale = 0.5;

    gameOver.visible = false;

    //player moves
    if (keyDown("up")){
      
      player.y = player.y -7;
      
    }
    if (keyDown("down")){
      
      player.y = player.y +7;
      
    }
    if (keyDown("left")){
      
      player.x = player.x -7;
      
    }
    if (keyDown("right")){
      
      player.x = player.x +7;
      
    }
    
    //points to collect
    if (coinsG.isTouching(player)){
      coinsG.destroyEach();
      Points = Points+10;
      PointS.play();
    
    }else if (starG.isTouching(player)){
      starG.destroyEach();
      star = star+1;
      starS.play();
    
    }else if (AsteriodsG1.isTouching(player)){
      gameState = "END";
      player.destroy();
      destroyS.play();
      
    }
    
    //player collide edges
    edges = createEdgeSprites();
    player.collide(edges);
    
    //Random placing
    var select_Objects = Math.round(random(1,5))
    
    if (World.frameCount % 80 == 0){
      
      if (select_Objects === 1){
        stars();
        
      }else if (select_Objects === 2){
        coins();
        
      }else if (select_Objects === 3){
        Asteriod1();
        
      }else if (select_Objects === 4){
        Asteriod2();
        
      }else {
        Asteriod3();
        
      }
      
    }

  }

  if(mousePressedOver(home)){
    
    coinsG.destroyEach();
    starG.destroyEach();
    AsteriodsG1.destroyEach();

    gameState = "START";

    player.scale = 0.50;
    player.x = width/2;
    player.y = height/2;
    
    play.visible = true;

  }

 drawSprites();

 if (gameState === "END"){

  gameOver.visible = true;
  
  if (keyDown("space")){
    reset();

  }
  textSize(20);
  fill("yellow");
  text("Click 'space' to restart",width/2.3,height/1.6);
}

 if(gameState==="PLAY"){
  textSize(18);
  fill("red");
  text("Points:"+Points,width/1.09,height/1.01);
  text("Stars:"+star,width/1.09,height/1.05);

 }
 if(mousePressedOver(about)){
   textSize(18);
   fill("yellow");
   text("*Use the Arrow Topkeys to move the player, collect the points*",320, 30);
   text("*Use the  Top Arrow keys to move the player UP*",320, 60);
   text("*Use the  Down Arrow keys to move the player Down*",320, 90);
   text("*Use the  Right Arrow keys to move the player Forward/Right*",320, 120);
   text("*Use the  Left Arrow keys to move the player Background/Left*",320, 150);
 }

 if(gameState==="START"){
  textSize(40);
  fill("lightblue");
  stroke("purple");
  strokeWeight(4);
  text("Ritish's Space ship",550,50);
 }
  
}

function Asteriod1(){
  
  if (frameCount % 80 === 0){
    
    var asta1 = createSprite(width - 5,(random(50,450)));
    asta1.addImage(asteriod1);
    asta1.velocityX = -(10 + Points/100);//-(1 + star/100);
    asta1.scale = 0.8;
    asta1.lifetime = 400;
    asta1.setCollider("circle",0,0,75);
    //asta1.debug = true;
    
    AsteriodsG1.add(asta1);
  }
}

function Asteriod2(){
  
  if (frameCount % 80 === 0){
    
    var asta2 = createSprite(width - 5,(random(50,450)));
    asta2.addImage(asteriod2);
    asta2.velocityX = -(10 + Points/100);
    asta2.scale = 0.8;
    asta2.lifetime = 400;
    asta2.setCollider("circle",0,0,75);
    //asta2.debug = true;
    
    AsteriodsG1.add(asta2);
  }
}

function Asteriod3(){
  
  if (frameCount % 80 === 0){
    
    var asta3 = createSprite(width - 5,(random(50,450)));
    asta3.addImage(asteriod3);
    asta3.velocityX = -(10 + Points/100);
    asta3.scale = 0.8;
    asta3.lifetime = 400;
    asta3.setCollider("circle",0,0,75);
    //asta3.debug = true;
    
    AsteriodsG1.add(asta3);
  }
}

function reset(){
  
  if (keyDown("space")){
    
    gameState = "PLAY";
    
    player = createSprite(50,250);
    player.addImage("Rocket",rocketImg);
    player.scale = 0.15;
    
    gameOver.visible = false;
    
    Points = 0;
    star = 0;
    
    AsteriodsG1.destroyEach();
    starG.destroyEach();
    coinsG.destroyEach();
  }
  
}
function coins(){
  
  if (frameCount % 80 === 0){
    
    var coin = createSprite(width - 5,(random(50,450)));
    coin.addImage(coinsImg);
    coin.velocityX = -(10 + Points/100);
    coin.scale = 0.19;
    
    coin.setCollider("circle",0,0,95);
    //coin.debug = true;
    
    coinsG.add(coin);
  } 
}

function stars(){
  
  if (frameCount % 80 === 0){
    
    var star = createSprite(width - 5,(random(50,450)));
    star.addImage(starImg);
    star.velocityX = -(10+Points/100);//-(5+Points/50);
    star.scale = 0.15;
    
    star.setCollider("circle",0,0,200);
    //star.debug = true;
    
    starG.add(star);
  } 
}