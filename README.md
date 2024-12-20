This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


helps:
https://www.bento4.com/documentation/mp4fragment/
https://www.bento4.com/documentation/mp4info/

## HLS transfer
```bash
ffmpeg -re -i example.mp4 -c copy -f hls -hls_list_size 0 -bsf:v h264_mp4toannexb output.m3u8
```

hls 由apple 主导的协议，所以Chrome不支持，可以通过hls.js，使用MSE进行转换

## DASH trasnfer

https://developer.mozilla.org/zh-CN/docs/Web/Media/DASH_Adaptive_Streaming_for_HTML_5_Video

```bash
ffmpeg -i frag_bunny.mp4 \                                                                      
  -map 0:v:0 -map 0:a:0 \
  -c:v libx264 -b:v 1000k -c:a aac -b:a 128k \
  -f dash output-dash.mpd
```
