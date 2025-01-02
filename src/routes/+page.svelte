<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import Button from "$components/assets/buttons/Button.svelte";
  import LinkExternal from "$components/assets/buttons/LinkExternal.svelte";
  import Git from "$components/assets/icons/Git.svelte";
  import RevealText from "$components/assets/lego/RevealText.svelte";
  import Mascote from "$components/elements/cards/Mascote.svelte";
  import { onMount } from "svelte";
  import { backInOut } from "svelte/easing";
  import { fade, scale } from "svelte/transition";

  let mount =  $state(false)

  onMount(()=>{
    mount=true
  })

</script>

{#if mount}
<div class="flex w-screen h-screen items-center relative justify-center">
    <div class="flex flex-col gap-1 justify-center items-center">
        <RevealText timeout={140}> 
             <h1 class="text-[18px] lg:text-[40px] dark:text-lightStrong text-darkStrong font-semibold" in:scale>LICOR FRAMEWORK</h1>
        </RevealText>


        <RevealText timeout={240}> 
            <span class="text-[14px] lg:text-[20px] motion-preset-typewriter-[32] dark:text-lightWeak text-darkWeak font-medium text-center" in:scale={{delay:100}}>
              Speeding up your web application
            </span>
        </RevealText>

        <div class="flex  justify-center items-center  gap-6">

          <div class="h-full flex justify-start items-center " in:scale={{delay:340,duration:1000,easing:backInOut}}>
        
              <Button className="p-[4px] px-4 lg:px-12  font-semibold text-[12px] lg:text-[16px]  rounded-full mt-4 
              text-lightWeak bg-darkWeak relative overflow-hidden   dark:text-darkWeak dark:bg-lightWeak hover:scale-110"
              onClick={()=>goto(base+"/docs/about")}>
                <b class="z-20">Documentation</b> 
              </Button>
          </div>
          
          <div class="h-full flex justify-start items-center" in:scale={{delay:440,duration:1000,easing:backInOut}}>
        
            <LinkExternal className="p-[6px] px-4 lg:px-12  h-full group relative translate-y-2 font-semibold text-[12px] lg:text-[16px]  rounded-full  gap-2 flex items-center 
            dark:text-lightWeak text-darkWeak" url="https://github.com/dalton02/licor">
              <Git/>
              <b class="z-20">Source Code</b> 
              <div class="w-full lg:block hidden h-[2px] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 absolute bottom-0 left-0 dark:bg-lightWeak bg-darkWeak"></div>
          </LinkExternal>
          </div>


        </div>

    </div>
    <Mascote/>

</div>
{/if}