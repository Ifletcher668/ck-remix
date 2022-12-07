import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { getPostBySlug } from "lib/WordpressService";

export const loader: LoaderFunction = async (data) => {
  const slug = data.params.slug;

  if (!slug) throw json({ message: "Couldn't find slug from parameters" }, 400);

  const post = await getPostBySlug(slug);

  if (!post)
    throw json({ message: `Couldn't find post with slug: ${slug}` }, 404);

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

export const CatchBoundary = () => {
  const caught = useCatch();

  return <p>{JSON.stringify(caught.data)}</p>;
};
