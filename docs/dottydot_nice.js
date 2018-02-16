/*
dottydot.js
*/

var l = 250;
var maxCorner = 34;
function Horning(count){
//	function constructor(count){
		/*
			Generera en count-hörning med center i 0,0 med sidlängd l
		*/
		this.vertices = [];
		this.offset = ((count-3)/count)*(Math.PI/4);
		this.radius = l/(2*Math.cos((Math.PI/2)*(count-2)/count));
		(count%2 == 0)? this.offset = (Math.PI/4)/(count-3): this.offset = 0;
		for(var i = 0; i < count; i++){
			//this.vertices.push({x: (count-1)*l*cos(this.offset+i*TWO_PI/count), y: (count-1)*l*sin(this.offset+i*TWO_PI/count)})
			this.vertices.push({x: this.radius*Math.cos(this.offset+i*2*Math.PI/count), y: this.radius*Math.sin(this.offset+i*2*Math.PI/count)})
		}	
	}

function render(Horning, tick, epellepsi){
	push()
	translate(0.5*Horning.radius*Math.cos(0.02*tick/Horning.vertices.length), 1.2*Horning.radius*Math.sin(0.05*tick/Horning.vertices.length))
	rotate(((sin((tick)/250)+2.1)*(tick)/150)*(TWO_PI/Horning.vertices.length))
	var w = Horning.vertices.length*(1.5+cos((tick/50)*TWO_PI/Horning.vertices.length))
	var x = sin((tick+Horning.vertices.length)/150)
	var y = cos((Horning.vertices.length-1-tick)/250)
	noFill()
	strokeWeight(w)
	beginShape(POINTS)
	
	for(var v = 0; v < Horning.vertices.length+1; v++){
		
		stroke(
		75+Horning.vertices.length*(200/maxCorner)*cos(tick/180),
		75+v*(200/maxCorner)*sin(tick/120),
		0)
		vertex(
			x*Horning.vertices[v%(Horning.vertices.length)].x,
			y*Horning.vertices[v%(Horning.vertices.length)].y
		)
		
		


	}
	endShape()
	if(tick%Math.floor(Math.random()*60) == Math.floor(Math.random()*60)){
		strokeWeight(1)
		stroke(255)
		for(var v = 0; v < Horning.vertices.length+1; v++){
				
			line(
				x*Horning.vertices[v%(Horning.vertices.length)].x,y*Horning.vertices[v%(Horning.vertices.length)].y,
				x*Horning.vertices[(v+1)%(Horning.vertices.length)].x,y*Horning.vertices[(v+1)%(Horning.vertices.length)].y
			)
		}
	}
	pop()
	
}


function mousePressed(){
	if(10 < mouseX < 230 && 10 < mouseY < 50){
		epellepsi = !epellepsi;
	}
}

var shapes = []
for(var i = 3; i <= maxCorner; i++){
	shapes.push(new Horning(i));
}
function setup(){
	createCanvas(windowWidth,windowHeight);
 	frameRate(60);
 }

var speed = 10;
var epellepsi = false;
function draw(){
	background(50+50*sin(frameCount/130));
	translate(windowWidth/2, windowHeight*0.8);
 	rotate(-HALF_PI)
	for(var s = shapes.length-1; s >= 0; s--){//} in shapes.reverse()){
		render(shapes[s], frameCount,epellepsi)//.render()
	}
}