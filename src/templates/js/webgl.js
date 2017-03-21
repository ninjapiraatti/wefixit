
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}
// setting the viewport width
var viewport = updateViewportDimensions();

function browserSupportsWebGL() {
	var canvas = document.querySelector('.hero--webgl');
	var context = null;var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
	for (var i = 0; i < names.length; ++i) {
		try { context = canvas.getContext(names[i]); }
		catch(e) {}
		if (context) { break; }
	}
	return context !== null;
}

if((browserSupportsWebGL) && (document.querySelector('.hero--webgl') !== null) && (viewport.width >= 1000)) {
  var script = document.createElement("script");
  script.onload = function(){
		var camera, renderer, scene, mikkimesh_bottom, mikkimesh_top, group;
    var mouseX = 0, mouseY = 0;

		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		var mouseXPercentage = 0;
		var mouseYPercentage = 0;

		var smoothX = 0;
		var smoothY = 0;

		var originalCameraX = 4;
		var originalCameraY = 3.6;
		var originalCameraZ = 9.5;

		function init(){

			scene = new THREE.Scene();
	        //camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 5 );
	    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / 500, 0.1, 500 );
	        //camera.position.z = 3200;
	    renderer = new THREE.WebGLRenderer( {alpha: true, antialiasing: true });
	    renderer.setSize( window.innerWidth, 500);
			renderer.shadowMapEnabled = true;
	    document.body.appendChild( renderer.domElement );
	    document.querySelector(".hero--webgl").appendChild( renderer.domElement );

	    //var boxmaterial = new THREE.MeshLambertMaterial( { color: 0x00a0ff, envMap: textureCube } );

	    var loader = new THREE.JSONLoader();
	    loader.load( "site/templates/3dassets/mikki03_yla.js", function(mikki_yla, materials) {
	      //var material = new THREE.MeshPhongMaterial( { color: 0xff9600, specular: 0xffff00, shininess: 5, shading: THREE.FlatShading } );
	      //var material = new THREE.MeshBasicMaterial({color: 0x00a0ff, wireframe: true});
	      //mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( materials ) );
	      //mikkimesh_top = new THREE.Mesh( mikki_yla, materials );
				mikkimesh_top = new THREE.Mesh( mikki_yla, new THREE.MeshPhongMaterial( { color: 0x6797a7, specular: 0xd4f0ee, shininess: 5, shading: THREE.FlatShading } ) );
	      //mikkimesh_top = new THREE.Mesh( mikki_yla, new THREE.MeshFaceMaterial( materials ) ); // Reinstate this once materials are in export
	      //mikkimesh_top.material.materials[ 0 ].shading = THREE.FlatShading;
	      //mikkimesh_top.material.materials[ 1 ].shading = THREE.FlatShading;
				mikkimesh_top.doubleSided = true;
				mikkimesh_top.castShadow = true;
				mikkimesh_top.receiveShadow = true;
	      //mesh = new THREE.Mesh(geometry, material);
	      //scene.add(mikkimesh_top);
				/*
				for ( var i = 0; i < materials.length; i ++ ) {
					material = materials[i];
			    material.side = THREE.DoubleSide;
			  }
				*/
			});

			var loader = new THREE.JSONLoader();
	    loader.load( "site/templates/3dassets/mikki03_ala.js", function(mikki_ala, materials) {
				mikkimesh_bottom = new THREE.Mesh( mikki_ala, new THREE.MeshPhongMaterial( { color: 0x6797a7, specular: 0xd4f0ee, shininess: 5, shading: THREE.FlatShading } ) );
				mikkimesh_bottom.doubleSided = true;
				mikkimesh_bottom.castShadow = true;
				mikkimesh_bottom.receiveShadow = true;
			});

			camera.position.x = originalCameraX;
			camera.position.y = originalCameraY;
			camera.position.z = originalCameraZ;


			var light = new THREE.HemisphereLight( 0xFFFFFF, 0xFFFFFF, 1 ); // Hemisphere light
			var sphere = new THREE.SphereGeometry( 0.01, 1, 1 );
	    var light1 = new THREE.PointLight( 0xFF9600, 4, 8, 4 );
			//light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) );
			//light1.castShadow = true;
			//light1.shadowDarkness = 0.5;
			//light1.shadowCameraVisible = true;
	    //light2 = new THREE.PointLight( 0xffffff, 2, 50 );
	    //light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
	    scene.add( light1 );
	    light1.position.x = 4;
	    light1.position.z = 0;
			light1.position.y = 3;

	    //scene.add( light2 );
	    scene.add( light );

	    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'touchstart', onDocumentTouchStart, false );
			document.addEventListener( 'touchmove', onDocumentTouchMove, false );

			function addObjects(){
				var group = new THREE.Group();//create an empty container
				group.add( mikkimesh_bottom );
				group.add( light1 );//add a mesh with geometry to it
				scene.add( group );//when done, add the group to the scene
				scene.add( mikkimesh_top );//add a mesh with geometry to it
				THREE.SceneUtils.attach( mikkimesh_top, scene, mikkimesh_bottom );
				mikkimesh_top.position.y = 1.4;
				mikkimesh_top.position.z = 0.1;
			}
			setTimeout(function(){addObjects();},1000);
		}

	  function onDocumentMouseMove( event ) {
			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;

			mouseXPercentage = mouseX / windowHalfX;
			mouseYPercentage = mouseY / windowHalfY;

	  }

	  function onDocumentTouchStart( event ) {
	    if ( event.touches.length == 1 ) {

				//event.preventDefault();

				mouseX = event.touches[ 0 ].pageX - windowHalfX;
				mouseY = event.touches[ 0 ].pageY - windowHalfY;

				mouseXPercentage = mouseX / windowHalfX;
				mouseYPercentage = mouseY / windowHalfY;
	      }
	  }

	  function onDocumentTouchMove( event ) {
	      if ( event.touches.length == 1 ) {

				//event.preventDefault();

				mouseX = event.touches[ 0 ].pageX - windowHalfX;
				mouseY = event.touches[ 0 ].pageY - windowHalfY;

				mouseXPercentage = mouseX / windowHalfX;
				mouseYPercentage = mouseY / windowHalfY;
	    }
	  }

	  function render() {
	    var time = Date.now() * 0.0005;

			//camera.position.x = originalCameraX - mouseXPercentage / 4;
			//camera.position.y = originalCameraY - mouseYPercentage * -0.2;
			if (mikkimesh_top) {
				mikkimesh_top.rotation.x = Math.sin(time * 15) / 2 + 0.3;
				mikkimesh_bottom.rotation.y = mouseXPercentage +0.7;
			}

	    requestAnimationFrame( render );
	    renderer.render(scene, camera);
	  }

		init();
		render();
	};
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js";
  document.body.appendChild(script);
}
