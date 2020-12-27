export class Canvas {
  constructor() {
    this.canvas = document.querySelector('.canvas');      
    this.ctx = this.canvas.getContext('2d');
    this.clear = document.querySelector(".bt-clear");
    this.currentPosition = {x : null, y : null};
    this.painting = false;
    this.webStorage = document.querySelector('.store'); 
  }

  downDrawligne = (e) => {
    this.currentPosition.x = e.offsetX;                   
    this.currentPosition.y = e.offsetY; 
    this.painting = true;
  }

  moveDrawligne = (e) => {
    if (this.painting == false) {
      return false;
    }
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();                                                       
    this.ctx.moveTo(this.currentPosition.x, this.currentPosition.y);            
    this.ctx.lineTo(e.offsetX, e.offsetY);                                      
    this.ctx.stroke();                                                          
    this.currentPosition.x = e.offsetX;                   
    this.currentPosition.y = e.offsetY; 
  }

  upDrawligne = (e) => {
    this.painting = false;
  }

  initCanvas = (e) => {    
    this.canvas.addEventListener("mousedown", (e) => {
      this.downDrawligne(e);
    });       
    this.canvas.addEventListener("mousemove", (e)=> {
      this.moveDrawligne(e);
    });
    this.canvas.addEventListener("mouseup", (e)=> {
      this.upDrawligne(e);
    });    
    this.canvas.addEventListener("mouseout", (e)=> {
      this.upDrawligne(e);
    });
  }

  cleanCanvas = () => {
    this.clear.addEventListener("click", (e) =>{      
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }) 
  }

  cleanCanvasAfterReservation = () => {   
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}




