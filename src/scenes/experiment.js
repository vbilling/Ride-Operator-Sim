class experiment extends Phaser.Scene{
    constructor(){
        super("experimentScene");
    }
    preload(){
        this.load.spritesheet('cat1', './assets/cat1.png', {frameWidth: 182, frameHeight: 300, startFrame: 0, endFrame: 1});
        this.load.spritesheet('cat2', './assets/cat2.png', {frameWidth: 350, frameHeight: 460, startFrame: 0, endFrame: 1});
    }
    create(){
        // Init p2.js
        //world = new this.World();

        // Add a box
        this.p1 = this.add.sprite(300, 300, 'cat1', 0);
        boxBody = new this.p1.myArcadeBody({
            mass:1,
            position:[0,3],
            angularVelocity:1
        });
        boxBody.addShape(boxShape);
        this.addBody(boxBody);
        
        // Add a plane
        planeShape = new this.Plane();
        planeBody = new Body();
        planeBody.addShape(planeShape);
        this.addBody(planeBody);
        
        // Create a body for the cursor
        mouseBody = new Body();
        this.addBody(mouseBody);

        canvas.addEventListener('mousedown', function(event){

            // Convert the canvas coordinate to physics coordinates
            var position = getPhysicsCoord(event);
  
            // Check if the cursor is inside the box
            var hitBodies = this.hitTest(position, [boxBody]);
  
            if(hitBodies.length){
  
              // Move the mouse body to the cursor position
              mouseBody.position[0] = position[0];
              mouseBody.position[1] = position[1];
  
              // Create a RevoluteConstraint.
              // This constraint lets the bodies rotate around a common point
              mouseConstraint = new this.RevoluteConstraint(mouseBody, boxBody, {
                worldPivot: position,
                collideConnected:false
              });
              this.addConstraint(mouseConstraint);
            }
          });
        
        // Sync the mouse body to be at the cursor position
        canvas.addEventListener('mousemove', function(event){
            var position = getPhysicsCoord(event);
            mouseBody.position[0] = position[0];
            mouseBody.position[1] = position[1];
          });
  
          // Remove the mouse constraint on mouse up
          canvas.addEventListener('mouseup', function(event){
            this.removeConstraint(mouseConstraint);
            mouseConstraint = null;
          });

    };
    // Convert a canvas coordiante to physics coordinate
    getPhysicsCoord(mouseEvent){
        var rect = canvas.getBoundingClientRect();
        var x = mouseEvent.clientX - rect.left;
        var y = mouseEvent.clientY - rect.top;

        x = (x - w / 2) / scaleX;
        y = (y - h / 2) / scaleY;

        return [x, y];
    };

    drawbox(){
        ctx.beginPath();
        var x = boxBody.interpolatedPosition[0],
        y = boxBody.interpolatedPosition[1];
        ctx.save();
        ctx.translate(x, y);        // Translate to the center of the box
        ctx.rotate(boxBody.interpolatedAngle);  // Rotate to the box body frame
        ctx.rect(-boxShape.width/2, -boxShape.height/2, boxShape.width, boxShape.height);
        ctx.stroke();
        ctx.restore();
    };

    drawPlane(){
        var y = planeBody.interpolatedPosition[1];
        ctx.moveTo(-w, y);
        ctx.lineTo( w, y);
        ctx.stroke();
    };

    render(){
        // Clear the canvas
        ctx.clearRect(0,0,w,h);

        // Transform the canvas
        ctx.save();
        ctx.translate(w/2, h/2); // Translate to the center
        ctx.scale(scaleX, scaleY);

        // Draw all bodies
        drawbox();
        drawPlane();

        // Restore transform
        ctx.restore();
    };


    // Animation loop
    animate(time){
        requestAnimationFrame(animate);

        var dt = lastTime ? (time - lastTime) / 1000 : 0;
        dt = Math.min(1 / 10, dt);
        lastTime = time;

        // Move physics bodies forward in time
        this.step(timeStep, dt, maxSubSteps);

        // Render scene
        render();
    };
}