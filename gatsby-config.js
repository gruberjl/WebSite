module.exports = {
  siteMetadata: {
    title: "GitBit",
    description: `Get Certified in MS-500 Microsoft 365 Security Administration`,
    author: {
      name: 'John Gruber',
      email: 'John.Gruber@gitbit.org',
      link: 'https://medium.com/@gruberjl'
    },
    siteUrl: "https://www.gitbit.org"
  },
  plugins: [
    "gatsby-plugin-webpack-bundle-analyser-v2",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-clarity`,
      options: {
        clarity_project_id: '8czgv3r8lz',
        enable_on_dev_env: true
      },
    },
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
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-10841251-3"
        ],
      },
    }, {
      resolve: 'gatsby-plugin-zopfli',
      options: {
        extensions: ['css', 'html', 'js', 'svg']
      }
    }
  ],
};
