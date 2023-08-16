/* eslint-disable quotes */
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: false,
    },
    readMoreButtonText: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('posts/', ''),
    },
  },
}));

export const UseCase = defineDocumentType(() => ({
  name: 'UseCase',
  filePathPattern: `use-cases/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    benefit: {
      type: 'string',
      required: true,
    },
    icon: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: false,
    },
    buttonText: {
      type: 'string',
      required: false,
    },
    feature: {
      type: 'string',
      required: false,
    },
    testimonialAuthor: {
      type: 'string',
      required: false,
    },
    testimonialAuthorRole: {
      type: 'string',
      required: false,
    },
    testimonial: {
      type: 'string',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('use-cases/', ''),
    },
  },
}));

export const Legal = defineDocumentType(() => ({
  name: 'Legal',
  filePathPattern: `legals/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('legals/', ''),
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, UseCase, Legal],
});
