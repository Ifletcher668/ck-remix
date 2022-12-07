import client from "./apollo";
import { gql } from "@apollo/client";

export async function getPosts() {
  const query = gql`
    query GetPosts {
      posts {
        nodes {
          author {
            node {
              firstName
              lastName
            }
          }
          date
          id
          slug
          title
          preview {
            node {
              content
            }
          }
        }
      }
    }
  `;
  const response = await client.query({ query });
  const data = response.data?.posts?.nodes;

  return data;
}

export async function getPostBySlug(slug) {
  const query = gql`
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        author {
          node {
            firstName
            lastName
          }
        }
        content
        date
        id
        slug
        title
      }
    }
  `;
  const response = await client.query({ query, variables: { id: slug } });
  const data = response.data?.post;

  return data;
}
