import styled from "styled-components";
import { BREAKPOINTS } from "@/consts/breakpoints";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  padding-left: 50px;
  padding-right: 50px;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const RichTextContainer = styled.div`
  max-width: 1120px;
  width: 100%;

  a {
    color: #58c1a4;
  }

  ul li {
    list-style: none;
  }

  ul li p {
    display: inline-block;
    line-height: 1.2;
    vertical-align: middle;
  }

  ul li p::before {
    content: "•";
    margin-right: 18px;
    font-size: 10px;
    vertical-align: center;
    position: relative;
    top: -2px;
  }
`;

const BlogLogoContainer = styled.div`
  position: relative;
  margin-top: 0px;
  margin-bottom: 100px;
  width: 394px;
  height: 220px;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    margin-top: 20px;
    margin-bottom: 36px;
    width: 225px;
    height: 136px;
  }
`;

const BlogTitle = styled.div`
  font-size: 50px;
  text-align: center;
  margin-bottom: 10px;
  max-width: 900px;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    display: none;
  }
`;

const WebBannerContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 0;
`;

const AboutContainer = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 120px 0px;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    display: none;
  }
`;

const WebBanner = styled.img`
  position: relative;
  width: 100vw;
  height: auto;
  padding-top: 21px;
  margin-bottom: 60px;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    display: none;
  }
`;

const AboutTitleContainer = styled.div`
  font-size: 50px;
  padding-bottom: 30px;
  text-transform: uppercase;
`;

const AboutDescription = styled.div`
  font-size: 20px;
  line-height: 24px;
  padding-bottom: 20px;
`;

const SeeMoreButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  text-transform: uppercase;
  margin: 40px;

  text-decoration: none;
`;

export {
  Container,
  RichTextContainer,
  BlogLogoContainer,
  BlogTitle,
  WebBannerContainer,
  WebBanner,
  CenteredContainer,
  AboutContainer,
  AboutTitleContainer,
  AboutDescription,
  SeeMoreButton,
};
