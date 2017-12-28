init(50,"mylegend",600,400,main);
LSystem.screen(LStage.FULL_SCREEN);

var backLayer,
loadingLayer,
logoLayer,
sceneLayer,
snowLayer,
stageLayer,
charaLayer,
overLayer,
gameoverLayer;
var point = 0,time = 1000*30;
var showTime;
var plopSound,backSound;
var playerName;
var pointText,timeText,resultText;
var imglist = [];
var imgData = [
	{path:"./js/gameLogo.js",type:"js"},
	{path:"./js/Charactor.js",type:"js"},
	{path:"./js/Stage.js",type:"js"},
	{name:"player",path:"./images/airplane.png"},
	{name:"logoback",path:"./images/logoback.jpg"},
	{name:"background",path:"./images/background.png"},
	{name:"house",path:"./images/house.png"},
	{name:"costume0",path:"./images/costume0.png"},
	{name:"costume1",path:"./images/costume1.png"},
	{name:"costume2",path:"./images/costume2.png"},
	{name:"costume3",path:"./images/costume3.png"},
	{name:"costume4",path:"./images/costume4.png"},
	{name:"costume5",path:"./images/costume5.png"},
	{name:"costume6",path:"./images/costume6.png"},
	{name:"costume7",path:"./images/costume7.png"}
];
var snowingSpeed = 0;
var snowingSpeedIndex = 20;
var snowChildList = [];
var canSnowing = true;
var showChara = false;

function main(){
	//初始化加载层
	loadingLayer = new LoadingSample3();
	addChild(loadingLayer);
	//开始加载图片
	LLoadManage.load(
		imgData,
		function(progress){
			//绘制进度条
			loadingLayer.setProgress(progress);
		},
		function(result){
			imglist = result;
			removeChild(loadingLayer);
			loadingLayer = null;
			//初始化游戏
			gameInit();
			//加入开始界面
			addLogo();
        }
	);
	//加载声效音乐
	plopSound = new LSound();
    var plopUrl = "./sounds/plop.mp3";
    plopSound.load(plopUrl);
	//加载背景音乐
	backSound = new LSound();
    var backsoundUrl = "./sounds/back_music.mp3";
    backSound.load(backsoundUrl);
}
function gameInit(){
	//初始化层
	initLayer();
	//加入时间轴事件
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	//加入鼠标事件
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onmousedown);
}
function onmousedown(event){
	//播放声效音乐
	plopSound.play();
	if(showChara == true && stageLayer.childList.length < 6){
		//加入障碍物
		addStage();
	}
}
function initLayer(){
	//加入底板层
	backLayer = new LSprite();
	addChild(backLayer);
	//加入图标层
	logoLayer = new LSprite();
	backLayer.addChild(logoLayer);
	//加入雪花层
	snowLayer = new LSprite();
	backLayer.addChild(snowLayer);
	//加入场景层
	sceneLayer = new LSprite();
	backLayer.addChild(sceneLayer);
	//加入礼物层
	stageLayer = new LSprite();
	backLayer.addChild(stageLayer);
	//加入人物层
	charaLayer = new LSprite();
	backLayer.addChild(charaLayer);
	//加入输出层
	overLayer = new LSprite();
	backLayer.addChild(overLayer);
	//加入游戏结束层
	gameoverLayer = new LSprite();
	backLayer.addChild(gameoverLayer);
}
function onframe(event){
	showTime = Math.floor(time/1000) + "s";
	if(canSnowing == true){
		//加入雪花
		addSnow();
	}
	if(backSound.playing == false){
		//播放背景音乐
		backSound.play();
	}
	if(showChara == true){
		//使人物动起来
		oldMan.move();
		//改变时间显示
		timeText.text = "Time:" + showTime;
		if(time>0){
			time -= 30000/(30000/50);
		}else{
			playerName = getName();
			gameOver();
		}
	}
	for(var key in stageLayer.childList){
		//使用Stage中run函数，让障碍物动起来
		stageLayer.childList[key].run();
		if(stageLayer.childList[key].mode == "die"){ //当障碍物移出屏幕时……
			//移除该成员
			stageLayer.removeChild(stageLayer.childList[key]);
		}
	}
}
function getName(){
	if(point == 0){
		return "漆黑的夜晚";
	}else if(0 < point && point < 10){
		return "和谐的一夜";
	}else if(10 <= point && point < 20){
		return "快乐的圣诞节";
	}else if(10 <= point && point < 30){
		return "温馨的圣诞节";
	}else{
		return "光明的圣诞节";
	}
}
function addSnow(){
	snowLayer.graphics.clear();
	var snowx = Math.random()*(LStage.width-10)+10;
	var n = snowChildList.length;
	while(n--){
		var s = snowChildList[n];
		s.y += s.s;
		snowLayer.graphics.drawArc(2,"white",[s.x,s.y,2,0,2*Math.PI],true,"white");
	}
	snowChildList.push({x:snowx,y:0,s:10});
}
function startGame(){
	//清空画布
	logoLayer.die();
	logoLayer.removeAllChild();
	canSnowing = false;
	//加入背景
	var backBitmapdata = new LBitmapData(imglist["background"],0,0,480,360);
	var backBitmap = new LBitmap(backBitmapdata);
	backBitmap.scaleX = 1.4;
	backBitmap.scaleY = 1.4;
	sceneLayer.addChild(backBitmap);
	//加入房屋
	var houseBitmapdata = new LBitmapData(imglist["house"],0,0,480,228);
	var houseBitmap = new LBitmap(houseBitmapdata);
	houseBitmap.scaleX = 1.4;
	houseBitmap.y = 200;
	sceneLayer.addChild(houseBitmap);
	//加入人物
	addChara();
	//加入文字
	addText();
}
function addChara(){
	oldMan = new Charactor("player");
	showChara = true;
	charaLayer.addChild(oldMan);
}
function addStage(){
	var stage = new Stage();
	if(oldMan.mode == "left"){
		stage.x = oldMan.x + 70;
	}else{
		stage.x = oldMan.x + 30;
	}
	stage.y = 30;
	stageLayer.addChild(stage);
	stageLayer.scaleX = 0.8;
	stageLayer.scaleY = 0.8;
}
function addText(){
	//加入分数文字
	pointText = new LTextField(); 
    pointText.size = 15;
	pointText.x = 10;
	pointText.y = 340;
    pointText.color = "white";
    pointText.text = "Point:" + point;
	pointText.font = "HG行書体";
	overLayer.addChild(pointText);
	//加入时间文字
	timeText = new LTextField(); 
    timeText.size = 15;
	timeText.x = 10;
	timeText.y = LStage.height - 30;
    timeText.color = "white";
    timeText.text = "Time:" + showTime;
	timeText.font = "HG行書体";
	overLayer.addChild(timeText);
	//加入滤镜
	var shadow = new LDropShadowFilter(0,45,"white",0);
	overLayer.filters = [shadow];
}
function changeText(){
	pointText.text = "Point:" + point;
}
function gameOver(){
	backLayer.die();
	//绘制成绩板
	gameoverLayer.graphics.drawRect(2,"dimgray",[0,0,400,300],true,"lightgray");
	gameoverLayer.x = 100;
	gameoverLayer.y = 50;
	gameoverLayer.scaleX = 0.5,
	gameoverLayer.scaleY = 0.5,
	gameoverLayer.alpha = 0.5,
	gameoverLayer.rotate = 50;
	var shadow = new LDropShadowFilter(5,45,"black",0);
	gameoverLayer.filters = [shadow];
	//通过缓动显示成绩板
	LTweenLite.to(gameoverLayer,1,{
		alpha:0.7,
		scaleX:1,
		scaleY:1,
		rotate:0,
		ease:Back.easeInOut,
		onComplete:resultFont
	});
}
function resultFont(){
	var resultArr = ["GAME OVER","Tap to Restart Game","分数："+point,"评价："+playerName];
	for(var i=0;i<resultArr.length;i++){
		//公有属性
		resultText = new LTextField();
		resultText.weight = "bold";
		resultText.text = resultArr[i];
		//私有有属性
		if(i==0){
			resultText.size = 30;
  			resultText.color = "white";
			resultText.font = "HG行書体";
			resultText.x = 70;
			resultText.y = 20;
		}else if(i==1){
			resultText.size = 15;
  			resultText.color = "white";
			resultText.font = "HG行書体";
			resultText.x = 105;
			resultText.y = 60;
		}else{
			resultText.size = 20;
  			resultText.color = "white";
			resultText.font = "HG行書体";
			resultText.x = 35;
			resultText.y = 100 + (i-1)*32;	
		}
		gameoverLayer.addChild(resultText);
	}
	//加入鼠标事件
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		//变量清空
		point = 0;
		time = 1000*30;
		showChara = false;
		//清空全局
		backLayer.removeAllChild();
		removeChild(backLayer);
		//游戏重开
		gameInit();
		startGame()
	});
}