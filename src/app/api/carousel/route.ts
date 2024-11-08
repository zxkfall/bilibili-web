export interface CarouselData {
    imageUrl: string,
    description: string,
    url: string,
}

const GET = (req: Request) => {
    const carouselData: CarouselData[] = [
        // 'https://picsum.photos/800/450?random=1',
        // 'https://picsum.photos/800/450?random=2',
        // 'https://picsum.photos/800/450?random=3',
        {
            imageUrl: 'https://fastly.picsum.photos/id/65/800/450.jpg?hmac=tvm-LAZkS7Xfpj0F3rCQ-uWg9mFXTH776aS3l26NB2U',
            description: 'helo this is a simple sentence to show some content 1',
            url: 'https://fastly.picsum.photos/id/65/800/450.jpg?hmac=tvm-LAZkS7Xfpj0F3rCQ-uWg9mFXTH776aS3l26NB2U'
        },
        {
            imageUrl: 'https://fastly.picsum.photos/id/512/800/450.jpg?hmac=fMPLkleOOsR5iFIi902WSHePre8kI9jjAZREEBD6kOc',
            description: 'helo this is a simple sentence to show some content 1',
            url: 'https://fastly.picsum.photos/id/512/800/450.jpg?hmac=fMPLkleOOsR5iFIi902WSHePre8kI9jjAZREEBD6kOc'
        },
        {
            imageUrl: 'https://fastly.picsum.photos/id/287/800/450.jpg?hmac=0azfBbMgGIqhetRKzS5NNWM_zEhR2P_8OeKXJWiYqhs',
            description: 'helo this is a simple sentence to show some content 2',
            url: 'https://fastly.picsum.photos/id/512/800/450.jpg?hmac=fMPLkleOOsR5iFIi902WSHePre8kI9jjAZREEBD6kOc'
        },
        {
            imageUrl: 'https://fastly.picsum.photos/id/877/800/450.jpg?hmac=tBVsMzsA_sCAJI8QAeyL4yPH_TuDJA-Nn-29aLQJ1KA',
            description: 'helo this is a simple sentence to show some content 3',
            url: 'https://fastly.picsum.photos/id/512/800/450.jpg?hmac=fMPLkleOOsR5iFIi902WSHePre8kI9jjAZREEBD6kOc'
        },
        {
            imageUrl: 'https://fastly.picsum.photos/id/915/800/450.jpg?hmac=8dNg_adxomxUf9xy_JiTRKoQR3jT8Az9iFe5sEYR4sc',
            description: 'helo this is a simple sentence to show some content 4',
            url: 'https://fastly.picsum.photos/id/512/800/450.jpg?hmac=fMPLkleOOsR5iFIi902WSHePre8kI9jjAZREEBD6kOc'
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