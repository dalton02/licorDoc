<script>

</script>
<div class="filtrado absolute dark:opacity-[0.05] opacity-[0.3] top-0 left-0 w-full h-full z-0 pointer-events-none"></div>

<svg>
    <filter id='roughpaper'>
        <feTurbulence type="fractalNoise" baseFrequency='0.04' result='noise' numOctaves="5" />
  
        <feDiffuseLighting in='noise' lighting-color='#fff' surfaceScale='2'>
            <feDistantLight azimuth='45' elevation='60' />
        </feDiffuseLighting>
    </filter>
  </svg>
  <style>
    svg {
        width: 0;
        height: 0;
    }
  
    .filtrado{
        filter: url(#roughpaper);
    }
  </style>