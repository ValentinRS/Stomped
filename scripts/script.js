let context, controller, rectangle, loop ,canvas,canvas_w, canvas_h;

canvas = document.getElementById("canvas");
canvas.style.background = "blue";
context = canvas.getContext("2d");

canvas_w = canvas.scrollWidth;
canvas_h = canvas.scrollHeight;

character = {
 height:32, // Høyden på karakteren - variabel
 width:32, // Bredden på karakteren - variabel
 jumping:true,
 x:100,
 x_velocity:0,
 y:canvas_h,
 y_velocity:0
}

// Her danner vi kontrollene til selve spillet. Dette er venstre, opp, høyre
controller = {

 left:false,
 right:false,
 up:false,
 keyListener:function(event) {
  
  let key_state = (event.type == "keydown")?true:false;

  switch(event.keyCode) {
   
   case 37: // Venstre tast
    controller.left = key_state;
    break;
   case 38: // Opp tast
    controller.up = key_state;
    break;
   case 39: // Høyre tast
    controller.right = key_state;
    break;

  }
 }
};

loop = function() {
 // Her danner vi jump funksjon
 if (controller.up && character.jumping == false) {

  character.y_velocity -=30 // Høyden til 1 hopp
  character.jumping = true;
 }

 // Her danner vi hastighet for left click
 if (controller.left) {
  character.x_velocity -= 0.5;
 }

 // Her danner vi hastighet for right click
 if (controller.right) {
  character.x_velocity += 0.5;
 }

 character.y_velocity += 1; // Tyngdekraft
 character.x += character.x_velocity;
 character.y += character.y_velocity;
 character.x_velocity *= 0.9
 character.y_velocity *= 0.9

 if (character.y > 720/*Variabel*/ - 16 - 32) {
  character.jumping = false;
  character.y = 720 - 16 /*Variabel*/ - 32;
  character.y_velocity = 0;
 }

 if (character.x < 0) {
  character.x += 1;
  character.x_velocity = 0;
 } else if (character.x > 1248 /*Variabel*/) {
  character.x -= 0.5;
  character.x_velocity = 0;
 }

 context.fillStyle = "#202020";
 context.fillRect(0,0,1280,720);
 context.fillStyle = "#ff0000"// Rød
 context.beginPath();
 context.rect(character.x,character.y,character.width,character.height);
 context.fill();
 context.strokeStyle = "#202830";
 context.lineWidth = 4;
 context.moveTo(0,707); // variabel
 context.lineTo(1280,707); // variabel
 context.stroke();
 window.requestAnimationFrame(loop);
} 

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);