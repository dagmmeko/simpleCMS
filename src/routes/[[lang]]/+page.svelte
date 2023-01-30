<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';
	import { invalidateAll } from '$app/navigation';
	import LL from '../../lib/i18n/i18n-svelte';
	import { enhance } from '$app/forms';

	const user = getUser();
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

<form
	action="?/signOut"
	method="post"
	use:enhance={async () => {
		invalidateAll();
	}}
>
	<button type="submit">Sign out</button>
</form>
