"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

function isProbablyUrl(value: string) {
    const v = value.trim();
    if (!v) return false;
    return (
        v.startsWith("http://") ||
        v.startsWith("https://") ||
        /^[a-z0-9.-]+\.[a-z]{2,}([/:].*)?$/i.test(v)
    );
}

export default function AddBookmarkDialog({
                                              onAdd,
                                          }: {
    onAdd: (b: { title: string; url: string }) => void;
}) {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [url, setUrl] = React.useState("");

    const canSave = title.trim().length > 0 && isProbablyUrl(url);

    function submit(e?: React.FormEvent) {
        e?.preventDefault();
        if (!canSave) return;

        onAdd({ title, url });
        setTitle("");
        setUrl("");
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className="rounded-2xl gap-2 px-4 shadow-sm"
                >
                    <Plus className="h-4 w-4" />
                    Добавить
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-3xl">
                <DialogHeader>
                    <DialogTitle>Новая закладка</DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-3">
                    <Input
                        placeholder="Название (например, Grafana)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="rounded-2xl"
                    />
                    <Input
                        placeholder="URL (например, https://grafana.local)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="rounded-2xl"
                    />

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button type="submit" disabled={!canSave} className="rounded-2xl">
                            Сохранить
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
