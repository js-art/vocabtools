import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Textarea,
  Select,
  SelectItem,
  Chip,
} from '@nextui-org/react';
import { PlusIcon } from './PlusIcon';

import { toast } from 'sonner';

const statusOptions = [
  { name: 'Learned', uid: 'learned' },
  { name: 'Not Learned', uid: 'notLearned' },
  { name: 'Without Status', uid: 'withoutStatus' },
];

export default function AddWordData({
  edit = false,
  show = false,
  onEditChange,
  onShowChange,
  editAction,
  selected,
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [englishWord, setEnglishWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [example, setExample] = useState('');
  const [collocations, setCollocations] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const [opposites, setOpposites] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (edit || show) {
      setEnglishWord(selected?.englishWord ?? '');
      setTranslation(selected?.translation ?? '');
      setExample(selected?.example ?? '');
      setCollocations(selected?.collocations ?? '');
      setSynonyms(selected?.synonyms ?? '');
      setOpposites(selected?.opposites ?? '');
      setStatus(selected?.status ?? '');
    } else {
      reset();
    }
  }, [edit, show]);

  const reset = () => {
    setEnglishWord('');
    setTranslation('');
    setExample('');
    setCollocations('');
    setSynonyms('');
    setOpposites('');
    setStatus('');
  };

  const statusColorMap = {
    learned: 'success',
    notLearned: 'danger',
    withoutStatus: 'warning',
  };

  useEffect(() => {
    if (window.electron.ipcRenderer) {
      window.electron.ipcRenderer.on('save:word', (data) => {
        if (!data?.error) {
          toast.success('Successfully saved.');
          window.electron.ipcRenderer.sendMessage('get:words');
          onClose();
        }
        if (data?.error) {
          toast.error('Proses was not successful.');
        }
      });
      window.electron.ipcRenderer.on('update:word', (data) => {
        if (!data?.error) {
          toast.success('Successfully Updated.');
        }
        if (data?.error) {
          toast.error('Proses was not successful.');
        }
      });

      window.electron.ipcRenderer.on('delete:word', (data) => {
        if (!data?.error) {
          toast.success('Successfully deleted.');
        }
        if (data?.error) {
          toast.error('Proses was not successful.');
        }
      });
    }
    return () => {
      window.electron.ipcRenderer.removeListener('save:word', () =>
        console.log('unMount saved:names ********'),
      );
      window.electron.ipcRenderer.removeListener('update:word', () =>
        console.log('unMount update:word ********'),
      );
      window.electron.ipcRenderer.removeListener('delete:word', () =>
        console.log('unMount delete:word ********'),
      );
    };
  }, []);

  const save = async () => {
    console.log({ englishWord, translation, example, collocations, synonyms, opposites, status });
    await window.electron.ipcRenderer.sendMessage('save:word', {
      englishWord,
      translation,
      example,
      collocations,
      synonyms,
      opposites,
      status,
    });
    reset();

    // if(status==='success'){
    //   alert(status)

    // }
  };

  const update = async () => {
    console.log({ englishWord, translation, example, collocations, synonyms, opposites, status });
    await window.electron.ipcRenderer.sendMessage('update:word', {
      id: selected?.id,
      englishWord,
      translation,
      example,
      collocations,
      synonyms,
      opposites,
      status,
    });
    reset();
    onEditChange();
  };
  return (
    <>
      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        Add New
      </Button>

      <Modal
        scrollBehavior="inside"
        isOpen={edit ? edit : show ? show : isOpen}
        onOpenChange={edit ? onEditChange : show ? onShowChange : onOpenChange}
        placement="top-center"
        size="full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {edit ? 'Edit' : show ? 'Show Word Info' : 'Add New'}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  readOnly={show}
                  onChange={(e) => {
                    setEnglishWord(e.target.value);
                  }}
                  value={englishWord}
                  label="ٔEnglish Word"
                  // placeholder=""
                  variant="bordered"
                />
                <Input
                  onChange={(e) => {
                    setTranslation(e.target.value);
                  }}
                  readOnly={show}
                  label="Translation"
                  value={translation}
                  // placeholder="Enter your Family"
                  variant="bordered"
                />

                <Textarea
                  onChange={(e) => {
                    setExample(e.target.value);
                  }}
                  readOnly={show}
                  value={example}
                  label="Example"
                  variant="bordered"
                />
                <Textarea
                  onChange={(e) => {
                    setCollocations(e.target.value);
                  }}
                  readOnly={show}
                  value={collocations}
                  label="Collocations"
                  variant="bordered"
                />
                <Textarea
                  onChange={(e) => {
                    setSynonyms(e.target.value);
                  }}
                  readOnly={show}
                  value={synonyms}
                  label="Synonyms"
                  variant="bordered"
                />
                <Textarea
                  onChange={(e) => {
                    setOpposites(e.target.value);
                  }}
                  readOnly={show}
                  value={opposites}
                  label="Opposites"
                  variant="bordered"
                />
                {/* {status} */}
                {show ? (
                  <Chip
                    className="cursor-context-menu capitalize"
                    color={statusColorMap[status]}
                    size="sm"
                    variant="dot"
                    radius="sm"
                    // onClick={() => onEdit(words.status)}
                  >
                    {statusOptions.filter((s) => s.uid === status)[0]?.name}
                  </Chip>
                ) : (
                  <Select
                    color={statusColorMap[status]}
                    onChange={(e) => {
                      // alert(e.target.sele);
                      setStatus(e.target.value);
                    }}
                    value={status}
                    selectedKeys={[status]}
                    label="Select Status"
                    className="max-w-xs"
                  >
                    <SelectItem key="withoutStatus" value="withoutStatus">
                      Without Status
                    </SelectItem>
                    <SelectItem key="learned" value="learned">
                      Learned
                    </SelectItem>
                    <SelectItem key="notLearned" value="notLearned">
                      Not Learned
                    </SelectItem>
                  </Select>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    onClose();
                    reset();
                    onEditChange();
                    onShowChange();
                  }}
                >
                  Close
                </Button>
                {!show && (
                  <Button color="primary" onPress={edit ? update : save}>
                    {edit ? 'Update' : 'Save'}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
