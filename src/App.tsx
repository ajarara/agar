import React, { useEffect, useRef } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

const setup = (scene: Scene, camera: PerspectiveCamera) => {
  console.log("setup");
  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  return { cube };
}

const animationLoop = (cube: Mesh) => {
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.03;
}

const App: React.FC = () => {

  useEffect(() => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const { cube } = setup(scene, camera);
    const element = document.getElementById('__container')!;
    const canvas = element.children[0];
    element.replaceChild(renderer.domElement, canvas);
    
    let animate = () => {
      requestAnimationFrame(animate);
      animationLoop(cube);
      renderer.render(scene, camera);
    }
    animate();
  }, []);
  
  return (
    <>
      <div id={'__container'}>
        <div />
      </div>
    </>
  );
}

export default App;
