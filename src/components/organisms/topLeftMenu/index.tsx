import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { BREAKPOINTS } from "@/consts/breakpoints";
import MenuModal from "../topMenu/MenuModal";
import { Z_INDEX } from "@/consts/zindex";
import { useRouter } from "next/router";
import MobileMenu from "@/components/svgs/mobileMenu";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 80px;
`;

const MenuTitle = styled.div`
  font-size: 20px;
`;

const MenuItem = styled(Link)`
  font-size: 20px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const MenuBlock = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 30px;
  z-index: ${Z_INDEX.MODAL};
  top: 96px;
  left: 30px;
  background-color: #000;
`;

const CloseImage = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 36px;
`;

export default function TopLeftMenu() {
  const matches = useMediaQuery(BREAKPOINTS.MOBILE);

  const router = useRouter();

  const [itemsShown, setItemsShown] = useState(false);
  const [itemsShownTwo, setItemsShownTwo] = useState(false);

  const showItems = (state: boolean) => () => {
    setItemsShown(state);
  };

  const showItemsTwo = (state: boolean) => () => {
    setItemsShownTwo(state);
  };

  return (
    <MenuContainer
      onMouseOver={matches ? undefined : showItems(true)}
      onMouseLeave={matches ? undefined : showItems(false)}
    >
      {matches ? (
        itemsShown ? (
          <div>asd</div>
        ) : (
          <MenuTitle onClick={showItems(true)}>
            <MobileMenu />
          </MenuTitle>
        )
      ) : (
        <CloseImage>
          <img
            src="/close.svg"
            alt="Close Menu Button"
            width={24}
            height={24}
            onClick={showItems(false)}
          />
        </CloseImage>
      )}
      {(itemsShown || itemsShownTwo) &&
        (matches ? (
          <MenuModal closeMenu={showItems(false)} />
        ) : (
          <MenuBlock
            onMouseOver={showItemsTwo(true)}
            onMouseLeave={showItemsTwo(false)}
          >
            {router.asPath !== "/" && <MenuItem href={"/"}>Home</MenuItem>}
            <MenuItem href={"about-us"}>About Us</MenuItem>
            <MenuItem href={"/blog"}>Blog</MenuItem>
          </MenuBlock>
        ))}
    </MenuContainer>
  );
}
