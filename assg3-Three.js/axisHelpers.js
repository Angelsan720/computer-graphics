/* Different types of axis helpers for THREE.js:
  - ArrowAxisHelper: uses THREE.Arrow (line+cone)
       has methods: setSize and setLinewidth
  - CylinderAxisHelper: cylinder+cone
       has methods: setSize and setRadius

Rémi Mégret, 2016
*/

/**
 * @author Rémi Mégret
 *
 * Creates a 3D axis frame for visualizing directions, colored X=R, Y=G, Z=B
 *
 * Parameters:
 *  size - Number
 */

THREE.ArrowAxisHelper = function(size, linewidth) {

  THREE.Object3D.call(this);

  if (linewidth === undefined) linewidth = 1;

  this.arrows = [
    new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 0), size, 0xff0000),
    new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 0), size, 0x00c000),
    new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0), size, 0x0000ff)
  ]
  this.add(this.arrows[0], this.arrows[1], this.arrows[2]);

  this._size = size; // Private
  this._linewidth = linewidth;
  this.update = function() {
    for (var i = 0; i < this.arrows.length; i++) {
      // Update properties of each arrow
      this.arrows[i].line.material.linewidth = this._linewidth;
      this.arrows[i].setLength(this._size)
    }
  }
  this.setLinewidth = function(linewidth) {
    this._linewidth = linewidth;
    this.update();
  }
  this.setSize = function(size) {
    this._size = size;
    this.update();
  }
}

THREE.ArrowAxisHelper.prototype = new THREE.Object3D();
THREE.ArrowAxisHelper.prototype.constructor = new THREE.ArrowAxisHelper;
THREE.ArrowAxisHelper.prototype.setSize = function(size) {
  this.arrows[0].setLength(size);
  this.arrows[1].setLength(size);
  this.arrows[2].setLength(size);
};


/**
 * @author Rémi Mégret
 *
 * Creates a 3D axis frame for visualizing directions, colored X=R, Y=G, Z=B
 *
 * Parameters:
 *  size - Number
 *  radius - Number (default: 0.01*size)
 *  headLengthRatio - Number (default: 0.1)
 *  headRadiusRatio - Number (default: 1.0)
 *  nbSegments - Number (default: 8)
 */



/**
 * @author Rémi Mégret
 *
 * Creates a 3D axis frame for visualizing directions, colored X=R, Y=G, Z=B
 *
 * Parameters:
 *  size - Number
 *  radius - Number (default: 0.01*size)
 *  headLengthRatio - Number (default: 0.1)
 *  headRadiusRatio - Number (default: 1.0)
 *  nbSegments - Number (default: 8)
 */

THREE.CylinderAxisHelper = function(size, radius, headLengthRatio, headRadiusRatio, nbSegments) {

  THREE.Object3D.call(this);

  if (radius === undefined) radius = 0.01 * size;
  if (headLengthRatio === undefined) headLengthRatio = 0.1; // 0.2
  if (headRadiusRatio === undefined) headRadiusRatio = 1.0; // 1.5
  if (nbSegments === undefined) nbSegments = 8;

  var cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1 - headLengthRatio, nbSegments, 1);
  cylinderGeometry.translate(0, +(1 - headLengthRatio) / 2, 0);
  cylinderGeometry.rotateZ(-Math.PI / 2);
  //cylinderGeometry.rotateX( Math.PI/4 );

  var coneGeometry = new THREE.CylinderGeometry(0, headRadiusRatio, headLengthRatio, nbSegments, 1);
  coneGeometry.translate(0, +1 - headLengthRatio / 2, 0);
  coneGeometry.rotateZ(-Math.PI / 2);

  genMaterial = function(color) {
    return new THREE.MeshPhongMaterial({
      color: color,
      shading: THREE.FlatShading
    });
  }
  this.cylinders = [
    new THREE.Mesh(cylinderGeometry, genMaterial(0xff0000)),
    new THREE.Mesh(cylinderGeometry, genMaterial(0x00c000)),
    new THREE.Mesh(cylinderGeometry, genMaterial(0x0000ff))
  ]
  this.cones = [
    new THREE.Mesh(coneGeometry, genMaterial(0xff0000)),
    new THREE.Mesh(coneGeometry, genMaterial(0x00c000)),
    new THREE.Mesh(coneGeometry, genMaterial(0x0000ff))
  ]
  this.cylinders[1].rotation.set(0, 0, Math.PI / 2);
  this.cylinders[2].rotation.set(0, -Math.PI / 2, 0);
  this.cylinders[0].scale.set(size, radius, radius);
  this.cylinders[1].scale.set(size, radius, radius);
  this.cylinders[2].scale.set(size, radius, radius);

  this.cones[1].rotation.set(0, 0, Math.PI / 2);
  this.cones[2].rotation.set(0, -Math.PI / 2, 0);
  this.cones[0].scale.set(size, radius, radius);
  this.cones[1].scale.set(size, radius, radius);
  this.cones[2].scale.set(size, radius, radius);

  this.add(this.cylinders[0], this.cylinders[1], this.cylinders[2]);
  this.add(this.cones[0], this.cones[1], this.cones[2]);

  this._size = size;
  this._radius = radius;
  this.update = function() {
    for (var i = 0; i < this.cylinders.length; i++) {
      // Update properties of each arrow
      this.cylinders[i].scale.set(this._size, this._radius, this._radius);
      this.cones[i].scale.set(this._size, this._radius, this._radius);
    }
  }
  this.setSize = function(size) {
    this._size = size;
    this.update()
  }
  this.setRadius = function(radius) {
    this._radius = radius;
    this.update()
  }
}
THREE.CylinderAxisHelper.prototype = new THREE.Object3D();
THREE.CylinderAxisHelper.prototype.constructor = new THREE.CylinderAxisHelper;
