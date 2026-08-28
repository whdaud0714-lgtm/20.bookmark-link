"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Bookmark } from "./types";

type NewBookmarkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  folderId: string;
};

type BookmarkUpdateInput = {
  title: string;
  description: string;
  folderId: string;
};

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  isAddingBookmark: boolean;
  addBookmark: (input: NewBookmarkInput) => Promise<void>;
  deleteBookmark: (id: string) => void;
  updateBookmark: (id: string, input: BookmarkUpdateInput) => void;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

type BookmarkProviderProps = {
  initialBookmarks: Bookmark[];
  children: ReactNode;
};

export default function BookmarkProvider({
  initialBookmarks,
  children,
}: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);

  const addBookmark = async (input: NewBookmarkInput) => {
    if (isAddingBookmark) return;
    setIsAddingBookmark(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("links")
        .insert({
          url: input.url,
          title: input.title,
          description: input.description,
          thumbnail_url: input.thumbnail ?? null,
          folder_id: Number(input.folderId),
        })
        .select("id, url, title, description, thumbnail_url, folder_id")
        .single();
      if (error || !data) return;
      const newBookmark: Bookmark = {
        id: String(data.id),
        url: data.url,
        title: data.title ?? "",
        description: data.description ?? "",
        thumbnail: data.thumbnail_url,
        folderId: data.folder_id == null ? "" : String(data.folder_id),
      };
      setBookmarks((prev) => [newBookmark, ...prev]);
    } finally {
      setIsAddingBookmark(false);
    }
  };

  const deleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  const updateBookmark = (id: string, input: BookmarkUpdateInput) => {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...input } : bookmark
      )
    );
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isAddingBookmark,
        addBookmark,
        deleteBookmark,
        updateBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
