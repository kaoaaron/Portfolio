import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import GraduationIcon from "@/components/svgs/graduation";
import WorkIcon from "@/components/svgs/work";
import timelineData from "@/components/molecules/timeline/data";

export default function Timeline() {
  const workIconStyles = { background: "#fff" };
  const workStyles = { background: "rgb(20, 50, 50)", color: "#fff" };
  const gradIconStyles = { background: "#06D6A0" };
  const gradStyles = { background: "rgb(55, 55, 50)", color: "#fff" };
  return (
    <div>
      <VerticalTimeline>
        {timelineData.map((data) => {
          const isWorkIcon = data.icon === "work" ? true : false;
          const buttonText = data.buttonText;
          return (
            <VerticalTimelineElement
              key={data.key}
              date={data.date}
              dateClassName="date"
              contentStyle={isWorkIcon ? gradStyles : workStyles}
              iconStyle={isWorkIcon ? workIconStyles : gradIconStyles}
              icon={isWorkIcon ? <WorkIcon /> : <GraduationIcon />}
            >
              <h3 className="vertical-timeline-element-title">{data.title}</h3>
              <h5 className="vertical-timeline-element-subtitle">
                {data.company} | {data.location}
              </h5>
              <p id="description">{data.description}</p>
              {buttonText && <a href="/">{data.buttonText}</a>}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}
