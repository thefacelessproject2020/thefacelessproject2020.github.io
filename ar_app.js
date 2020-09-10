//decalrar las variables de nuestra app. 
var scene, camera, renderer, clock, deltaTime, totalTime;

var arToolkitSource, arToolkitContext;

var mesh1;
var mesh2;
var mesh3;

var markerRoot1, markerRoot2, markerRoot3, markerRoot4, markerRoot5, markerRoot6, markerRoot7;

var rhinoMesh, rhinoMesh2, rhinoMesh3, rhinoMesh4, rhinoMesh5;

init(); // llamado de la funcion principal que se encarga de hacer casi  todo en la app
animate();

function init() {
    ////////////////////////////////////////////////////////
    //THREE Setup
    ///////////////////////////////////////////////////////
    
    // crear nuestra escena -  OBJETO.
    scene = new THREE.Scene(); //  crea un objeto escena.

    ///////////////////////////////////
    //////// Luces
    ///////////////////////////////

    let light = new THREE.PointLight(0xffffff, 1, 100); ///// creo nueva luz
    light.position.set(0,4,0); ///// indico la posicion de la luz
    light.castShadow = true; ///// activo la capacidad de generar sombras
    scene.add(light); /// agrego laluz a mi escena

    let lightSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.1),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
        })
    )

    lightSphere.position.copy(light);
    scene.add(lightSphere);
    
    //creamos luces 
    let ambientLight = new THREE.AmbientLight(0xcccccc, 1); //creo las luz
    scene.add(ambientLight); //agrego la luz a mi escena. 

    //CREACION DE LA CAMARA
    camera = new THREE.Camera(); //creo objeto camara 
    scene.add(camera); // agrego camara a la escena

    //permite mostrar las cosas en 3d en la pantalla
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setClearColor(new THREE.Color('lightgrey'), 0);
    renderer.setSize(640, 480);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';
    document.body.appendChild(renderer.domElement);


    ///// render sombra
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //CREACION DE UN CONTADOR
    clock = new THREE.Clock();
    deltaTime = 0;
    totalTime = 0;

    ////////////////////////////////////////////////////////
    //ARTOOLKITSOURCE Setup
    ///////////////////////////////////////////////////////

    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });

    function onResize()
	{
		arToolkitSource.onResize()	
		arToolkitSource.copySizeTo(renderer.domElement)	
		if ( arToolkitContext.arController !== null )
		{
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
		}	
	}


    arToolkitSource.init(function onReady() {
        onResize();
    });

    //agregamos un event listener
    window.addEventListener('resize', function () { onResize() });

	////////////////////////////////////////////////////////////
	// setup arToolkitContext
    ////////////////////////////////////////////////////////////
    
    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'data/camera_para.dat',
        detectionMode: 'mono'
    });

    arToolkitContext.init(function onCompleted() {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    /////////////////////////////////////////////////
    //Marker setup
    /////////////////////////////////////////////////

    ///////MARKER 1 MASK
    markerRoot1 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot1); // agregamos el grupo a la escena. 
    ////CREAMOS EL MARCADOR
    let markerControl = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
        type: 'pattern', patternUrl: 'data/pattern-Mask.patt',
    });

    /////////MARKER 2 FACELESS
    markerRoot2 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot2); // agregamos el grupo a la escena. 
    //// CREAMOS EL MARCADOR
    let markerControl2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {
        type: 'pattern', patternUrl: 'data/pattern-Faceless.patt',
    });

    /////////MARKER 3 HEAD
    markerRoot3 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot3); // agregamos el grupo a la escena. 
    //// CREAMOS EL MARCADOR
    let markerControl3 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot3, {
        type: 'pattern', patternUrl: 'data/pattern-Head.patt',
    });

    /////////MARKER 4 IS FUTURE
    markerRoot4 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot4); // agregamos el grupo a la escena. 
    //// CREAMOS EL MARCADOR
    let markerControl4 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot4, {
        type: 'pattern', patternUrl: 'data/pattern-IsFuture.patt',
    });

    /////////MARKER 5 DISTANCE
    markerRoot5 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot5); // agregamos el grupo a la escena. 
    //// CREAMOS EL MARCADOR
    let markerControl5 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot5, {
        type: 'pattern', patternUrl: 'data/pattern-PATRON_DISTANCE.patt',
    });

    /////////MARKER 6 VIDEO
    markerRoot6 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot6); // agregamos el grupo a la escena. 
    //// CREAMOS EL MARCADOR
    let markerControl6 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot6, {
        type: 'pattern', patternUrl: 'data/pattern-patron_video.patt',
    });

    /////////MARKER 7 RESPECT
    markerRoot7 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot7); // agregamos el grupo a la escena. 
    //// CREAMOS EL MARCADOR
    let markerControl7 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot7, {
        type: 'pattern', patternUrl: 'data/pattern-Respect.patt',
    });

    /////////////////////////////////////////////////
    //Geometry
    /////////////////////////////////////////////////

    ///// creo una geometria
    let geo1 = new THREE.CubeGeometry(.75, .75, .75);
    ////// creo material
    let material1 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff});

    ///// creo una geometria
    let geo2 = new THREE.CubeGeometry(.75, .75, .75);
    ////// creo material
    let material2 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff});



    ////////// Mesh 1 //////////////
    ////// creo un mesh con la geometria y el material
    mesh1 = new THREE.Mesh(geo1, material1);
    /////// cambio la posicion de mi mesh
    mesh1.position.y = 0.5;

    ////// activo el recibir y proyectar sombras en otros meshes
    mesh1.castShadow = true;
    mesh1.receiveShadow = true

        ////////// Mesh 2 //////////////
    ////// creo un mesh con la geometria y el material
    mesh2 = new THREE.Mesh(geo2, material2);
    /////// cambio la posicion de mi mesh
    mesh2.position.x = 0.75;
    mesh2.position.y = 1.0;

    ////// activo el recibir y proyectar sombras en otros meshes
    mesh1.castShadow = true;
    mesh1.receiveShadow = true

    ////////////////////////
    //////////// Piso
    /////////////////////////

    let floorGeometry = new THREE.PlaneGeometry (20, 20);
    let floorMaterial = new THREE.ShadowMaterial();
    floorMaterial.opacity = 0.3;

    let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

    floorMesh.rotation.x = -Math.PI/2;
    floorMesh.receiveShadow = true;
    markerRoot1.add(floorMesh);

///////////////////////////////////////////////
///////////// MASCARA CONSTRUCCIÓN ////////////
///////////////////////////////////////////////

///// MASCARA ////

    function onProgress(xhr) {console.log((xhr.loaded / xhr.total * 100) + "% loaded"); }
    function onError(xhr) {console.log("ha ocurrido un error");}

    new THREE.MTLLoader()
        .setPath('data/models/')
        .load('mascara-jose.mtl', function(materials){

            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath("data/models/")
                .load("mascara-jose.obj", function(group){
                    rhinoMesh2 = group.children[0];
                    rhinoMesh2.material.side = THREE.DoubleSide;
                    rhinoMesh2.scale.set(0.01, 0.01, 0.01);
                    rhinoMesh2.castShadow = true;
                    rhinoMesh2.receiveShadow = true;
                    
                    
                    markerRoot1.add(rhinoMesh2);



                }, onProgress, onError);
        });

///// CABEZA /////

function onProgress(xhr) {console.log((xhr.loaded / xhr.total * 100) + "% loaded"); }
function onError(xhr) {console.log("ha ocurrido un error");}

new THREE.MTLLoader()
    .setPath('data/models/')
    .load('cabezagris.mtl', function(materials){

        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath("data/models/")
            .load("cabezagris.obj", function(group){
                rhinoMesh2 = group.children[0];
                rhinoMesh2.material.side = THREE.DoubleSide;
                rhinoMesh2.scale.set(0.01, 0.01, 0.01);
                rhinoMesh2.castShadow = true;
                rhinoMesh2.receiveShadow = true;
                
                
                markerRoot3.add(rhinoMesh2);



            }, onProgress, onError);
    });


    ///////////////////////////////////////////
    ////// LETRAS KEEP YOUR DISTANCE //////////
    ///////////////////////////////////////////


    function onProgress(xhr) {console.log((xhr.loaded / xhr.total * 100) + "% loaded"); }
    function onError(xhr) {console.log("ha ocurrido un error");}

    new THREE.MTLLoader()
        .setPath('data/models/')
        .load('kyd.mtl', function(materials){

            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath("data/models/")
                .load("kyd.obj", function(group){
                    rhinoMesh3 = group.children[0];
                    rhinoMesh3.material.side = THREE.DoubleSide;
                    rhinoMesh3.scale.set(0.05, 0.05, 0.05);
                    rhinoMesh3.castShadow = true;
                    rhinoMesh3.receiveShadow = true;
                    
                    
                    markerRoot5.add(rhinoMesh3);



                }, onProgress, onError);
        });

    //////////////////////////////////////
    ///////// MASCARA COLLAR//////////////
    //////////////////////////////////////

    ////// PARTE 1 //////////

    function onProgress(xhr) {console.log((xhr.loaded / xhr.total * 100) + "% loaded"); }
    function onError(xhr) {console.log("ha ocurrido un error");}

    new THREE.MTLLoader()
        .setPath('data/models/')
        .load('mascara-javi-l1.mtl', function(materials){

            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath("data/models/")
                .load("mascara-javi-l1.obj", function(group){
                    rhinoMesh4 = group.children[0];
                    rhinoMesh4.material.side = THREE.DoubleSide;
                    rhinoMesh4.scale.set(0.02, 0.02, 0.02);
                    rhinoMesh4.castShadow = true;
                    rhinoMesh4.receiveShadow = true;
                    
                    
                    markerRoot7.add(rhinoMesh4);



                }, onProgress, onError);
        });

    ////// PARTE 2 //////////

    function onProgress(xhr) {console.log((xhr.loaded / xhr.total * 100) + "% loaded"); }
    function onError(xhr) {console.log("ha ocurrido un error");}

    new THREE.MTLLoader()
        .setPath('data/models/')
        .load('mascara-javi-l2.mtl', function(materials){

            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath("data/models/")
                .load("mascara-javi-l2.obj", function(group){
                    rhinoMesh4 = group.children[0];
                    rhinoMesh4.material.side = THREE.DoubleSide;
                    rhinoMesh4.scale.set(0.02, 0.02, 0.02);
                    rhinoMesh4.castShadow = true;
                    rhinoMesh4.receiveShadow = true;
                    
                    
                    markerRoot7.add(rhinoMesh4);



                }, onProgress, onError);
        });

    
    /////////////////////////
    ///// CARGAR IMAGEN /////
    /////////////////////////


    /// PARAMETRO QUE CAMBIA EL TAMAÑO DE LA IMAGEN //// 
	let geoPlane = new THREE.PlaneBufferGeometry(4,8,4,4); // este parametro le cambia el tamaño a la imagen
    let loader2 = new THREE.TextureLoader();
    /// PONER LA IMAGEN AQUI ///
	let texture3 = loader2.load("data/images/P1.png");
	let material4 = new THREE.MeshBasicMaterial({map:texture3});
	let meshImage = new THREE.Mesh(geoPlane, material4);
	
	meshImage.rotation.x = -Math.PI / 2 ;

    markerRoot4.add(meshImage);



    ///////////////////////////////////////////////
    /////////// MASCARA DENTRO DE LA CAJA /////////
    ///////////////////////////////////////////////

     //01-CREACION CAJA
 let geocaja = new THREE.BoxGeometry(1,1,1); /////////// geometria box

 let loadercaja = new THREE.TextureLoader(); //////////// objeto que me permite cargar una imagen

 let texturecaja = loadercaja.load("data/images/vitrina-01.png"); /// carga la imagen de la carpeta images

 let materialcaja = new THREE.MeshLambertMaterial(
	{
		transparent: true,
		map: texturecaja,
		side: THREE.BackSide
	}
 ); /// crea un material que muestra las caras interiores de un objeto


 mesh3 = new THREE.Mesh(geocaja, materialcaja); /// Creo un nuevo mesh
 
 
 mesh3.position.y = -.5;

 markerRoot2.add(mesh3); ///// agrego el mesh al marcador y a la escena.

 
///// 02-CREACION GEOMETRIA MASCARA /////
	let geoMask = new THREE.BoxGeometry(1,1,1);
	console.log(geoMask.faces);
	geoMask.faces.splice(4,2);

	let materialcaja2 = new THREE.MeshBasicMaterial(
		{
			colorWrite: false
		}
	);

	let meshMask = new THREE.Mesh(geoMask, materialcaja2);
	meshMask.scale.set(1,1,1).multiplyScalar(1.015);

	meshMask.position.y = -0.5;
	
    markerRoot2.add(meshMask);

    ////// obj rhino
    
    function onProgress(xhr) {console.log((xhr.loaded / xhr.total * 100) + "% loaded"); }
    function onError(xhr) {console.log("ha ocurrido un error");}

    new THREE.MTLLoader()
        .setPath('data/models/')
        .load('cabezaamarilla.mtl', function(materials){

            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath("data/models/")
                .load("cabezaamarilla.obj", function(group){
                    rhinoMesh = group.children[0];
                    rhinoMesh.material.side = THREE.DoubleSide;
                    rhinoMesh.scale.set(0.002, 0.002, 0.002);
                    rhinoMesh.castShadow = true;
                    rhinoMesh.receiveShadow = true;
                    
                    
                    markerRoot2.add(rhinoMesh);



                }, onProgress, onError);
        });

    function onProgress(xhr) {console.log((xhr.loaded / xhr.total * 100) + "% loaded"); }
    function onError(xhr) {console.log("ha ocurrido un error");}

    new THREE.MTLLoader()
        .setPath('data/models/')
        .load('mascaravitrinaroja.mtl', function(materials){

            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath("data/models/")
                .load("mascaravitrinaroja.obj", function(group){
                    rhinoMesh = group.children[0];
                    rhinoMesh.material.side = THREE.DoubleSide;
                    rhinoMesh.scale.set(0.002, 0.002, 0.002);
                    rhinoMesh.castShadow = true;
                    rhinoMesh.receiveShadow = true;
                    
                    
                    markerRoot2.add(rhinoMesh);



                }, onProgress, onError);
        });

//////////////////////////////////////////
//////////////// VIDEO ///////////////////
//////////////////////////////////////////




}

function update() {
    //actualiza contenido de nuestra app AR
    if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement);
    }
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    deltaTime = clock.getDelta();
    totalTime += deltaTime; // totalTime =  totalTime + deltaTime 
    update();
    render();
}