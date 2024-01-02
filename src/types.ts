export type CoursePart = {
    name: string;
    exerciseCount: number;
}

export interface CoursePartsProps {
    courseParts: CoursePart[];
}