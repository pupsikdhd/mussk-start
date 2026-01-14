"use client";

import * as React from "react";
import { storage } from "@/src/storage/storage";
import Bookmark from "@/src/ui/Bookmark";
import AddBookmarkDialog from "@/src/ui/AddBookmarkDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark as BookmarkIcon } from "lucide-react";

export interface IBookmark {
    id: string;
    title: string;
    url: string;
}

const DEFAULT_BOOKMARKS: IBookmark[] = [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "youtube", title: "YouTube", url: "https://youtube.com" },
];

function normalizeUrl(raw: string) {
    const s = raw.trim();
    if (!s) return "";
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    return `https://${s}`;
}

export function BookmarksGrid() {
    const [bookmarks, setBookmarks] = React.useState<IBookmark[]>([]);

    React.useEffect(() => {
        const saved = storage.get<IBookmark[]>("bookmarks", []);
        if (!saved || saved.length === 0) {
            storage.set("bookmarks", DEFAULT_BOOKMARKS);
            setBookmarks(DEFAULT_BOOKMARKS);
        } else {
            setBookmarks(saved);
        }
    }, []);

    function persist(next: IBookmark[]) {
        setBookmarks(next);
        storage.set("bookmarks", next);
    }

    function addBookmark(input: { title: string; url: string }) {
        const title = input.title.trim();
        const url = normalizeUrl(input.url);
        if (!title || !url) return;

        const next: IBookmark[] = [{ id: crypto.randomUUID(), title, url }, ...bookmarks];
        persist(next);
    }

    function deleteBookmark(id: string) {
        persist(bookmarks.filter((b) => b.id !== id));
    }

    return (
        <Card
            className="
        relative overflow-hidden rounded-3xl
        border border-border/60
        bg-gradient-to-b from-background/90 to-background/50
        shadow-sm
      "
        >
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

            <CardHeader className="relative flex flex-row items-center justify-between gap-4 space-y-0 p-6">
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background/50 backdrop-blur">
                            <BookmarkIcon className="h-4 w-4" />
                        </div>
                        <CardTitle className="text-lg tracking-tight">Закладки</CardTitle>
                    </div>
                    <CardDescription className="mt-1">
                        Быстрый доступ к нужным сайтам
                    </CardDescription>
                </div>

                <div className="shrink-0">
                    <AddBookmarkDialog onAdd={addBookmark} />
                </div>
            </CardHeader>

            <CardContent className="relative p-6 pt-0">
                {bookmarks.length === 0 ? (
                    <div className="rounded-3xl border border-dashed bg-background/40 p-10 text-center">
                        <div className="mx-auto mb-2 grid h-11 w-11 place-items-center rounded-2xl bg-muted">
                            <BookmarkIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="font-medium">Пока нет закладок</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                            Нажми “Добавить”, чтобы создать первую
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {bookmarks.map((b) => (
                            <Bookmark key={b.id} bookmark={b} onDelete={() => deleteBookmark(b.id)} />
                        ))}
                    </div>
                )}

                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Всего: {bookmarks.length}</span>
                    <span className="hidden sm:inline">tip: hover → меню</span>
                </div>
            </CardContent>
        </Card>
    );
}
