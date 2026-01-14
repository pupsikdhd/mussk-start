export const storage = {
    get<T>(key: string, fallback: T): T {
        if (typeof window === "undefined") return fallback;
        try {
            return JSON.parse(localStorage.getItem(key) ?? "") ?? fallback;
        } catch {
            return fallback;
        }
    },
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
