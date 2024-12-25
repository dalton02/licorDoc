<script lang="ts">
  import PopUp from "$components/elements/modals/PopUp.svelte";
  import documentation from "$lib/localData/documentation.svelte";
  import mouseState from "$lib/localData/mouse.svelte";
  import { SvelteMap } from "svelte/reactivity";
  import Button from "../buttons/Button.svelte";
  import Highlight from "../text/Highlight.svelte";
  import type { DocumentationContentWeak, DocumentationType } from "$lib/localData/doc";
  import { untrack } from "svelte";
  import { mathematica } from "svelte-highlight/languages";
  import Arquivo from "$components/elements/cards/Arquivo.svelte";
  import observer from "$lib/functions/observer/Observer.svelte";
  import { explicitEffect } from "$lib/functions/utils.svelte";

  let isOpen = $state<boolean>(false)
  let pesquisa = $state<string>("")
  let resultado = $state<SvelteMap<string,{type:string,text:string,title?:string,subTitle?:string,indexStart:number,indexEnd:number}[]>>(new SvelteMap())

  explicitEffect(
    () => {pesquisar() },
    () => [pesquisa]
  );

  explicitEffect(
    ()=>{
      if(observer.signal.tipo==="closeSearch"){
        isOpen=false
      }
      if(observer.signal.tipo==="openSearch"){
        isOpen=true
      }
    },
    ()=>[observer.signal]
  )


  function addMap(context:string,type:string,title:string,subTitle:string,text:string,indexStart:number,indexEnd:number){
    if(!resultado.get(context)){
        resultado.set(context,[{
        type:type,
        title: title,
        subTitle: subTitle,
        text:text,
        indexStart:indexStart,
        indexEnd:indexEnd
      }])
      return
    }
    let tmp = resultado.get(context)

    tmp = [
      ...tmp,
      {
        type:type,
        title: title,
        subTitle: subTitle,
        text:text,
        indexStart:indexStart,
        indexEnd:indexEnd
      }
    ]
    resultado.set(context,tmp);
  }

  function findLastSubtitle(doc:DocumentationType,index:number){
    for(let i=index;i>=0;i-=1){
      const content = doc.content[i] as DocumentationContentWeak
      if(content.subTitle && i<index){
        return content.subTitle
      }
    }
    return null
  }

  function handleBlockText(content:{text?:string,bold?:string,link?:{label:string,url:string,external:boolean}[]}){
    let textoConcatenado = ""
    for(let i in content){
      const keys = Object.keys(content[i]);
      for(const key of keys){
        if(key==="link"){
          textoConcatenado+=content[i][key].label
        }
        else{
          textoConcatenado+=content[i][key]
        }
      }
    }
   
    const match = textoConcatenado.toLowerCase().match(pesquisa.toLowerCase())
    return match
  }

  function handleBlockCode(code:{code:string,type:string}){
    const match = code.code.toLowerCase().match(pesquisa.toLowerCase())
    return match
  }

  function pesquisar(){
      resultado = new SvelteMap()
      if(pesquisa.length<2) return

      for(let i in documentation.document){
        const docAtual = documentation.document[i];
        for(let j in docAtual.content){

          const content = docAtual.content[j];
          const keys = Object.keys(content)

          for(const key of keys){

            if(key==="blockText"){
              const match=handleBlockText(content[key])

              if(match){
                const subTitle = findLastSubtitle(docAtual,parseInt(j))
                addMap(docAtual.context,"text",docAtual.title,subTitle,match.input,match.index,match.index+pesquisa.length)
              }
            }
            if(key==="code"){
              const match = handleBlockCode(content[key]);
              if(match){
                const subTitle = findLastSubtitle(docAtual,parseInt(j))
                addMap(docAtual.context,"code",docAtual.title,subTitle,match.input,match.index,match.index+pesquisa.length)
              }
            }

          }

        }

        }


  }
  
  function openModal(){
    isOpen=true
  }

    
</script>


<Button className="hidden lg:flex justify-between rounded-md duration-500 hover:motion-preset-seesaw-sm p-1 px-4 w-[300px] dark:bg-darkStrong bg-lightStrong"
 onClick={openModal}>
    <p  class="bg-transparent duration-[2000ms] text-[14px] dark:text-gray-50 text-zinc-800">Search in the docs</p>

    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"  class={"dark:fill-white fill-gray-950"} viewBox="0 0 256 256">
        <path d="M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z">
        </path>
    </svg>
</Button>  

<PopUp bind:isVisible={isOpen}>
    
    <div class="flex flex-col  dark:bg-darkMid bg-lightMid w-[80vw] flex-shrink lg:w-[60vw] overflow-y-auto max-h-[60svh]  rounded-lg">
    
        <div class="flex gap-0 p-2 px-6  items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"  class={"dark:fill-white fill-gray-950"} viewBox="0 0 256 256">
              <path d="M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z">
              </path>
          </svg>
          <input type="text" placeholder="Search for.." bind:value={pesquisa}
          class="bg-transparent rounded-lg outline-none px-3 w-full p-2 {mouseState.state.haveCustomCursor ? "lg:hover:cursor-none" : ""}">
        </div>
        {#if [...resultado].length>0}
          <div class="flex flex-col gap-2 p-2">
            {#each [...resultado] as  [key,value]}  
            <Arquivo context={key} matchs={value}/>
            {/each}
          </div>
        {/if}
        {#if [...resultado].length===0 && pesquisa.length>=2}
          <span class="text-[12px] p-12 w-full justify-center items-center flex">No results found</span>
        {/if}


    </div>
    
</PopUp>