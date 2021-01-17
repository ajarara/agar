import React, { useEffect, useRef } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

const animationLoop = () => {
  
}

const App: React.FC = () => {
  const scene = useRef(new Scene());
  const camera = useRef(new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const renderer = useRef(new WebGLRenderer());
  renderer.current!.setSize( window.innerWidth, window.innerHeight);

  useEffect(() => {
    const element = document.getElementById('__canvas');
    element?.parentNode?.replaceChild(renderer.current!.domElement, element!);
    const animate = () => {
      requestAnimationFrame(animate);
      animationLoop();
      renderer.current!.render(scene.current!, camera.current!);
    }
    animate();
  }, []);
  
  return (
    <div id={'__canvas'}/>
  );
}

export default App;
