<script lang="ts">
	type Props = {
		color: string;
		name: string;
	};
	let { color, name }: Props = $props();

	    const TOTAL_COLORS = 10;
		const SHADE_AMOUNTS = Array.from({ length: TOTAL_COLORS/2 }, (_, i) => (i + 1) * (-90 / (TOTAL_COLORS / 2) + 1.5));
		const DARK_SHADE_AMOUNTS = Array.from({ length: TOTAL_COLORS/2 }, (_, i) => (i + 1) * (90 / (TOTAL_COLORS / 2) - 3));

	let lightenColorShades = $derived(() => {
		const shades = [0, ...SHADE_AMOUNTS].map((amount) => {
			if (color && color.startsWith('#') && color.length === 7) {
				return getColorShade(color, amount);
			}
			return 'transparent';
		});
		return shades.sort((a, b) => {
			return parseInt(a.slice(1), 16) - parseInt(b.slice(1), 16);
		});
	});

	let darkenColorShades = $derived(() => {
		const shades = [0, ...DARK_SHADE_AMOUNTS].map((amount) => {
			if (color && color.startsWith('#') && color.length === 7) {
				return getColorShade(color, amount);
			}
			return 'transparent';
		});
		return shades.sort((a, b) => {
			return parseInt(a.slice(1), 16) - parseInt(b.slice(1), 16);
		});
	});

	/**
	 * Converts a hex color by a given amount (negative to lighten, positive to darken).
	 */
	function getColorShade(hex: string, amount: number): string {
		const hexOnly = hex.slice(1);
		const num = parseInt(hexOnly, 16);

		let r = num >> 16;
		let g = (num >> 8) & 0x00ff;
		let b = num & 0x0000ff;

		if (amount > 0) {
			r = r * (1 - amount / 100);
			g = g * (1 - amount / 100);
			b = b * (1 - amount / 100);
		} else {
			r = r + (255 - r) * (-amount / 100);
			g = g + (255 - g) * (-amount / 100);
			b = b + (255 - b) * (-amount / 100);
		}

		r = Math.max(0, Math.min(255, Math.round(r)));
		g = Math.max(0, Math.min(255, Math.round(g)));
		b = Math.max(0, Math.min(255, Math.round(b)));

		const newColor = b | (g << 8) | (r << 16);

		const hexString = newColor.toString(16).padStart(6, '0');

		return `#${hexString}`;
	}
</script>

<div class="flex items-center space-x-4 mb-6">
	<input type="color" bind:value={color} class="h-10 w-10 p-0 border-none" />
	<div>
		<input bind:value={color} class="border p-2 rounded w-32 font-mono" />
		<p class="capitalize">{name}</p>
	</div>
</div>

<div class="flex flex-col gap-y-4">
	<div class="flex space-x-1">
		{#each lightenColorShades() as shade, i (i)}
			<div class="w-10 aspect-square rounded" style:background={shade} title={shade}></div>
		{/each}
	</div>
	<div class="flex space-x-1">
		{#each darkenColorShades() as shade, i (i)}
			<div class="w-10 aspect-square rounded" style:background={shade} title={shade}></div>
		{/each}
	</div>
</div>
