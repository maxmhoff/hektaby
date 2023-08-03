<script lang="ts">
	import { T } from '@threlte/core';
	import * as THREE from 'three';
	const sunsetShader = {
		uniforms: {
			topColor: { value: new THREE.Color(0x8b72be) }, // Lavender
			bottomColor: { value: new THREE.Color(0xffc0cb) }, // Pink
			offset: { value: 30.0 },
			exponent: { value: 0.6 }
		},
		vertexShader: `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
		fragmentShader: `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    varying vec3 vWorldPosition;
    void main() {
      float h = normalize(vWorldPosition + offset).y;
      gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
    }`
	};
</script>

<T.Mesh>
	<T.SphereGeometry args={[85, 85]} />
	<T.ShaderMaterial
		uniforms={sunsetShader.uniforms}
		vertexShader={sunsetShader.vertexShader}
		fragmentShader={sunsetShader.fragmentShader}
		side={THREE.BackSide}
	/>
</T.Mesh>
