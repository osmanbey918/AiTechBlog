"use client";
import { comment } from "postcss";
import React from "react";

// Course data object
const course = [
    { id: 1, title: "Pandas Assignment", category:"politics", likes:10, comments:255, },
    { id: 2, title: "Data Visualization", category:"AI", likes:10, comments:255, },
    { id: 3, title: "Data Visualization", category:"Tech", likes:10, comments:255, },
    { id: 4, title: "Data Visualization", category:"Health", likes:10, comments:255, },
    { id: 5, title: "Data Visualization", category:"politics", likes:10, comments:255, },
];



const CourseAssessments = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">{course.title} - Assessments</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
                {course.map((assessment, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-48 border border-gray-200 rounded-lg p-4"
                    >
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseAssessments;
