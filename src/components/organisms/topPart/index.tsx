import styled from "styled-components";
import TopMenu from "@/components/organisms/topMenu";
import { BREAKPOINTS } from "@/consts/breakpoints";
import TopLeftMenu from "../topLeftMenu";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 121px;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    margin-bottom: 50px;
  }
`;

const TopMenuContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 2;
`;

export default function TopPart() {
  const matches = useMediaQuery(BREAKPOINTS.MOBILE);

  return (
    <Wrapper>
      {!matches && <TopMenu />}
      <TopMenuContainer>{matches && <TopLeftMenu />}</TopMenuContainer>
    </Wrapper>
  );
}
