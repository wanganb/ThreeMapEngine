var camera,scene,controls,renderer;//相机，场景，操作控制，渲染器
var terrainMesh;
init();
animate();
//初始化
function init(){
    //camera
    camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000);
    camera.position.z=500;
    
    //scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
    
    // lights
    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );
    light = new THREE.DirectionalLight( 0x002288 );
    light.position.set( -1, -1, -1 );
    scene.add( light );
    light = new THREE.AmbientLight( 0x222222 );
    scene.add( light );
    
    //terrain and controls
    terrainMesh=new THREE.Object3D();
    controls=new THREE.MapControls(terrainMesh);
    
    //renderer
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setClearColor( scene.fog.color );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    render();
    
}
//动画
function animate(){
    requestAnimationFrame( animate );
    controls.update();
}
//渲染
function render(){
    renderer.render( scene, camera );
}