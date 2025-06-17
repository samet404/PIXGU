export const getBaseUrl = () => {
    if (typeof window !== "undefined") return window.location.origin;
    if (process.env.BASE_URL) return `https://${process.env.BASE_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
}
