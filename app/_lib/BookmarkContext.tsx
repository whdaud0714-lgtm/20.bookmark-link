"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Bookmark } from "./types";

type NewBookmarkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  folderId: string;
};

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (input: NewBookmarkInput) => void;
  deleteBookmark: (id: string) => void;
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

  const addBookmark = (input: NewBookmarkInput) => {
    const newBookmark: Bookmark = {
      id: `bookmark-${Date.now()}`,
      ...input,
    };
    setBookmarks((prev) => [newBookmark, ...prev]);
  };

  const deleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, deleteBookmark }}>
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
