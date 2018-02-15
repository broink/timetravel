/*
dottydot.js
*/

var l = 100;
var maxCorner = 24;
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
	rotate((tick/50)*TWO_PI/Horning.vertices.length)
	strokeWeight(Horning.vertices.length*(1.1+cos((tick/50)*TWO_PI/Horning.vertices.length)))
	noFill()
	
	beginShape(POINTS)
	stroke(
	25+Horning.vertices.length*(200/maxCorner),
	0,
	0)	
	for(var v = 0; v < Horning.vertices.length+1; v++){

		
		line(
			Horning.vertices[v%(Horning.vertices.length)].x,Horning.vertices[v%(Horning.vertices.length)].y,
			Horning.vertices[(v+1)%(Horning.vertices.length)].x,Horning.vertices[(v+1)%(Horning.vertices.length)].y
		)
		vertex(Horning.vertices[v%(Horning.vertices.length)].x,Horning.vertices[v%(Horning.vertices.length)].y)


	}
	endShape()
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
	background(200);
	translate(windowWidth/2, windowHeight/2);
 	rotate(-HALF_PI)
	for(var s = shapes.length-1; s >= 0; s--){//} in shapes.reverse()){
		render(shapes[s], frameCount,epellepsi)//.render()
	}
}