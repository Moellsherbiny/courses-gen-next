"use client";
import { useState } from "react";
import YouTube from "react-youtube";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CourseContent({ videos, lessons, hasVideos, hasReadingContent, preferredContent }: any) {
  // ✅ Determine default active tab based on user preference
  const [activeTab, setActiveTab] = useState(preferredContent === "videos" && hasVideos ? "videos" : "reading");

  return (
    <div className="mt-6">
      {/* ✅ Tabs Only Shown if Both Content Types Exist */}
      {hasVideos && hasReadingContent && (
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === "videos" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveTab("videos")}
          >
            📺 فيديوهات الدورة
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "reading" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveTab("reading")}
          >
            📖 المحتوى المقروء
          </button>
        </div>
      )}

      {/* ✅ Show Video Playlist */}
      {activeTab === "videos" && hasVideos && <VideoPlaylist videos={videos} />}

      {/* ✅ Show Reading Content */}
      {activeTab === "reading" && hasReadingContent && <ReadingContent lessons={lessons} />}
    </div>
  );
}

// ✅ Video Playlist Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function VideoPlaylist({ videos }: { videos: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="p-4 border rounded-lg shadow bg-white text-center">
          <YouTube videoId={video.videoId} className="w-full h-40 mb-2" />
          <h2 className="text-lg font-semibold">{video.title}</h2>
        </div>
      ))}
    </div>
  );
}

// ✅ Reading Content Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReadingContent({ lessons }: { lessons: any[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {lessons.map((lesson, index: number) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">📖 {lesson.title}</h2>
          <p className="text-gray-700">{lesson.content}</p>
        </div>
      ))}
    </div>
  );
}
