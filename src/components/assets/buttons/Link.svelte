

<script>
    import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
    import mouseState from "$lib/localData/mouse.svelte";
  
  
    let {
      children,
      url,
      onClick=()=>{},
      className="",
    } = $props();
  </script>
  
  
  <button class={(mouseState.state.haveCustomCursor ? "hover:lg:cursor-none" : "") +" "+ className} onclick={()=>{onClick();goto(base+url)}}>
    {@render children?.()}
  </button>
  