"use client"

import { useState } from "react";

interface NewItemProps {
  onAddItem: (item: { name: string; quantity: number; category: string }) => void;
}

export default function NewItem({ onAddItem }: NewItemProps) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");
    const [nameTouched, setNameTouched] = useState(false);
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        if (!name || name.length < 2) {
            alert("Name must be at least 2 characters long");
            return;
        }

        const item = {
            name: name,
            quantity: quantity,
            category: category
        };
        
        onAddItem(item);
        
        setName("");
        setQuantity(1);
        setCategory("produce");
    }
    
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Item</h1>
            
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name: </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${name === "" && nameTouched ? "border-2 border-red-500" : "border-gray-300"}`}
                    placeholder="Enter item name"
                />
                {name === "" && nameTouched && (
                    <p className="text-red-400 text-sm mt-1">Name is required</p >
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity: </label>
                <input
                    type="number"
                    id="quantity"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category: </label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="produce">Produce</option>
                    <option value="dairy">Dairy</option>
                    <option value="bakery">Bakery</option>
                    <option value="meat">Meat</option>
                    <option value="frozen foods">Frozen Foods</option>
                    <option value="canned goods">Canned Goods</option>
                    <option value="dry goods">Dry Goods</option>
                    <option value="beverages">Beverages</option>
                    <option value="snacks">Snacks</option>
                    <option value="household">Household</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <button 
                type="submit" disabled={!name}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
            >
                Add Item
            </button>
        </form>
    );
}