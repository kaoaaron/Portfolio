import styled from "styled-components";

interface BlogCardProps {
  title: string;
  slug: string;
  imageURL: string;
}

const Container = styled.a`
  position: relative;
  display: flex;
  width: 327px;
  height: 327px;
  background-color: white;
  border-radius: 10px;
  padding-right: 20px;
  cursor: pointer;
  text-decoration: none;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 327px;
  height: 327px;
  position: absolute;
  opacity: 0.4;
  transition: opacity 1s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const Title = styled.h2`
  font-size: 26px;
  color: black;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit the title to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow: hidden;
  text-align: center;
  max-height: 108px;
  padding: 0 20px;
`;

const BlogCard: React.FC<BlogCardProps> = ({ title, slug, imageURL }) => {
  return (
    <Container href={`/blog/${slug}`}>
      <ImageContainer>
        <Image src={imageURL} alt="" />
      </ImageContainer>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
    </Container>
  );
};

export default BlogCard;
