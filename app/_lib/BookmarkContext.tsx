"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
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
  const currentUserIdRef = useRef<string | null | undefined>(undefined);

  // 로그인한 사용자 계정이 바뀌면(로그아웃/다른 계정 로그인 등) 북마크 목록을 다시 불러온다.
  useEffect(() => {
    const supabase = createClient();

    const fetchBookmarksForUser = async (userId: string) => {
      const { data, error } = await supabase
        .from("links")
        .select("id, url, title, description, thumbnail_url, folder_id")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) return;
      setBookmarks(
        (data ?? []).map((link) => ({
          id: String(link.id),
          url: link.url,
          title: link.title ?? "",
          description: link.description ?? "",
          thumbnail: link.thumbnail_url,
          folderId: link.folder_id == null ? "" : String(link.folder_id),
        }))
      );
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUserId = session?.user?.id ?? null;

      if (currentUserIdRef.current === undefined) {
        // 최초 콜백은 서버에서 이미 불러온 초기 데이터에 대응하므로 건너뛴다.
        currentUserIdRef.current = nextUserId;
        return;
      }

      if (nextUserId === currentUserIdRef.current) return;
      currentUserIdRef.current = nextUserId;

      if (!nextUserId) {
        setBookmarks([]);
        return;
      }
      void fetchBookmarksForUser(nextUserId);
    });

    return () => subscription.unsubscribe();
  }, []);

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
