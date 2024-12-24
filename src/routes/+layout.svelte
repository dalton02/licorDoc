<script>
  import "../app.css";
  import { base } from "$app/paths";
  import LayoutToast from "$components/assets/toast/LayoutToast.svelte";
  import Mouse from "$components/sections/Mouse.svelte";
  import mouseState from "$lib/localData/mouse.svelte";
  import { onMount } from "svelte";
  import themeManager from "$lib/localData/theme.svelte";
  import Search from "$components/assets/input/Search.svelte";
  import TitleBlock from "$components/assets/lego/TitleBlock.svelte";
  import LinkExternal from "$components/assets/buttons/LinkExternal.svelte";
  import Git from "$components/assets/icons/Git.svelte";
  import Linkedin from "$components/assets/icons/Linkedin.svelte";
  import Theme from "$components/sections/Theme.svelte";
  import Button from "$components/assets/buttons/Button.svelte";
  import observer from "$lib/functions/observer/Observer.svelte";
  import MenuMoblie from "$components/sections/MenuMoblie.svelte";
  import { goto } from "$app/navigation";

  onMount(()=>{
    document.documentElement.classList.remove("dark")
  })

</script>

<svelte:head>
  <title>Licor - Framework</title>

</svelte:head>

  <div class="fixed flex w-screen justify-center h-screen top-0 left-0 z-50 pointer-events-none">
    <LayoutToast/>
  </div>

  <div class="relative overflow-clip w-screen {mouseState.state.haveCustomCursor ? "lg:cursor-none" : ""} {themeManager.theme} dark:bg-darkWeak bg-lightWeak">

    <header class="p-4 px-8 lg:px-24 z-10 fixed w-svw items-center top-0 font-semibold text-[18px] dark:text-gray-100 text-[#324B4F] flex flex-row gap-2 
    justify-between dark:bg-darkWeak bg-lightWeak shadow-lg">
    
    <Button className="text-[18px]" onClick={()=>goto("/")}>
       Licor
    </Button>

  
        <Search/>
    
        <div class="flex justify-end gap-6 items-center">
              <div class="flex flex-row gap-3">
                  <TitleBlock className="group" title="Github" classPosTitle="top-[140%] right-0">
                      <LinkExternal  url="https://github.com/dalton02/licor" className=""> 
                          <Git className="group-hover:scale-[1.1] duration-300 ease-in-out"/>
                      </LinkExternal>
                  </TitleBlock>
                  <TitleBlock className="group" title="Linkedin" classPosTitle="top-[140%] right-0"> 
                      <LinkExternal url="https://www.linkedin.com/in/dalton-gomes/" className=""> 
                          <Linkedin className="group-hover:scale-[1.1] duration-300 ease-in-out"/>
                      </LinkExternal>
                  </TitleBlock>
              </div>
              <div class="hidden lg:flex">
                 <Theme/>
              </div>
        </div>
  
    </header>   

    <slot/>
    <Mouse/>

    <MenuMoblie/>
    <footer class="p-4 px-8 z-10 fixed lg:absolute w-svw items-center bottom-0 font-semibold text-[18px] dark:text-lightStrong text-[#324B4F] lg:hidden flex flex-row gap-2 
    justify-between dark:bg-[#141416] bg-gray-100 shadow-lg">
         
          <div class="flex gap-3">
              <Button onClick={()=>observer.sendSignal("openMenu",{})}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"  class={"dark:fill-white fill-gray-950"} viewBox="0 0 256 256"> 
                      <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z">
                      </path>
                  </svg>
              </Button>
              <Button onClick={()=>{
                observer.sendSignal("openSearch",{})
                setTimeout(()=>{
                    observer.sendSignal("closeMenu",{})
                },10)
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"  class={"dark:fill-white fill-gray-950"} viewBox="0 0 256 256">
                      <path d="M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z">
                      </path>
                  </svg>
              </Button>
  
          </div>
          
  
          <div class="flex justify-end gap-6 items-center">
            <Theme/>
          </div>
  
    </footer>
    
  </div>
<style>
</style>