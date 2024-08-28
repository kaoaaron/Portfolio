import styled from "styled-components";

type ImageContainerProps = {
  width: number;
};

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width}px;
  height: auto;
  border: 3px solid;
  border-radius: 10px;
  max-width: 100%;
  overflow: hidden;
`;

const StyledImgNoBorder = styled.img`
  width: ${(props) => props.width}px;
  height: auto;
  max-width: 100%;
`;

const ImageCaption = styled.figcaption`
  text-align: center;
  padding-top: 16px;
  font-size: 12px;

  @media (max-width: 768px) {
    padding-top: 28px;
  }
`;

const SetMargin = styled.div`
  margin: 60px 0px;
`;

export {
  ImagesContainer,
  ImageContainer,
  StyledImgNoBorder,
  ImageCaption,
  SetMargin,
};
