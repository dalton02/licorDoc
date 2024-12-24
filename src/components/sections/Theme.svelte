<script>
  import Button from "$components/assets/buttons/Button.svelte";


  import TitleBlock from "$components/assets/lego/TitleBlock.svelte";
  import themeManager from "$lib/localData/theme.svelte";
  import { onMount } from "svelte";

  onMount(()=>{
    const t = localStorage.getItem("theme")
    if(t){
        if(t==="dark")
            themeManager.setDark();
        else if(t==="light")
            themeManager.setLight()
    }
  })

</script>




<div class="flex gap-3">

    <TitleBlock className="group   flex items-center whitespace-nowrap" title="Light mode" classPosTitle="top-[140%] right-0"> 
        <Button onClick={()=>themeManager.setLight()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="group-hover:scale-[1.1] dark:fill-white fill-gray-950" viewBox="0 0 256 256">
                <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z">
                </path>
            </svg>    
        </Button>
    </TitleBlock>
    <TitleBlock className="group whitespace-nowrap flex items-center" title="Dark mode" classPosTitle="top-[140%] right-0">
        <Button onClick={()=>themeManager.setDark()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="group-hover:scale-[1.1] dark:fill-white fill-gray-950" viewBox="0 0 256 256">
                <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z">
                </path>
            </svg>
        </Button>
        
    </TitleBlock>

</div>