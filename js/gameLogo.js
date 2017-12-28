var logoText;
var startBtn;
function addLogo(){
	//加入背景
	var bitmapData = new LBitmapData(imglist["logoback"],0,0,1024,768);
	var bitmap = new LBitmap(bitmapData);
	bitmap.scaleX = 0.6;
	bitmap.scaleY = 0.6;
	logoLayer.addChild(bitmap);
	//加入文字
	addLogoText();
}
function addLogoText(){
	//大标题
	logoText = new LTextField();
    logoText.size = 50;
    logoText.color = "white";
	logoText.font = "HG行書体";
    logoText.text = "Christmas";
	logoText.stroke = true;
	logoText.lineWidth = 2;
	logoText.x = 50;
	logoText.y = 20;
    logoLayer.addChild(logoText);
	//加入滤镜效果
	var titleShadow = new LDropShadowFilter(5,45,"red");
	for(var i=0;i<2;i++){
		logoText.filters = [titleShadow];
		logoLayer.addChild(logoText);
	}
	//开始指示
	logoText = new LTextField();
    logoText.size = 30;
    logoText.color = "white";
	logoText.font = "HG行書体";
    logoText.text = "Tap to Start Game";
	logoText.x = 150;
	logoText.y = 190;
    logoLayer.addChild(logoText);
	//加入开始游戏事件
	logoLayer.addEventListener(LMouseEvent.MOUSE_UP,startGame);
	//加入滤镜效果
	var shadow = new LDropShadowFilter(5,45,"black",0);
	logoText.filters = [shadow];
}