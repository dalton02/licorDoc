<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import Button from "$components/assets/buttons/Button.svelte";
  import LinkExternal from "$components/assets/buttons/LinkExternal.svelte";
  import Git from "$components/assets/icons/Git.svelte";
  import Linkedin from "$components/assets/icons/Linkedin.svelte";
  import Search from "$components/assets/input/Search.svelte";
  import TitleBlock from "$components/assets/lego/TitleBlock.svelte";
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
  
  
  
  <main class="flex flex-row w-screen flex-grow-0 justify-center"> 
      <aside class="hidden lg:flex justify-end sticky p-28 px-12 top-0 h-svh overflow-y-auto flex-grow
      dark:bg-darkStrong bg-lightWeak  dark:text-lightStrong text-darkStrong">
          <div class="flex flex-col w-[250px]">
              <SideLeft/>
          </div>
      </aside>
            <article class="p-28 px-6 lg:px-12 xl:flex-shrink-0  lg:w-[70%] xl:w-[620px] 2xl:w-[820px] flex-shrink dark:text-lightStrong">
                <Main data={data}/>
            </article>
      <aside class="hidden xl:flex sticky p-28 px-12 top-0 h-svh overflow-y-auto flex-grow  dark:text-gray-100">
          <div class="flex flex-col w-[200px] h-full">
              <SideRight data={data}/>
          </div>
      </aside>
  </main>

  