
const AuctionDetail = ({auction}) => {

    return(
    
    <div className='auction-card'>   
    <div className="auction-content">
            <img src={auction.image} />
            <h4>{auction.title}</h4>
            <p>{auction.description}</p>
            <h5>{auction.price}</h5>
            <h5>{auction.startDate}</h5>
            <h5>{auction.endDate}</h5>
            <h6>{auction.createdBy}</h6>
            </div>
    </div>)
}

export default AuctionDetail;