import React from 'react';
import CategoryPage from "@/components/CategoryPage";

export const dynamicParams = false

const Page = async ({params,}: {
    params: Promise<{ category: string }>
}) => {
    const category = (await params).category
    return <CategoryPage category={category}/>
}

export default Page;


export async function generateStaticParams() {
    // const posts = await fetch('https://.../posts').then((res) => res.json())
    // const posts = ['life', 'fashion']

    const allCategories = [
        {url: 'anime', value: '番剧'},
        {url: 'movie', value: '电影'},
        {url: 'domestic-animation', value: '国创'},
        {url: 'tv-drama', value: '电视剧'},
        {url: 'variety-show', value: '综艺'},
        {url: 'documentary', value: '纪录片'},
        {url: 'animation', value: '动画'},
        {url: 'game', value: '游戏'},
        {url: 'funny', value: '鬼畜'},
        {url: 'music', value: '音乐'},
        {url: 'dance', value: '舞蹈'},
        {url: 'film-review', value: '影视'},
        {url: 'entertainment', value: '娱乐'},
        {url: 'knowledge', value: '知识'},
        {url: 'technology', value: '科技'},
        {url: 'news', value: '资讯'},
        {url: 'food', value: '美食'},
        {url: 'life', value: '生活'},
        {url: 'cars', value: '汽车'},
        {url: 'fashion', value: '时尚'},
        {url: 'sports', value: '运动'},
        {url: 'animals', value: '动物圈'},
        {url: 'vlog', value: 'VLOG'},
        {url: 'funny', value: '搞笑'},
        {url: 'single-player-games', value: '单机游戏'},
        {url: 'virtual-up', value: '虚拟UP主'},
        {url: 'love', value: '公益'},
        {url: 'open-class', value: '公开课'},
    ];
    const posts = allCategories.map((category) => category.url)

    return posts.map((post) => ({
        category: post
    }))
}