export interface CardData {
    img: string;
    tag: string;
    title: string;
    description: string;
    authors: Author[];
}

export interface Author {
    name: string;
    avatar: string;
}

const GET = (req: Request) => {
    const allData: CardData[] = [];

    for (let i = 0; i < 100; i++) {
        allData.push({
            img: `https://picsum.photos/800/450?random=${i}`,
            tag: 'Product',
            title: 'Maximizing efficiency with our latest product updates'.split(' ').sort(() => Math.random() - 0.5).join(' '),
            description:
                'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.'
                    .split(' ').sort(() => Math.random() - 0.5).join(' '),
            authors: [{name: 'Travis Howard', avatar: `/static/images/avatar/${i % 5}.jpg`}],
        })
    }
    // TODO: maybe can combined with display: hidden to implement lazy load

    return new Response(
        JSON.stringify({
            data: allData,
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )
}

export {GET};