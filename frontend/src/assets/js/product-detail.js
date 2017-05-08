/**
 * Created by 11206 on 2017/5/7.
 */

var scene = new THREE.Scene();
var VIEW_ANGLE = 45, ASPECT = 1, NEAR = 0.3, FAR = 1000;
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
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
    [20, -20, 0],
    [0, 0, 0],
    [0, 0, 0],
];
var MODEL_SCALE = [
    0.3, 0.15, 0.1,
];
var MODELS = ["Mercedes-Benz-G500", "mystik_dsrv_CC50", "Hetzer_2"];

function threedshow()
{
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    console.log("empty the 3D scene.");
    container = document.getElementById("canvas_container");
    var product_name = document.getElementById('product-name').innerText;
    // console.log(product_name);
    var selection = 0;
    var i = -1;
    for (; i < MODELS.length; i++) {
        if (product_name === MODELS[i]) {
            selection = i;
            break;
        }
    }
    if (i == -1) {
        console.log("Error in reading model name");
        i = 0;
    } else {
        console.log("No error in reading model name");
    }

    camera.position.set(CAM_POS[selection][0], CAM_POS[selection][1], CAM_POS[selection][2]);
    camera.lookAt(new THREE.Vector3(CAM_LOOKAT[selection][0], CAM_LOOKAT[selection][1], CAM_LOOKAT[selection][2]));
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(654, 368);
//        document.body.appendChild(renderer.domElement);
//     console.log(container);
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
            side: THREE.BackSide
        });
        var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
        scene.add(skyBox);
        var ambient = new THREE.AmbientLight(0xffffff);
        scene.add(ambient);
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(-5, 5, 5).normalize();
        scene.add(directionalLight);
        var pointLight = new THREE.PointLight(0x63d5ff, 1, 200);
        pointLight.position.set(0, 0, 200);
        scene.add(pointLight);

        if (SWITCH_LOAD) {
            var loader = new THREE.ColladaLoader();
            loader.options.convertUpAxis = true;
            var model_path = 'model/' + MODELS[selection] + '/model.dae';
            loader.load(model_path, function (collada) {
                var object = collada.scene;
                var SCALE = MODEL_SCALE[selection];
                // object.scale.set( 0.3, 0.4, 0.3 );
                object.scale.set(SCALE, SCALE, SCALE);
                object.position.set(MODEL_POS[selection][0], MODEL_POS[selection][1], MODEL_POS[selection][2]);
                scene.add(object);
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
}