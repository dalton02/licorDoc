class AnimationManager{


    animate = $state<boolean>(false)

    startAnimation(){
        this.animate=true;
        setTimeout(()=>{
            this.animate=false
        },100)
    }

}


const animationPage = new AnimationManager();

export default animationPage;