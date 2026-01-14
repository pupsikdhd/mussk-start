"use client";

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {storage} from "@/src/storage/storage";


export function AiSheet({ children }: { children: React.ReactNode }) {
    const [password, setPassword] = useState(
        storage.get("ai_password", "")
    );
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    function savePassword(p: string) {
        setPassword(p);
        storage.set("ai_password", p);
    }

    async function ask() {
        setLoading(true);
        setAnswer("");

        const res = await fetch("/api/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-password": password
            },
            body: JSON.stringify({ question })
        });

        const data = await res.json();
        setAnswer(data.answer ?? data.error ?? "Ошибка");
        setLoading(false);
    }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>AI</SheetTitle>
                </SheetHeader>

                {!password ? (
                    <div className="mt-4 space-y-2">
                        <Input
                            placeholder="Пароль API"
                            type="password"
                            onChange={e => savePassword(e.target.value)}
                        />
                    </div>
                ) : (
                    <div className="mt-4 space-y-3">
                        <Input
                            placeholder="Спроси что-нибудь…"
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                        />
                        <Button onClick={ask} disabled={loading}>
                            {loading ? "Думаю…" : "Спросить"}
                        </Button>
                        {answer && (
                            <div className="text-sm whitespace-pre-wrap">
                                {answer}
                            </div>
                        )}
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
