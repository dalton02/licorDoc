<script lang="ts">


    let {text,indexStart,indexEnd} = $props();
    
    
    function rationize(text2:string,indexStart:number,indexEnd:number):{text:string,indexStart:number,indexEnd:number}{
    
        if(indexStart>20){
            const cut = 15 + (indexStart % (20 - 15))
            return {
                text:text2.slice(indexStart-cut,99999),
                indexStart:cut,
                indexEnd:cut+(indexEnd-indexStart)
            }
        }

        return {text:text,indexStart,indexEnd};
    }



</script>


<div class="flex flex-row overflow-hidden">

    {#each {length:rationize(text,indexStart,indexEnd).text.length} as _,i}
    {@const obj = rationize(text,indexStart,indexEnd)}
        <div class="text-[10px] lg:text-[12px] truncate {i<obj.indexEnd && i>=obj.indexStart ? "dark:text-darkWeak2 bg-lightWeak2" : ""}">
            {rationize(text,indexStart,indexEnd).text[i]}
            {#if rationize(text,indexStart,indexEnd).text[i]===" "}
                <div class="ml-1"></div>
            {/if}
        </div>
    {/each}

</div>