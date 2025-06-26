'use client'

import { Contact, Package } from '@/types'

interface DataTableProps {
  type: 'contacts' | 'packages';
  data: Contact[] | Package[];
}

export const DataTable = ({ type, data }: DataTableProps) => {
  if (type === 'contacts') {
    const contacts = data as Contact[];
    return (
      <div className="p-2">
        <table className="w-full border-collapse text-xs bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
                Телефон
              </th>
              <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
                ФИО
              </th>
              <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
                Адрес
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr 
                key={index} 
                className={`hover:bg-blue-50 ${index % 2 === 0 ? '' : 'bg-gray-50'}`}
              >
                <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                  {contact.phone}
                </td>
                <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                  {contact.name}
                </td>
                <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                  {contact.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const packages = data as Package[];
  return (
    <div className="p-2">
      <table className="w-full border-collapse text-xs bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
              Телефон отправителя
            </th>
            <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
              Телефон получателя
            </th>
            <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
              Вес посылки
            </th>
            <th className="p-1.5 px-2 text-left border border-gray-300 bg-blue-50 text-gray-800 font-semibold">
              Дата отправки
            </th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr 
              key={index} 
              className={`hover:bg-blue-50 ${index % 2 === 0 ? '' : 'bg-gray-50'}`}
            >
              <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                {pkg.senderPhone}
              </td>
              <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                {pkg.receiverPhone}
              </td>
              <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                {pkg.weight}
              </td>
              <td className="p-1.5 px-2 border border-gray-300 text-gray-800">
                {pkg.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};