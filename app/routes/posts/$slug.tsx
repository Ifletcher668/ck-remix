import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPostBySlug } from "lib/WordpressService";

export const loader: LoaderFunction = async (data) => {
  const slug = data.params.slug;

  const post = await getPostBySlug(slug);

  return post;
};

export default () => {
  const post = useLoaderData();

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};
