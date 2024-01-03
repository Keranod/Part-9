import Part from "./Part";

import { CoursePartsProps } from "../types";

const Content = ({courseParts}: CoursePartsProps) => {
    return (
        <div>
            {courseParts.map((part, index) => (
                <Part key={index} coursePart={part}/>
            ))}
        </div>
    )
}

export default Content;