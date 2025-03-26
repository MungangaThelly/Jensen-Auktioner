import { useState } from "react";
import { createAuction } from "../services/AuktionService";

const CreateAuction = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [createdBy, setCreatedBy] = useState("");

const handleSubmit = async (event) => {
    event.preventDefault();
    const auctionData = { title, description, price, startDate, endDate, createdBy };

    try {
        const newAuction = await createAuction(auctionData);
        console.log("Auction created:", newAuction)

        setTitle("");
        setDescription("");
        setPrice("");
        setStartDate("");
        setEndDate("");
        setCreatedBy("");
    } catch (error) {
        console.error("Kunde inte skapa auktionen:", error);
    } 
}

return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div>
            <label>Created By:</label>
            <input type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} required />
        </div>
        <button type="submit">Create Auction</button>
    </form>
);
};


export default CreateAuction;