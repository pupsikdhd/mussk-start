'use client'
import {SearchBar} from "@/src/ui/SearchBar";
import {BookmarksGrid} from "@/src/ui/BookmarksGrid";

export default function Home() {
    return (
        <main className="min-h-screen">
            <div className="mx-auto max-w-5xl px-6 pt-20 pb-12">
                <div className="flex justify-end mb-6">
                </div>

                <div className="space-y-10">
                    <SearchBar />
                    <BookmarksGrid />
                </div>
            </div>
        </main>
    );
}
