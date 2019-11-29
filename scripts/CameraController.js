var THREE = window.THREE
require('three/examples/js/controls/FlyControls.js')

var CameraController = function () {
  var mCamera
  var mFlyController
  return {
    getCamera: () => { return mCamera },
    init: (aspect) => {
      mCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
      mCamera.position.z = 5
    },
    setUpControls: (renderer) => {
      mFlyController = new THREE.FlyControls(mCamera, renderer.domElement)
      mFlyController.movementSpeed = 1.0
      mFlyController.domElement = renderer.domElement
      mFlyController.rollSpeed = Math.PI / 6
      mFlyController.autoForward = false
      mFlyController.dragToLook = true
    },
    onUpdate: (dT) => {
      mFlyController.update(dT)
      console.log(mCamera.position)
    },
    onResize: (aspect) => {
      mCamera.aspect = aspect
      mCamera.updateProjectionMatrix()
    }
  }
}

module.exports = CameraController
