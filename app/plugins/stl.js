
const THREE = require("three");
const { STLLoader } = require("three/examples/jsm/loaders/STLLoader");
const { OrbitControls } = require("three/addons/controls/OrbitControls.js");
const { GUI } = require("dat.gui");



async function init(file) {
    var container,
      camera,
      scene,
      renderer,
      controls,
      light,
      vol,
      mesh,
      height,
      heightFinal,
      width,
      widthFinal,
      depth,
      depthFinal;
  
    var density = parseFloat("1.05");
    var filament_cost = parseFloat("200");
    var filament_diameter = parseFloat("1.75");
    var printing_speed = parseFloat("150");
  
    container =document.querySelector('#content-dialog');
  
    container.innerHTML = "";
  
    camera = new THREE.PerspectiveCamera(
      37.8,
      window.innerWidth / window.innerHeight,
      1,
      100000
    );
  
    camera.position.z = 300;
    camera.position.y = -500;
    camera.position.x = -500;
    camera.up = new THREE.Vector3(0, 0, 1);
  
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x303030);
  
    var reader = new FileReader();
  
    var geometry = new STLLoader().parse(file);
    /*   
    geometry.computeFaceNormals();
    */
    geometry.computeVertexNormals();
    geometry.center();
    console.log(geometry);
  
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    mesh = new THREE.Mesh(geometry, material);
  
    // CALCULATING THE VOLUME
    vol = 0;
  
    mesh.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        var positions = child.geometry.getAttribute("position").array;
        for (var i = 0; i < positions.length; i += 9) {
          var t1 = {};
          t1.x = positions[i + 0];
          t1.y = positions[i + 1];
          t1.z = positions[i + 2];
  
          var t2 = {};
          t2.x = positions[i + 3];
          t2.y = positions[i + 4];
          t2.z = positions[i + 5];
  
          var t3 = {};
          t3.x = positions[i + 6];
          t3.y = positions[i + 7];
          t3.z = positions[i + 8];
        }
      }
    });
  
    var box = new THREE.Box3().setFromObject(mesh);
  
    height = box.max.z - box.min.z;
    width = box.max.x - box.min.x;
    depth = box.max.y - box.min.y;
  
    heightFinal = height / 10;
    heightFinal = heightFinal.toFixed(2);
    widthFinal = width / 10;
    widthFinal = widthFinal.toFixed(2);
    depthFinal = depth / 10;
    depthFinal = depthFinal.toFixed(2);
    var volumeFinal = vol / 1000;
    volumeFinal = volumeFinal.toFixed(2);
    var weightFinal = volumeFinal * density;
    weightFinal = weightFinal.toFixed(2);
  
    var filament_length = parseFloat(
      (((vol / (filament_diameter / 2)) ^ (2 / Math.PI)) * 2) / 10
    ).toFixed(2);
    filament_length = parseFloat(filament_length).toFixed(0);
  
    var hours = Math.floor(filament_length / printing_speed / 60);
    hours = parseFloat(hours).toFixed(0);
  
    var minutes = (filament_length / printing_speed) % 60;
    minutes = parseFloat(minutes).toFixed(0);
  
    if (minutes == 0) {
      minutes = 1;
    }
  
    var finalCost = (weightFinal * filament_cost) / 1000;
    finalCost = parseFloat(finalCost).toFixed(2);
  
    var distance;
  
    if (height > width && height > depth) {
      distance = height * 2;
    } else if (width > height && width > depth) {
      distance = width * 2;
    } else if (depth > height && depth > width) {
      distance = depth * 2;
    } else {
      distance = depth * 4;
    }
  
    camera.position.set(0, -distance, 0);
  
    var x = distance + 200;
    var y = distance + 200;
    var division_x = Math.floor(x / 10);
    var division_y = Math.floor(y / 10);
  

    var wirePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(x, y, division_x, division_y),
      new THREE.MeshPhongMaterial({
        emissive: 0x707070,
        color: 0x000000,
        wireframe: true,
        wireframeLinewidth: 1,
      })
    );
    wirePlane.receiveShadow = true;
    wirePlane.position.z = box.min.z - 0.1;

    scene.add(wirePlane);
  
    // AN ALTERNATIVE FOR MOVING THE OBJECT USING THE MOUSE WITHIN THE RENDERER
    // controls = new OrbitControls(camera);
  
    scene.add(mesh);
  
    light = new THREE.HemisphereLight(0xe8e8e8, 0x000000, 1);
    light.position.set(0, 0, 0);
    scene.add(light);
    const light2 = new THREE.DirectionalLight(0xe8e8e8,0.5)
    scene.add(light2)


    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };
    function render() {
      controls.update();
      light.position.copy(camera.position);
  
      renderer.render(scene, camera);
    }
    animate();
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }
    window.addEventListener("resize", onWindowResize, false);
    
        /*    
    const gui = new GUI();
    const controlliGui = gui.addFolder("Controlli");
    controlliGui.add(light, "intensity", 0, 10, 0.1);
    controlliGui.add(wirePlane, "visible").name("base visibile");
    controlliGui.open();
    const guiContainer = document.querySelector(".dg.ac");
    guiContainer.style.position = "fixed";
    guiContainer.style.left = 0;
    guiContainer.style.top = 0; 
    
    guiContainer.style.zIndex = 10000000;
    container.appendChild(guiContainer)
    */

}
  

const stlLoader=(url)=>{
    fetch(url)
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((response) => {
      init(response);
    });
}

module.exports = {stlLoader}


