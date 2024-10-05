import path from "node:path";
import * as fs from "node:fs";

export async function GET(req: Request) {
    // const videoPath = path.resolve('./public/frag_bunny.mp4');
    const videoPath = path.resolve('./public/example-fragment.mp4');

    if (!fs.existsSync(videoPath)) {
        return new Response(JSON.stringify({error: 'Video segment not found'}), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const videoFile = fs.readFileSync(videoPath);
    return new Response(videoFile, {
        status: 200,
        headers: {
            'Content-Type': 'video/mp4',
        },
    });
}