<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import Paper from "$components/elements/cards/Paper.svelte";
  import Main from "$components/sections/Main.svelte";
  import SideLeft from "$components/sections/SideLeft.svelte";
  import SideRight from "$components/sections/SideRight.svelte";
  import Theme from "$components/sections/Theme.svelte";
  import documentation from "$lib/localData/documentation.svelte";

  
    page.subscribe(pagina=>{
        documentation.currentDocument = base ==="" ? pagina.url.pathname.split("/")[2] : pagina.url.pathname.split("/")[3]
    })
    export let data
    
</script>
  
  
  {#if documentation.currentDocument}
  <main class="flex flex-row w-screen flex-grow-0 justify-center"> 
      <aside class="hidden lg:flex justify-end sticky p-28 px-12 top-0 h-svh overflow-y-auto flex-grow
      dark:bg-darkStrong bg-transparent  dark:text-lightStrong text-darkStrong">
          <div class="flex flex-col w-[250px] z-10">
              <SideLeft/>
          </div>

        </aside>
            <article class="p-28 px-6 lg:px-12 xl:flex-shrink-0 z-10 lg:w-[70%] xl:w-[620px] 2xl:w-[820px] flex-shrink dark:text-lightStrong">
                <Main data={data}/>
            </article>
      <aside class="hidden xl:flex sticky p-28 px-12 top-0 h-svh overflow-y-auto flex-grow  dark:text-gray-100">
          <div class="flex flex-col w-[200px] h-full">
              <SideRight data={data}/>
          </div>
      </aside>
  </main>
  {/if}
  