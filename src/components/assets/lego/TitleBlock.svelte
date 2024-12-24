<script lang="ts">
  import type { Snippet } from "svelte";


    let {title,children,className,classPosTitle="top-[-90%] left-[50%]"}:{title:string,children:Snippet,className:string,classPosTitle?:string} = $props()

</script>



<div class="relative  group: {className}">
    <span class="text-[14px] {classPosTitle} group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
     translate-y-[-50%] text-zinc-50 opacity-0 scale-50 duration-300 ease-in-out absolute pointer-events-none z-10 bg-slate-800 p-1 px-2 rounded-lg">
        {title}
    </span>
    {@render children?.()}

</div>