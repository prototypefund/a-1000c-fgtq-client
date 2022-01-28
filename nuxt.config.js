export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  publicPath: process.env.PUBLIC_PATH || '/',


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'From Gay To Queer — A mapping by Queer narratives, mapped',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'title', name: 'title', content: 'From Gay To Queer — A mapping by Queer narratives, mapped' },
      { hid: 'og:title', name: 'og:title', content: 'From Gay To Queer — A mapping by Queer narratives, mapped' },
      { hid: 'description', name: 'description', content: 'Mapping of the stories and material collected during the Intersections & Constellations: How to map queer narratives? project. This is Work-in-progress' },
      { id: 'og:description', name: 'og:description', content: 'Mapping of the stories and material collected during the Intersections & Constellations: How to map queer narratives? project. This is Work-in-progress' },
      { name: 'og:image', content: 'https://a-thousand-channels.github.io/fgtq-client/fromgaytoqueer_sharepic1.png'
      },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/fgtq-client/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/fgtq-client/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: "32x32", href: '/fgtq-client/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: "16x16", href: '/fgtq-client/favicon-16x16.png' },

/*
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#ffc40d">
<meta name="theme-color" content="#ffffff">
*/



    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/fonts.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-shortkey.js', mode: 'client' },
    { src: '@/plugins/vue-awesome-swiper.js', mode: 'client' },
    { src: '@/plugins/leaflet-curve.js', mode: 'client' },
    { src: '@/plugins/filters.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    ['nuxt-leaflet', { /* module options */ }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // proxy: true
  },


  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    base: process.env.PUBLIC_PATH || '/',
    scrollBehavior: async (to, from, savedPosition) => {
      console.log("scrollBehavior")
      if (savedPosition) {
        console.log("savedPosition");
        console.log(savedPosition);
        return savedPosition
      }

      const findEl = async (hash, x) => {
        return document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
          })
      }

      console.log(from)
      console.log(to)

      if (to.hash) {
        console.log("Section: "+to.hash)
        let el = await findEl(to.hash)
        if (el) {
          if ('scrollBehavior' in document.documentElement.style) {
            console.log('Scroll smooth to '+el.offsetTop+'/'+el.offsetLeft)
            document.getElementById('page_inner').scrollTo({ top: el.offsetTop, left: el.offsetLeft, behavior: 'smooth' })
          } else {
            console.log('Scroll non smooth to '+el.offsetTop+'/'+el.offsetLeft)
            document.getElementById('page_inner').scrollTo({ top: el.offsetTop, left: el.offsetLeft })
          }
        }
        var query = from.query.place_id
        if ( !query ) {
          query  = to.query.place_id
        }
        console.log("Place: #"+query)
        let place = await findEl("#"+query)
        if (place) {
          console.log("Place found at "+ place)
          if ('scrollBehavior' in document.documentElement.style) {
            console.log('Scroll smooth to '+place.offsetTop)
            return document.getElementById('list_content').scrollTo({ top: (place.offsetTop-20), behavior: 'smooth' })
          } else {
            console.log('Scroll non smooth to '+place.offsetTop)
            return document.getElementById('list_content').scrollTo({ top: (place.offsetTop-20) })
          }
        }

      }
      return { x: 0, y: 0 }
    }
  },
}
