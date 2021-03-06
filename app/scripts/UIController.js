var UIController = function (transformController) {
  const ipc = require('electron').ipcRenderer
  //   const fs = require('fs')

  var translateBtn = document.getElementById('tool-translate-btn')
  var rotateBtn = document.getElementById('tool-rotate-btn')
  var scaleBtn = document.getElementById('tool-scale-btn')
  var gridDecreaseBtn = document.getElementById('tool-lessgrid-btn')
  var gridToggleBtn = document.getElementById('tool-togglegrid-btn')
  var gridIncreaseBtn = document.getElementById('tool-moregrid-btn')
  var toolbar = document.getElementById('toolbar-container')
  var hideToolbarBtn = document.getElementById('tool-hide-btn')
  var inspector = document.getElementById('inspector-container')
  var hideInspectorBtn = document.getElementById('inspector-hide-btn')

  var heierarchyRoot = document.getElementById('heierarchy-root')

  var addObjectBtn = document.getElementById('tool-addobject-btn')

  var currGridSize = 0
  var translateGrids = [1, 2, 5, 10, 25, 50]

  hideToolbarBtn.addEventListener('click', () => {
    toolbar.classList.toggle('hidden')
  })
  hideInspectorBtn.addEventListener('click', () => {
    inspector.classList.toggle('hidden')
    hideInspectorBtn.textContent = hideInspectorBtn.textContent === '<' ? '>' : '<'
  })

  var onSwitchToTranslate = function () { transformController.setMode('translate') }
  var onSwitchToRotate = function () { transformController.setMode('rotate') }
  var onSwitchToScale = function () { transformController.setMode('scale') }

  translateBtn.addEventListener('click', onSwitchToTranslate)
  rotateBtn.addEventListener('click', onSwitchToRotate)
  scaleBtn.addEventListener('click', onSwitchToScale)

  gridDecreaseBtn.addEventListener('click', () => {
    if (currGridSize > 0) {
      currGridSize -= 1
      transformController.setTranslationSnap(translateGrids[currGridSize])
      gridToggleBtn.textContent = translateGrids[currGridSize]
    } else {
      transformController.setTranslationSnap(0)
      gridToggleBtn.textContent = 0
    }
  })
  gridIncreaseBtn.addEventListener('click', () => {
    if (currGridSize < translateGrids.length - 1) {
      currGridSize += 1
      transformController.setTranslationSnap(translateGrids[currGridSize])
    }
    gridToggleBtn.textContent = translateGrids[currGridSize]
  })

  gridToggleBtn.addEventListener('click', () => {
    if (transformController.translationSnap === 0) {
      transformController.setTranslationSnap(translateGrids[currGridSize])
      gridToggleBtn.textContent = translateGrids[currGridSize]
    } else {
      transformController.setTranslationSnap(0)
      gridToggleBtn.textContent = 0
    }
  })

  addObjectBtn.addEventListener('click', () => {
    ipc.send('open-file-dialog')
  })

  var buildHeierachyNode = function (DOMNode, element, selectFN) {
    DOMNode.textContent = element.name
    for (let i = 0; i < element.children.length; i++) {
      const newElem = document.createElement('li')
      newElem.classList.add('heierarchy-item')
      newElem.addEventListener('click', function (e) {
        console.log(element.children[i])
        selectFN(element.children[i].id)
        const allElems = document.querySelectorAll('.heierarchy-item')
        for (let j = 0; j < allElems.length; j++) {
          allElems[j].classList.remove('selected')
        }
        console.log()// .classList.remove('selected'))
        newElem.classList.add('selected')
      })

      const newNode = DOMNode.appendChild(newElem)
      buildHeierachyNode(newNode, element.children[i], selectFN)
    }
  }

  return {
    showInspector: () => {
      inspector.classList.remove('hidden')
      hideInspectorBtn.textContent = hideInspectorBtn.textContent === '<' ? '>' : '<'
    },
    rebuildHeierarchyUI: (newHeierarchy, cb) => {
      heierarchyRoot.innerHTML = ''
      buildHeierachyNode(heierarchyRoot, newHeierarchy, cb)
    }
  }
}

module.exports = UIController
