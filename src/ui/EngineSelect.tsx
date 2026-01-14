"use client";

import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { storage } from "@/src/storage/storage";

const ENGINES = [
    { value: "google", label: "Google" },
    { value: "duckduckgo", label: "DuckDuckGo" },
    { value: "yandex", label: "Говницо" },
];

export function EngineSelect() {
    const [engine, setEngine] = React.useState<string>(() =>
        storage.get("search_engine", "google")
    );

    function onChange(value: string) {
        setEngine(value);
        storage.set("search_engine", value);
    }

    return (
        <Select value={engine} onValueChange={onChange}>
            <SelectTrigger className="h-12 w-[190px] rounded-2xl bg-background/50 border-border/60">
                <SelectValue />
            </SelectTrigger>

            <SelectContent className="rounded-2xl">
                <SelectGroup>
                    <SelectLabel>Поисковики</SelectLabel>
                    {ENGINES.map((e) => (
                        <SelectItem key={e.value} value={e.value}>
                            {e.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
