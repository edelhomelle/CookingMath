var mgr = new SceneManager();
mgr.wire(); 
myStorage = window.localStorage;
var user

function setup()
{
    createCanvas(windowWidth,windowHeight);
    mgr.showScene( menu );  
    
    
}

function test(){
  
  this.setup = function(){
    createCanvas(windowWidth,windowHeight);
    myBut = new Clickable();     
    myBut.locate(width/2, 3*height/4);        
    myBut.onPress = function(){ 
      nom.position(width/2-nom.width/2, 4*height/10)
      mgr.showScene( menu ); 
    }
  }
  
  this.draw = function(){
    background(220)
    textSize(height/10);
    text("Game Over",width/2,height/2) 
    myBut.draw()
    
    
  }
  

}
function menuselection(){
  this.setup=function()
  {
    createCanvas(windowWidth,windowHeight);
    myButton2 = new Clickable();     
    myButton2.text="mode infini"
    myButton2.locate(width/2-myButton2.width/2, height/2);        
    myButton2.onPress = function(){ 
      mgr.showScene( sketch ); 
    }
    
  }

  this.draw=function(){
    background(220);
    myButton2.draw()
  }

}




function menu(){

this.setup=function()
{
    createCanvas(windowWidth,windowHeight);
    nom = createInput()
    nom.position(width/2-nom.width/2, 4*height/10)
    myButton1 = new Clickable();     
    myButton1.text="valider"
    myButton1.locate(width/2-myButton1.width/2, height/2);        
    myButton1.onPress = function(){ 
      user =nom.value()
      if(user==""){
        alert("rentrez un nom")
        return
      }
      nom.position(-1000,-1000)
      mgr.showScene( menuselection ); 
    }
    
}

this.draw=function(){

  background(220);
  myButton1.draw()
  stroke(0)
  textSize(width/10)
  text("Cooking Math",width/2, height/5)
  textSize(width/25)
  text("Nom:",width/2, 7*height/20)
  //line(width/2,0,width/2,height)
  
}
}

function sketch(){
  
var chiffres = []
var calculators = []
var selecte = 0
var results = []
var res = 0
var resboo = false
var resref =0
var scor = 0
var commandes = []
var numcomm = 0
var cmpt =0
var perdu = 0
var highScore = 0

this.setup = function(){
  createCanvas(windowWidth,windowHeight);
  for (var i =0;i<9;i++){
    chiffres[i]= new chiffre(i+1,width/20,2*height/15+(10-i+1)*height/15)
  }
  
  /// création des calculator
  calculators[0] = new calculator("+",width/5,height/3+height/15)
  calculators[1] = new calculator("+",2*width/5,height/3+height/15)
  calculators[2] = new calculator("-",width/5,2*height/3+height/15)
  calculators[3] = new calculator("x",2*width/5,2*height/3+height/15)
  ///
  
  ///zone de dépot des commandes
  dep =new depot()
  highScore= myStorage.getItem(''+user)
  
  
}

function demande(){  
  commandes[numcomm]= new commande()
  console.log(commandes.length)
  numcomm++
}

this.mousePressed=function(){
  if(dep.clicked()){
    results.splice(resref,1)
    res --
    resref = 0
    for(var i =0;i<commandes.length;i++){
      var com = commandes[i].chiffre
      if(resboo && selecte==com){ 
        commandes.splice(i,1)
        numcomm--
        scor += com
      }
    }
  }
  
  
  if(selecte != 0){
      for (var i =0;i<calculators.length;i++){
        if(calculators[i].updigit(selecte)){
          if(resboo){
            results.splice(resref,1)
            res --
            resref = 0
          }
        }
        if(calculators[i].a!=0 && calculators[i].b!=0){
          results[res] = new result(calculators[i].calcul(),"",calculators[i].x+height/15+1,calculators[i].y)
          res++
        }
      }
  }
  for (var i =0;i<chiffres.length;i++){
    selecte = chiffres[i].clicked()
    resboo=false
    if(selecte != 0){
      break 
    }
  }
  for (var i =0;i<results.length;i++){
    if(selecte != 0){
      break
    }
    selecte = results[i].clicked()
    resboo=true
    resref = i
    if(selecte != 0){
      break
    }
  } 
}

this.draw = function() {
  if(scor>highScore){
     highScore=scor
  }
  
  if(perdu>=2){
    myStorage.setItem(''+user, highScore);
    perdu=0
    mgr.showScene( test ); 
  }
   
  if( cmpt ==0){
    demande()
  }
  cmpt++
  if( cmpt %700 ==0){
    demande()
  }
  background(220);
  
  for (var i =0;i<commandes.length;i++){
    commandes[i].display()
    if(commandes[i].update()){
      commandes.splice(i,1)
      numcomm--
      perdu++
    }
  }
  
  dep.display()
  
  ///affichage des chiffres (ingrédients)
  for (var i =0;i<chiffres.length;i++){
    chiffres[i].display()
  }
  
  ///affichages des machines à calculer 
  for (var i =0;i<calculators.length;i++){
    calculators[i].display()
  }
  
  ///affichages des resultats des machines à calculer 
  for (var i =0;i<results.length;i++){
    results[i].display()
  }
  
  ///affichage du chiffre selectioné
  textSize(height/30);
  text("selection : ",width/18,height/15)
  
  textSize(height/18);
  text(""+selecte,width/8,height/15)
  ///
  
  
  /// score test 
  textSize(height/30);
  text("score : "+scor,width/18,height/15+2*height/20)
  
  textSize(height/30);
  text("Hscore : "+highScore,width/16,height/15+3*height/20)
  
  
  stroke(0)
  line(width/2+width/15,height/3,width/2+width/15,height)
  line(width/20,height/3,width,height/3)
  line(width/7,0,width/7,height/3)
  line(width/20,14*height/15,width/2,14*height/15)
  fill(200,200,200)
  
  ///ligne à commandes
  ellipse(width/7+width/15,height/15,height/15,height/15)
  ellipse(6*width/7-width/15,height/15,height/15,height/15)
  line(width/7+width/15,height/30,6*width/7-width/15,height/30)
  line(width/7+width/15,height/10,6*width/7-width/15,height/10)
}
  }
    
