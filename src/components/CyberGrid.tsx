import { useEffect, useRef } from "react";

/**
 * Animated three.js backdrop: an infinite neon wireframe terrain grid with a
 * drifting particle field. Loaded only in the browser (dynamic import).
 */
export function CyberGrid({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");
      if (disposed || !mount) return;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x070b16, 0.06);

      const camera = new THREE.PerspectiveCamera(
        62,
        mount.clientWidth / Math.max(mount.clientHeight, 1),
        0.1,
        120,
      );
      camera.position.set(0, 2.4, 8);
      camera.lookAt(0, 0.6, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      // Neon terrain grid
      const geo = new THREE.PlaneGeometry(70, 70, 70, 70);
      const grid = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({
          color: 0x22e6ff,
          wireframe: true,
          transparent: true,
          opacity: 0.28,
        }),
      );
      grid.rotation.x = -Math.PI / 2;
      grid.position.y = -1.4;
      scene.add(grid);

      const posAttr = geo.attributes["position"] as import("three").BufferAttribute;
      const base = Float32Array.from(posAttr.array);

      // Particle field
      const count = 700;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = Math.random() * 22 - 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const points = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({
          color: 0xff5cc8,
          size: 0.09,
          transparent: true,
          opacity: 0.75,
        }),
      );
      scene.add(points);

      // Orbiting knowledge core
      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.5, 1),
        new THREE.MeshBasicMaterial({
          color: 0x8ef7d1,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
        }),
      );
      core.position.set(0, 3.2, -8);
      scene.add(core);

      let pointerX = 0;
      let pointerY = 0;
      const onPointer = (e: PointerEvent) => {
        pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
        pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointer);

      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", onResize);

      let raf = 0;
      const clock = new THREE.Clock();
      const tick = () => {
        const t = clock.getElapsedTime();
        const arr = posAttr.array as unknown as Float32Array;
        for (let i = 0; i < arr.length; i += 3) {
          const x = base[i]!;
          const y = base[i + 1]!;
          arr[i + 2] = Math.sin(x * 0.25 + t * 0.9) * 0.5 + Math.cos(y * 0.3 + t * 0.6) * 0.5;
        }
        posAttr.needsUpdate = true;

        points.rotation.y = t * 0.03;
        core.rotation.x = t * 0.25;
        core.rotation.y = t * 0.35;
        core.position.y = 3.2 + Math.sin(t * 0.8) * 0.25;

        camera.position.x += (pointerX * 1.6 - camera.position.x) * 0.03;
        camera.position.y += (2.4 - pointerY * 0.9 - camera.position.y) * 0.03;
        camera.lookAt(0, 0.6, -2);

        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointer);
        renderer.dispose();
        geo.dispose();
        pGeo.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} aria-hidden className={className} />;
}

export default CyberGrid;
