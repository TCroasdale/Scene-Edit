var THREE = window.THREE

var SceneController = function () {
  var scene

  // var canvasElem
  var bodyElem
  var renderer
  var mCameraController
  var clock

  // var selectedObject

  var animate = function () {
    const delta = clock.getDelta()
    window.requestAnimationFrame(animate)
    renderer.render(scene, mCameraController.getCamera())

    mCameraController.onUpdate(delta)
  }

  return {
    scene: scene,
    startController: (appBody) => {
      clock = new THREE.Clock()

      bodyElem = appBody
      const winWidth = appBody.clientWidth
      const winHeight = appBody.clientHeight

      scene = new THREE.Scene()
      mCameraController = new window.CameraController()
      mCameraController.init(winWidth / winHeight)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(winWidth, winHeight)
      mCameraController.setUpControls(renderer)

      document.body.appendChild(renderer.domElement)
      // canvasElem = renderer.domElement

      var geometry = new THREE.BoxGeometry(1, 1, 1)
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      var cube = new THREE.Mesh(geometry, material)
      scene.add(cube)
    },
    startRenderLoop: () => {
      animate()
    },
    resize: () => {
      const winWidth = bodyElem.clientWidth
      const winHeight = bodyElem.clientHeight
      mCameraController.onResize(winWidth / winHeight)
      renderer.setSize(winWidth, winHeight)
    }
  }
}

module.exports = SceneController
