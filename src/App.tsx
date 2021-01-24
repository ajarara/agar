import React, { useEffect, useRef } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, CircleGeometry, MeshBasicMaterial, Mesh } from 'three';

const setup = (scene: Scene, camera: PerspectiveCamera) => {
  console.log("setup");
  const geometry = new CircleGeometry(1,32);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const ball = new Mesh(geometry, material);
  scene.add(ball);

  camera.position.z = 20;

  return { ball };
}

const animationLoop = (ball: Mesh) => {
  ball.position.x += 0.01;
}

const App: React.FC = () => {

  useEffect(() => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const { ball } = setup(scene, camera);
    const element = document.getElementById('__container')!;
    const canvas = element.children[0];
    element.replaceChild(renderer.domElement, canvas);
    
    let animate = () => {
      requestAnimationFrame(animate);
      animationLoop(ball);
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
