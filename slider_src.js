DC=document;
MF=Math.round;

function fixEvent(e) {
  e = e || window.event;
  if (!e.target) e.target = e.srcElement;
  if (e.pageX == null && e.clientX != null ) { // если нет pageX..
    html = DC.DCElement;
    B = DC.body;
    e.pageX = e.clientX + (html.scrollLeft || B && B.scrollLeft || 0);
    e.pageX -= html.clientLeft || 0;
  }
  if (!e.which && e.button) 
	e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );
  return e;
}

function getCoords(elem) {
      box = elem.getBoundingClientRect();
      B = DC.body;
      D = DC.documentElement;
      scrollLeft = window.pageXOffset || D.scrollLeft || B.scrollLeft;
      clientLeft = D.clientLeft || B.clientLeft || 0;
      left = box.left + scrollLeft - clientLeft;
    return { top: MF(top), left: MF(left) };
}

function nano_slider(id,minval,maxval,cb,counter)
{// selector
this.sliderElem = DC.getElementById(id);
this.thumbElem=this.sliderElem.children[0];
var self =this;
//if(!minval)minval=-10;
//if(!maxval)maxval=10;
val=0;

this.val =function (){return val};

//cb=function(tv){alert(tv);};

this.thumbElem.ondragstart = function(){ return false; };

this.thumbElem.onmousedown = function(e) {
  e = fixEvent(e);
    thumbCoords = getCoords(self.thumbElem);
    shiftX = e.pageX - thumbCoords.left
    sliderCoords = getCoords(self.sliderElem);

  DC.onmousemove = function(e) {
    e = fixEvent(e);

    //  вычесть координату родителя, т.к. position: relative
      pos = e.pageX - shiftX - sliderCoords.left;

    // курсор ушёл вне слайдера
    if (pos < 0)pos = 0;
   
      max_pos = self.sliderElem.offsetWidth - self.thumbElem.offsetWidth;
    if (pos > max_pos)pos = max_pos;
    
	
    
	k=(maxval-minval)/max_pos;
	val=MF(minval+(pos*k));
	
	DC.getElementById(counter).innerHTML= val;
  
  pos=Math.floor(MF(pos*k)/k); //сгрубляем поведение
  self.thumbElem.style.left = pos + 'px';
  }

  DC.onmouseup = function() {
    DC.onmousemove = DC.onmouseup = null;
	cb&&cb(val); //if(cb)cb(val);
  };
	
  return false; // disable selection start (cursor change)

  };
  
this.destroy=function(){
	this.thumbElem.onmousedown=null;
}

}

