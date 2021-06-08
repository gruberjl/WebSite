module.exports = {
  siteMetadata: {
    title: "GitBit",
    description: `Get Certified in MS-500 Microsoft 365 Security Administration`,
    author: '@gruberjl',
    siteUrl: "https://www.gitbit.org"
  },
  plugins: [
    'gatsby-plugin-firebase-app',
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-10841251-3",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
        name: `GitBit`,
        short_name: `GitBit`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: 'gatsby-plugin-zopfli',
      options: {
        extensions: ['css', 'html', 'js', 'svg']
      }
    },
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-10841251-3"
        ],
      },
    }
  ],
};
