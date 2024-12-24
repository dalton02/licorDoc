<script lang="ts">
  import { goto } from "$app/navigation";
    import Button from "$components/assets/buttons/Button.svelte";
    import Highlight from "$components/assets/text/Highlight.svelte";
  import observer from "$lib/functions/observer/Observer.svelte";
  import documentation from "$lib/localData/documentation.svelte";
  import { slide } from "svelte/transition";

    let {context,matchs}:{
        context:string,
        matchs:{
            title?:string,
            subTitle?:string,
            type:string,
            text:string,
            indexStart:number,
            indexEnd:number}[]} 
        = $props()
    let isOpen = $state<boolean>(true)

    function toggle(){
        isOpen = !isOpen
    }
    async function go(match){


        await goto("/docs/"+documentation.titleToUrl(match.title),{replaceState:true})

        observer.sendSignal("closeSearch",{})
        
        setTimeout(()=>{
            observer.sendSignal("goToSummary",{subTitle:documentation.titleToUrl(match.subTitle)})        
        },100)
    }

</script>


<div class="flex flex-col justify-start items-start p-2 lg:p-4 gap-1 lg:gap-3  dark:bg-darkStrong bg-lightStrong rounded-lg overflow-hidden">
        
    <div class="flex flex-row justify-between w-full">
        <span class="text-[14px] font-semibold p-[2px] px-2 rounded-lg ">
            {context}
        </span>
        <Button  className="" onClick={toggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
            class="flex-shrink dark:fill-white fill-gray-950 {isOpen ? "" : "rotate-180"}"  fill="#000000" viewBox="0 0 256 256">
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z">
                </path>
            </svg>
        </Button>
    
    </div>

    {#if isOpen}
        <div class="flex flex-col gap-3 w-full" in:slide out:slide>
        {#each matchs as  match} 
          <Button className="flex gap-4 items-center justify-start hover:bg-lightWeak hover:dark:bg-darkWeak w-full overflow-hidden rounded-lg p-1 px-3 lg:px-6"
          onClick={()=>go(match)}>
            {#if match.type==="code"}
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"  class={"flex-shrink dark:fill-white fill-gray-950"} viewBox="0 0 256 256">
                    <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z">
                    </path>
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"  class={"flex-shrink dark:fill-white fill-gray-950"} viewBox="0 0 256 256">
                    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z">
                    </path>
                </svg>        
              {/if}
              <div class="flex flex-col items-start w-[100%] overflow-hidden justify-start">      
                <h3 class="text-[14px] lg:text-[18px]">{match.subTitle ? match.subTitle : match.title}</h3>             
                <Highlight text={match.text} indexStart={match.indexStart} indexEnd={match.indexEnd}/>
              </div>
            </Button>
        {/each}
        </div>
    {/if}

  </div>