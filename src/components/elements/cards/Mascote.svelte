<script lang="ts">
  import { fade, scale } from "svelte/transition";
     const phrases = [
        "I will let you keep a good pattern in your web application",
        "Did you know you can customize your protected routes?",
        "My favorite licor flavour is cinnamon",
    ];


    let eye1 = $state<SVGElement>()
    let eye2 = $state<SVGElement>()
    let xPos1 = $state<number>(120);
    let yPos1 = $state<number>(88);
    let xPos2 = $state<number>(260);
    let yPos2 = $state<number>(88);
    let speech = $state<string>(phrases[0])
    function eyeball(event) {
        // Eye 1
        const eyeRect1 = eye1.getBoundingClientRect();
        let xCenter1 = eyeRect1.left + eye1.clientWidth / 2;
        let yCenter1 = eyeRect1.top + eye1.clientHeight / 2;

        // Eye 2
        const eyeRect2 = eye2.getBoundingClientRect();
        let xCenter2 = eyeRect2.left + eye2.clientWidth / 2;
        let yCenter2 = eyeRect2.top + eye2.clientHeight / 2;

        // Coordenadas do mouse
        const xMouse = event.clientX;
        const yMouse = event.clientY;

        // Eye 1: Calcula o deslocamento do mouse em relação ao centro do olho
        const deltaX1 = xMouse - xCenter1;
        const deltaY1 = yMouse - yCenter1;

        // Eye 2: Calcula o deslocamento do mouse em relação ao centro do olho
        const deltaX2 = xMouse - xCenter2;
        const deltaY2 = yMouse - yCenter2;

        // Limita o deslocamento dentro de um raio definido (em pixels)
        const maxRadiusX = 25; // metade da variação permitida para xPos (170 - 120 = 50 / 2)
        const maxRadiusY = 27; // metade da variação permitida para yPos (150 - 110 = 40 / 2)

        // Eye 1: Calcula o ângulo de direção
        const angle1 = Math.atan2(deltaY1, deltaX1);

        // Eye 2: Calcula o ângulo de direção
        const angle2 = Math.atan2(deltaY2, deltaX2);

        // Eye 1: Limita o movimento do olho
        const limitedX1 = Math.min(maxRadiusX, Math.abs(deltaX1));
        const limitedY1 = Math.min(maxRadiusY, Math.abs(deltaY1));

        // Eye 2: Limita o movimento do olho
        const limitedX2 = Math.min(maxRadiusX, Math.abs(deltaX2));
        const limitedY2 = Math.min(maxRadiusY, Math.abs(deltaY2));

        // Atualiza as posições limitadas
        xPos1 = 150 + Math.cos(angle1) * limitedX1;
        yPos1 = 88 + Math.sin(angle1) * limitedY1;

        xPos2 = 288 + Math.cos(angle2) * limitedX2;
        yPos2 = 88 + Math.sin(angle2) * limitedY2;
     }

    function cyclePhrases() {
        let index = 0;
        setInterval(() => {
            speech = phrases[index];
            index = (index + 1) % phrases.length;
        }, 1800);
    }
    cyclePhrases()
</script>

<svelte:document on:mousemove={eyeball}/>


<div class="absolute bottom-[-120px] lg:bottom-[-300px] pointer-events-none animation">
    {#key speech}
        <div class="p-2 px-2 rounded-xl bg-slate-800 text-white font-semibold flex text-center absolute max-w-64  lg:max-w-72 
        left-[-80px] lg:left-[-130px] top-[-80px] lg:top-[-90px] speech
        text-[12px] lg:text-[14px]" out:fade in:scale>
            {speech}
        </div>
    {/key}

<svg version="1.1" id="レイヤー_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
	 y="0px"  class="lg:w-[338px] w-[200px]"  viewBox="0 0 438.004 592.145" enable-background="new 0 0 438.004 592.145"
	 xml:space="preserve" >
<g>
	<path fill="#F8D2A4" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M45.352,291.011c-13.378,1.876-28.958,5.754-37.066,10.684c-7.337,4.463-6.374,17.6-1.154,24.099
		c5.509,6.862,11.974,6.495,19.779,2.905c5.123-2.357,11.293-7.609,17.667-13.492c0.16-5.126,0.339-10.256,0.543-15.375
		C45.242,296.793,45.317,293.857,45.352,291.011z"/>
	<path fill="#F8D2A4" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M429.717,297.195c-7.5-4.56-21.389-8.217-34.018-10.226c0.316,6.816,0.751,14.31,1.339,22.763c0.106,1.527,0.211,3.033,0.313,4.529
		c4.959,4.379,9.68,8.068,13.74,9.937c7.807,3.591,14.27,3.958,19.779-2.904C436.091,314.795,437.055,301.656,429.717,297.195z"/>
	<path fill="#F8D2A4" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M55.17,564.844c-9.854,17.521,15.9,31.951,29.25,19.801c10.908-9.928,19.518-18.348,38.256-21.098
		c-14.35-5.906-27-13.281-37.752-21.871C71.807,546.805,61.188,554.146,55.17,564.844z"/>
	<path fill="#F8D2A4" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M353.745,579.846c11.037,14.283,38.46,1.312,30.443-17.121c-5.267-12.111-15.218-22.156-27.677-28.195
		c-8.158,7.618-17.849,14.689-29.308,20.867C339.883,561.402,346.096,569.946,353.745,579.846z"/>
	<path fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M5.048,322.396c3.333-2.397,5.688-4.991,11.784-8.097"/>
	<path fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M432.955,317.896c-3.333-2.397-5.688-4.991-11.783-8.097"/>
	<path fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M60.871,584.57c0.9-4.951,3.6-13.275,11.7-20.476"/>
	<path fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M376.05,582.961c-0.026-5.031-1.304-15.266-8.866-22.195"/>
	<path fill="#5ADAFF" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M41.071,74.477c0-6.969,5.641-12.618,12.6-12.618c4.081,0,7.697,1.951,10,4.964c5.569-9.111,12.283-16.97,19.913-23.729
		c-3.78-3.658-9.922-6.33-19.563-7.625c-31.05-4.174-46.917,11.166-50.542,31.725c-3.498,19.838,7.171,41.143,31.004,46.682
		c2.46-9.685,5.474-18.569,8.95-26.793C46.585,86.954,41.071,81.365,41.071,74.477z"/>
	<path d="M53.671,61.859c-6.959,0-12.6,5.649-12.6,12.618c0,6.888,5.514,12.477,12.362,12.605
		c2.479-5.866,5.191-11.399,8.112-16.638c0.687-1.231,1.4-2.434,2.126-3.622C61.368,63.81,57.751,61.859,53.671,61.859z"/>
	<path fill="#5ADAFF" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M413.979,59.094c-3.625-20.56-19.492-35.899-50.541-31.725c-10.765,1.447-17.166,4.61-20.789,8.945
		c6.867,5.93,13.257,12.745,19.272,20.518c0.292,0.377,0.57,0.758,0.857,1.136c2.296-3.095,5.963-5.109,10.108-5.109
		c6.959,0,12.6,5.649,12.6,12.618c0,6.109-4.335,11.202-10.093,12.366c4.277,8.283,7.745,17.199,10.521,27.142
		C407.677,98.434,417.33,78.095,413.979,59.094z"/>
	<path d="M385.486,65.477c0-6.969-5.641-12.618-12.6-12.618c-4.146,0-7.812,2.014-10.108,5.109
		c4.815,6.345,9.007,12.886,12.615,19.875C381.151,76.679,385.486,71.586,385.486,65.477z"/>
	<path fill="#5ADAFF" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M362.778,57.968c-0.287-0.378-0.565-0.759-0.857-1.136c-6.016-7.773-12.405-14.588-19.272-20.518
		c-29.797-25.728-68.582-34.79-124.728-33.123c-48.682,1.447-100.473,9.906-134.337,39.903c-7.63,6.758-14.343,14.617-19.913,23.729
		c-0.726,1.188-1.439,2.391-2.126,3.622c-2.921,5.239-5.633,10.771-8.112,16.638c-3.476,8.224-6.49,17.108-8.95,26.793
		c-4.767,18.77-7.463,40.533-7.462,66.257c0.002,45.133,8.866,67.528,8.332,110.879c-0.035,2.846-0.11,5.782-0.231,8.821
		c-0.204,5.119-0.383,10.249-0.543,15.375c-1.653,53.107-1.062,105.862-1.499,142.036c-0.401,33.204,14.646,62.704,41.845,84.433
		c10.752,8.59,23.402,15.965,37.752,21.871c25.113,10.337,55.418,16.186,89.844,16.186c50.265,0,87.456-9.652,114.684-24.336
		c11.459-6.178,21.149-13.249,29.308-20.867c20.359-19.008,31.17-41.422,36.009-61.896c11.47-48.523,9.966-84.08,4.831-158.371
		c-0.103-1.496-0.207-3.002-0.313-4.529c-0.588-8.453-1.022-15.947-1.339-22.763c-1.733-37.343,0.064-54.317-0.479-96.937
		c-0.463-36.271-3.195-63.161-9.306-85.047c-2.776-9.942-6.244-18.858-10.521-27.142C371.785,70.854,367.594,64.312,362.778,57.968z
		"/>
	
    <!-- Eye Left -->
	<ellipse fill="white" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="144.121" cy="91.595" rx="54.9" ry="53.1"/>
    <circle cx={xPos1} cy={yPos1} class="duration-0 transition-none" r="18.9" bind:this={eye1}/>
    <circle fill="#FFFFFF" cx={xPos1+6} cy={yPos1+3} r="5.4" class="duration-[50ms] transition-none"/>
    <!-- Eye Right -->
	<ellipse fill="white" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="281.821" cy="85.294" rx="54.9" ry="53.1"/>
	
    <circle cx={xPos2} cy={yPos2} r="18.9"  class="duration-0 transition-none" bind:this={eye2}/>
	<circle fill="#FFFFFF" cx={xPos2+5} cy={yPos2+3} r="5.4"  class="duration-0 transition-none"/>

    <!-- Tooth -->
    <path fill="white" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M214.968,170.343c-10.784,0.188-12.401,4.999-21.685,6.657c-0.328,5.727-0.745,13.566-1.163,22.896c-0.9,20.1,24.6,15.6,24.6,3.6
		c0-9.129,0-25.714,0-33.132C216.16,170.343,215.583,170.333,214.968,170.343z"/>
	<path fill="white" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M216.72,203.495c0,12,25.5,16.5,24.6-3.6c-0.429-9.582-0.857-17.59-1.189-23.353c-11.689-0.533-13.115-5.813-23.411-6.179
		C216.72,177.78,216.72,194.365,216.72,203.495z"/>
    <!-- Focinho -->
    <path fill="#F8D2A4" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
		M254.674,150.297c-4.354-4.685-9.521-7.238-16.425-8.471c-3.664,5.366-12.791,9.169-23.479,9.169
		c-10.278,0-19.112-3.518-23.034-8.56c-7.391,1.417-12.753,4.185-17.15,9.26c-8.627,9.959-4.437,24.891,7.156,25.695
		c4.957,0.344,8.624,0.131,11.541-0.391c9.284-1.658,10.901-6.469,21.685-6.657c0.615-0.01,1.192,0,1.752,0.02
		c10.295,0.366,11.721,5.646,23.411,6.179c2.312,0.105,5.024,0.026,8.289-0.316C259.979,175.018,263.645,159.949,254.674,150.297z"
		/>
	<path d="M214.771,150.995c10.688,0,19.814-3.803,23.479-9.169c1.107-1.622,1.722-3.385,1.722-5.231c0-7.953-11.281-14.4-25.2-14.4
		c-13.917,0-25.2,6.447-25.2,14.4c0,2.08,0.778,4.054,2.166,5.84C195.658,147.477,204.493,150.995,214.771,150.995z"/>
</g>
</svg>
</div>

<style>
    .speech:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 70%;
        width: 0;
        height: 0;
        border: 25px solid transparent;
        border-top-color:  rgb(30 41 59 / 1);
        border-bottom: 0;
        border-right: 0;
        margin-bottom: -25px;
    }
    .animation{
        animation-name: anim;
        animation-duration: 1.5s;
        animation-timing-function: ease-out;
    }

    @keyframes anim{
        0%{
            transform: translateY(300px);

        }   
        100%{
            transform: translateY(0);
        }     
    }
</style>