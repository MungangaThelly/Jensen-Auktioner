import AuctionDetail from "../pages/AuctionDetail";


const AuctionList = ({ AuctionList = [] }) => {

    //Loopa igenom listan med produkter från sökningen. Skicka varje produkt till 
    //ProductCard komponenten som ritar upp kortet
    const list = AuctionList.map(auction => {

        return (<AuctionDetail key={auction.id} auction={auction} />)
    });

    //Skickar tillbaka hela listan med kort
    return (<>{list}</>)

}

export default AuctionList;