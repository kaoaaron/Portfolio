import styled from "styled-components";
import { BREAKPOINTS } from "@/consts/breakpoints";

interface CustomDividerProps {
  startingHexColor: string;
  endingHexColor: string;
  verticalMargin?: number;
  visibleOnWebMobile?: boolean | undefined;
  lineThickness?: number;
  preventOverflow?: boolean; // Change false to boolean type here
}

const HR = styled.hr<CustomDividerProps>`
  display: ${(props) =>
    props.visibleOnWebMobile === false ? "none" : "block"};
  height: ${(props) => props.lineThickness}px;
  width: ${(props) => (props.preventOverflow ? "100%" : "calc(100% + 40px)")};
  background: red;
  border: none;
  margin: ${(props) => props.verticalMargin}px 0;
  transform: ${(props) =>
    props.preventOverflow ? "none" : "translateX(-20px)"};

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    display: ${(props) =>
      props.visibleOnWebMobile === true ? "none" : "block"};
    width: ${(props) => (props.preventOverflow ? "100%" : "calc(100% + 28px)")};
    transform: ${(props) =>
      props.preventOverflow ? "none" : "translateX(-14px)"};
  }
`;

const CustomDivider = ({
  startingHexColor = "#972081",
  endingHexColor = "#1F2269",
  verticalMargin = 45,
  preventOverflow = false,
  visibleOnWebMobile,
  lineThickness = 2,
}: CustomDividerProps) => {
  return (
    <HR
      startingHexColor={startingHexColor}
      endingHexColor={endingHexColor}
      lineThickness={lineThickness}
      verticalMargin={verticalMargin}
      visibleOnWebMobile={visibleOnWebMobile}
      preventOverflow={preventOverflow}
    />
  );
};

export default CustomDivider;
