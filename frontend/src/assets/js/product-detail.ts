/**
 * Created by 11206 on 2017/5/7.
 */
interface Vector3 {
    set: (x:number, y:number, z:number) => Vector3
    normalize: () => Vector3
}

interface Object3D {
    position: Vector3
    scale: Vector3
}

interface Scene extends Object3D {
    children: Object3D[]
    add: (child: Object3D) => void
    remove: (child: Object3D) => void
}

interface Renderer {
    setSize: (width: number, height: number) => void
    setPixelRatio: (ratio: number) => void
    render: (scene: Scene, camera: Object3D) => void
    domElement: HTMLElement
}

declare var THREE: {
    Scene: new () => Scene
    PerspectiveCamera: new (fov: number, aspect: number, far: number, near: number) => Object3D
    GridHelper: new (size: number, divisions: number) => Object3D
    AmbientLight: new (color: number) => Object3D
    DirectionalLight: new (color: number) => Object3D
    WebGLRenderer: new () => Renderer
    ColladaLoader: new () => {
        options: {
            convertUpAxis: boolean
        }
        load: (path: string, callback: (obj: { scene: Scene }) => void) => void
    }
    OrbitControls: new (camera: Object3D, elem: HTMLElement) => {}
};

var container;
// var stats;
var scene:Scene;
var VIEW_ANGLE = 45, ASPECT = 1, NEAR = 0.3, FAR = 1000;
var renderer:Renderer;
var controls;
var camera:Object3D;

var MODEL_POS = [
    [-1, 1, 2.3],
    [-1.2, 0, 0.5],
    [-2, 0, 1.8],
];
var MODEL_SCALE = [
    0.05, 0.06, 0.05,
];
var MODELS = ["Drehstuhl", "ChairDesk", "ChairDest2"];
var model: Scene;
var COLORS = {
    "red": [1, 0, 0],
    "yellow": [1, 1, 0],
    "blue": [0, 0, 1],
    "black": [0.1, 0.1, 0.1]
};
var COLORS = {
    "red": new THREE.Color(1, 0, 0),
    "yellow": new THREE.Color(1, 1, 0),
    "blue": new THREE.Color(0, 0, 1),
    "black": new THREE.Color(0.1, 0.1, 0.1)
};
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
        // console.log("No error in reading model name");
    }
    scene.add(camera);
    let SWITCH_LOAD = true;
    // collada
    if (SWITCH_LOAD) {
        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        var model_path = 'model/' + MODELS[selection] + '/model.dae';
        loader.load(model_path, function (collada) {
            if (selection == 0 || selection == 1) {
                model = collada.scene.children[0].children[1];
            } else if (selection == 2) {
                model = collada.scene.children[0];
            }

            var object = collada.scene;
            var SCALE = MODEL_SCALE[selection];
            object.scale.set(SCALE, SCALE, SCALE);
            object.position.set(MODEL_POS[selection][0], MODEL_POS[selection][1], MODEL_POS[selection][2]);
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
    // switchDeskColor("red");
    // switchChairColor("red");
}

function switchDeskColor(color: string) {
    console.log("in switch desk color");
    // console.log(model.children);
    let product_name = document.getElementById('product-name').innerText;
    let selection = MODELS.indexOf(product_name);
    if (selection == 1) {
        let lastchild = model.children[0];
        let material = lastchild.children[0].material;
        let array = COLORS[color];
        material.materials[0].color = COLORS[color];
    }
    if (selection == 2) {
        // legs
        let node = model.children[57];
        let materials = node.material.materials;
        materials[0].color = COLORS[color];
        // desk surface
        node = model.children[35];
        materials = node.material.materials;
        materials[0].color = COLORS[color];
    }
}

function switchChairColor(color: string) {
    console.log("in switch chair color");
    // console.log(model.children);
    let product_name = document.getElementById('product-name').innerText;
    let selection = MODELS.indexOf(product_name);
    let array = COLORS[color];
    switch (selection) {
        case 0:
            let material = model.children[1].children[1].children[0].material;
            material.materials[0].color = COLORS[color];
            break;
        case 1:
            let lastchild = model.children[19];
            let material = lastchild.children[0].material;
            material.materials[0].color = COLORS[color];
            break;
        case 2:
            let node = model.children[60].children[0].children[0].children[0];
            let materials = node.children[0].material.materials;
            materials[0].color = COLORS[color];
            break;
    }
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
