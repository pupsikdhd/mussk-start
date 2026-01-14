"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { storage } from "@/src/storage/storage";
import { EngineSelect } from "@/src/ui/EngineSelect";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const engines: Record<string, (q: string) => string> = {
    google: (q) => `https://www.google.com/search?q=${q}`,
    duckduckgo: (q) => `https://duckduckgo.com/?q=${q}`,
    yandex: (q) => `https://yandex.ru/search/?text=${q}`,
};

export function SearchBar() {
    const [q, setQ] = useState("");

    function submit(e: React.FormEvent) {
        e.preventDefault();
        const engine = storage.get("search_engine", "google");
        const build = engines[engine] ?? engines.google;
        const trimmed = q.trim();
        if (!trimmed) return;
        location.href = build(encodeURIComponent(trimmed));
    }

    return (
        <form onSubmit={submit} className="w-full">
            <div
                className="
          relative overflow-hidden rounded-[28px]
          border border-border/60
          bg-gradient-to-b from-background/60 to-background/25
          backdrop-blur
          p-5 shadow-sm
        "
            >
                <div className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                autoFocus
                                placeholder="Поиск…"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                className="
                  h-12 rounded-2xl
                  bg-background/50
                  pl-11 text-base
                  border-border/60
                  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                "
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <EngineSelect />
                        <Button type="submit" className="h-12 rounded-2xl gap-2 px-5 shadow-sm">
                            <Search className="h-4 w-4" />
                            Искать
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}
