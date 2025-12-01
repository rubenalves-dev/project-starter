<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import ColorShader from '$lib/components/ui/color-shader/color-shader.svelte';
	import { toSlug } from '$lib/utils/strings';
	type Color = {
	    name: string;
		color: string;
		values?: string[];
	}

	let colors: Color[] = $state<Color[]>([{
	    name: 'primary',
		color: '#e97b31',
		values: []
	},{
	    name: 'base',
		color: '#777777',
		values: []
	}])

	$effect(() => {
	console.log($state.snapshot(colors))
	})

	function addColor() {
	  colors.push({color: '#777777', name: 'New Color', values: []})
	}

	function removeColor(color: Color) {
	  colors.splice(colors.indexOf(color), 1);
	}
</script>

<h2>Color Shade Generator</h2>

<div class="grid grid-cols-2 gap-4">
<div class="flex flex-col gap-4">
    {#each colors as color, i (i)}
    <div class="grid grid-cols-[auto_1fr] gap-2 items-center">
            <Button variant="destructive" class={{"invisible": i === 0}}  onclick={() => removeColor(color)}>-</Button>
        <ColorShader color={color.color} bind:name={color.name} bind:values={color.values} />
    </div>

    <hr/>
    {/each}
    <Button variant="outline" onclick={() => addColor()}>+</Button>
</div>

<pre class="text-xs p-4 border">
:root &lbrace;
    --white: #ffffff;
    --black: #000000;
    {#each colors as color, i (i)}{@const colorValues = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]}{#each colorValues as cv, j (j)}
    --{toSlug(color.name)}-{cv}: {color?.values?.[j] ?? 'transparent'};<span style:background={color?.values?.[j]} class="aspect-square inline-block w-4"></span>{/each}{/each}
&rbrace;
</pre>
</div>
