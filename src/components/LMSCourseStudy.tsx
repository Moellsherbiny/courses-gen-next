"use client";

import { useState } from "react";

interface LMSCourseStudyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lessons: any; // Array of lesson objects
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videos: any;  // Array of video objects
  hasLessons: boolean;
  hasVideos: boolean;
}

export default function LMSCourseStudy({ lessons, videos, hasLessons, hasVideos }: LMSCourseStudyProps) {
  // Default to lessons if available; otherwise use videos.
  const [activeTab, setActiveTab] = useState(hasLessons ? "lesson" : hasVideos ? "video" : null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* Tab Navigation */}
      <div className="mb-4">
        {hasLessons && (
          <button
            onClick={() => setActiveTab("lesson")}
            className={`px-4 py-2 mr-2 rounded ${activeTab === "lesson" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            المحتوى القرائي
          </button>
        )}
        {hasVideos && (
          <button
            onClick={() => setActiveTab("video")}
            className={`px-4 py-2 rounded ${activeTab === "video" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            الفيديوهات
          </button>
        )}
      </div>

      {/* Main Content Display */}
      <div>
        {activeTab === "lesson" && hasLessons && Array.isArray(lessons) ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {lessons[activeIndex].lessonTitle || `الدرس ${activeIndex + 1}`}
            </h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: lessons[activeIndex].lessonContent || "" }} />
          </div>
        ) : activeTab === "video" && hasVideos && Array.isArray(videos) ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {videos[activeIndex].title || `الفيديو ${activeIndex + 1}`}
            </h2>
            {/* Assuming each video object has a videoUrl field */}
            <video controls className="w-full" src={videos[activeIndex].videoUrl || ""} />
          </div>
        ) : (
          <p className="text-gray-500">لا يوجد محتوى متاح.</p>
        )}
      </div>
    </div>
  );
}
