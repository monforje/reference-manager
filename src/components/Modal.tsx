'use client'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'normal';
}

export const Modal = ({ isOpen, onClose, title, children, size = 'normal' }: ModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className={`bg-white p-5 border border-gray-300 relative shadow-lg ${
        size === 'small' ? 'w-80' : 'w-96'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold cursor-pointer"
        >
          ×
        </button>
        <h3 className="mb-4 text-base text-gray-800 border-b border-gray-300 pb-2">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
};