var stageSpeed = 5;
function Stage(){
	base(this,LSprite,[]);
	//取出一个整数，使0<=index<=7成立
	var index = Math.floor(Math.random()*7);
	//将index的值取出对应的图片
	var bitmap = new LBitmap(new LBitmapData(imglist["costume"+index]));
	//定义礼物的模式
	this.mode = "";
	this.addChild(bitmap);
}
Stage.prototype.run = function(){
	//让礼物不断下降
	this.y += stageSpeed;
	//判断是否到达边缘
	if(this.y > LStage.height){
		this.mode = "die";
	}
	this.cheackHit();
}
Stage.prototype.cheackHit = function(){
	if(this.y > 170 && this.x > 132 - 33 && this.x < 166){
		this.mode = "die";
		point++;
		changeText();
	}else if(this.y > 170 && this.x > 293 - 33 && this.x < 330){
		this.mode = "die";
		point++;
		changeText();
	}else if(this.y > 178 && this.x > 475 - 33 && this.x < 508){
		this.mode = "die";
		point++;
		changeText();
	}
}