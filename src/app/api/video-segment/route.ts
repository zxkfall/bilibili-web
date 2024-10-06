import fs from 'fs';
import path from 'path';

function nodeReadableToWebReadable(nodeReadable: fs.ReadStream) {
    return new ReadableStream({
        start(controller) {
            nodeReadable.on('data', chunk => controller.enqueue(chunk));
            nodeReadable.on('end', () => controller.close());
            nodeReadable.on('error', err => controller.error(err));
        },
        cancel() {
            nodeReadable.destroy();
        }
    });
}

export async function GET(req: Request) {
    const range = req.headers.get('range');

    if (!range) {
        return new Response('Range header is required', {status: 400});
    }

    // 视频文件路径
    const videoPath = path.resolve('./public/many-t.mp4');

    // 检查文件是否存在
    if (!fs.existsSync(videoPath)) {
        return new Response('Video not found', {status: 404});
    }

    const videoSize = fs.statSync(videoPath).size;

    console.log('Video size:', videoSize);

    // 解析 Range 请求头的开始和结束字节
    const CHUNK_SIZE = 20 * 1024 * 1024; // 每次返回 5MB 的数据

    // 使用正则表达式提取 Range 的开始和结束字节
    const rangeMatch = range.match(/bytes=(\d*)-(\d*)/);


    // 如果 range 不匹配或者为空，返回 416 错误
    if (!rangeMatch) {
        return new Response('Invalid range', {
            status: 416,
            headers: {'Content-Range': `bytes */${videoSize}`},
        });
    }

    const start = parseInt(rangeMatch[1], 10); // 提取起始字节
    let end = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : Math.min(start + CHUNK_SIZE - 1, videoSize - 1); // 提取结束字节或计算默认值

    // 如果 start 或 end 解析失败，或者 start 超过文件大小，返回 416 错误
    if (isNaN(start) || isNaN(end) || start >= videoSize) {
        return new Response('Requested range not satisfiable', {
            status: 416,
            headers: {'Content-Range': `bytes */${videoSize}`},
        });
    }

    // 确保结束字节不超过文件末尾
    end = Math.min(end, videoSize - 1);

    // 读取视频文件片段
    const contentLength = end - start + 1;
    const videoStream = fs.createReadStream(videoPath, {start, end});

    // 将 Node.js Readable 转换为 Web ReadableStream
    const webReadableStream = nodeReadableToWebReadable(videoStream);

    // 返回部分内容的响应头信息
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength.toString(),
        'Content-Type': 'video/mp4',
    };

    return new Response(webReadableStream, {
        status: 206, // Partial Content
        headers,
    });
}
