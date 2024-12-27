<script lang="ts">
    import Button from "$components/assets/buttons/Button.svelte";
    import observer from "$lib/functions/observer/Observer.svelte";
    import documentation from "$lib/localData/documentation.svelte";
    import { fly } from "svelte/transition";


    let {data} = $props()


    async function scroll(subTitle){
        observer.sendSignal("goToSummary",{subTitle:documentation.titleToUrl(subTitle)})
    }



</script>


<div class="flex flex-col gap-2 overflow-x-hidden">
    {#if documentation.getByTitle(documentation.urlToTitle(documentation.currentDocument))}
    {@const summary = documentation.getByTitle(documentation.urlToTitle(documentation.currentDocument))}
        <div class="text-[22px] font-semibold">
            Summary
        </div>
        {#key data.url}
        <div class="flex flex-col gap-2 justify-start items-start"
        in:fly={{x:600,duration:500,delay:500}}
        out:fly={{x:600,duration:500}}
        >
        {#each summary.content as doc}
        {@const conteudo = doc}
            {#if conteudo.subTitle}
                <Button onClick={()=>scroll(conteudo.subTitle)} 
                className="hover:underline text-left font-medium text-[14px]">
                {conteudo.subTitle}
                </Button>
            {/if}
        {/each}
        </div>
        {/key}
    {/if}
</div>