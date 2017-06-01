/**
 * Created by 11206 on 2017/5/7.
 */
var container;
// var stats;
var scene;
var VIEW_ANGLE = 45, ASPECT = 1, NEAR = 0.3, FAR = 1000;
var renderer;
var controls;
var camera;
// tune x: horizontal y: vertical z: distance
// camera.position.set(-25, 20 , -50);
var CAM_POS = [
    [-25, 20, -50],
    [-55, 65, 0],
    [-10, 40, 50],
];
var CAM_LOOKAT = [
    [0, 0, 0],
    [-30, 50, -10],
    [10, 20, 10],
];
var MODEL_POS = [
    [-1, 1, 2.3],
    [-1.2, 0, 0.5],
    [-2, 0.2, 0.5],
];
var MODEL_SCALE = [
    0.05, 0.06, 0.05,
];
var MODELS = ["Drehstuhl", "ChairDesk", "PrismaPM14"];

init();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    // camera.position.set(CAM_POS[selection][0], CAM_POS[selection][1], CAM_POS[selection][2]);
    camera.position.set(7, 5, 7);
    // camera.lookAt(new THREE.Vector3(CAM_LOOKAT[selection][0], CAM_LOOKAT[selection][1], CAM_LOOKAT[selection][2]));
}

function onUnload() {
    console.log("unload callled");
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    console.log("empty the 3D scene.");
}
function threedshow() {
    onUnload();
    container = document.getElementById("canvas_container");
    let product_name = document.getElementById('product-name').innerText;
    let selection = MODELS.indexOf(product_name);
    if (selection === -1) {
        console.log("Error in reading model name");
        return;
    } else {
        console.log("No error in reading model name");
    }
    scene.add(camera);


    // var SWITCH_LOAD = false;
    let SWITCH_LOAD = true;

    // var skyBoxGeometry = new THREE.BoxGeometry(500, 400, 500);
    // var skyBoxMaterial = new THREE.MeshBasicMaterial({
    //     color: 0x9999ff,
    //     side: THREE.BackSide
    // });
    // var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    // scene.add(skyBox);
    // var ambient = new THREE.AmbientLight(0xffffff);
    // scene.add(ambient);
    // var directionalLight = new THREE.DirectionalLight(0x0a0a0a);
    // directionalLight.position.set(-5, 5, 5).normalize();
    // scene.add(directionalLight);
    // var pointLight = new THREE.PointLight(0x63d5ff, 1, 200);
    // pointLight.position.set(0, 0, 200);
    // scene.add(pointLight);

    // collada
    if (SWITCH_LOAD) {
        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        var model_path = 'model/' + MODELS[selection] + '/model.dae';
        loader.load(model_path, function (collada) {
            var object = collada.scene;
            var SCALE = MODEL_SCALE[selection];
            object.scale.set(SCALE, SCALE, SCALE);
            object.position.set(MODEL_POS[selection][0], MODEL_POS[selection][1], MODEL_POS[selection][2]);
            // object.position.set( 0, 0.2, 0);
            scene.add(object);
        });
    }

    var gridHelper = new THREE.GridHelper( 10, 20 );
    scene.add( gridHelper );

    var ambientLight = new THREE.AmbientLight( 0xcccccc );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 0, 1, -1 ).normalize();
    scene.add( directionalLight );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(654, 368);
    renderer.setPixelRatio( window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // stats = new Stats();
    // container.appendChild( stats.dom );

    animate();
    //        window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
    requestAnimationFrame( animate );
    render();
    // stats.update();
}
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
