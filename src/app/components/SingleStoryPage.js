"use client";

import { useEffect, useState } from "react";

import { updateRoute } from "../lib/routeHelpers";
import PostContent from "./PostContent";
import StickyHeader from "./StickyHeader";
import PhotoPrompt from "./PhotoPrompt";
import UnstickyHeader from "./UnstickyHeader";

import * as storageHelpers from "../lib/storageHelpers";

function Button(label, enabled, action) {
  const classList = [
    "border-2",
    "px-4",
    "py-2",
    "font-black",
    "text-sm",
    "rounded-full",
    "w-48",
    "text-center",
  ];

  if (!enabled) {
    classList.push(...["bg-gray-100/70", "text-gray-400", "border-gray-300"]);
  } else {
    classList.push(...["bg-amber-300", "text-gray-800", "border-gray-900"]);
  }

  return (
    <button
      className={classList.join(" ")}
      onClick={enabled ? action : undefined}
    >
      {label}
    </button>
  );
}

export default function SingleStoryPage({
  contentArray,
  paneOpen,
  setPaneOpen,
  scrollRef,
  contentIndex,
  setContentIndex,
}) {
  if (!contentArray) {
    return "Loading...";
  }

  console.log(contentIndex);
  const post = contentArray[contentIndex];
  const slug = post.slug;

  const hasPrevious = contentIndex > 0;
  const hasNext = contentIndex < contentArray.length - 1;

  function goToPrevious() {
    hasPrevious && setContentIndex(contentIndex - 1);
  }
  function goToNext() {
    hasNext && setContentIndex(contentIndex + 1);
  }

  return (
    <div key={contentIndex} className="article" id={slug} articleslug={slug}>
      <StickyHeader
        post={post}
        contentSlug={slug}
        isAdded={true}
        scrollRef={scrollRef}
        paneOpen={paneOpen}
        setPaneOpen={setPaneOpen}
      />
      <UnstickyHeader post={post} />
      <PostContent post={post} />
      <div className="w-full p-4">
        <PhotoPrompt
          mdx={post}
          visited={storageHelpers.hasLocationBeenVisited(slug)}
        />
      </div>

      <hr className="border-amber-500"></hr>
      <div className="flex justify-between py-4 bg-amber-100">
        {Button("PREVIOUS STORY", hasPrevious, goToPrevious)}
        {Button("NEXT STORY", hasNext, goToNext)}
      </div>
    </div>
  );
}
