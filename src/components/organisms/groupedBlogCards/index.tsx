import { useState, useCallback } from "react";
import styled from "styled-components";
import BlogCard from "@/components/molecules/blogCard";

interface BlogData {
  title: string;
  slug: string;
  imageURL: string;
}

interface MainBlogCardProps {
  blogs: BlogData[];
  showAllPostsText?: boolean;
}

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  max-width: 1081px;
  flex-wrap: wrap;
`;

const AllPostsText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  margin: 40px;
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

const GroupedBlogCards: React.FC<MainBlogCardProps> = ({
  blogs,
  showAllPostsText = true,
}: MainBlogCardProps) => {
  const initialBlogCount = 3;
  const blogsToShowMore = 3;
  const [visibleBlogCount, setVisibleBlogCount] = useState(initialBlogCount);

  const handleSeeMoreClick = useCallback(() => {
    setVisibleBlogCount((prevCount) => prevCount + blogsToShowMore);
  }, []);

  return (
    <>
      {showAllPostsText && <AllPostsText>Older Posts</AllPostsText>}
      <OuterWrapper>
        <Container>
          {blogs
            .slice(0, visibleBlogCount)
            .map((blog: BlogData, index: number) => (
              <BlogCard
                key={`blog_card_${index}`}
                title={blog.title}
                slug={blog.slug}
                imageURL={blog.imageURL}
              />
            ))}
        </Container>
      </OuterWrapper>
      {visibleBlogCount < blogs.length && (
        <SeeMoreButton onClick={handleSeeMoreClick}>See More</SeeMoreButton>
      )}
    </>
  );
};

export default GroupedBlogCards;
