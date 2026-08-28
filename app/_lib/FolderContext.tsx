"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Folder } from "./types";

type FolderContextValue = {
  folders: Folder[];
  isAddingFolder: boolean;
  isUpdatingFolder: boolean;
  isDeletingFolder: boolean;
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  updateFolder: (id: string, name: string) => Promise<void>;
};

const FolderContext = createContext<FolderContextValue | null>(null);

type FolderProviderProps = {
  initialFolders: Folder[];
  children: ReactNode;
};

export default function FolderProvider({
  initialFolders,
  children,
}: FolderProviderProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [isUpdatingFolder, setIsUpdatingFolder] = useState(false);
  const [isDeletingFolder, setIsDeletingFolder] = useState(false);

  const addFolder = async (name: string) => {
    if (isAddingFolder) return;
    setIsAddingFolder(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("folders")
        .insert({ name })
        .select("id, name")
        .single();
      if (error || !data) return;
      setFolders((prev) => [
        ...prev,
        { id: String(data.id), name: data.name },
      ]);
    } finally {
      setIsAddingFolder(false);
    }
  };

  const deleteFolder = async (id: string) => {
    if (isDeletingFolder) return;
    setIsDeletingFolder(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("folders")
        .delete()
        .eq("id", Number(id));
      if (error) return;
      setFolders((prev) => prev.filter((folder) => folder.id !== id));
    } finally {
      setIsDeletingFolder(false);
    }
  };

  const updateFolder = async (id: string, name: string) => {
    if (isUpdatingFolder) return;
    setIsUpdatingFolder(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("folders")
        .update({ name })
        .eq("id", Number(id));
      if (error) return;
      setFolders((prev) =>
        prev.map((folder) => (folder.id === id ? { ...folder, name } : folder))
      );
    } finally {
      setIsUpdatingFolder(false);
    }
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        isAddingFolder,
        isUpdatingFolder,
        isDeletingFolder,
        addFolder,
        deleteFolder,
        updateFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
