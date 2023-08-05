<script lang="ts">
	import { T } from '@threlte/core';
	import * as THREE from 'three';
	const sunsetShader = {
		uniforms: {
			topColor: { value: new THREE.Color(0xb095e8) }, // Lavender
			bottomColor: { value: new THREE.Color(0xde99aa) }, // Pink
			offset: { value: 40.0 },
			exponent: { value: 1 }
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
