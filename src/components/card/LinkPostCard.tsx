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
    <div className={`w-full flex flex-col gap-4 text-white-100 ${className}`}>
      {post.description && <p className="text-lg">{post.description}</p>}

      <a
        href={mainUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg border-gray-600 border-2 overflow-hidden hover:border-cyan-400 transition-colors"
      >
        <div
          className="aspect-video flex items-center justify-center bg-black-100"
          style={{
            backgroundImage: previewMain?.image
              ? `url(${previewMain.image})`
              : undefined,
          }}
        >
          {!previewMain?.image && (
            <div className="text-center text-gray-400">
              <ExternalLink className="size-12 mx-auto mb-2 " />
              <p className="text-sm ">
                {loading ? "Loading preview..." : "Preview unavailable"}
              </p>
            </div>
          )}
        </div>
        <div
          className="p-4"
          style={{ backgroundColor: "var(--color-black-300)" }}
        >
          <h3
            className="font-semibold mb-2"
            style={{ color: "var(--color-white-100)" }}
          >
            {previewMain?.title || post.title || "Link Title"}
          </h3>
          <p
            className="text-sm mb-2"
            style={{ color: "var(--color-gray-400)" }}
          >
            {previewMain?.description || "No description available."}
          </p>
          <div className="flex items-center gap-2">
            <ExternalLink
              className="size-3"
              style={{ color: "var(--color-cyan-100)" }}
            />
            <span
              className="text-xs"
              style={{ color: "var(--color-cyan-100)" }}
            >
              {new URL(mainUrl).hostname}
            </span>
          </div>
        </div>
      </a>

      {otherUrls.length > 0 && (
        <div className="space-y-4">
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-gray-400)" }}
          >
            Additional Links:
          </p>
          {otherUrls.map((url, index) => {
            const preview = previewsOther[index];
            return (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-gray-700 hover:border-cyan-400 transition-colors"
              >
                <div
                  className="aspect-[3/1] flex items-center justify-center bg-cover bg-center"
                  style={{
                    backgroundColor: "var(--color-black-100)",
                    backgroundImage: preview?.image
                      ? `url(${preview.image})`
                      : undefined,
                  }}
                >
                  {!preview?.image && (
                    <div className="text-center p-4">
                      <ExternalLink
                        className="size-6 mx-auto mb-1"
                        style={{ color: "var(--color-gray-400)" }}
                      />
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-gray-400)" }}
                      >
                        Preview unavailable
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className="p-3"
                  style={{ backgroundColor: "var(--color-black-300)" }}
                >
                  <h4
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-white-100)" }}
                  >
                    {preview?.title || new URL(url).hostname}
                  </h4>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-gray-400)" }}
                  >
                    {preview?.description || "No description available"}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LinkPostCard;
