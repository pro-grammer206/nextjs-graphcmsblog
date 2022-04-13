import Image from "next/image";
import { GraphQLClient } from "graphql-request";
import Link from "next/link";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Head from "next/head";
import moment from "moment";
export async function getStaticPaths() {
  const graphcms = new GraphQLClient(process.env.ENDPOINT);
  const { articles } = await graphcms.request(
    `{
     articles {
    slug
     }
}`
  );
  return {
    paths: articles.map((article) => {
      return { params: { slug: article.slug } };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const graphcms = new GraphQLClient(process.env.ENDPOINT);
  const { article } = await graphcms.request(
    `
     query MyQuery($slug:String!) {
  article(where: {slug: $slug}) {
    id
    createdAt
    title
    slug
    content {
      json
    }
    image {
      url
      width
      height
    }
  }
}

    `,
    { slug: params.slug }
  );

  return {
    props: {
      article,
    },
    revalidate: 10,
  };
}
const Post = ({ article }) => {
  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <section className="abtn">
        <Link href="/">
          <a>All Posts</a>
        </Link>
      </section>
      <div className="pcard">
        <h3>{article.title}</h3>
        {article.image ? (
          <Image
            src={article.image.url}
            width={article.image.width}
            height={article.image.height}
            alt={article.title}
          />
        ) : null}
        <p
          style={{ textAlign: "right", fontSize: "1.2rem", fontWeight: "200" }}
        >
          posted {moment(article.createdAt).fromNow()}
        </p>
        <RichText content={article.content.json} />
      </div>
    </>
  );
};

export default Post;
