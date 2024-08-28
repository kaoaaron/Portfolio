import styled from "styled-components";
import { useState, useEffect } from "react";

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: orange;
  width: 300px;
  height: 300px;
  border-radius: 20px;
  transform: perspective(1000px) rotateX(${(props) => props.tiltX}deg)
    rotateY(${(props) => props.tiltY}deg);
  transition: transform 0.3s;
`;

const TiltCard = () => {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  const handleMouseMove = (e) => {
    const card = document.querySelector(".card");
    const cardRect = card.getBoundingClientRect();

    const mouseX = e.clientX - cardRect.left;
    const mouseY = e.clientY - cardRect.top;

    const cardCenterX = cardRect.width / 2;
    const cardCenterY = cardRect.height / 2;

    const tiltX = ((cardCenterY - mouseY) / cardCenterY) * 30;
    const tiltY = ((mouseX - cardCenterX) / cardCenterX) * 30;

    setTiltX(tiltX);
    setTiltY(tiltY);
  };

  useEffect(() => {
    const card = document.querySelector(".card");
    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Card className="card" tiltX={tiltX} tiltY={tiltY}>
      Portfolio in Progress.
    </Card>
  );
};

export default TiltCard;
