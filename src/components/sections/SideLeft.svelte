<script lang="ts">

    import Link from "$components/assets/buttons/Link.svelte";
    import documentation from "$lib/localData/documentation.svelte";

</script>


<ul class="lg:flex flex-col items-start justify-start gap-0">
    {#each [...documentation.groupByContext()] as [key,value],i}
        <li class="font-semibold text-[15px] p-[2px] {i>0 ? "mt-5 " : ""} px-5 
      rounded-lg">
            {key.toUpperCase()}
        </li>
        {#each value as docObject}
            <li class="ml-1">
                <Link url="/docs/{documentation.titleToUrl(docObject.title)}" 
                className="hover:font-bold
                px-4 p-[2px] rounded-full text-[14px] ease-in-out
                {documentation.titleToUrl(docObject.title) === documentation.currentDocument 
                ? "font-bold" : "font-medium"}">
                    {docObject.title.toLowerCase()}
                </Link>
            </li>
        {/each}
    {/each}
</ul>
