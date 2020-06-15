function commande(max,min){
  this.chiffre= Math.floor(Math.random() * (max - min + 1)) + min
  this.x=width/7+width/15;
  this.y=height/10;
  this.cote=height/15;
  this.sens = true
  
  this.display = function(){
    stroke(255);
    fill(250,220,140);
    square(this.x,this.y, this.cote);

    stroke(0);
    fill(0,0,0);
    textSize(height/20);
    text(""+this.chiffre, this.x+this.cote/2, this.y+6*this.cote/11);
  }
  
  this.update = function(){
    if(this.x>=6*width/7-width/15){
      this.sens = false
      this.y =height/10 - this.cote
    }
    if(this.x<width/7+width/15){
      this.sens = true
      this.y =height/10
    }
    if(this.sens){
      this.x+=width/3000
    }else{
      this.x-=width/3000
    }
    
  }
  
  this.updat = function(){
    if(this.x>=6*width/7-width/15){
      return true
    }
    this.x+=width/3000
  }
  
  
  
}