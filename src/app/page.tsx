import IndexPage from "@/components/IndexPage";
import {CardData} from "@/app/api/cards/route";

const Home = async () => {

    const blogsResponse = await fetch('http://localhost:3000/api/cards')
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
            return null;
        });

    const latesedResponse = await fetch('http://localhost:3000/api/articles/latested')
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
            return null;
        });

    const cardData = blogsResponse && blogsResponse.data as CardData[] || [];

    const latestData = latesedResponse && latesedResponse.data || [];

    return (
        <>
            <IndexPage cardData={cardData} latestData={latestData}/>
        </>
    );
};

export default Home;
