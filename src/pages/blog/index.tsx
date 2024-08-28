import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import MainBlogCard from "@/components/molecules/mainBlogCard";
import GroupedBlogCards from "@/components/organisms/groupedBlogCards";
import { BREAKPOINTS } from "@/consts/breakpoints";
import MobileBlogCard from "@/components/molecules/mobileBlogCard";
import getConfig from "next/config";

const borderColors = ["#58C1A4", "#F8D247", "#9747FF"];

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px;
  margin-top: 60px;
`;

const BlogLogoContainer = styled.div`
  position: relative;
  margin-top: -61px;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    margin-top: -200px;
    width: 225px;
  }
`;

const BlogLogo = styled.img`
  width: 394px;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    width: 225px;
  }
`;

interface ButtonProps {
  selected: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 20px 65px;
  background-color: ${(props) => (props.selected ? "red" : "grey")};
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 300;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;
  text-decoration: ${(props) => (props.selected ? "underline" : "none")};

  &:hover {
    background-color: #ea335f;
  }

  @media (max-width: 1470px) {
    padding: 20px 40px;
  }
`;

const DropdownButton = styled.select`
  border: 2px solid lightblue;
  border-radius: 10px;
  cursor: pointer;
  background-color: white;
  color: black;

  font-size: 25px;
  line-height: 25px;
  text-align: center;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    display: block;
    width: 100%;
    padding: 20px 10px;
    margin-bottom: 10px;
  }
`;

const DropdownOption = styled.option`
  color: green;
`;

const DropdownButtonContainer = styled.div`
  display: flex;
  margin-top: 120px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 114px;
  width: 100%;
`;

const SeeMoreButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  margin: 40px;

  text-decoration: none;
`;

function extractBlogDetails(data: any) {
  const blogDetails: any = [];
  data.forEach((entry: any) => {
    const blogEntry = {
      imageURL: entry.blogCoverImage?.url || "",
      title: entry.title || "",
      categories: entry.blogCategory || [],
      slug: entry.slug || "",
      content: "",
      createdDate: entry.sys.firstPublishedAt || "",
    };

    if (entry.blogDetails && entry.blogDetails?.json.content) {
      blogEntry.content = entry.blogDetails.json.content
        .filter(
          (item: any) =>
            item.nodeType === "paragraph" ||
            item.nodeType === "heading-5" ||
            item.nodeType === "heading-4" ||
            item.nodeType === "heading-3" ||
            item.nodeType === "heading-2"
        )
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

export default function Blog({ data }: any) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedButton, setSelectedButton] = useState("ALL");
  const [_, setNewData] = useState(data);
  const [originalData, setOriginalData] = useState(data);
  const [mainBlogCardData, setMainBlogCardData] = useState([]);
  const [groupedBlogCardData, setgroupedBlogCardData] = useState([]);

  const initialBlogCount = 0;
  const blogsToShowMore = 3;
  const [visibleBlogCount, setVisibleBlogCount] = useState(initialBlogCount);

  const handleSeeMoreClick = useCallback(() => {
    setVisibleBlogCount((prevCount) => prevCount + blogsToShowMore);
  }, []);

  const handleButtonClick = (buttonLabel: string) => {
    setSelectedButton(buttonLabel);
    setVisibleBlogCount(0);
    if (buttonLabel === "ALL") {
      setNewData(originalData);
      setMainBlogCardData(originalData.slice(0, 5));
      setgroupedBlogCardData(originalData.slice(5));
    } else {
      const filteredData = originalData.filter((entry: any) =>
        entry.categories.includes(buttonLabel)
      );
      setNewData(filteredData);
      setMainBlogCardData(filteredData.slice(0, 5));
      setgroupedBlogCardData(filteredData.slice(5));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= BREAKPOINTS.MOBILE);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getContentfulData("", queryAllBlogData);

        if (response) {
          const allItems = response.blogCollection.items;
          const extractedBlogDetails = extractBlogDetails(allItems);
          setOriginalData(extractedBlogDetails);
          setNewData(extractedBlogDetails);
          setMainBlogCardData(extractedBlogDetails.slice(0, 5));
          setgroupedBlogCardData(extractedBlogDetails.slice(5));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router.query.slug]);

  function formatDate(inputDate: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(inputDate);
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <CenterContainer>
      <BlogLogoContainer>
        <BlogLogo src="/images/bloglogo.png" alt="blog logo" />
      </BlogLogoContainer>
      <DropdownButtonContainer>
        {isMobile ? (
          <DropdownButton
            value={selectedButton}
            onChange={(event) => handleButtonClick(event.target.value)}
          >
            <DropdownOption value="All">All</DropdownOption>
            <DropdownOption value="Work">Work</DropdownOption>
            <DropdownOption value="Fitness">Fitness</DropdownOption>
            <DropdownOption value="Personal">Personal</DropdownOption>
            <DropdownOption value="Hobbies">Hobbies</DropdownOption>
          </DropdownButton>
        ) : (
          <>
            <Button
              onClick={() => handleButtonClick("ALL")}
              selected={selectedButton === "ALL"}
            >
              All
            </Button>
            <Button
              onClick={() => handleButtonClick("Work")}
              selected={selectedButton === "Work"}
            >
              Work
            </Button>
            <Button
              onClick={() => handleButtonClick("Fitness")}
              selected={selectedButton === "Fitness"}
            >
              Fitness
            </Button>
            <Button
              onClick={() => handleButtonClick("Personal")}
              selected={selectedButton === "Personal"}
            >
              Personal
            </Button>
            <Button
              onClick={() => handleButtonClick("Hobbies")}
              selected={selectedButton === "Hobbies"}
            >
              Hobbies
            </Button>
          </>
        )}
      </DropdownButtonContainer>
      {!isMobile &&
        mainBlogCardData.map((entry: any, index: number) => (
          <MainBlogCard
            key={index}
            isImageLeft={true}
            title={entry.title}
            slug={entry.slug}
            coverImage={entry.imageURL}
            content={entry.content}
            createdDate={formatDate(entry.createdDate)}
            borderColor={borderColors[index]}
          />
        ))}
      {!isMobile && groupedBlogCardData.length !== 0 && (
        <GroupedBlogCards blogs={groupedBlogCardData} />
      )}

      {isMobile &&
        mainBlogCardData.map((entry: any, index: number) => (
          <MobileBlogCard
            key={index}
            title={entry.title}
            hyperlink={`/blog/${entry.slug}`}
            blogImage={entry.imageURL}
            bottomText={entry.content}
            hyperlinkText={undefined}
          />
        ))}

      {isMobile &&
        groupedBlogCardData
          .slice(0, visibleBlogCount)
          .map((entry: any, index: number) => (
            <MobileBlogCard
              key={index}
              title={entry.title}
              hyperlink={`/blog/${entry.slug}`}
              blogImage={entry.imageURL}
              bottomText={entry.content}
              hyperlinkText={undefined}
            />
          ))}

      {isMobile && visibleBlogCount < groupedBlogCardData.length && (
        <SeeMoreButton onClick={handleSeeMoreClick}>See More</SeeMoreButton>
      )}
    </CenterContainer>
  );
}
