<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '../../Theme.postcss';
	import '../../app.postcss';
	
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';
	
	handleSession(page);
</script>

<div>
	<slot />
</div>

<style lang="postcss">
	@import '@skeletonlabs/skeleton/styles/all.css';
	@import '@skeletonlabs/skeleton/styles/elements.css';
	@import '@skeletonlabs/skeleton/styles/elements/tables.css';
	@import '@skeletonlabs/skeleton/styles/elements/badges.css';
	@import '@skeletonlabs/skeleton/styles/elements/cards.css';
</style>
