<script lang="ts">
  import { explicitEffect } from "$lib/functions/utils.svelte";



    let {text,indexStart,indexEnd} = $props();
    
    let formated = $state("")
    function rationize(text2:string,indexStart:number,indexEnd:number):{text:string,indexStart:number,indexEnd:number}{
        text2 = text2.replace(/<[^>]*>?/gm, '');
        if(indexStart>20){
            const cut = 15 + (indexStart % (20 - 15))
            formated = text2.slice(indexStart-cut,cut)+
            "<b class='dark:text-darkWeak2 bg-lightWeak2'>"+text2.slice(indexStart,cut+(indexEnd))+"</b>"
            console.log(formated)
        }

        formated = text2.slice(0,indexStart)+
        "<b class='dark:text-darkWeak2 bg-lightWeak2'>"+text2.slice(indexStart,indexEnd)+"</b>"+
        text2.slice(indexEnd,99999) 
        return {text:text,indexStart,indexEnd};
    }


    explicitEffect(()=>{
        rationize(text,indexStart,indexEnd)
    },()=>[text,indexStart,indexEnd])


</script>


<p class="overflow-hidden text-[10px] lg:text-[12px] font-medium text-left whitespace-nowrap">

    {@html formated}

</p>