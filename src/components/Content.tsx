import { CoursePartsProps } from "../types";

const Content = ({courseParts}: CoursePartsProps) => {
    return (
        <div>
            {courseParts.map((part, index) => (
                <p key={index}>{part.name} {part.exerciseCount}</p>
            ))}
        </div>
    )
}

export default Content;