export default {
  query: `
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
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