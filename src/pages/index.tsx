import BaseCanvas from "@/components/canvas/BaseCanvas";
import Timeline from "@/components/molecules/timeline";
import TiltCard from "@/components/molecules/tiltCard";
import styled from "styled-components";

const CenterItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  return (
    <CenterItems>
      <BaseCanvas />
      <TiltCard />
      <Timeline />
    </CenterItems>
  );
}
