<script lang="ts">

    import Link from "$components/assets/buttons/Link.svelte";
    import documentation from "$lib/localData/documentation.svelte";

</script>


<ul class="lg:flex flex-col items-start justify-start gap-2">
    {#each [...documentation.groupByContext()] as [key,value],i}
        <li class="font-semibold text-[14px] p-[2px] {i>0 ? "mt-12" : ""} px-5 
      rounded-lg">
            {key}
        </li>
        {#each value as docObject}
            <li class="ml-4 ">
                <Link url="/docs/{documentation.titleToUrl(docObject.title)}" 
                className="hover:dark:bg-lightStrong hover:bg-darkStrong hover:dark:text-darkStrong hover:text-lightStrong 
                px-4 p-[2px] font-semibold rounded-full text-[16px] ease-in-out
                {documentation.titleToUrl(docObject.title) === documentation.currentDocument 
                ? " " : ""}">
                    {docObject.title.toLowerCase()}
                </Link>
            </li>
        {/each}
    {/each}
</ul>
