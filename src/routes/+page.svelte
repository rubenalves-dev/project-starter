<script lang="ts">
	import ColorShader from '$lib/components/ui/color-shader/index.svelte';
	let primaryState = $state('#0000ff');
	let secondaryState = $state('#ff0000');
	let accentState = $state('#00ff00');
	let baseState = $state('#ffff00');
</script>

<h2>Color Shade Generator (Svelte 5 Runes)</h2>

<div class="grid grid-cols-2 gap-4">
	<ColorShader color={primaryState} name="primary" />
	<ColorShader color={secondaryState} name="secondary" />
	<ColorShader color={accentState} name="accent" />
	<ColorShader color={baseState} name="base" />
</div>
