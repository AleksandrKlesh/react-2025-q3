import { useState } from 'react';
import { Modal } from './components/Modal/Modal';
import { UncontrolledForm } from './components/UncontrolledForm/UncontrolledForm';
import { HookForm } from './components/HookForm/HookForm';
import { Button } from './components/Button/Button';

type ModalContent = 'uncontrolled' | 'hook' | null;

function App() {
  const [openModal, setOpenModal] = useState<ModalContent>(null);

  const handleClose = () => setOpenModal(null);

  return (
    <div className="p-6 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">React Forms</h1>

      <div className="flex gap-4">
        <Button
          label="Open Uncontrolled Form"
          onClick={() => setOpenModal('uncontrolled')}
        />
        <Button label="Open Hook Form" onClick={() => setOpenModal('hook')} />
      </div>

      <Modal isOpen={!!openModal} onClose={handleClose}>
        {openModal === 'uncontrolled' && (
          <UncontrolledForm onClose={handleClose} />
        )}
        {openModal === 'hook' && <HookForm onClose={handleClose} />}
      </Modal>
    </div>
  );
}

export default App;
