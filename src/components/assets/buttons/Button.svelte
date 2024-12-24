
<script>
  import { browser } from "$app/environment";
  import mouseState from "$lib/localData/mouse.svelte";


  let {
    children,
    onClick = () => {},
    className="",
  } = $props();
</script>


<button class={(mouseState.state.haveCustomCursor ? "hover:lg:cursor-none" : "") +" "+ className} onclick={onClick}>
  {@render children?.()}
</button>
