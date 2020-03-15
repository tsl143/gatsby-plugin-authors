export default {
  query: `
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              author
            }
          }
        }
      }
    }
  `,
  prefix: "/authors/",
  transformer: ({ data }) =>
    data.allMarkdownRemark.edges.map(({ node }) => node),
  slugOptions: {
    lower: true
  }
};