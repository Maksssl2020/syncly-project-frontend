import type { LinkPost } from "../../types/post.ts";
import { ExternalLink } from "lucide-react";
import useFetchLinkPreviewMutation from "../../hooks/mutations/useFetchLinkPreviewMutation.ts";
import { useEffect, useState } from "react";
import type { LinkPreviewResponse } from "../../types/linkPreview.ts";

type LinkPostCardProps = {
  post: LinkPost;
  className?: string;
};

const LinkPostCard = ({ post, className }: LinkPostCardProps) => {
  const { getLinkPreview } = useFetchLinkPreviewMutation();
  const mainUrl = post.urls[0];
  const otherUrls = post.urls.slice(1);

  const [previewMain, setPreviewMain] = useState<LinkPreviewResponse | null>(
    null,
  );
  const [previewsOther, setPreviewsOther] = useState<
    (LinkPreviewResponse | null)[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreviews = async () => {
      setLoading(true);

      try {
        const previews = await Promise.all(
          post.urls.map((url) => getLinkPreview(url).catch(() => null)),
        );
        setPreviewMain(previews[0]);
        setPreviewsOther(previews.slice(1));
      } catch (e) {
        console.error("Failed to load previews", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviews();
  }, [getLinkPreview, post.urls]);

  return (
    <div className={`w-full flex flex-col gap-4 text-gray-100 ${className}`}>
      {post.description && (
        <p className="text-lg text-white-100">{post.description}</p>
      )}

      <a
        href={mainUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg border-gray-600 border-2 overflow-hidden hover:border-cyan-400 transition-colors"
      >
        <div
          className="aspect-video flex items-center justify-center bg-gray-900 bg-cover bg-center"
          style={{
            backgroundImage: previewMain?.image
              ? `url(${previewMain.image})`
              : undefined,
          }}
        >
          {!previewMain?.image && (
            <div className="text-center text-gray-400">
              <ExternalLink className="size-12 mx-auto mb-2" />
              <p className="text-sm">
                {loading ? "Loading preview..." : "Preview unavailable"}
              </p>
            </div>
          )}
        </div>
        <div className="p-4 bg-gray-800">
          <h3 className="font-semibold mb-2 text-gray-100">
            {previewMain?.title || post.title || "Link Title"}
          </h3>
          <p className="text-sm mb-2 text-gray-400">
            {previewMain?.description || "No description available."}
          </p>
          <div className="flex items-center gap-2">
            <ExternalLink className="size-3 text-cyan-400" />
            <span className="text-xs text-cyan-400">
              {new URL(mainUrl).hostname}
            </span>
          </div>
        </div>
      </a>

      {otherUrls.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-400">Additional Links:</p>
          <div
            className={`grid gap-3 ${otherUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
          >
            {otherUrls.map((url, index) => {
              const preview = previewsOther[index];
              return (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-lg border border-gray-700 bg-gray-800/50 p-3 hover:border-cyan-400 hover:bg-gray-800 transition-all"
                >
                  <div
                    className="w-16 h-16 flex-shrink-0 rounded-md flex items-center justify-center bg-cover bg-center bg-gray-900"
                    style={{
                      backgroundImage: preview?.image
                        ? `url(${preview.image})`
                        : undefined,
                    }}
                  >
                    {!preview?.image && (
                      <ExternalLink className="size-5 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-sm font-semibold text-gray-100 truncate group-hover:text-cyan-400 transition-colors">
                      {preview?.title || new URL(url).hostname}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                      {preview?.description || "No description available"}
                    </p>
                    <span className="text-xs text-cyan-400/70 mt-1 truncate">
                      {new URL(url).hostname}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkPostCard;
