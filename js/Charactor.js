function Charactor(data){
	base(this,LSprite,[]);
	//设定x和y坐标
	this.x = 0;
	this.y = 0;
	//设定模式
	this.mode = "right";
	this.speed = 5;
	//加入图片
	this.data = data;
	var list = LGlobal.divideCoordinate(227,158,1,1);
	var bitmapdata = new LBitmapData(imglist[this.data]);
	//加入动画
	this.anima = new LAnimation(this,bitmapdata,list);
	this.anima.setAction(0,1,0,false);
}
Charactor.prototype.move = function(){
	//当向右飞行时
	if(this.mode == "right" && this.x < LStage.width-149){
		this.anima.setAction(0,1,0,false);
		this.x += this.speed;
	}else{
		this.mode = "left";
	}
	//当向左飞行时
	if(this.mode == "left" && this.x > 0){
		this.anima.setAction(0,1,0,true);
		this.x -= this.speed;
	}else{
		this.mode = "right";
	}
}