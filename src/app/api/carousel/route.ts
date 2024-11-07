export interface CarouselData {
    url: string,
    description: string,
}

const GET = (req: Request) => {
    const carouselData: CarouselData[] = [
        // 'https://picsum.photos/800/450?random=1',
        // 'https://picsum.photos/800/450?random=2',
        // 'https://picsum.photos/800/450?random=3',
        {
            url: 'https://fastly.picsum.photos/id/512/800/450.jpg?hmac=fMPLkleOOsR5iFIi902WSHePre8kI9jjAZREEBD6kOc',
            description: 'helo this is a simple sentence to show some content 1'
        },
        {
            url: 'https://fastly.picsum.photos/id/287/800/450.jpg?hmac=0azfBbMgGIqhetRKzS5NNWM_zEhR2P_8OeKXJWiYqhs',
            description: 'helo this is a simple sentence to show some content 2'
        },
        {
            url: 'https://fastly.picsum.photos/id/877/800/450.jpg?hmac=tBVsMzsA_sCAJI8QAeyL4yPH_TuDJA-Nn-29aLQJ1KA',
            description: 'helo this is a simple sentence to show some content 3'
        },
        {
            url: 'https://fastly.picsum.photos/id/915/800/450.jpg?hmac=8dNg_adxomxUf9xy_JiTRKoQR3jT8Az9iFe5sEYR4sc',
            description: 'helo this is a simple sentence to show some content 4'
        },
    ];
    return new Response(
        JSON.stringify({
            data: carouselData,
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )
}

export {GET};