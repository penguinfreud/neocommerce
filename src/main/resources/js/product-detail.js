/**
 * Created by wxy on 17.5.3.
 */
container = document.getElementById( 'canvas_container' );
var scene = new THREE.Scene();
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45, ASPECT = 1, NEAR = 0.3, FAR = 1000;
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
// tune x: horizontal y: vertical z: distance
camera.position.set(-25, 20 , -50);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(654, 368);
//        document.body.appendChild(renderer.domElement);
container.appendChild(renderer.domElement);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
// var SWITCH_LOAD = false;
var SWITCH_LOAD = true;
init();
render();

function init() {
    var skyBoxGeometry = new THREE.BoxGeometry(500, 400, 500);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({
        color: 0x9999ff,
//            color: 0xffffff,
        side: THREE.BackSide
    });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);

//        container = document.getElementById( 'container' );
//        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
//        camera.position.set( 7, 5, 7 );
//        scene = new THREE.Scene();

    if (SWITCH_LOAD) {
        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        // loader.load('../model/Hetzer_2/model.dae', function (collada) {
        loader.load('../model/Mercedes-Benz-G500/model.dae', function (collada) {
            var object = collada.scene;
            object.scale.set( 0.3, 0.4, 0.3 );
            object.position.set( 20, -20, 0 );
            scene.add( object );
        });
    }
}


//        var gridHelper = new THREE.GridHelper( 10, 20 );
//        scene.add( gridHelper );
//
//        var ambientLight = new THREE.AmbientLight( 0xcccccc );
//        scene.add( ambientLight );
//        var directionalLight = new THREE.DirectionalLight( 0xffffff );
//        directionalLight.position.set( 0, 1, -1 ).normalize();
//        scene.add( directionalLight );
//
//        renderer = new THREE.WebGLRenderer();
//        renderer.setPixelRatio( window.devicePixelRatio );
//        renderer.setSize( window.innerWidth, window.innerHeight );
//        container.appendChild( renderer.domElement );
//
//        controls = new THREE.OrbitControls( camera, renderer.domElement );
//
//        stats = new Stats();
//        container.appendChild( stats.dom );
//
//        window.addEventListener( 'resize', onWindowResize, false );

//        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//        var renderer = new THREE.WebGLRenderer();
//        renderer.setSize( window.innerWidth, window.innerHeight);
//        document.body.appendChild( renderer.domElement );