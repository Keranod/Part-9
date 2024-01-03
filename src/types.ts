export interface CoursePartsProps {
    courseParts: CoursePart[];
}

export interface PartProps {
    coursePart: CoursePart;
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}

export interface CoursePartBasic extends CoursePartWithDescription {
    kind: "basic"
  }
  
export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
export interface CoursePartBackground extends CoursePartWithDescription {
    backgroundMaterial: string;
    kind: "background"
  }
  
export interface CoursePartRequirements extends CoursePartWithDescription {
    requirements: string [];
    kind: "requirements"
  }

  export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;