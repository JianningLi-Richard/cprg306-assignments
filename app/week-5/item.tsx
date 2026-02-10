import React from 'react';

interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 border-blue-500">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">Category: {category}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-blue-600">Qty: {quantity}</p>
      </div>
    </li>
  );
}
