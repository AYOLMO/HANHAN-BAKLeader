'use strict';

var SVG_NS = 'http://www.w3.org/2000/svg';
var XLINK_NS = 'http://www.w3.org/1999/xlink';

function linesCollide(a, b, c, d){
	var denominator = ((b.x - a.x) * (d.y - c.y)) - ((b.y - a.y) * (d.x - c.x));
    var numerator1 = ((a.y - c.y) * (d.x - c.x)) - ((a.x - c.x) * (d.y - c.y));
    var numerator2 = ((a.y - c.y) * (b.x - a.x)) - ((a.x - c.x) * (b.y - a.y));

    if (denominator == 0){
    	if(numerator1 == 0 && numerator2 == 0){
    		if(a.x != b.x){
    			var ac = a.x-c.x,
    			ad = a.x-d.x,
    			bc = b.x-c.x,
    			bd = b.x-d.x;
    			return ac*ad <= 0 || bc*bd <= 0 || ac*bc <=0 || ad*bd <= 0;
    		} else {
    			var ac = a.y-c.y,
    			ad = a.y-d.y,
    			bc = b.y-c.y,
    			bd = b.y-d.y;
    			return ac*ad <= 0 || bc*bd <= 0 || ac*bc <=0 || ad*bd <= 0;
    		}
    	} else {
    		return false;
    	};
    }

    var r = numerator1 / denominator;
    var s = numerator2 / denominator;

    return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
};

function rectCollides(left, right, top, bottom, from, to){
	var p = [from.x - to.x, to.x  - from.x, from.y - to.y, to.y   - from.y];
    var q = [from.x - left, right - from.x, from.y - top , bottom - from.y];
    var u1 = -Infinity
    var u2 = +Infinity;

    for (var i = 0; i < 4; i++) {
            if (p[i] == 0) {	//line parallel to axis
                    if (q[i] < 0) //line lies outside of rectangle
                            return false;
            }
            else {
                    var t = q[i] / p[i];	//distance on line from start to intersection
                    if (p[i] < 0 && u1 < t) //line crosses in, take last crossing
                            u1 = t;
                    else if (p[i] > 0 && u2 > t) //line crosses out, take first crossing
                            u2 = t;
            }
    }

    return (u2 > u1 && 1 > u1 && u2 > 0) //leaving after entering && entering before end && leaving after begin 
}

function circleCollides(cx, cy, r, from, to){
	var vx = to.x - from.x;
	var vy = to.y - from.y;

	var fx = from.x - cx;
	var fy = from.y - cy;

	var a = vx*vx + vy*vy;
	var b = 2 * (vx*fx + vy*fy);
	var c = (fx*fx+fy*fy) - r*r;

	var discriminant = (b*b - 4*a*c)

	if(discriminant < 0){
		return false;
	}

	discriminant = Math.sqrt(discriminant);
	var t1 = (-b - discriminant)/(2*a);
	var t2 = (-b + discriminant)/(2*a);

	return (0 <= t1 && t1 <= 1) || (0 <= t2 && t2 <= 1);
}

function CollissionTree(points){
	this.bbox = {
		min:{
			x: Infinity,
			y: Infinity
		},
		max:{
			x: -Infinity,
			y: -Infinity
		}
	}
	var left = [];
	var right = [];
	for (var i = 0; i < points.length; i++) {
		this.bbox.min.x=Math.min(this.bbox.min.x,points[i].x);
		this.bbox.min.y=Math.min(this.bbox.min.y,points[i].y);
		this.bbox.max.x=Math.max(this.bbox.max.x,points[i].x);
		this.bbox.max.y=Math.max(this.bbox.max.y,points[i].y);
		if(points.length > 16){ //subdivide only if a sufficient number of points is present
			if(i <= Math.floor(points.length/2)){
				left.push(points[i]);
			}
			if(i >= Math.floor(points.length/2)){
				right.push(points[i]);
			}
		}
	};
	if(points.length > 16){ //subdivide only if a sufficient number of points is present
		this.left = new CollissionTree(left);
		this.right = new CollissionTree(right);
	} else {
		this.points = points;
	}
};

CollissionTree.prototype.collides = function(from, to){
		if(
			(from.x < this.bbox.min.x && to.x < this.bbox.min.x) ||
			(from.x > this.bbox.max.x && to.x > this.bbox.max.x) ||
			(from.y < this.bbox.min.y && to.y < this.bbox.min.y) ||
			(from.y > this.bbox.max.y && to.y > this.bbox.max.y)
		){
			return false
		} else if(!this.points){ //subdivided, check subtrees
			return this.left.collides(from, to) || this.right.collides(from, to);
		} else { //not subdivided, check own line segements
			for (var i = 1; i < this.points.length; i++) {
				if(linesCollide(from, to, this.points[i-1], this.points[i])){
					return true;
				}
			}
			return false;
		}
}

function Path(element, x, y, parent){
	var domElement = document.createElementNS(SVG_NS, 'polyline');

	this.element = element;
	this.domElement = domElement;
	this.points = [];
	this.circles = [];
	this.length = 0;

	this.addPoint(x, y);

	domElement.setAttribute('stroke', element.color);
	domElement.setAttribute('stroke-width', 2);

	parent.insertBefore(domElement, parent.firstChild);
}

Path.prototype.createSVGPathDescriptor = function(){
	var p = this.points[0];
	var d = p.x+','+p.y;
	for (var i = 1; i < this.points.length; i++) {
		p = this.points[i];
		d += ' '+p.x+','+p.y;
	};
	this.domElement.setAttribute('points', d);
}

Path.prototype.addPoint = function(x,y){
	if(this.finalized){
		return;
	}
	this.points.push({x:x, y:y});
	this.createSVGPathDescriptor();

	var l = this.points.length-1;
	if(l > 0){
		var dx = this.points[l].x-this.points[l-1].x;
		var dy = this.points[l].y-this.points[l-1].y;
		this.points[l].length = Math.sqrt(dx*dx+dy*dy);
		this.length += this.points[l].length;
	}
}

Path.prototype.finalize = function(){
	this.finalized = true;
	this.collissionTree = new CollissionTree(this.points);
}

Path.prototype.collides = function(element, from, to){
	if(this.element.opposite==element && this.finalized){
		return this.collissionTree.collides(from, to);
	}
}

Path.prototype.addCircle = function(offset){
	var domElement = document.createElementNS(SVG_NS, 'circle');
	domElement.setAttribute('cx', this.points[0].x);
	domElement.setAttribute('cy', this.points[0].y);
	domElement.setAttribute('r', 6);
	domElement.setAttribute('fill', this.element.color);

	var circle = {
		element: this.element,
		domElement: domElement,
		segment: 1,
		position: 0
	}

	var self = this;

	this.domElement.parentElement.appendChild(domElement);
	this.circles.push(circle);

	if(offset > 0){
		this.moveCircle(circle, offset);
	}
	return circle;
}

Path.prototype.moveCircle = function(circle, delta){
	var distance = delta / 4;
	circle.position += distance;
	while(this.points[circle.segment].length < circle.position){
		circle.position -= this.points[circle.segment].length
		circle.segment++;
		if(circle.segment >= this.points.length){
			circle.domElement.parentElement.removeChild(circle.domElement);	
			this.circles.shift();
			this.drain.addUnit();
			return;
		}
	}
	var s = circle.segment;
	var f = circle.position / this.points[s].length;
	var x = this.points[s-1].x * (1-f) + this.points[s].x * (f);
	var y = this.points[s-1].y * (1-f) + this.points[s].y * (f);
	circle.domElement.setAttribute('cx',x);
	circle.domElement.setAttribute('cy',y);
}

Path.prototype.update = function(delta){
	for (var i = 0; i < this.circles.length; i++) {
		this.moveCircle(this.circles[i], delta);
	};
}

Path.prototype.removeCircles = function(){
	for (var i = 0; i < this.circles.length; i++) {
		this.circles[i].domElement.parentElement.removeChild(this.circles[i].domElement);
	};
}

var SD_SIZE = 30;
var SD_SIZE_SQ = SD_SIZE*SD_SIZE;

function Source(element, x, y, amount, parent, game){
	var domElement = document.createElementNS(SVG_NS, 'g');
	domElement.setAttribute('transform', 'translate('+x+','+y+')');

	var circle = document.createElementNS(SVG_NS, 'circle');
	circle.setAttribute('cx', 0);
	circle.setAttribute('cy', 0);
	circle.setAttribute('r', SD_SIZE);
	circle.setAttribute('fill', 'transparent');
	circle.setAttribute('stroke', element.color);
	circle.setAttribute('stroke-width', 2);
	domElement.appendChild(circle);

	var fill = document.createElementNS(SVG_NS, "path");
	fill.setAttribute('fill', element.color);
	domElement.appendChild(fill);

	this.element = element;
	this.domElement = domElement;
	this.fill = fill;
	this.maxAmount = amount;
	this.amount = amount;
	this.sendInterval = 500;
	this.sendNextIn = 0;
	this.x = x;
	this.y = y;

	this.updateFill();

	var self = this;
	parent.appendChild(domElement);
	domElement.addEventListener("mousedown", function(evt){
		if(self.path){
			game.removePath(self.path);
		}
		self.path = game.startDrawingPath(self, x, y);
		evt.preventDefault();
	});
	domElement.addEventListener("touchstart", function(evt){
		if(self.path){
			game.removePath(self.path);
		}
		self.path = game.startDrawingPath(self, x, y);
		evt.preventDefault();
	});
}

Source.prototype.includes = function(p){
	var dx = this.x-p.x;
	var dy = this.y-p.y;
	return (dx*dx + dy*dy) <= SD_SIZE_SQ;
}

Source.prototype.collides = function(element, from, to){
	return element != this.element && circleCollides(this.x, this.y, SD_SIZE, from, to);
}

Source.prototype.updateFill = function(){
	var y = -2*this.amount/this.maxAmount + 1;
	var d;
	if(y < -0.99){
		var d = 'M0,-SD ASD,SD 0 1,1 0,SD ASD,SD 0 1,1 0,-SD'.replace(/SD/g, SD_SIZE);
	} else {
		var x = Math.sqrt(1 - y*y);
		x = x*SD_SIZE;
		y = y*SD_SIZE;
		var la = y>0 ? 0 : 1;
		var d = ('M'+x+','+y+' ASD,SD 0 '+la+',1 '+(-x)+','+y+' Z').replace(/SD/g, SD_SIZE);
	}
	this.fill.setAttribute('d', d);
}

Source.prototype.removePath = function(){
	this.path = false;
	this.setAmount(this.maxAmount);
	this.sendNextIn = 0;
}

Source.prototype.setAmount = function(amount){
	this.amount = Math.min(this.maxAmount,Math.max(0,amount));
	this.updateFill();
}

Source.prototype.update = function(delta){
	if(this.amount > 0 && this.path && this.path.drain){
		this.sendNextIn -= delta;
		if(this.sendNextIn <= 0){
			this.path.addCircle(-this.sendNextIn);
			this.sendNextIn = this.sendInterval;
			this.setAmount(this.amount-1);
		}
	}
}

function Drain(element, x, y, amount, parent, game){
	var domElement = document.createElementNS(SVG_NS, 'g');
	domElement.setAttribute('transform', 'translate('+x+','+y+')');

	var border = document.createElementNS(SVG_NS, 'rect');
	border.setAttribute('x', -SD_SIZE);
	border.setAttribute('y', -SD_SIZE);
	border.setAttribute('width', 2*SD_SIZE);
	border.setAttribute('height', 2*SD_SIZE);
	border.setAttribute('fill', 'transparent');
	border.setAttribute('stroke', element.color);
	border.setAttribute('stroke-width', 2);
	domElement.appendChild(border);

	var fill = document.createElementNS(SVG_NS, "rect");
	fill.setAttribute('x', -SD_SIZE);
	fill.setAttribute('width', 2*SD_SIZE);
	fill.setAttribute('fill', element.color);
	fill.setAttribute('stroke-width', 0);
	domElement.appendChild(fill);

	this.element = element;
	this.domElement = domElement;
	this.fill = fill;
	this.maxAmount = amount;
	this.amount = 0;
	this.x = x;
	this.y = y;

	this.updateFill();

	var self = this;
	parent.appendChild(domElement);
	domElement.addEventListener("mouseup", function(evt){
		game.finishPath(self, x, y);
		evt.stopPropagation();
		evt.preventDefault();
	});
}

Drain.prototype.acceptPath = function(path){
	if(this.element == path.element){
		if(this.path){
			this.game.removePath(self.path);
		}
		this.path = path;
		return true;
	}
	return false;
}

Drain.prototype.includes = function(p){
	return  p.x >= this.x - SD_SIZE &&
			p.x <= this.x + SD_SIZE &&
			p.y >= this.y - SD_SIZE &&
			p.y <= this.y + SD_SIZE;
};

Drain.prototype.collides = function(element, from, to){
	return element != this.element && rectCollides(this.x - SD_SIZE, this.x + SD_SIZE, this.y - SD_SIZE, this.y + SD_SIZE, from, to);
}

Drain.prototype.updateFill = function(){
	var y = -2*this.amount/this.maxAmount + 1;
	y *= SD_SIZE;
	this.fill.setAttribute('y', y);
	this.fill.setAttribute('height', SD_SIZE - y);
}

Drain.prototype.setAmount = function(amount){
	this.amount = Math.min(this.maxAmount,Math.max(0,amount));
	this.updateFill();
}

Drain.prototype.removePath = function(){
	this.path = false;
	this.setAmount(0);
}

Drain.prototype.addUnit = function(){
	this.setAmount(this.amount+1);
}

Drain.prototype.isFull = function(){
	return this.amount == this.maxAmount;
}

function Converter(element, x, y, amount, parent, game){
	var domElement = document.createElementNS(SVG_NS, 'g');
	domElement.setAttribute('transform', 'translate('+x+','+y+')');

	var border = document.createElementNS(SVG_NS, "polygon");
	border.setAttribute('points', (-SD_SIZE)+','+SD_SIZE+' '+SD_SIZE+','+SD_SIZE+' 0,'+(-SD_SIZE));
	border.setAttribute('stroke', element.color);
	border.setAttribute('stroke-width', 2);
	border.setAttribute('fill', 'transparent');
	domElement.appendChild(border);

	var fill = document.createElementNS(SVG_NS, "polygon");
	fill.setAttribute('fill', element.color);
	domElement.appendChild(fill);

	this.x = x;
	this.y = y;
	this.element = element;
	this.added = 0;
	this.removed = 0;
	this.amount = 0;
	this.maxAmount = amount;
	this.domElement = domElement;
	this.fill = fill;
	this.game = game;
	this.sendInterval = 500;
	this.sendNextIn = 0;
	this.updateFill();

	var self = this;
	parent.appendChild(domElement);
	domElement.addEventListener("mousedown", function(evt){
		if(self.outgoing){
			game.removePath(self.outgoing);
		}
		self.outgoing = game.startDrawingPath(self, x, y);
		evt.preventDefault();
	});
	domElement.addEventListener("touchstart", function(evt){
		if(self.outgoing){
			game.removePath(self.outgoing);
		}
		self.outgoing = game.startDrawingPath(self, x, y);
		evt.preventDefault();
	});

	domElement.addEventListener("mouseup", function(evt){
		game.finishPath(self, x, y);
		evt.stopPropagation();
		evt.preventDefault();
	});
}

Converter.prototype.updateFill = function(){
	var y = 1-this.amount/this.maxAmount;
	var x = y;
	y = (y*2 - 1) * SD_SIZE;
	x *= SD_SIZE;

	var points = (-SD_SIZE)+','+SD_SIZE+' '+SD_SIZE+','+SD_SIZE+' '+x+','+y+' '+(-x)+','+y;
	this.fill.setAttribute('points', points);
}

Converter.prototype.acceptPath = function(path){
	if(this.outgoing != path){
		if(this.incoming){
			this.game.removePath(this.incoming);
		}
		this.incoming = path;
		return true;
	}
	return false;
}

Converter.prototype.collissionFree = function(path, other, from, to){
	return path == this.outgoing &&
		other == this.incoming &&
		(this.includes(from) || 
		this.includes(to))
}

Converter.prototype.removePath = function(path){
	if(path == this.incoming){
		this.incoming = false;
		this.added = 0;
		this.setAmount(0);
		if(this.outgoing){
			this.game.removePath(this.outgoing);
		}
	}
	if(path == this.outgoing){
		this.outgoing = false;
		this.removed = 0;
		this.setAmount(this.added - this.removed);
	}
}

Converter.prototype.addUnit = function (){
	this.added++;
	this.setAmount(this.added - this.removed);
	this.update(0);
}

Converter.prototype.update = function(delta){
	if(this.sendNextIn > 0){
		this.sendNextIn -= delta;
	}
	if(this.amount > 0 && this.outgoing && this.outgoing.drain){
		if(this.sendNextIn <= 0){
			this.outgoing.addCircle(-this.sendNextIn);
			this.sendNextIn = this.sendInterval;
			this.removed += 1;
			this.setAmount(this.added - this.removed);
		}
	}
}

Converter.prototype.setAmount = Drain.prototype.setAmount;
Converter.prototype.includes = Drain.prototype.includes;

function Obstacle(element, cornerA, cornerB, parent){
	this.left = Math.min(cornerA.x, cornerB.x);
	this.top = Math.min(cornerA.y, cornerB.y);
	this.right = Math.max(cornerA.x, cornerB.x);
	this.bottom = Math.max(cornerA.y, cornerB.y);

	var domElement = document.createElementNS(SVG_NS, 'rect');
	domElement.setAttribute('x', this.left);
	domElement.setAttribute('y', this.top);
	domElement.setAttribute('width', this.right - this.left);
	domElement.setAttribute('height', this.bottom - this.top);
	domElement.setAttribute('fill', element.color);

	parent.appendChild(domElement);

	this.domElement = domElement;
	this.element = element;
}

Obstacle.prototype.collides = function(element, from, to){
	return this.element != element && rectCollides(this.left, this.right, this.top, this.bottom, from, to);		
}

function Game(svg){
	this.elements = {
		earth: {
			color: 'darkolivegreen ',
		},
		water: {
			color: 'blue',
		},
		air: {
			color: '#FFFF80',
		},
		fire: {
			color: 'red',
		},
		wall: {
			color: 'gray'
		}
	}

	this.elements.water.opposite = this.elements.fire;
	this.elements.fire.opposite = this.elements.water;
	this.elements.earth.opposite = this.elements.air;
	this.elements.air.opposite = this.elements.earth;
	this.svg = svg;
	this.currentLevel = 0;

	this.paths = [];
	this.sources = [];
	this.drains = [];
	this.obstacles = [];
	this.converters = [];

	this.paused = false;

	var self = this;
	this.onResize();
	window.addEventListener('resize', function(){
		self.onResize();
	})
}

Game.prototype.reset = function(){
	while(this.paths.length > 0){
		this.removePath(this.paths[0]);
	}
	for(var key in {sources:1, drains:1, obstacles:1, converters:1}){
		this[key].forEach(function(ea){
			ea.domElement.parentElement.removeChild(ea.domElement);
		});
		this[key].length = 0;
	}
}

Game.prototype.onResize = function(){
	var ratio = 3/4;

	var dWidth = document.documentElement.clientWidth;
	var dHeight = document.documentElement.clientHeight;
	
	var height = Math.round(Math.min( dHeight, dWidth * ratio ));
	var width =  Math.round(height / ratio);

	this.svg.setAttribute('width', width + 'px');
	this.svg.setAttribute('height', height + 'px');

	this.offset = {
		x: Math.round((dWidth - width)/2),
		y: Math.round((dHeight - height)/2)
	}

	this.svg.style.top = this.offset.y + 'px';
	this.svg.style.left = this.offset.x + 'px';

	this.scale = {
		x: width / 800,
		y: height / 600
	};
}
Game.prototype.togglePause = function(){
	this.paused ^= 1;
}

Game.prototype.addPath = function(element, x, y){
	var path = new Path(element, x, y, this.svg);
	this.paths.push(path);
	return path;
}

Game.prototype.update = function(delta){
	if(!this.paused && !this.transitioning){
		for(var key in {paths:1, sources:1, converters:1}){
			for (var i = 0; i < this[key].length; i++) {
				this[key][i].update(delta);
			};
		}
		var finished = true;
		for (var i = 0; i < this.drains.length; i++) {
			finished &= this.drains[i].isFull();
		};
		if(finished){
			this.nextLevel();
		}
	}
}

Game.prototype.removePath = function(path){
	if(path.source){
		path.source.removePath(path);
	}
	if(path.drain){
		path.drain.removePath(path);
	}
	path.removeCircles();
	this.paths.splice(this.paths.indexOf(path),1);
	path.domElement.parentElement.removeChild(path.domElement);
}

Game.prototype.startDrawingPath = function(source, x, y){
	this.newPath = this.addPath(source.element, x, y);
	this.newPath.source = source;
	return this.newPath;
}

Game.prototype.addPointToPath = function(x, y, connector){
	if(this.newPath){
		var last = this.newPath.points[this.newPath.points.length-1];
		var point = {x:x,y:y};
		for (var key in {paths:1, obstacles:1, sources:1, drains: 1}){
			for (var i = 0; i < this[key].length; i++) {
				var colfree = this.newPath.source.collissionFree && this.newPath.source.collissionFree(this.newPath, this[key][i], last, point);
				if(!colfree && connector && connector.collissionFree && this[key][i].source == connector){
					colfree = connector.includes(last);
				}
				if(!colfree){
					if(this[key][i].collides(this.newPath.element, last, point)){
						return false;
					}
				}
			}
		}
		this.newPath.addPoint(x, y);
		return true;
	}
}

Game.prototype.finishPath = function(drain, x, y){
	if(this.newPath){
		if(this.addPointToPath(x, y, drain) && drain.acceptPath(this.newPath)){
			this.newPath.drain = drain;
			this.newPath.finalize();
			this.newPath = false;
		} else {
			this.cancelPath();
		}
	}
}

Game.prototype.cancelPath = function(){
	if(this.newPath){
		this.removePath(this.newPath);
		this.newPath = false;
	}
}

Game.prototype.addSource = function(element, x, y, amount){
	this.sources.push(new Source(element, x, y, amount, this.svg, this));
}

Game.prototype.addDrain = function(element, x, y, amount){
	this.drains.push(new Drain(element, x, y, amount, this.svg, this));
}

Game.prototype.addConverter = function(element, x, y, amount){
	this.converters.push(new Converter(element, x, y, amount, this.svg, this));
}

Game.prototype.addObstacle = function(element, cornerA, cornerB){
	this.obstacles.push(new Obstacle(element, cornerA, cornerB, this.svg));
}

Game.prototype.loadLevel = function(level){
	this.reset();

	var self = this;
	level.sources.forEach(function(ea){
		self.addSource(self.elements[ea.element], ea.x, ea.y, 5);
	});
	level.drains.forEach(function(ea){
		self.addDrain(self.elements[ea.element], ea.x, ea.y, 5);
	});
	level.converters.forEach(function(ea){
		self.addConverter(self.elements[ea.element], ea.x, ea.y, 5);
	});
	level.obstacles.forEach(function(ea){
		self.addObstacle(self.elements[ea.element], ea.A, ea.B);
	});
}

Game.prototype.showTransition = function(){
	var pane = document.createElement('div');
	pane.style.position = 'absolute';
	pane.style.width = '100%';
	pane.style.height = '100%';
	pane.style.top = '0';
	pane.style.left = '0';
	pane.style.backgroundColor = 'black';
	document.body.appendChild(pane);

	this.transitioning = true;

	var self = this;

	window.setTimeout(function(){
		pane.style.opacity = 1;
		window.setTimeout(function(){
		window.setTimeout(function(){
			document.body.removeChild(pane);
			self.transitioning = false;
		}, 500);
		self.loadLevel(levels[self.currentLevel]);
		pane.style.opacity = 0;
		}, 500);
	},20);
}

Game.prototype.nextLevel = function(){
	this.currentLevel++;
	if(this.currentLevel >= levels.length){
		alert("You won"); //TODO make nicer.... as if i had time, lol
		this.currentLevel = 0;
	}
	this.showTransition();
}

Game.prototype.start = function() {
	var self = this;
	this.svg.addEventListener('mousemove', function(evt){
		self.addPointToPath(evt.layerX/self.scale.x, evt.layerY/self.scale.y);
		evt.preventDefault();
	});

	this.svg.addEventListener('mouseup', function(evt){
		self.cancelPath();
		evt.preventDefault();
	});

	document.addEventListener('touchmove', function(evt){
		self.addPointToPath(
			(evt.touches[0].clientX-self.offset.x)/self.scale.x,
			(evt.touches[0].clientY-self.offset.y)/self.scale.y
		);
		evt.preventDefault();
	});

	this.svg.addEventListener('touchend', function(evt){
		evt.preventDefault();
		var x = (evt.changedTouches[0].clientX-self.offset.x)/self.scale.x;
		var y = (evt.changedTouches[0].clientY-self.offset.y)/self.scale.y;
		for(var key in {drains:1, converters:1}){
			for (var i = 0; i < self[key].length; i++) {
				if(self[key][i].includes({x:x,y:y})){
					self.finishPath(self[key][i], self[key][i].x, self[key][i].y);
					return;
				}
			};
		}
		self.cancelPath();
	});

	this.loadLevel(levels[this.currentLevel]);

	var last = new Date().valueOf();
	function update(){
		var now = new Date().valueOf();
		var delta = Math.min(now-last, 100);
		last = now;
		self.update(delta);
		window.requestAnimationFrame(update);
	}
	window.requestAnimationFrame(update);
};

window.addEventListener('load', function(){
	var svg = document.getElementById('svg');

	window._game_= new Game(svg);
	_game_.start();
});