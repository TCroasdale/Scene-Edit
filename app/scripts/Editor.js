(() => {
  window.THREE = require('three')
  window.SceneController = require('./scripts/SceneController.js')
  window.CameraController = require('./scripts/CameraController.js')
  window.UIController = require('./scripts/UIController.js')

  const a = new window.SceneController()
  window.addEventListener('resize', a.resize)
  a.startController(document.getElementById('app-body'))
  a.startRenderLoop()
})()
