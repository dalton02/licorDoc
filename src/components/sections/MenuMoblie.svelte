<script>
  import Button from "$components/assets/buttons/Button.svelte";
  import Link from "$components/assets/buttons/Link.svelte";
  import observer from "$lib/functions/observer/Observer.svelte";
  import { explicitEffect } from "$lib/functions/utils.svelte";


  import documentation from "$lib/localData/documentation.svelte";
  import { fade, slide } from "svelte/transition";

  let isOpen = $state(false);



  explicitEffect(
    ()=>{
      if(observer.signal.tipo==="openMenu"){
        isOpen=!isOpen
        }
      if(observer.signal.tipo==="closeMenu"){
        isOpen=false
        }
    },
    ()=>[observer.signal]
  )


</script>

{#if isOpen}
<div class="fixed lg:hidden flex z-10 items-end justify-start w-screen h-screen bottom-0 left-0 backdrop-blur-[1px] bg-[rgba(0,0,0,.1)]" out:fade>

<ul class="pl-1 pb-[72px] dark:bg-darkStrong bg-lightStrong w-full h-[60svh] z-30 rounded-t-xl shadow-xl dark:shadow-none  
overflow-y-auto flex flex-col items-start justify-start gap-2" in:slide out:slide>
    {#each [...documentation.groupByContext()] as [key,value],i}
        <li class="font-semibold text-[14px] p-[2px] {i>0 ? "mt-8" : "mt-5"} px-5 
      rounded-lg dark:text-lightWeak text-darkWeak ">
            {key.toUpperCase()}
        </li>
        {#each value as docObject}
            <li class="ml-1">
                <Link onClick={()=>isOpen=false} url="/docs/{documentation.titleToUrl(docObject.title)}" 
                className="dark:text-lightWeak text-darkWeak 
                px-4 p-[2px] font-medium rounded-full text-[16px] ease-in-out
                {documentation.titleToUrl(docObject.title) === documentation.currentDocument 
                ? "font-semibold" : ""}">
                    {docObject.title.toLowerCase()}
                </Link>
            </li>
        {/each}
    {/each}
</ul>
<Button className="absolute top-0 left-0 w-screen h-svh z-10 cursor-default" onClick={()=>isOpen=false}>
    .
</Button>
</div>

{/if}