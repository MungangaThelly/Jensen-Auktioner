import { useState } from "react";
import { createAuction } from "../services/api";
import './CreateAuction.module.css';

const CreateAuction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Här kontrollerar vi att alla fält är ifyllda
    if (!title || !description || !price || !startDate || !endDate || !createdBy) {
      setError("Alla fält måste fyllas i.");
      return;
    }

    const auctionData = { title, description, price, startDate, endDate, createdBy };

    try {
      const newAuction = await createAuction(auctionData);
      console.log("Auction created:", newAuction);

      // Rensa formulärfälten efter skapande
      setTitle("");
      setDescription("");
      setPrice("");
      setStartDate("");
      setEndDate("");
      setCreatedBy("");
      setError(""); // Rensa eventuella felmeddelanden
    } catch (error) {
      console.error("Kunde inte skapa auktionen:", error);
      setError("Det gick inte att skapa auktionen. Försök igen.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>} // här visar eventuellt felmeddelande 

      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          required
          type="text"
          placeholder="Ange auktionens titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          required
          placeholder="Beskriv auktionen"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          required
          type="number"
          placeholder="Ange startpris"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          id="startDate"
          required
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          id="endDate"
          required
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="createdBy">Created By:</label>
        <input
          id="createdBy"
          required
          type="text"
          placeholder="Ange skapare"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        />
      </div>

      <button type="submit">Create Auction</button>
    </form>
  );
};

export default CreateAuction;
