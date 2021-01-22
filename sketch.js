// adding var's
var backdrop,backdrop_image
var monkey,monkey_running,ground,ground_image,invground
var obstacle,obs_image1,obs_image2,obs_image3,obs_image4,obs_image5,obs_image6
var obstacle_group
var gamestate = "play"
var gameOver,gameOver_image,restart,restart_image
var count=0
var mySound
var playSound
var BananaGroup
var banana,banana_image
var baSound
var box
var monkey_stop
var overSound
var flag = 0

function preload () {
  backdrop_image = loadImage("backdrop1.6.jpg")
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  ground_image = loadImage("ground1.3.png")
  monkey_stop = loadImage("Monkey_01.png")
  obs_image1 = loadImage("stone.png")
  obs_image2 = loadImage("bush1.png")
  obs_image3 = loadImage("peel1.png")
  obs_image4 = loadImage("hill1.png")
  obs_image5 = loadImage("stone.png")
  obs_image6 = loadImage("peel1.png")
  banana_image = loadImage("banana.png")
  gameOver_image = loadAnimation("gameOver.png")
  restart_image = loadAnimation("restart.png")
  soundFormats('mp3');
  mySound = loadSound('begin_monkey');
  playSound = loadSound('Jump!')
  baSound = loadSound('Banana Collected')
  overSound = loadSound('Gameover_voice')
}


function setup() {
  createCanvas(1600,722);
  backdrop = createSprite(1000,325,5000,15);
  backdrop.scale = 2.35
  backdrop.addImage(backdrop_image)
  monkey = createSprite(200,220,20,50);
  monkey.x = 100
  monkey.addAnimation("running",monkey_running)
  monkey.addImage("stop",monkey_stop)
  monkey.scale = 0.3
  ground = createSprite(1000,685,5000,15);
  ground.scale = 2
  ground.addImage(ground_image)
  invground = createSprite(300,657,3000,5)
  invground.visible = false;
  //100,7,-200,-10; 200,185,800,1
  obstacle_group = new Group();
  BananaGroup = new Group();
  //place gameOver and restart icon on the screen
  gameOver = createSprite(750,300);
  restart = createSprite(750,400);
  box = createSprite(700,600,20,20)
  box.visible = true
  
  gameOver.addAnimation("gameOver",gameOver_image);
  gameOver.scale = 0.8;
  
  restart.addAnimation("restart",restart_image);
  restart.scale = 0.8;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(63, 121, 13);

  Edges = createEdgeSprites()
    
  monkey.bounceOff(Edges) 
  
  if(keyDown("enter")) {
    mySound.play(); 
  }
  

  monkey.collide(invground);
  if(gamestate === "play") {


    
  //  count= count+Math.round(getFrameRate()/60)
        //jump when the space key is pressed

  if(monkey.isTouching(BananaGroup) && flag == 0) {
    count = count + 1
    flag = 2
  }
  if(!(monkey.isTouching(BananaGroup))&& flag == 2){
    flag = 0
  }


    if((keyDown("space") || keyDown("up")) && monkey.y >= 555){
      monkey.velocityY = -15 ;
    }

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.3;
  
  ground.velocityX = -5
  
  //resetting ground
  if (ground.x < 0){
      ground.x = ground.width/2;
    }

  if (BananaGroup.isTouching(monkey)) {
      baSound.play();
  }

  if(obstacle_group.isTouching(box)) {
    playSound.play();
  }

  spawnObstacles();
  spawnBana();
    
  if(obstacle_group.isTouching(monkey)) {
    gamestate = "end"
    overSound.play();
  }
  
  } 
  else if(gamestate === "end") {
          gameOver.visible = true;
    restart.visible = true;

    
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacle_group.setVelocityXEach(0);

    
    //set lifetime of the game objects so that they are never destroyed
    obstacle_group.setLifetimeEach(-1);
    
        //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.changeAnimation("stop",monkey_stop)
    
     if(mousePressedOver(restart)) {
    reset();
  }
    }
  drawSprites();
  textSize(50)
  text("Score: "+count,800,70)
}


function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacles = createSprite(1700,590,10,10);
    obstacles.velocityX = -6;
    obstacles.scale = 0.3;
    obstacles.lifetime = -170
    obstacles.debug = false;
    obstacle_group.add(obstacles)
    obstacles.setCollider("circle",0,0,40);
    var r = Math.round(random(1,6));
    switch(r)  {
      case 1:obstacles.addImage(obs_image1)
              break;
      case 2:obstacles.addImage(obs_image2)
              break;
      case 3:obstacles.addImage(obs_image3)
              break;
      case 4:obstacles.addImage(obs_image4)
              break;
      case 5:obstacles.addImage(obs_image5)
              break;
      case 6:obstacles.addImage(obs_image6)
              break;
      default:break;
    }
  }
  
}
function spawnBana() {
  //write code here to spawn the clouds
  if (World.frameCount % 200 === 0) {
    var banana = createSprite(1600,320,40,10);
    banana.addImage(banana_image)
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.debug = true;
    banana.setCollider("circle",0,0,1);
    
     //assign lifetime to the variable
    banana.lifetime = 900;
    //add each cloud to the group
    BananaGroup.add(banana);
  }
}

function reset(){
  count = 0;
  gamestate = "play";
  gameOver.visible = false;
  restart.visible = false;
  obstacle_group.destroyEach();
  BananaGroup.destroyEach();
  monkey.changeAnimation("running",monkey_running);
}

