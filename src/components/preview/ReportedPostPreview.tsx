import type { PostReport } from "../../types/report.ts";
import Avatar from "../img/Avatar.tsx";
import { format } from "date-fns";
import {
  isLinkPost,
  isPhotoPost,
  isQuotePost,
  isTextPost,
  isVideoPost,
} from "../../utils/postUnionGuards.ts";
import {
  Bookmark,
  ExternalLink,
  Heart,
  MessageSquare,
  MoreHorizontal,
  Play,
  Share,
} from "lucide-react";

type ReportedPostPreviewProps = {
  report: PostReport;
};

const ReportedPostPreview = ({ report }: ReportedPostPreviewProps) => {
  const post = report.post;

  return (
    <div className="bg-black-300 border border-gray-600 rounded-lg p-4 max-w-full">
      <div className="flex items-center gap-3 mb-3">
        <Avatar size="size-8" />
        <div className="flex-1">
          <p className="text-white-100 font-medium text-sm">
            {post.authorName}
          </p>
          <p className="text-gray-400 text-xs">
            @{post.authorUsername} •{" "}
            {format(new Date(post.createdAt), "MMM d, yyyy")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {post.tags?.map((tag, index) => (
            <span key={index} className="text-blue-400 text-xs">
              #{tag.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-3">
        {isTextPost(post) && (
          <div>
            <h4 className="text-white-100 font-medium text-sm mb-2">
              {post.title}
            </h4>
            <p className="text-gray-300 text-sm line-clamp-3">{post.content}</p>
          </div>
        )}
        {isPhotoPost(post) && (
          <div>
            <p className="text-white-100 text-sm mb-2 line-clamp-2">
              {post.caption}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {post.imageUrls.slice(0, 4).map((url, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg h-24 flex items-center justify-center relative overflow-hidden"
                >
                  <img
                    src={url || "/placeholder.svg"}
                    alt="Post content"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-gray-700 flex items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <span className="text-gray-400 text-xs">Image</span>
                  </div>
                  {index === 3 && post.imageUrls.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        +{post.imageUrls.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {isVideoPost(post) && (
          <div>
            <p className="text-white-100 text-sm mb-2 line-clamp-2">
              {post.description}
            </p>
            <div className="bg-gray-700 rounded-lg h-32 flex items-center justify-center relative">
              <Play className="size-8 text-white-100" />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs text-white">
                {post.videoUrls.length} video
                {post.videoUrls.length > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        )}
        {isQuotePost(post) && (
          <div>
            <blockquote className="border-l-4 border-blue-500 pl-4 mb-3 bg-black-200 py-3 rounded-r">
              <p className="text-white-100 text-sm italic line-clamp-2">
                "{post.quote}"
              </p>
              <cite className="text-gray-400 text-xs mt-2 block">
                — {post.source}
              </cite>
            </blockquote>
          </div>
        )}
        {isLinkPost(post) && (
          <div>
            <h4 className="text-white-100 font-medium text-sm mb-2">
              {post.title}
            </h4>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {post.description}
            </p>
            <div className="bg-gray-700 border border-gray-600 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="size-4 text-blue-400" />
                <p className="text-blue-400 text-xs font-medium">
                  {post.urls.length} link{post.urls.length > 1 ? "s" : ""}
                </p>
              </div>
              <p className="text-gray-400 text-xs truncate">{post.urls[0]}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-600">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
            <Heart className="size-4" />
            <span className="text-xs">{post.likesBy?.length || 0}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
            <MessageSquare className="size-4" />
            <span className="text-xs">{post.commentsCount || 0}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors">
            <Share className="size-4" />
            <span className="text-xs">{post.sharedBy?.length || 0}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-yellow-400 transition-colors">
            <Bookmark className="size-4" />
          </button>
          <button className="text-gray-400 hover:text-white-100 transition-colors">
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportedPostPreview;
