<script lang="ts">
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';
	import { invalidateAll } from '$app/navigation';
	import LL from '../../lib/i18n/i18n-svelte';

	const user = getUser();
	$: console.log({u: $user?.role })
</script>

<div class="">
	<!-- <CMSLogo className="w-10" fill="red" /> -->
	<h1 class="">
		{$LL.LOGIN_SignUp()}
	</h1>
</div>
<p>This page is protected and can only be accessed by authenticated users.</p>
<pre class="code">
{JSON.stringify($user, null, 2)}
</pre>


<button
	on:click={async () => {
		await signOut();
		invalidateAll();
	}}>Sign out</button
>
