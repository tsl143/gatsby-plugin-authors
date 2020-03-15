import fs from "fs";
import slugify from "slug";

import defaultOptions from "./defaults";
import { pathify } from "./internals";

export const onCreateNode = ({ node, actions }, pluginOptions) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const { slugOptions } = {
      ...defaultOptions,
      ...pluginOptions
    };
    const {
      frontmatter: { author }
    } = node;

    if (!author) return;

    createNodeField({
      node,
      name: "authors",
      value: slugify(author, { ...slugOptions })
    });
  }
};
export const createPages = async (
  { graphql, actions, reporter },
  pluginOptions
) => {
  const { createPage } = actions;
  const { templatePath, prefix, query, transformer } = {
    ...defaultOptions,
    ...pluginOptions
  };

  const data = await graphql(query);
  const pages = transformer(data);

  if (!templatePath) {
    reporter.panic(`
      "templatePath" is a required option for gatsby-plugin-authors
    `);
  }

  if (!fs.existsSync(templatePath)) {
    reporter.panic(`
      The template path passed to gatsby-plugin-authors does not exist
      ${templatePath}
    `);
  }

  const authorSet = new Set();

  pages.forEach(({ fields }) => {
    if (fields && fields.author) {
      authorSet.add(fields.author)
    }
  });

  authorSet.forEach(author => {
    createPage({
      path: pathify(prefix, author),
      component: templatePath,
      context: {
        author
      }
    });
  });
};
