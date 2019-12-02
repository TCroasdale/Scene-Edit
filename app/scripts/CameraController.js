var THREE = window.THREE
require('three/examples/js/controls/OrbitControls.js')

var CameraController = function () {
  var mCamera
  var mOrbitController
  return {
    getCamera: () => { return mCamera },
    init: (aspect) => {
      mCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
      mCamera.position.z = 5
    },
    setUpControls: (renderer) => {
      mOrbitController = new THREE.OrbitControls(mCamera, renderer.domElement)
      mOrbitController.keys = {
        LEFT: 65, // left arrow
        UP: 87, // up arrow
        RIGHT: 68, // right arrow
        BOTTOM: 83 // down arrow
      }
    },
    onUpdate: (dT) => {
      mOrbitController.update(dT)
    },
    onResize: (aspect) => {
      mCamera.aspect = aspect
      mCamera.updateProjectionMatrix()
    },
    setControlEnabled: (state) => {
      mOrbitController.enabled = state
    }
  }
}

module.exports = CameraController
