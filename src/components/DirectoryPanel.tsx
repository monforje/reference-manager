'use client'

import { Contact, Package, HashEntry, ViewType } from '@/types'
import { DataTable } from './DataTable'
import { HashTable } from './HashTable'
import { TreeCanvas } from './TreeCanvas'

interface DirectoryPanelProps {
  title: string;
  type: 'contacts' | 'packages';
  data: Contact[] | Package[];
  hashData?: HashEntry[];
  view: ViewType;
  searchPlaceholder: string;
  onAdd: () => void;
  onDelete: () => void;
  onSearch: (query: string) => void;
}

export const DirectoryPanel = ({ 
  title, 
  type, 
  data, 
  hashData, 
  view, 
  searchPlaceholder, 
  onAdd, 
  onDelete, 
  onSearch 
}: DirectoryPanelProps) => {
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      onSearch(target.value.trim());
    }
  };

  const handleSearchClick = () => {
    const input = document.querySelector(`input[placeholder="${searchPlaceholder}"]`) as HTMLInputElement;
    if (input) {
      onSearch(input.value.trim());
    }
  };

  return (
    <div className="h-1/2 border-b border-gray-300 last:border-b-0 flex flex-col bg-white">
      {/* Header */}
      <div className="bg-green-100 px-3 py-1.5 border-b border-gray-300 flex justify-between items-center h-8">
        <div className="font-semibold text-sm text-gray-800">
          {title}
        </div>
        <div className="flex gap-1">
          <button 
            className="bg-white border border-gray-300 px-2 py-1 cursor-pointer text-xs text-gray-800 h-5.5 leading-3 hover:bg-blue-500 hover:text-white"
            onClick={onAdd}
          >
            Добавить
          </button>
          <button 
            className="bg-white border border-gray-300 px-2 py-1 cursor-pointer text-xs text-gray-800 h-5.5 leading-3 hover:bg-blue-500 hover:text-white"
            onClick={onDelete}
          >
            Удалить
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white scrollbar-custom">
        {view === 'info' ? (
          type === 'packages' ? (
            <DataTable type={type} data={data} />
          ) : (
            <DataTable type={type} data={data} />
          )
        ) : view === 'debug' && type === 'contacts' && hashData ? (
          <HashTable data={hashData} />
        ) : view === 'debug' && type === 'packages' ? (
          <TreeCanvas />
        ) : (
          <DataTable type={type} data={data} />
        )}
      </div>

      {/* Search Section */}
      <div className="bg-gray-100 px-3 py-1.5 border-t border-gray-300 h-7">
        <div className="flex gap-2 items-center h-4">
          <span className="text-xs text-gray-500">Поиск:</span>
          <input 
            type="text" 
            className="flex-1 px-1.5 py-0.5 border border-gray-300 text-xs bg-white text-gray-800 h-5 focus:outline-none focus:border-blue-500"
            placeholder={searchPlaceholder}
            onKeyPress={handleSearchKeyPress}
          />
          <button 
            className="px-2 py-0.5 border border-gray-300 bg-white cursor-pointer text-xs text-gray-800 h-5 leading-3.5 hover:bg-blue-500 hover:text-white"
            onClick={handleSearchClick}
          >
            Найти
          </button>
        </div>
      </div>
    </div>
  );
};