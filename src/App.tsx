import React, { useEffect, useState } from 'react';
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

type SceneState = {
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
}

const App: React.FC = () => {
  const [sceneState, setSceneState] = useState<SceneState | undefined>(undefined);

  useEffect(() => {
    console.log("Scene state creation");
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);


    const element = document.getElementById('__container')!;
    const canvas = element.children[0];
    element.replaceChild(renderer.domElement, canvas);
    setSceneState({ scene, camera, renderer });
  }, []);

  useEffect(() => {
    console.log("Scene state listening!");
    if (!sceneState) {
      return;
    }
    console.log("Scene state set!");
    const { scene, camera, renderer } = sceneState;
    const { ball } = setup(scene, camera);
    
    let animate = () => {
      requestAnimationFrame(animate);
      animationLoop(ball);
      renderer.render(scene, camera);
    }
    animate();
  }, [sceneState]);
  
  return (
    <>
      <div id={'__container'}>
        <div />
      </div>
    </>
  );
}

export default App;
