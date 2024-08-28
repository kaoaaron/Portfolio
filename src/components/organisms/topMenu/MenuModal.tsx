import styled from "styled-components";
import { useRouter } from "next/router";
import { Z_INDEX } from "@/consts/zindex";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${Z_INDEX.MODAL};
  background-color: #000;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  position: relative;
  height: 100px;
  width: 100%;
`;

interface CaretProps {
  open?: boolean;
}

const Caret = styled.span<CaretProps>`
  box-sizing: border-box;
  position: relative;
  left: 10px;
  width: 10px;
  height: 10px;
  transform: ${(props) =>
    props.open
      ? "rotate(225deg) translate(0px, 4px)"
      : "rotate(45deg) translate(3px, 0px)"};
  border-left: 2px solid white;
  border-top: 2px solid white;
`;

interface MenuItemProps {
  clicked?: boolean;
}

const MenuItem = styled.div<MenuItemProps>`
  font-size: 20px;
  cursor: pointer;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  color: ${(props) => (props.clicked ? "#9654F0" : "orange")};
`;

const MenuBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 33px;

  @media (max-height: 654px) {
    margin-bottom: 15px;
  }
`;

const HoverableDivContainer = styled.div`
  display: inline-block;
  cursor: pointer;

  svg path {
    transition: stroke 1s ease-in-out;
  }

  &:hover svg path {
    stroke: #fff;
  }
`;

export default function MenuModal({ closeMenu }: any) {
  const router = useRouter();

  const navigateTo = (path: string) => () => {
    closeMenu();
    router.push(path);
  };

  return (
    <Wrapper>
      <Header>
        <HoverableDivContainer onClick={closeMenu}>
          <svg
            width="26"
            height="25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="blue"
              stroke-width="2"
              d="m1.707 1.293 23 23M1.503 24.293l23-23"
            />
          </svg>
        </HoverableDivContainer>
      </Header>

      <MenuBlock>
        <MenuItem onClick={navigateTo("/")}>Home</MenuItem>
      </MenuBlock>
      <MenuBlock>
        <MenuItem onClick={navigateTo("/projects")}>Projects</MenuItem>
      </MenuBlock>
      <MenuBlock>
        <MenuItem onClick={navigateTo("/blog")}>Blog</MenuItem>
      </MenuBlock>
      <MenuBlock>
        <MenuItem onClick={navigateTo("/photos")}>Photos</MenuItem>
      </MenuBlock>
      <MenuBlock>
        <MenuItem onClick={navigateTo("/contact")}>Contact</MenuItem>
      </MenuBlock>
    </Wrapper>
  );
}
