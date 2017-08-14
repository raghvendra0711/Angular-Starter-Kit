/**
 * Configuration for head elements added during the creation of index.html.
 */
const config = {
	link: [
		/** <link> tags for 'apple-touch-icon' (AKA Web Clips). **/
		{ rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icons/favicon/apple-icon-57x57.png' },
		{ rel: 'apple-touch-icon', sizes: '60x60', href: '/assets/icons/favicon/apple-icon-60x60.png' },
		{ rel: 'apple-touch-icon', sizes: '72x72', href: '/assets/icons/favicon/apple-icon-72x72.png' },
		{ rel: 'apple-touch-icon', sizes: '76x76', href: '/assets/icons/favicon/apple-icon-76x76.png' },
		{ rel: 'apple-touch-icon', sizes: '114x114', href: '/assets/icons/favicon/apple-icon-114x114.png' },
		{ rel: 'apple-touch-icon', sizes: '120x120', href: '/assets/icons/favicon/apple-icon-120x120.png' },
		{ rel: 'apple-touch-icon', sizes: '144x144', href: '/assets/icons/favicon/apple-icon-144x144.png' },
		{ rel: 'apple-touch-icon', sizes: '152x152', href: '/assets/icons/favicon/apple-icon-152x152.png' },
		{ rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/icons/favicon/apple-icon-180x180.png' },

		/** <link> tags for android web app icons **/
		{ rel: 'icon', type: 'image/png', sizes: '192x192', href: '/assets/icons/favicon/android-icon-192x192.png' },

		/** <link> tags for favicons **/
		{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/icons/favicon/favicon-32x32.png' },
		{ rel: 'icon', type: 'image/png', sizes: '96x96', href: '/assets/icons/favicon/favicon-96x96.png' },
		{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/icons/favicon/favicon-16x16.png' },

		/** <link> tags for a Web App Manifest **/
		{ rel: 'manifest', href: '/assets/icons/favicon/manifest.json' },

		/** Prefetch **/
		{ rel: 'dns-prefetch', href: '//fonts.googleapis.com' },

		/** Custom stylesheets **/
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
			'=href': false,
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
			'=href': false,
		}
	],
	meta: [
		{ name: 'msapplication-TileColor', content: '#00b4ff' },
		{ name: 'msapplication-TileImage', content: '/assets/icons/favicon/ms-icon-144x144.png', '=content': true },
		{ name: 'msapplication-navbutton-color', content: '#00b4ff' },
		{ name: 'apple-mobile-web-app-status-bar-style', content: '#00b4ff' },
		{ name: 'theme-color', content: '#00b4ff' }
	],
	script: []
};

module.exports = config;
