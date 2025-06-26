'use client'

import { useState } from 'react'
import { Contact, Package, HashEntry, ViewType } from '@/types'
import { Menubar } from '@/components/Menubar'
import { DirectoryPanel } from '@/components/DirectoryPanel'
import { Modal } from '@/components/Modal'
import { DropZone } from '@/components/DropZone'
import { Notification } from '@/components/Notification'
import { useNotification } from '@/hooks/useNotification'

export default function Home() {
  const { notifications, showNotification, removeNotification } = useNotification()
  
  // Modal states
  const [modals, setModals] = useState({
    uploadModal1: false,
    uploadModal2: false,
    insertModal1: false,
    insertModal2: false,
    deleteModal1: false,
    deleteModal2: false,
    reportModal: false,
    aboutModal: false
  })

  // View states
  const [view1, setView1] = useState<ViewType>('info')
  const [view2, setView2] = useState<ViewType>('info')

  // Form states
  const [forms, setForms] = useState({
    insertContact: { phone: '', name: '', address: '' },
    insertPackage: { senderPhone: '', receiverPhone: '', weight: '', date: '' },
    deleteContact: { phone: '' },
    deletePackage: { phone: '' },
    report: { address: '', phone: '', dateFrom: '', dateTo: '' }
  })

  // Data
  const [contacts] = useState<Contact[]>([
    { phone: '+7 (123) 456-78-90', name: 'Иванов Иван Иванович', address: 'ул. Пушкина, д. 1' },
    { phone: '+7 (987) 654-32-10', name: 'Петров Петр Петрович', address: 'ул. Лермонтова, д. 5' },
    { phone: '+7 (555) 111-22-33', name: 'Сидорова Анна Петровна', address: 'пр. Мира, д. 15, кв. 42' }
  ])

  const [packages] = useState<Package[]>([
    { senderPhone: '+7 (123) 456-78-90', receiverPhone: '+7 (987) 654-32-10', weight: '2.5 кг', date: '2025-06-20' },
    { senderPhone: '+7 (555) 123-45-67', receiverPhone: '+7 (111) 222-33-44', weight: '1.2 кг', date: '2025-06-21' },
    { senderPhone: '+7 (999) 888-77-66', receiverPhone: '+7 (555) 111-22-33', weight: '3.8 кг', date: '2025-06-22' }
  ])

  const [hashData] = useState<HashEntry[]>([
    { index: 0, key: '+7 (123) 456-78-90', value: 'Иванов Иван Иванович, ул. Пушкина, д. 1', hash: 1234567, status: 'occupied' },
    { index: 1, key: '+7 (987) 654-32-10', value: 'Петров Петр Петрович, ул. Лермонтова, д. 5', hash: 9876543, status: 'occupied' },
    { index: 2, key: '', value: '', hash: 0, status: 'empty' }
  ])

  // Modal handlers
  const openModal = (modalType: string) => {
    setModals(prev => ({ ...prev, [modalType]: true }))
  }

  const closeModal = (modalType: string) => {
    setModals(prev => ({ ...prev, [modalType]: false }))
  }

  // View handlers
  const changeView = (directoryNum: number, viewType: ViewType) => {
    if (directoryNum === 1) {
      setView1(viewType)
    } else {
      setView2(viewType)
    }
  }

  // File upload handler
  const handleFileUpload = (file: File, directory: number) => {
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      showNotification(`Файл ${file.name} успешно загружен`, 'success')
      closeModal(`uploadModal${directory}`)
    } else {
      showNotification('Пожалуйста, выберите файл .txt', 'error')
    }
  }

  // Form handlers
  const updateForm = (formType: string, field: string, value: string) => {
    setForms(prev => ({
      ...prev,
      [formType]: { ...prev[formType as keyof typeof prev], [field]: value }
    }))
  }

  const handleInsertContact = () => {
    const { phone, name, address } = forms.insertContact
    if (phone && name && address) {
      showNotification(`Контакт ${name} добавлен`, 'success')
      closeModal('insertModal1')
      setForms(prev => ({ ...prev, insertContact: { phone: '', name: '', address: '' } }))
    } else {
      showNotification('Пожалуйста, заполните все поля', 'error')
    }
  }

  const handleInsertPackage = () => {
    const { senderPhone, receiverPhone, weight, date } = forms.insertPackage
    if (senderPhone && receiverPhone && weight && date) {
      showNotification('Посылка добавлена в систему', 'success')
      closeModal('insertModal2')
      setForms(prev => ({ ...prev, insertPackage: { senderPhone: '', receiverPhone: '', weight: '', date: '' } }))
    } else {
      showNotification('Пожалуйста, заполните все поля', 'error')
    }
  }

  const handleDeleteContact = () => {
    const { phone } = forms.deleteContact
    if (phone) {
      if (window.confirm(`Удалить контакт с телефоном ${phone}?`)) {
        showNotification('Контакт удален', 'success')
        closeModal('deleteModal1')
        setForms(prev => ({ ...prev, deleteContact: { phone: '' } }))
      }
    } else {
      showNotification('Пожалуйста, введите телефон', 'error')
    }
  }

  const handleDeletePackage = () => {
    const { phone } = forms.deletePackage
    if (phone) {
      if (window.confirm(`Удалить посылку от отправителя ${phone}?`)) {
        showNotification('Посылка удалена', 'success')
        closeModal('deleteModal2')
        setForms(prev => ({ ...prev, deletePackage: { phone: '' } }))
      }
    } else {
      showNotification('Пожалуйста, введите телефон отправителя', 'error')
    }
  }

  const handleGenerateReport = () => {
    const { address, phone, dateFrom, dateTo } = forms.report
    if (address && phone && dateFrom && dateTo) {
      showNotification(`Отчет сформирован для адреса: ${address}`, 'success')
      closeModal('reportModal')
      setForms(prev => ({ ...prev, report: { address: '', phone: '', dateFrom: '', dateTo: '' } }))
    } else {
      showNotification('Пожалуйста, заполните все поля', 'error')
    }
  }

  const handleDeleteDirectory = (num: number) => {
    if (window.confirm(`Удалить Справочник ${num}?`)) {
      showNotification(`Справочник ${num} удален`, 'success')
    }
  }

  const handleSaveDirectory = (num: number) => {
    showNotification(`Справочник ${num} сохранен`, 'success')
  }

  const handleSearch = (query: string) => {
    if (query) {
      showNotification(`Поиск: "${query}"`, 'info')
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Menu */}
      <Menubar
        onOpenModal={openModal}
        onChangeView={changeView}
        onDeleteDirectory={handleDeleteDirectory}
        onSaveDirectory={handleSaveDirectory}
      />

      {/* Main Content */}
      <div className="mt-7 h-[calc(100vh-28px)] flex flex-col">
        {/* Directory 1 */}
        <DirectoryPanel
          title="Справочник 1 - Контакты"
          type="contacts"
          data={contacts}
          hashData={hashData}
          view={view1}
          searchPlaceholder="Введите телефон"
          onAdd={() => openModal('insertModal1')}
          onDelete={() => openModal('deleteModal1')}
          onSearch={handleSearch}
        />

        {/* Directory 2 */}
        <DirectoryPanel
          title="Справочник 2 - Посылки"
          type="packages"
          data={packages}
          view={view2}
          searchPlaceholder="Введите телефон отправителя"
          onAdd={() => openModal('insertModal2')}
          onDelete={() => openModal('deleteModal2')}
          onSearch={handleSearch}
        />
      </div>

      {/* Modals */}
      {/* Upload Modals */}
      <Modal isOpen={modals.uploadModal1} onClose={() => closeModal('uploadModal1')} title="Загрузить Справочник 1" size="small">
        <DropZone onFileUpload={(file) => handleFileUpload(file, 1)} />
      </Modal>

      <Modal isOpen={modals.uploadModal2} onClose={() => closeModal('uploadModal2')} title="Загрузить Справочник 2" size="small">
        <DropZone onFileUpload={(file) => handleFileUpload(file, 2)} />
      </Modal>

      {/* Insert Modals */}
      <Modal isOpen={modals.insertModal1} onClose={() => closeModal('insertModal1')} title="Добавить контакт">
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">Телефон:</label>
            <input
              type="text"
              value={forms.insertContact.phone}
              onChange={(e) => updateForm('insertContact', 'phone', e.target.value)}
              placeholder="Введите номер телефона"
              className="w-full px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">ФИО:</label>
            <input
              type="text"
              value={forms.insertContact.name}
              onChange={(e) => updateForm('insertContact', 'name', e.target.value)}
              placeholder="Введите полное имя"
              className="w-full px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">Адрес:</label>
            <input
              type="text"
              value={forms.insertContact.address}
              onChange={(e) => updateForm('insertContact', 'address', e.target.value)}
              placeholder="Введите адрес"
              className="w-full px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleInsertContact}
            className="bg-green-500 text-white border border-green-500 px-3 py-1.5 text-sm hover:bg-green-600"
          >
            Добавить
          </button>
        </div>
      </Modal>

      <Modal isOpen={modals.insertModal2} onClose={() => closeModal('insertModal2')} title="Добавить посылку">
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">Телефон отправителя:</label>
            <input
              type="text"
              value={forms.insertPackage.senderPhone}
              onChange={(e) => updateForm('insertPackage', 'senderPhone', e.target.value)}
              placeholder="Введите телефон отправителя"
              className="w-full px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">Телефон получателя:</label>
            <input
              type="text"
              value={forms.insertPackage.receiverPhone}
              onChange={(e) => updateForm('insertPackage', 'receiverPhone', e.target.value)}
              placeholder="Введите телефон получателя"
              className="w-full px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">Вес посылки:</label>
            <input
              type="text"
              value={forms.insertPackage.weight}
              onChange={(e) => updateForm('insertPackage', 'weight', e.target.value)}
              placeholder="Введите вес (например, 2.5 кг)"
              className="w-full px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">Дата отправки:</label>
            <input
              type="date"
              value={forms.insertPackage.date}
              onChange={(e) => updateForm('insertPackage', 'date', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleInsertPackage}
            className="bg-green-500 text-white border border-green-500 px-3 py-1.5 text-sm hover:bg-green-600"
          >
            Добавить
          </button>
        </div>
      </Modal>

      {/* Delete Modals */}
      <Modal isOpen={modals.deleteModal1} onClose={() => closeModal('deleteModal1')} title="Удалить контакт">
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">Телефон:</label>
            <input
              type="text"
              value={forms.deleteContact.phone}
              onChange={(e) => updateForm('deleteContact', 'phone', e.target.value)}
              placeholder="Введите телефон для удаления"
              className="w-full px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleDeleteContact}
            className="bg-red-500 text-white border border-red-500 px-3 py-1.5 text-sm hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
      </Modal>

      <Modal isOpen={modals.deleteModal2} onClose={() => closeModal('deleteModal2')} title="Удалить посылку">
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">Телефон отправителя:</label>
            <input
              type="text"
              value={forms.deletePackage.phone}
              onChange={(e) => updateForm('deletePackage', 'phone', e.target.value)}
              placeholder="Введите телефон отправителя"
              className="w-full px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleDeletePackage}
            className="bg-red-500 text-white border border-red-500 px-3 py-1.5 text-sm hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
      </Modal>

      {/* Report Modal */}
      <Modal isOpen={modals.reportModal} onClose={() => closeModal('reportModal')} title="Сформировать отчет">
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">Адрес:</label>
            <input
              type="text"
              value={forms.report.address}
              onChange={(e) => updateForm('report', 'address', e.target.value)}
              placeholder="Введите адрес"
              className="w-full px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">Номер телефона получателя:</label>
            <input
              type="text"
              value={forms.report.phone}
              onChange={(e) => updateForm('report', 'phone', e.target.value)}
              placeholder="Введите номер телефона"
              className="w-full px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-800 font-medium">Период даты:</label>
            <div className="flex gap-2 items-center">
              <input
                type="date"
                value={forms.report.dateFrom}
                onChange={(e) => updateForm('report', 'dateFrom', e.target.value)}
                className="flex-1 px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
              />
              <span>-</span>
              <input
                type="date"
                value={forms.report.dateTo}
                onChange={(e) => updateForm('report', 'dateTo', e.target.value)}
                className="flex-1 px-2 py-1.5 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleGenerateReport}
            className="bg-green-500 text-white border border-green-500 px-3 py-1.5 text-sm hover:bg-green-600"
          >
            Сформировать отчет
          </button>
        </div>
      </Modal>

      {/* About Modal */}
      <Modal isOpen={modals.aboutModal} onClose={() => closeModal('aboutModal')} title="О программе">
        <div className="text-sm text-gray-800 leading-relaxed">
          <div className="font-semibold">Система управления справочниками</div> версия 1.0
          <br /><br />
          Программа предназначена для работы с двумя справочниками:
          <br /><br />
          <div className="font-semibold">Справочник 1:</div> информация о контактах (телефон, ФИО, адрес)
          <br />
          <div className="font-semibold">Справочник 2:</div> информация о посылках (отправитель, получатель, вес, дата)
          <br /><br />
          Поддерживаются различные структуры данных для оптимизации поиска и хранения информации.
          <br /><br />
          Разработано для эффективного управления данными в коммерческой среде.
        </div>
      </Modal>

      {/* Notifications */}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}