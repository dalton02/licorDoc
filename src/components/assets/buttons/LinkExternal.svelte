

<script>
    import mouseState from "$lib/localData/mouse.svelte";
    
    let {
      children,
      url,
      className="",
    } = $props();
  </script>
  
  
  <a class={(mouseState.state.haveCustomCursor ? "hover:lg:cursor-none" : "") +" "+ className} target="_blank" href={url}>
    {@render children?.()}
  </a>
  