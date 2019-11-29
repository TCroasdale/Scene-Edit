var THREE = require('three')

var SceneController = function () {
  var scene
  var camera
  // var canvasElem
  var bodyElem
  var renderer
  var animate = function () {
    window.requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  return {
    scene: scene,
    camera: camera,
    startController: (appBody) => {
      bodyElem = appBody
      const winWidth = appBody.clientWidth
      const winHeight = appBody.clientHeight
      console.log(winWidth, winHeight)
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 0.1, 1000)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(winWidth, winHeight)

      document.body.appendChild(renderer.domElement)
      // canvasElem = renderer.domElement

      var geometry = new THREE.BoxGeometry(1, 1, 1)
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      var cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      camera.position.z = 5
    },
    animate: () => {
      animate()
    },
    resize: () => {
      const winWidth = bodyElem.clientWidth
      const winHeight = bodyElem.clientHeight
      camera.aspect = winWidth / winHeight
      camera.updateProjectionMatrix()
      renderer.setSize(winWidth, winHeight)
    }
  }
}

module.exports = SceneController
