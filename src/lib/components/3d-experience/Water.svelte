<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import * as THREE from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';

	const vertexShader = `
		precision highp float;
		varying vec2 vUv;
		varying float yPosition;
		uniform float time;
	  
		void main() {
			vUv = uv;
			vec3 pos = position;
			pos.z += sin((pos.x + pos.y + time * 0.5) * 0.5) * 1.0;

			// Rotate the geometry by -90 degrees around the X-axis
			float cosTheta = cos(-3.14159 / 2.0);
			float sinTheta = sin(-3.14159 / 2.0);
			vec3 rotatedPos = vec3(pos.x, pos.y * cosTheta - pos.z * sinTheta, pos.y * sinTheta + pos.z * cosTheta);

			yPosition = rotatedPos.y;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(rotatedPos, 1.0);
		}
	`;

	const fragmentShader = `
		precision highp float;
		varying vec2 vUv;
		varying float yPosition;

		void main() {
			vec3 waterColor = vec3(0.0, 0.5, 1.0);
			vec3 lighterColor = vec3(0.3, 0.65, 1.2);
			float gradient = yPosition * 0.5 + 0.5;
			vec3 color = mix(waterColor, lighterColor, clamp(gradient, 0.0, 1.0));
			gl_FragColor = vec4(color, 1.0);
		}
	`;

	let time = performance.now() * 0.001; // Convert to seconds
	const uniforms = { time: { value: time } };
	const shaderMaterial = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
	const geometry = new THREE.CircleGeometry(60, 60, 64, 64);

	let lastFrameTime = performance.now();
	useFrame(() => {
		let currentFrameTime = performance.now();
		let delta = (currentFrameTime - lastFrameTime) * 0.001; // Convert to seconds
		lastFrameTime = currentFrameTime;

		time += delta * 4; // Adjust the factor here as needed
		shaderMaterial.uniforms.time.value = time;
		shaderMaterial.needsUpdate = true;
	});
</script>

<T.Mesh position.y={-5} rotation.y={DEG2RAD * 180} {geometry} material={shaderMaterial} />