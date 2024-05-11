AFRAME.registerComponent("shoot",{
    init:function(){
        this.shoot()
    },
    shoot:function(){
        window.addEventListener("keydown", (e) => {
            if (e.key === "z") {
                var bullet = document.createElement("a-entity")
                bullet.setAttribute("geometry", {primitive: "sphere",radius: 0.1,})
                bullet.setAttribute("material", "color:black")
                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")
                bullet.setAttribute("position", {x: pos.x,y: pos.y,z: pos.z,})
                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                bullet.setAttribute("velocity", direction.multiplyScalar(-20))
                var scene = document.querySelector("#scene")
                bullet.setAttribute("dynamic-body", {shape: "sphere",mass: "0",})
                bullet.setAttribute("visible", false)
                bullet.addEventListener("collide", this.removeBullet)
                scene.appendChild(bullet)
                var entity = document.querySelector("#gun");
                entity.components.sound.playSound();
            }
          });
        },
    removeBullet:function(){
        var element = e.detail.target.el;

    //element which is hit
    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("box")) {
      elementHit.setAttribute("material", {
        opacity: 1,
        transparent: true,
      });

      //impulse and point vector
      var impulse = new CANNON.Vec3(-2, 2, 1);
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
      );

      elementHit.body.applyImpulse(impulse, worldPoint);

      //remove event listener
      element.removeEventListener("collide", this.removeBullet);

      //remove the bullets from the scene
      var scene = document.querySelector("#scene");
      scene.removeChild(element);
    }
    },
})