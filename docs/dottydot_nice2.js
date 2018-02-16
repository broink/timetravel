/*
dottydot.js
*/

var l = 25;
var maxCorner = 17;
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
			this.vertices.push({x: Math.cos(this.offset+i*2*Math.PI/count), y: Math.sin(this.offset+i*2*Math.PI/count)})
		}	
	}

function render(Horning, tick, spect){
	push()
	//translate(0.5*Horning.radius*Math.cos(0.02*tick/Horning.vertices.length), 1.2*Horning.radius*Math.sin(0.05*tick/Horning.vertices.length))
	//rotate(((sin((tick)/250)+2.1)*(tick)/150)*(TWO_PI/Horning.vertices.length))
	rotate((spect/255)*(sin(tick/60)*0.5+0.5*cos(tick/30))*(Horning[0].radius/tick))
	var w = 2+Horning[0].vertices.length*(1.5+cos((tick/50)*TWO_PI/Horning[0].vertices.length))
	var x = 1//.1+sin((tick+Horning[0].vertices.length)/150)
	var y = 1//.3+cos((Horning[0].vertices.length-1-tick)/250)
	translate(
		(spect/32)*(Horning[0].radius/2)*cos(0.03*(spect/128)*tick/Horning[0].vertices.length),
		(spect/32)*(Horning[0].radius/3)*sin(0.03*(spect/128)*tick/Horning[0].vertices.length)
		)
	noFill()
	strokeWeight(1+spect/4)
	beginShape(POINTS)
	//beginShape()
	
	for(var v = 0; v < Horning[0].vertices.length+1; v++){
		
		stroke(
		175+spect/(Horning[0].vertices.length),//*(200/maxCorner)*cos(tick/180),
		175-spect/(Horning[0].vertices.length),//v*(200/maxCorner)*sin(tick/120),
		Horning[0].radius/255)
		vertex(
			x*Horning[0].vertices[v%(Horning[0].vertices.length)].x*Horning[0].radius,
			y*Horning[0].vertices[v%(Horning[0].vertices.length)].y*Horning[0].radius
		)
		
		


	}
	//endShape(CLOSE)
	endShape()
	if(spect > 128+32*sin(tick/60)){//tick%Math.floor(Math.random()*60) == Math.floor(Math.random()*60)){
		strokeWeight(1)
		stroke(255)
		var biggestShape = max(Horning[0].vertices.length)//, Horning[1].vertices.length)
		for(var v = 0; v < biggestShape; v++){
				
			
			line(
				x*Horning[0].vertices[v%(Horning[0].vertices.length)].x*Horning[0].radius,
				y*Horning[0].vertices[v%(Horning[0].vertices.length)].y*Horning[0].radius,
				x*Horning[0].vertices[(v+1)%(Horning[0].vertices.length)].x*Horning[0].radius,
				y*Horning[0].vertices[(v+1)%(Horning[0].vertices.length)].y*Horning[0].radius
			)
			
			/*line(
				x*Horning[0].vertices[v].x*Horning[0].radius,
				y*Horning[0].vertices[v].y*Horning[0].radius,
				x*Horning[1].vertices[v].x*Horning[1].radius,
				y*Horning[1].vertices[v].y*Horning[1].radius
			)*/
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
/*for(var i = 3; i <= maxCorner; i++){
	shapes.push(new Horning(i));
}*/
var mic;
function setup(){
	createCanvas(windowWidth,windowHeight);
 	frameRate(60);
 	mic = new p5.AudioIn();
 	mic.connect();
 	mic.start();
 	fft = new p5.FFT(0.81,128);
 	fft.setInput(mic)
 }

var speed = 10;
var epellepsi = false;
var counter = 4;
var next = 3;
var up = true;
function draw(){
	
	var spectrum = fft.analyze();
	background((50)*sin(frameCount/130)+fft.getEnergy('bass')/2);
  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
  for(var i = 1; i < spectrum.length; i+=1){
  	if(spectrum[i] > (128-next)){//} && frameCount%Math.floor((i)*3+i+4) == 0){
  		//(shapes[i]==undefined)?shapes[i] = new Horning(Math.floor(2+(i))):shapes[i]=shapes[i];
  		shapes[i] = new Horning(Math.floor(2+(i)))
  		next = 0
  	}
  }
  (next>0)?next-=0.1:next=0; 
/*
	if(frameCount%next==0){
		if(next == 1){
			if(counter > maxCorner || counter < 3){
				up = !up;
			}
			(up)?counter++:counter--;
			//(counter==2)?counter=3:counter=counter;
			shapes.push(new Horning(counter))
			next = counter;
		}
		next--;
		
	}
*/
	translate(windowWidth/2, windowHeight*0.5);
 	rotate(-HALF_PI)
	for(var s = 0; s < shapes.length-2; s++){//shapes.length-2; s >= 0; s--){//} in shapes.reverse()){
		
		
		if(shapes[s] != undefined){
			shapes[s].radius += 1+spectrum[s]/4//log(10+4*shapes[s].radius/windowWidth)//6//(s+1)*shapes[s].vertices.length/25;
			if(shapes[s].radius > windowWidth*0.8){
				shapes[s] = undefined;
			} else {
				render([shapes[s], null], frameCount, spectrum[s])//.render()		
			}
			
		}
		
	}
}