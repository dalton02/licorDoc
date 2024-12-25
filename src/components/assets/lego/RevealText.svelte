<script lang="ts">
    import type { Snippet } from "svelte";
    import { backIn, bounceIn, cubicIn, elasticIn, expoIn, quadIn, quadInOut, quadOut, sineIn } from "svelte/easing";
    import { fly, slide } from "svelte/transition";



    let {timeout=900,children}:{timeout?:number,children:Snippet} = $props()

    let position = $state("translate-y-[100%]")
    setTimeout(()=>{
        position="translate-y-0"
    },timeout)


</script>



<div class="flex relative overflow-hidden">
    <div class="block {position} ease-out duration-1000" style="transition-delay: {timeout*3}ms;">
        {@render children?.()}
    </div>
    {#if position==="translate-y-[100%]"}
    <div class="flex absolute w-full h-full dark:bg-lightMid bg-darkMid" out:fly={{x:"100%",duration:timeout*3,easing:cubicIn,opacity:1}}></div>
    {/if}
</div>
