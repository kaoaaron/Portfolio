import Link from "next/link";
import styled from "styled-components";

interface MobileBlogTitleProps {
  title: string;
  blogImage: any;
  bottomText?: string | undefined;
  hyperlink?: string | undefined;
  hyperlinkText?: string | undefined;
}

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 300px;
  min-width: 75vw;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
`;

const TextContainer = styled.div`
  flex: 1;
  max-width: 50%;
  padding-right: 20px;
`;

const TitleDiv = styled.h2`
  text-align: center;
  font-size: 20px;
  line-height: 19px;
  text-transform: uppercase;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  color: black;
  overflow-wrap: break-word;
  word-wrap: break-word;

  @media (max-width: 429px) {
    font-size: 24px;
  }
`;

const BottomText = styled.p`
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* Limit the title to 3 lines */
  -webkit-box-orient: vertical;
  margin-top: 10px;
  color: black;
  overflow: hidden;
`;

const Href = styled.a`
  font-size: 18px;
  line-height: 13px;
  text-align: center;
  color: black;
  margin: 15px 0px;
`;

const Container = styled.div`
  margin: 20px;
  @media (min-width: 769px) {
    display: none;
  }
`;

const CenteredTextContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 10px;
  flex: 1;
  display: flex;
  min-width: 50%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const MobileBlogCard = ({
  title,
  blogImage,
  bottomText,
  hyperlink,
  hyperlinkText = "Read More",
}: MobileBlogTitleProps) => {
  return (
    <Container>
      <FlexContainer>
        <TextContainer lang="en">
          <TitleDiv>{title}</TitleDiv>
          {bottomText && <BottomText>{bottomText}</BottomText>}
          {hyperlink && hyperlinkText && (
            <CenteredTextContainer>
              <Href href={hyperlink}>
                <u>{hyperlinkText}</u>
              </Href>
            </CenteredTextContainer>
          )}
        </TextContainer>
        <ImageContainer>
          {hyperlink && (
            <Link href={hyperlink} passHref>
              <Image src={blogImage} alt="Image" />
            </Link>
          )}
        </ImageContainer>
      </FlexContainer>
    </Container>
  );
};

export default MobileBlogCard;
