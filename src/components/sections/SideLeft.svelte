<script lang="ts">

    import Link from "$components/assets/buttons/Link.svelte";
    import documentation from "$lib/localData/documentation.svelte";

</script>


<ul class="lg:flex flex-col items-start justify-start gap-2">
    {#each [...documentation.groupByContext()] as [key,value],i}
        <li class="font-medium text-[15px] p-[2px] {i>0 ? "mt-12" : ""} px-5 
      rounded-lg">
            {key}
        </li>
        {#each value as docObject}
            <li class="ml-4 ">
                <Link url="/docs/{documentation.titleToUrl(docObject.title)}" 
                className="hover:font-semibold
                px-4 p-[2px] rounded-full text-[14px] ease-in-out
                {documentation.titleToUrl(docObject.title) === documentation.currentDocument 
                ? "font-semibold" : "font-medium"}">
                    {docObject.title.toLowerCase()}
                </Link>
            </li>
        {/each}
    {/each}
</ul>
