# gatsby-plugin-authors

Gatsby plugin to automatically create index pages for all authors

## Install

`yarn add gatsby-plugin-authors`

## How to use

Add this to `gatsby-config`
```json
{
  resolve: "gatsby-plugin-authors",
  options: {
    templatePath: `${__dirname}/src/templates/<template>.js`,
  },
}
```

### Options

You can view the defaults in [`defaults.js`](src/defaults.js)
