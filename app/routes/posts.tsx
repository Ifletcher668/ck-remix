import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getPosts } from "lib/WordpressService";
import styles from "lib/styles/posts.css";

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

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

  return (
    <>
      <div id="posts">
        <div className="container">
          <h1 className="posts-page-title">Wordpress Posts</h1>

          {posts.map((post) => (
            <Link to={post.slug} className="post" key={post.id}>
              <h2>{post.title}</h2>
              {/* Parse html through a sanitizer first */}
              <div
                dangerouslySetInnerHTML={{ __html: post.preview?.content }}
              />
            </Link>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};
