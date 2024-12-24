<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$components/assets/buttons/Button.svelte";
  import Link from "$components/assets/buttons/Link.svelte";
  import observer from "$lib/functions/observer/Observer.svelte";
  import toast from "$lib/functions/toast/Toast.svelte";
  import { explicitEffect } from "$lib/functions/utils.svelte";
  import { type DocumentationContentWeak } from "$lib/localData/doc";
  import documentation from "$lib/localData/documentation.svelte";
  import { Highlight, HighlightSvelte, LineNumbers } from "svelte-highlight";
  import { expoIn, expoOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import LinkExternal from "$components/assets/buttons/LinkExternal.svelte";
  import darkStyle from "svelte-highlight/styles/gruvbox-dark-hard"
  import lightStyle from "svelte-highlight/styles/classic-light"
  import themeManager from "$lib/localData/theme.svelte";

  let time = 400

  let {data} = $props()

  function copyText(text:string){

        navigator.clipboard.writeText(text).then(()=>{
            toast.push("Codigo cópiado para o clipboard",{timeout:1200})
        })
  }

  function scrollTo(valor) {
        const targetElement = document.querySelector(`[data-subTitle="${valor}"]`);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            console.warn(`Nenhum elemento com data-titulo="${valor}" foi encontrado.`);
        }
    }


    explicitEffect(
    ()=>{
      if(observer.signal.tipo==="goToSummary"){
        scrollTo(observer.getData().subTitle)
      }
    },
    ()=>[observer.signal]
  )

</script>


<svelte:head>
    {#if themeManager.theme==="dark"}
        {@html darkStyle}
    {:else}
        {@html lightStyle}
    {/if}
</svelte:head>

{#key data.url}
<div class="flex flex-col  w-full h-full"
in:fly={{delay:time,duration:time,y:1300, easing:expoOut,opacity:1}}
out:fly={{duration:time,y:-1300,opacity:1,easing:expoIn}}>
    
    {#if documentation.getByTitle(documentation.urlToTitle(documentation.currentDocument))}
    {@const doc = documentation.getByTitle(documentation.urlToTitle(documentation.currentDocument))}
        <h1 class="text-[26px] lg:text-[44px] mb-5">{doc.title}</h1>

        <div class="block">
            {#each doc.content as c,i}
                {@const conteudo = c as DocumentationContentWeak}
                {#if conteudo.blockText}
                    <p class="text-[14px] lg:text-[16px] leading-8 tracking-normal  dark:text-lightMid text-darkMid text-left">
                    {#each conteudo.blockText as bloco}
                        {#if bloco.text}
                            {@html (bloco.text)}
                        {/if}
                        {#if bloco.bold}
                            <b class="dark:bg-lightWeak2 dark:text-darkWeak2 bg-darkWeak2 text-lightWeak2 rounded-md mx-[2px] text-[12px] lg:text-[14px] p-1 ">{bloco.bold}</b>
                        {/if}
                        {#if bloco.link}
                            {#if bloco.link.external===true}

                                <LinkExternal className="underline" url={bloco.link.url}>{bloco.link.label}</LinkExternal   >  

                            {:else}

                                <Link className="underline" url={bloco.link.url}>{bloco.link.label}</Link>   

                            {/if}
                        {/if}
                    {/each}
                    </p>
                {/if}

                {#if conteudo.subTitle}
                    <h2 class="text-[20px] lg:text-[28px] dark:text-lightMid text-darkMid 
                    {i===0 ? "mt-4" : "mt-20"}  mb-4" 
                    data-subTitle={documentation.titleToUrl(conteudo.subTitle)}>{conteudo.subTitle}</h2>
                {/if}

                {#if conteudo.code}
                    <div class="flex dark:bg-darkStrong font-roboto text-[12px] bg-lightStrong p-3 pt-2 overflow-hidden my-5 w-full rounded-lg flex-col">

                        <Button className="flex flex-row group justify-end gap-2 py-2" onClick={()=>{copyText(conteudo.code.code)}}>
                            <span class="dark:text-white group-hover:text-slate-500 duration-300 text-[12px] ease-in-out">Copy</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"  class={"dark:fill-white fill-gray-950"} viewBox="0 0 256 256">
                                <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z">
                                </path>
                            </svg>
                        </Button>
                        
                        <Highlight   language={conteudo.code.type} class="rounded-lg overflow-hidden w-[87vw] lg:w-auto" code={conteudo.code.code}>
                        </Highlight>

                    </div>
                {/if}
                

            {/each}
        </div>
    {/if}

</div>
{/key}