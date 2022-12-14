import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { getPosts } from "lib/WordpressService";
import styles from "lib/styles/posts.css";
import type {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  if (!posts) throw json({ message: "Posts not found" }, 404);

  return posts;
};

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default () => {
  const posts = useLoaderData();
  console.log(posts, "POSTS");

  return (
    <>
      <div id="posts">
        <div className="container">
          <h1 className="posts-page-title">Wordpress Posts</h1>

          {posts.map(
            (post: {
              slug: any;
              id: Key | null | undefined;
              title:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
              preview: { content: any };
            }) => (
              <Link to={`/post/${post.slug}`} className="post" key={post.id}>
                <h2>{post.title}</h2>
                {/* Parse html through a sanitizer first */}
                <div
                  dangerouslySetInnerHTML={{ __html: post.preview?.content }}
                />
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};

export const CatchBoundary = () => {
  const caught = useCatch();

  return <p>{JSON.stringify(caught.data)}</p>;
};
