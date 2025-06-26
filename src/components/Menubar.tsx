'use client'

import { useState } from 'react'

interface MenubarProps {
  onOpenModal: (modalType: string) => void;
  onChangeView: (directoryNum: number, viewType: 'info' | 'debug') => void;
  onDeleteDirectory: (num: number) => void;
  onSaveDirectory: (num: number) => void;
}

export const Menubar = ({ onOpenModal, onChangeView, onDeleteDirectory, onSaveDirectory }: MenubarProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  interface MenuItem {
    title: string;
    action?: () => void;
    submenu?: MenuItem[];
  }

  interface MainMenuItem {
    title: string;
    items: MenuItem[];
  }

  const menuItems: MainMenuItem[] = [
    {
      title: 'Файл',
      items: [
        {
          title: 'Загрузить',
          submenu: [
            { title: 'Справочник 1', action: () => onOpenModal('uploadModal1') },
            { title: 'Справочник 2', action: () => onOpenModal('uploadModal2') }
          ]
        },
        {
          title: 'Сохранить',
          submenu: [
            { title: 'Справочник 1', action: () => onSaveDirectory(1) },
            { title: 'Справочник 2', action: () => onSaveDirectory(2) }
          ]
        },
        {
          title: 'Удалить',
          submenu: [
            { title: 'Справочник 1', action: () => onDeleteDirectory(1) },
            { title: 'Справочник 2', action: () => onDeleteDirectory(2) }
          ]
        }
      ]
    },
    {
      title: 'Вид',
      items: [
        {
          title: 'Справочник 1',
          submenu: [
            { title: 'Информация по справочнику', action: () => onChangeView(1, 'info') },
            { title: 'Дебаг структура данных', action: () => onChangeView(1, 'debug') }
          ]
        },
        {
          title: 'Справочник 2',
          submenu: [
            { title: 'Информация по справочнику', action: () => onChangeView(2, 'info') },
            { title: 'Дебаг структура данных', action: () => onChangeView(2, 'debug') }
          ]
        }
      ]
    },
    {
      title: 'Отчет',
      items: [
        { title: 'Сформировать', action: () => onOpenModal('reportModal') }
      ]
    }
  ]

  return (
    <nav className="bg-gray-100 border-b border-gray-300 fixed top-0 w-full z-50 h-7">
      <div className="flex">
        {menuItems.map((menu, index) => (
          <div 
            key={index}
            className="relative h-7"
            onMouseEnter={() => setActiveMenu(menu.title)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <a 
              href="#" 
              className="block px-3 py-1.5 text-gray-800 text-xs border-r border-gray-300 h-7 leading-4 hover:bg-gray-200"
            >
              {menu.title}
            </a>
            
            {activeMenu === menu.title && (
              <div className="absolute top-full left-0 bg-white min-w-44 border border-gray-300 shadow-lg z-50">
                {menu.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="relative group">
                    <div 
                      className="block px-3 py-2 text-gray-800 text-xs border-b border-gray-300 last:border-b-0 cursor-pointer hover:bg-blue-50 relative"
                      onClick={item.action}
                    >
                      {item.title}
                    </div>
                    
                    {item.submenu && (
                      <div className="absolute top-0 left-full bg-white min-w-44 border border-gray-300 shadow-lg hidden group-hover:block z-50">
                        {item.submenu.map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className="block px-3 py-2 text-gray-800 text-xs border-b border-gray-300 last:border-b-0 cursor-pointer hover:bg-blue-50"
                            onClick={subItem.action}
                          >
                            {subItem.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        <div 
          className="relative h-7"
          onMouseEnter={() => setActiveMenu('about')}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <a 
            href="#" 
            className="block px-3 py-1.5 text-gray-800 text-xs h-7 leading-4 hover:bg-gray-200"
            onClick={() => onOpenModal('aboutModal')}
          >
            О программе
          </a>
        </div>
      </div>
    </nav>
  )
}