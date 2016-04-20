var camera, scene, controls, renderer;//相机，场景，操作控制，渲染器
var terrainMesh;
init();
animate();
//初始化
function init() {
    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    //scene
    scene = new THREE.Scene();
    //scene.fog = new THREE.FogExp2(0xffffff, 0.002);
    //scene.fog = new THREE.Fog(0xffffff, 500,700);

    // lights
    // light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(0, 0, 200);
    // scene.add(light);
    // light = new THREE.DirectionalLight(0x0000ff);
    // light.position.set(0, 0, 200);
    // scene.add(light);
    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    //terrain and controls
    terrainMesh = new THREE.Object3D();
    var geometry = new THREE.PlaneGeometry(128, 128);
    var material = new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    //var material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    var plan=new THREE.Mesh(geometry,material);
    terrainMesh.add(plan);
    scene.add(terrainMesh);
    controls = new THREE.MapControls(terrainMesh);

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setClearColor(0xffffff);//scene.fog.color
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls.addEventListener( 'change', render );
    window.addEventListener( 'resize', onWindowResize, false );
    render();

}
//动画
function animate() {
    requestAnimationFrame(animate);
    controls.update();
}
//渲染
function render() {
    renderer.render(scene, camera);
    camera.updateProjectionMatrix();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    controls.handleResize();

    render();

}