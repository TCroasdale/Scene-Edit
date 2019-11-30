var UIController = function (transformController) {
  var translateBtn = document.getElementById('tool-translate-btn')
  var rotateBtn = document.getElementById('tool-rotate-btn')
  var scaleBtn = document.getElementById('tool-scale-btn')

  var onSwitchToTranslate = function () { transformController.setMode('translate') }
  var onSwitchToRotate = function () { transformController.setMode('rotate') }
  var onSwitchToScale = function () { transformController.setMode('scale') }
//   var onGridDecrease = function () { transformController.setMode('translate') }
//   var onGridIncrease = function () { transformController.setMode('rotate') }
//   var onToggleGrid = function () { transformController.setMode('scale') }

  translateBtn.addEventListener('click', onSwitchToTranslate)
  rotateBtn.addEventListener('click', onSwitchToRotate)
  scaleBtn.addEventListener('click', onSwitchToScale)

  return {
    setTranslateFN: (fn) => { onSwitchToTranslate = fn },
    setRotateFN: (fn) => { onSwitchToRotate = fn },
    setScaleFN: (fn) => { onSwitchToScale = fn }
  }
}

module.exports = UIController
