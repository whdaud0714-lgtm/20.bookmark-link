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
  isUpdatingBookmark: boolean;
  isDeletingBookmark: boolean;
  addBookmark: (input: NewBookmarkInput) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
  updateBookmark: (id: string, input: BookmarkUpdateInput) => Promise<void>;
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
  const [isUpdatingBookmark, setIsUpdatingBookmark] = useState(false);
  const [isDeletingBookmark, setIsDeletingBookmark] = useState(false);

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

  const deleteBookmark = async (id: string) => {
    if (isDeletingBookmark) return;
    setIsDeletingBookmark(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("links")
        .delete()
        .eq("id", Number(id));
      if (error) return;
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    } finally {
      setIsDeletingBookmark(false);
    }
  };

  const updateBookmark = async (id: string, input: BookmarkUpdateInput) => {
    if (isUpdatingBookmark) return;
    setIsUpdatingBookmark(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("links")
        .update({
          title: input.title,
          description: input.description,
          folder_id: Number(input.folderId),
        })
        .eq("id", Number(id));
      if (error) return;
      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark.id === id ? { ...bookmark, ...input } : bookmark
        )
      );
    } finally {
      setIsUpdatingBookmark(false);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isAddingBookmark,
        isUpdatingBookmark,
        isDeletingBookmark,
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
