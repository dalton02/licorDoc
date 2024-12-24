<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import Button from "$components/assets/buttons/Button.svelte";
  import Git from "$components/assets/icons/Git.svelte";
  import RevealText from "$components/assets/lego/RevealText.svelte";
  import { onMount } from "svelte";
  import { backInOut } from "svelte/easing";
  import { fade, scale } from "svelte/transition";

  let mount =  $state(false)

  onMount(()=>{
    mount=true
  })

</script>

{#if mount}
<div class="flex w-screen h-screen items-center justify-center">
    <div class="flex flex-col gap-1 justify-center items-center">
        <RevealText timeout={140}> 
             <h1 class="text-[28px] lg:text-[48px] dark:text-lightStrong text-darkStrong font-semibold" in:scale>LICOR FRAMEWORK</h1>
        </RevealText>


        <RevealText timeout={240}> 
            <span class="text-[20px] lg:text-[24px] dark:text-lightWeak text-darkWeak font-medium text-center" in:scale={{delay:100}}>
              Something about this</span>
        </RevealText>

        <div class="flex  items-center gap-6">
        <div in:scale={{delay:340,duration:1000,easing:backInOut}}>
      
            <Button className="p-2 px-12 h-full  font-semibold text-[18px] lg:text-[20px] rounded-full mt-4 
            text-lightWeak bg-darkWeak relative overflow-hidden dark:text-darkWeak dark:bg-lightWeak hover:scale-110"
            onClick={()=>goto(base+"/docs/about")}>
               <b class="z-20">Documentation</b> 
            </Button>
        </div>
        <div in:scale={{delay:440,duration:1000,easing:backInOut}}>
      
          <Button className="p-2 px-12 h-full font-semibold text-[18px] lg:text-[20px] rounded-full  gap-2 flex items-center 
          dark:text-lightWeak text-darkWeak"
          onClick={()=>goto(base+"/docs/about")}>
             <Git/>
             <b class="z-20">Source Code</b> 
          </Button>
        </div>

        </div>

    </div>

</div>
{/if}