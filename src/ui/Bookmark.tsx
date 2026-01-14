"use client";

import { IBookmark } from "@/src/ui/BookmarksGrid";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, ExternalLink } from "lucide-react";

interface Props {
    bookmark: IBookmark;
    onDelete: () => void;
}

function favicon(url: string) {
    try {
        const u = new URL(url);
        return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=64`;
    } catch {
        return "";
    }
}

export default function Bookmark({ bookmark, onDelete }: Props) {
    const icon = favicon(bookmark.url);

    return (
        <div
            className="
        cursor-pointer
        group relative overflow-hidden rounded-3xl
        border border-border/60
        bg-background/40 backdrop-blur
        p-4 shadow-sm
        transition-all
        active:translate-y-0
      "
        >
            {/* легкий “glow” при hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
            </div>

            <div className="relative flex items-start justify-between gap-3">
                <a
                    href={bookmark.url}
                    className="min-w-0 flex-1 rounded-2xl outline-none ring-offset-background transition
                 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                h-11 w-11 shrink-0 rounded-2xl
                border border-border/60
                bg-gradient-to-b from-muted/60 to-muted/20
                flex items-center justify-center overflow-hidden
              "
                        >
                            {icon ? (
                                <img src={icon} alt="" className="h-6 w-6" />
                            ) : (
                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            )}
                        </div>

                        <div className="min-w-0">
                            <div className="font-medium truncate leading-5">{bookmark.title}</div>
                            <div className="mt-0.5 text-xs text-muted-foreground truncate">
                                {bookmark.url.replace(/^https?:\/\//, "")}
                            </div>
                        </div>
                    </div>
                </a>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="
                shrink-0 rounded-2xl
                opacity-0 group-hover:opacity-100
                transition-opacity
              "
                        >
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="rounded-2xl">
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={onDelete}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Удалить
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
