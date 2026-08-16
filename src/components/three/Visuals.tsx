import type * as THREE from "three";
import { HoloCanvas } from "./HoloCanvas";

const CYAN = 0x22e0ff;
const PLASMA = 0xff3df0;
const LIME = 0x9dff3d;

/** Rotating wireframe core with orbiting rings — student XP / identity visual. */
export function HoloCore({ className = "", color = CYAN }: { className?: string; color?: number }) {
  return (
    <HoloCanvas
      className={className}
      cameraZ={5.2}
      setup={({ THREE, scene }) => {
        const group = new THREE.Group();
        scene.add(group);

        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.35, 1),
          new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.85 }),
        );
        group.add(core);

        const shell = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.9, 0),
          new THREE.MeshBasicMaterial({ color: PLASMA, wireframe: true, transparent: true, opacity: 0.28 }),
        );
        group.add(shell);

        const rings: THREE.Mesh[] = [];
        for (let i = 0; i < 3; i++) {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(2.2 + i * 0.35, 0.008, 8, 128),
            new THREE.MeshBasicMaterial({
              color: i === 1 ? PLASMA : color,
              transparent: true,
              opacity: 0.5,
            }),
          );
          ring.rotation.x = Math.PI / 2 + i * 0.45;
          ring.rotation.y = i * 0.6;
          rings.push(ring);
          group.add(ring);
        }

        const count = 400;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const r = 2.6 + Math.random() * 1.8;
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
          pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
          pos[i * 3 + 2] = r * Math.cos(ph);
        }
        const dust = new THREE.Points(
          new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(pos, 3)),
          new THREE.PointsMaterial({ color, size: 0.035, transparent: true, opacity: 0.65 }),
        );
        group.add(dust);

        return {
          update: (t, p) => {
            core.rotation.y = t * 0.35;
            core.rotation.x = t * 0.2;
            shell.rotation.y = -t * 0.18;
            rings.forEach((r, i) => (r.rotation.z = t * (0.25 + i * 0.12)));
            dust.rotation.y = t * 0.08;
            group.rotation.y += (p.x * 0.5 - group.rotation.y) * 0.05;
            group.rotation.x += (p.y * 0.3 - group.rotation.x) * 0.05;
          },
        };
      }}
    />
  );
}

/** Particle globe with latitude wire — institutional data sphere. */
export function DataSphere({ className = "" }: { className?: string }) {
  return (
    <HoloCanvas
      className={className}
      cameraZ={5.5}
      setup={({ THREE, scene }) => {
        const group = new THREE.Group();
        scene.add(group);

        const wire = new THREE.Mesh(
          new THREE.SphereGeometry(1.85, 28, 18),
          new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.22 }),
        );
        group.add(wire);

        const count = 900;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const ph = Math.acos(2 * Math.random() - 1);
          const th = Math.random() * Math.PI * 2;
          pos[i * 3] = 1.9 * Math.sin(ph) * Math.cos(th);
          pos[i * 3 + 1] = 1.9 * Math.sin(ph) * Math.sin(th);
          pos[i * 3 + 2] = 1.9 * Math.cos(ph);
        }
        const nodes = new THREE.Points(
          new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(pos, 3)),
          new THREE.PointsMaterial({ color: PLASMA, size: 0.04, transparent: true, opacity: 0.8 }),
        );
        group.add(nodes);

        const arcs: THREE.Line[] = [];
        for (let i = 0; i < 8; i++) {
          const curve = new THREE.EllipseCurve(0, 0, 2.3, 2.3, 0, Math.PI * (0.4 + Math.random() * 0.8));
          const geo = new THREE.BufferGeometry().setFromPoints(
            curve.getPoints(64).map((p) => new THREE.Vector3(p.x, p.y, 0)),
          );
          const line = new THREE.Line(
            geo,
            new THREE.LineBasicMaterial({ color: i % 2 ? LIME : CYAN, transparent: true, opacity: 0.45 }),
          );
          line.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
          arcs.push(line);
          group.add(line);
        }

        return {
          update: (t, p) => {
            group.rotation.y = t * 0.16 + p.x * 0.4;
            group.rotation.x = 0.2 + p.y * 0.25;
            arcs.forEach((a, i) => (a.rotation.z += 0.0015 * (i % 3 ? 1 : -1)));
            nodes.rotation.y = -t * 0.05;
          },
        };
      }}
    />
  );
}

/** 3D bar field driven by real metrics — subject / department performance. */
export function BarField({
  values,
  className = "",
  color = CYAN,
}: {
  values: { label: string; value: number }[];
  className?: string;
  color?: number;
}) {
  return (
    <HoloCanvas
      className={className}
      cameraZ={7}
      setup={({ THREE, scene, camera }) => {
        camera.position.set(0, 2.6, 7);
        camera.lookAt(0, 0, 0);
        const group = new THREE.Group();
        scene.add(group);

        const floor = new THREE.GridHelper(9, 18, PLASMA, CYAN);
        (floor.material as THREE.Material).transparent = true;
        (floor.material as THREE.Material).opacity = 0.18;
        group.add(floor);

        const bars = values.map((v, i) => {
          const h = Math.max(v.value, 5) / 22;
          const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.55, h, 0.55),
            new THREE.MeshBasicMaterial({
              color: v.value < 65 ? PLASMA : v.value < 80 ? 0xffb03d : color,
              wireframe: true,
            }),
          );
          const x = (i - (values.length - 1) / 2) * 1.15;
          mesh.position.set(x, h / 2, 0);
          const cap = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.03, 0.6),
            new THREE.MeshBasicMaterial({ color: LIME, transparent: true, opacity: 0.8 }),
          );
          cap.position.set(x, h, 0);
          group.add(mesh, cap);
          return { mesh, cap, h };
        });

        return {
          update: (t, p) => {
            group.rotation.y = Math.sin(t * 0.25) * 0.35 + p.x * 0.4;
            bars.forEach((b, i) => {
              const s = 1 + Math.sin(t * 1.4 + i) * 0.04;
              b.mesh.scale.y = s;
              b.cap.position.y = b.h * s;
            });
          },
        };
      }}
    />
  );
}

/** Course knowledge graph: central node with orbiting module satellites. */
export function ModuleOrbit({ modules, className = "" }: { modules: string[]; className?: string }) {
  return (
    <HoloCanvas
      className={className}
      cameraZ={6.5}
      setup={({ THREE, scene }) => {
        const group = new THREE.Group();
        scene.add(group);

        const hub = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.75, 0),
          new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true }),
        );
        group.add(hub);

        const n = Math.max(modules.length, 3);
        const sats = Array.from({ length: n }, (_, i) => {
          const node = new THREE.Mesh(
            new THREE.TetrahedronGeometry(0.3, 0),
            new THREE.MeshBasicMaterial({ color: i % 2 ? PLASMA : LIME, wireframe: true }),
          );
          const link = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
            new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.35 }),
          );
          group.add(node, link);
          return { node, link, phase: (i / n) * Math.PI * 2, radius: 2.4 + (i % 2) * 0.6 };
        });

        return {
          update: (t, p) => {
            hub.rotation.y = t * 0.5;
            hub.rotation.x = t * 0.3;
            sats.forEach((s, i) => {
              const a = s.phase + t * 0.4 * (i % 2 ? 1 : -1);
              s.node.position.set(
                Math.cos(a) * s.radius,
                Math.sin(a * 1.3) * 0.9,
                Math.sin(a) * s.radius,
              );
              s.node.rotation.set(t, t * 0.7, 0);
              s.link.geometry.setFromPoints([new THREE.Vector3(), s.node.position.clone()]);
            });
            group.rotation.y += (p.x * 0.6 - group.rotation.y) * 0.04;
            group.rotation.x += (p.y * 0.3 - group.rotation.x) * 0.04;
          },
        };
      }}
    />
  );
}

/** Scanning tunnel of rings — used behind headers / AI engine panels. */
export function DataTunnel({ className = "" }: { className?: string }) {
  return (
    <HoloCanvas
      className={className}
      cameraZ={0.1}
      setup={({ THREE, scene }) => {
        const rings: THREE.Mesh[] = [];
        for (let i = 0; i < 40; i++) {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(2.2, 0.006, 6, 64),
            new THREE.MeshBasicMaterial({
              color: i % 5 === 0 ? PLASMA : CYAN,
              transparent: true,
              opacity: 0.4,
            }),
          );
          ring.position.z = -i * 1.2;
          rings.push(ring);
          scene.add(ring);
        }
        return {
          update: (t, p) => {
            rings.forEach((r, i) => {
              r.position.z += 0.12;
              if (r.position.z > 1) r.position.z = -47;
              r.rotation.z = t * 0.2 + i * 0.1;
              r.position.x = p.x * 0.6;
              r.position.y = -p.y * 0.4;
            });
          },
        };
      }}
    />
  );
}
