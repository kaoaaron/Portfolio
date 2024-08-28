import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import getConfig from "next/config";
import BlogWrapper from "@/components/organisms/blogWrapper/blogWrapper";

const queryBlogData = `query GetBlogBySlug($slug: String) {
  blogCollection(limit: 1, where: { slug: $slug }) {
    items {
      sys {
        id
        firstPublishedAt
      }
      title
      slug
      blogCoverImage {
        url
      }
      webBanner {
        url
      }
      blogDetails {
        json
        __typename
        links {
          entries {
              block {
                sys {
                  id
                }
                __typename
                ... on BlogImages {
                  enableImageBorder
                  imageCaption
                  universalImageHeight
                  imagesCollection {
                    items {
                      fileName
                      url
                      width
                      height
                      title
                    }
                  }
                }
              }
          }
        }
      }
      blogCategory
    }
  }
}`;

const queryAllBlogData = `query GetBlogs {
  blogCollection {
    items {
      sys {
        id
        firstPublishedAt
      }
      title
      slug
      blogCoverImage {
        url
      }
      blogDetails {
        json
        __typename
      }
      blogCategory
    }
  }
}`;

function extractBlogDetails(data: any) {
  const blogDetails: any = [];

  data.forEach((entry: any) => {
    const blogEntry = {
      imageURL: entry.blogCoverImage.url || "",
      title: entry.title || "",
      categories: entry.blogCategory || [],
      slug: entry.slug || "",
      content: "",
      createdDate: entry.sys.firstPublishedAt || "",
    };

    if (entry.blogDetails && entry.blogDetails?.content) {
      blogEntry.content = entry.blogDetails.content
        .filter((item: any) => item.nodeType === "paragraph")
        .map((item: any) => item.content.map((el: any) => el.value).join(""))
        .join("\n");
    }

    // Sort blogDetails by createdDate in descending order (most recent first)
    blogDetails.sort((a: any, b: any) => {
      return (
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
    });

    blogDetails.push(blogEntry);
  });

  return blogDetails;
}

const getContentfulData = async (slug: any, query: string) => {
  const { publicRuntimeConfig } = getConfig();
  const response = await window.fetch(
    `https://graphql.contentful.com/content/v1/spaces/${publicRuntimeConfig.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authenticate the request
        Authorization: `Bearer ${publicRuntimeConfig.CONTENTFUL_DELIVERY_ACCESS_TOKEN}`,
      },
      // send the GraphQL query
      body: JSON.stringify({
        query: query,
        variables: {
          slug: slug,
        },
      }),
    }
  );

  const { data, errors } = await response.json();
  if (errors) {
    console.error(errors);
  }

  return data;
};

export default function Blog() {
  const router = useRouter();
  const [blogData, setBlogData] = useState({});
  const [allBlogData, setAllBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getContentfulData(
          router.query.slug,
          queryBlogData
        );
        if (response) {
          if (response.blogCollection?.items[0]?.slug == router.query.slug) {
            setBlogData(response.blogCollection.items[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await getContentfulData("", queryAllBlogData);

        if (response) {
          const allItems = response.blogCollection.items;
          const filteredAllItems = allItems.filter(
            (item: any) => item.slug !== router.query.slug
          );

          const extractedBlogDetails = extractBlogDetails(filteredAllItems);
          setAllBlogData(extractedBlogDetails);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router.query.slug]);

  return Object.keys(blogData).length > 0 ? (
    <BlogWrapper blogEntryData={blogData} allBlogData={allBlogData} />
  ) : null;
}
