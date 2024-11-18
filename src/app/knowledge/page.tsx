import React from 'react';


const Page = async ({params,}: {
    params: Promise<{ knowledge: string }>
}) => {
    const slug = (await params).knowledge
    return <div>My Post: {slug} this is knowledge</div>
}

export default Page;