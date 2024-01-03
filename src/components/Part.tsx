import React from 'react';


import { PartProps } from "../types";

const Part = ({coursePart}: PartProps) => {
    const partAttributes: string[] = [];
    
    switch (coursePart.kind) {
        case "basic":
            partAttributes.push(coursePart.description)
            break;
        case "group":
            partAttributes.push(`project exercises ${coursePart.groupProjectCount}`)
            break;
        case "background":
            partAttributes.push(coursePart.description)
            partAttributes.push(`Link: ${coursePart.backgroundMaterial}`)
            break;
        case "requirements":
            partAttributes.push(coursePart.description)
            partAttributes.push(`required skills: ${coursePart.requirements.join(', ')}`)
            break;
        default:
            break
    }
    
    return (
        <div>
            <p>
                <b>{coursePart.name} {coursePart.exerciseCount}</b>
                {partAttributes.map((att, index) => (
                <React.Fragment key={index}>
                    <br />
                    {att}
                </React.Fragment>
                ))}
            </p>
        </div>
    )
}

export default Part;