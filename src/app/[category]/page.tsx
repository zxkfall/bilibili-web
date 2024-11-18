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
    const posts = ['life', 'fashion']

    return posts.map((post) => ({
        category: post
    }))
}