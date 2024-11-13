import { string } from 'zod';

export const YoutubeLinkSchema = string().refine((link) => {
    const regex = /^https:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}$/;
    return regex.test(link);
}, {
    message: "Invalid YouTube URL format. It should be in the form https://youtu.be/{ID}",
});
