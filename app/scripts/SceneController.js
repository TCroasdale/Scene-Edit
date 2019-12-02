var THREE = window.THREE
require('three/examples/js/controls/TransformControls.js')
require('three/examples/js/loaders/GLTFLoader.js')
const ipc = require('electron').ipcRenderer

var SceneController = function () {
  var mScene

  // var canvasElem
  var mBodyElem
  var mRenderer
  var mCameraController
  var mUIController
  var mClock
  var mMouse = new THREE.Vector2(0, 0)
  var mRaycaster = new THREE.Raycaster()
  var mSelectedObject
  var mTransformController

  var animate = function () {
    const delta = mClock.getDelta()
    window.requestAnimationFrame(animate)
    mRenderer.render(mScene, mCameraController.getCamera())

    mCameraController.onUpdate(delta)
  }
  var onMouseMove = function (event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mMouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mMouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  var onClick = function (event) {
    // calculate objects intersecting the picking ray
    // update the picking ray with the camera and mouse position
    mRaycaster.setFromCamera(mMouse, mCameraController.getCamera())
    var intersects = mRaycaster.intersectObjects(mScene.children)
    if (intersects.length > 0) {
      mSelectedObject = intersects[0].object
      mTransformController.attach(mSelectedObject)
      mUIController.showInspector()
    } else {
      mSelectedObject = undefined
      mTransformController.detach()
    }
  }
  var addModel = function (path) {
    const gltfLoader = new THREE.GLTFLoader()
    gltfLoader.load(path, (gltf) => {
      const model = gltf.scene
      console.log(model)
      mScene.add(model)
    })
  }
  ipc.on('selected-files', (evt, data) => {
    const path = data.filePaths[0]
    addModel(path)
  })

  return {
    scene: mScene,
    startController: (appBody) => {
      mClock = new THREE.Clock()

      mBodyElem = appBody
      const winWidth = appBody.clientWidth
      const winHeight = appBody.clientHeight

      mScene = new THREE.Scene()
      mCameraController = new window.CameraController()
      mCameraController.init(winWidth / winHeight)

      mRenderer = new THREE.WebGLRenderer({ antialias: true })
      mRenderer.setSize(winWidth, winHeight)
      mCameraController.setUpControls(mRenderer)

      document.body.appendChild(mRenderer.domElement)
      // canvasElem = renderer.domElement

      var geometry = new THREE.BoxGeometry(1, 1, 1)
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      var cube = new THREE.Mesh(geometry, material)
      mScene.add(cube)
      var light = new THREE.AmbientLight(0xffffff) // soft white light
      mScene.add(light)

      window.addEventListener('mousemove', onMouseMove, false)
      mRenderer.domElement.addEventListener('click', onClick, false)

      mTransformController = new THREE.TransformControls(mCameraController.getCamera(), mRenderer.domElement)
      // control.addEventListener( 'change', render );
      mTransformController.addEventListener('dragging-changed', function (event) {
        mCameraController.setControlEnabled(!event.value)
      })
      mUIController = new window.UIController(mTransformController, this)
      console.log(mUIController)

      mScene.add(mTransformController)
    },
    startRenderLoop: () => {
      animate()
    },
    resize: () => {
      const winWidth = mBodyElem.clientWidth
      const winHeight = mBodyElem.clientHeight
      mCameraController.onResize(winWidth / winHeight)
      mRenderer.setSize(winWidth, winHeight)
    }
  }
}

module.exports = SceneController
