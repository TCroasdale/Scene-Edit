var THREE = require('three')

var SceneController = (function () {
    var scene = undefined
    var camera = undefined
    var canvasElem = undefined
    var renderer = undefined
    var animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }

    return {
        scene: scene,
        camera: camera,
        startController: () => {
            scene = new THREE.Scene()
            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
            
            renderer = new THREE.WebGLRenderer({ antialias: true })
            
            document.body.appendChild( renderer.domElement )
            canvasElem = renderer.domElement

            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var cube = new THREE.Mesh( geometry, material );
            scene.add( cube );

            camera.position.z = 5;
        },
        animate: () => {
            animate()
        },
        resize: () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
    }
})

module.exports = SceneController