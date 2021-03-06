if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
{
    
    var glass = document.querySelector('.glasses');
    glass.classList.add('imgsp');
    glass.classList.remove('glasses');

}else{

var container, stats;

			var camera, scene, renderer;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;


			init();
			animate();


			function init() {

				container = document.querySelector( '.glasses' );
                    
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 2000);
                    camera.position.z = 250;
                    camera.position.set(0, -10000, 250);

				// scene

				scene = new THREE.Scene();

				var ambient = new THREE.AmbientLight( 0xffffff );
				scene.add( ambient );

				var directionalLight = new THREE.DirectionalLight( 0xffffff );
				directionalLight.position.set( 0, 0, 1 ).normalize();
				scene.add( directionalLight );

				// BEGIN Clara.io JSON loader code
				var objectLoader = new THREE.ObjectLoader();
				objectLoader.load("/models/scene.json", function ( obj ) {
				 	scene.add( obj );
				} );
				// END Clara.io JSON loader code

				renderer = new THREE.WebGLRenderer({
                        alpha: true
                    });
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY - camera.position.y ) * .05;

				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}
    
    
    }
