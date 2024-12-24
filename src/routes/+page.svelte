<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$components/assets/buttons/Button.svelte";
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
            <span class="text-[20px] lg:text-[24px] dark:text-lightWeak text-darkWeak font-medium text-center" in:scale={{delay:100}}>Start seeing the documentation</span>
        </RevealText>

        <div in:scale={{delay:340,duration:1000,easing:backInOut}}>
      
            <Button className="p-2 px-12  font-semibold text-[18px] lg:text-[20px] rounded-full mt-4 
            text-lightWeak bg-darkWeak relative overflow-hidden dark:text-darkWeak dark:bg-lightWeak hover:scale-110"
            onClick={()=>goto("/docs/quick-start")}>
               <b class="z-20">Click here</b> 
            </Button>
        </div>

    </div>

</div>
{/if}