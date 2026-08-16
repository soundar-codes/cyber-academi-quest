import { useEffect, useRef } from "react";
import type * as THREE_NS from "three";

type SetupResult = {
  update: (t: number, pointer: { x: number; y: number }) => void;
  dispose?: () => void;
};

type Setup = (ctx: {
  THREE: typeof THREE_NS;
  scene: THREE_NS.Scene;
  camera: THREE_NS.PerspectiveCamera;
  renderer: THREE_NS.WebGLRenderer;
}) => SetupResult;

/**
 * Generic client-only three.js canvas. Handles renderer lifecycle, resize,
 * pointer tracking and disposal so each visual only declares its scene.
 */
export function HoloCanvas({
  setup,
  className = "",
  cameraZ = 6,
}: {
  setup: Setup;
  className?: string;
  cameraZ?: number;
}) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");
      if (disposed || !mount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        55,
        Math.max(mount.clientWidth, 1) / Math.max(mount.clientHeight, 1),
        0.1,
        200,
      );
      camera.position.z = cameraZ;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const { update, dispose } = setupRef.current({ THREE, scene, camera, renderer });

      const pointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        const r = mount.getBoundingClientRect();
        pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      };
      mount.addEventListener("pointermove", onPointer);

      const onResize = () => {
        if (!mount.clientWidth || !mount.clientHeight) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(mount);

      let raf = 0;
      const clock = new THREE.Clock();
      const loop = () => {
        raf = requestAnimationFrame(loop);
        update(clock.getElapsedTime(), pointer);
        renderer.render(scene, camera);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        mount.removeEventListener("pointermove", onPointer);
        dispose?.();
        scene.traverse((obj) => {
          const mesh = obj as THREE_NS.Mesh;
          mesh.geometry?.dispose?.();
          const mat = mesh.material as THREE_NS.Material | THREE_NS.Material[] | undefined;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose?.();
        });
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [cameraZ]);

  return <div ref={mountRef} className={className} aria-hidden />;
}
