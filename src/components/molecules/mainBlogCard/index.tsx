import styled from "styled-components";
import Link from "next/link";

interface MainBlogCardProps {
  title: string;
  slug: string;
  coverImage: string;
  content: string;
  isImageLeft: boolean;
  borderColor: string;
  createdDate: string;
}

const Container = styled.div<{ isImageLeft: boolean; borderColor: string }>`
  display: flex;
  width: 1075px;
  border-radius: 10px;
  padding-right: 20px;
  margin-bottom: 70px;
  background-color: white;
  color: black;

  @media (max-width: 1098px) {
    width: 100%;
  }

  border: 1px solid transparent;
  outline-offset: 0;
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  transition: border 1s, outline-offset 1s, transform 1s;

  &:hover {
    border: 6px solid red;
    outline-offset: 15px;
    transform: perspective(1000px) rotateX(-5deg) rotateY(-5deg);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  min-height: 300px;
  border-radius: 10px 10px 0 0;
  flex: 3;
  display: flex;
  justify-content: center;
  padding: 10px;
  align-items: center;
`;

const Image = styled.img`
  position: absolute;
  width: 300px;
  height: 300px;

  object-fit: cover;
  left: 25px;
  top: -30px;
  border-radius: 10px;

  @media (max-width: 1137px) {
    position: relative;
    left: 0;
    top: 0;
    width: 90%;
    height: 90%;
  }
`;

const TitleDescriptionContainer = styled.div`
  flex: 6;
  position: relative;
`;

const Title = styled.h2`
  font-size: 40px;
  margin-top: 27px;
  line-height: 70px;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit the title to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Description = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 20px;
  position: absolute;
  bottom: 80px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StyledLink = styled(Link)`
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 20px;
  color: black;
  text-decoration: underline;
  cursor: pointer;
  position: absolute;
  bottom: 40px;
`;

const MainBlogCard: React.FC<MainBlogCardProps> = ({
  title,
  slug,
  coverImage,
  content,
  isImageLeft,
  borderColor,
  createdDate,
}) => {
  return (
    <Container isImageLeft={isImageLeft} borderColor={borderColor}>
      <ImageContainer>
        <Link href={`/blog/${slug}`} passHref>
          <Image src={coverImage} alt="Image" />
        </Link>
      </ImageContainer>

      <TitleDescriptionContainer>
        <Title>{title}</Title>
        <div>{createdDate}</div>
        <Description>{content}</Description>
        <StyledLink href={`/blog/${slug}`}>Read More</StyledLink>
      </TitleDescriptionContainer>
    </Container>
  );
};

export default MainBlogCard;
