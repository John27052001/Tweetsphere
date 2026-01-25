import React from "react";
import type { Tweet } from "../api";

type Props = {
  tweet: Tweet;
  onLike?: (id:number)=>void;
  liking?: boolean;
};

export default function TweetCard({ tweet, onLike, liking }: Props) {
  return (
    <div className="glass p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-sm font-semibold">
          {tweet.author?.username?.charAt(0)?.toUpperCase() ?? "U"}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">@{tweet.author?.username}</div>
              <div className="text-xs text-white/60">{new Date(tweet.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-sm text-white/60">{tweet.likesCount ?? 0} ❤️</div>
          </div>

          <div className="mt-3 text-white/90">{tweet.content}</div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={()=>onLike && onLike(tweet.id)}
              className="btn btn-ghost small"
              disabled={liking}
            >
              {liking ? "..." : "Like"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
