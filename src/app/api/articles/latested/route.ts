import {Author} from "@/app/api/cards/route";

export interface ArticleInfo {
    tag: string;
    title: string;
    description: string;
    authors: Author[];
}

const GET = async (req: Request) => {
    const articleInfo: ArticleInfo[] = [
        {
            tag: 'Engineering',
            title: 'The future of AI in software engineering',
            description:
                'Artificial intelligence is revolutionizing software engineering. Explore how AI-driven tools are enhancing development processes and improving software quality.',
            authors: [
                {name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg'},
                {name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg'},
            ] as Author[],
        },
        {
            tag: 'Product',
            title: 'Driving growth with user-centric product design',
            description:
                'Our user-centric product design approach is driving significant growth. Learn about the strategies we employ to create products that resonate with users.',
            authors: [{name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg'}] as Author[],
        },
        {
            tag: 'Design',
            title: 'Embracing minimalism in modern design',
            description:
                'Minimalism is a key trend in modern design. Discover how our design team incorporates minimalist principles to create clean and impactful user experiences.',
            authors: [{name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg'}] as Author[],
        },
        {
            tag: 'Company',
            title: 'Cultivating a culture of innovation',
            description:
                'Innovation is at the heart of our company culture. Learn about the initiatives we have in place to foster creativity and drive groundbreaking solutions.',
            authors: [{name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg'}] as Author[],
        },
        {
            tag: 'Engineering',
            title: 'Advancing cybersecurity with next-gen solutions',
            description:
                'Our next-generation cybersecurity solutions are setting new standards in the industry. Discover how we protect our clients from evolving cyber threats.',
            authors: [
                {name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg'},
                {name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg'},
            ] as Author[],
        },
        {
            tag: 'Product',
            title: 'Enhancing customer experience through innovation',
            description:
                'Our innovative approaches are enhancing customer experience. Learn about the new features and improvements that are delighting our users.',
            authors: [{name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg'}] as Author[],
        },
        {
            tag: 'Engineering',
            title: 'Pioneering sustainable engineering solutions',
            description:
                "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
            authors: [
                {name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg'},
                {name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg'},
            ] as Author[],
        },
        {
            tag: 'Product',
            title: 'Maximizing efficiency with our latest product updates',
            description:
                'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
            authors: [{name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg'}] as Author[],
        },
        {
            tag: 'Design',
            title: 'Designing for the future: trends and insights',
            description:
                'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
            authors: [{name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg'}] as Author[],
        },
        {
            tag: 'Company',
            title: "Our company's journey: milestones and achievements",
            description:
                "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
            authors: [{name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg'}] as Author[],
        },
    ];

    return new Response(JSON.stringify({
        data: articleInfo,
    }), {
        headers: {
            'content-type': 'application/json; charset=UTF-8',
        },
    });
}

export {GET}