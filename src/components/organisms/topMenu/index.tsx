import Link from "next/link";
import styled from "styled-components";
import { gloriaHallelujah } from "../../../pages/_app";

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 30px;
  margin-top: -20px;
`;

const UL = styled.ul`
  padding: 0;
  display: flex;
`;

const LI = styled.li`
  list-style-type: none;
  padding: 10px 20px;
  font-size: 80px;
`;

const Anchor = styled.a`
  text-transform: uppercase;
  text-decoration: none;
  font-size: 20px;
  color: white;
  font-family: ${gloriaHallelujah.style.fontFamily};
  position: relative;
  transition: all 2s;

  &::before {
    content: "";
    width: 0px;
    height: 3px;
    position: absolute;
    background-color: lime;
    left: 0;
    top: 100%;
    transition: all 0.5s;
  }

  &:hover {
    color: red;
  }

  &::after {
    content: "";
    width: 0px;
    height: 3px;
    position: absolute;
    background-color: orange;
    right: 0;
    top: 100%;
    transition: all 0.5s;
  }

  &:hover::before {
    width: 50%;
    transform: translateX(100%);
  }

  &:hover::after {
    width: 50%;
    transform: translateX(-100%);
  }
`;

export default function TopMenu(): JSX.Element {
  return (
    <MenuContainer>
      <UL>
        <LI>
          <Link href="/">
            <Anchor>Home</Anchor>
          </Link>
        </LI>
        <LI>
          <Link href="/projects">
            <Anchor>Projects</Anchor>
          </Link>
        </LI>
        <LI>
          <Link href="/blog">
            <Anchor>Blog</Anchor>
          </Link>
        </LI>
        <LI>
          <Link href="/photos">
            <Anchor>Photos</Anchor>
          </Link>
        </LI>
        <LI>
          <Link href="/contact">
            <Anchor>Contact</Anchor>
          </Link>
        </LI>
      </UL>
    </MenuContainer>
  );
}
