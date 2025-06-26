'use client'

import { HashEntry } from '@/types'

interface HashTableProps {
  data: HashEntry[];
}

export const HashTable = ({ data }: HashTableProps) => {
  return (
    <div className="p-2">
      <table className="w-full border-collapse text-xs bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
              Индекс
            </th>
            <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
              Ключ (Телефон)
            </th>
            <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
              Значение (ФИО и Адрес)
            </th>
            <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
              Хеш
            </th>
            <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
              Статус
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr 
              key={index} 
              className={`hover:bg-blue-50 ${index % 2 === 0 ? '' : 'bg-gray-50'}`}
            >
              <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                {entry.index}
              </td>
              <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                {entry.key}
              </td>
              <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                {entry.value}
              </td>
              <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                {entry.hash}
              </td>
              <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                <span className={entry.status === 'occupied' ? 'text-green-600 font-medium' : 'text-gray-500'}>
                  {entry.status === 'occupied' ? 'Занято' : 'Пусто'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};