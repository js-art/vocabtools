import {
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  usePopover,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
const statusColorMap = {
  learned: 'success',
  notLearned: 'danger',
  withoutStatus: 'warning',
};
function Status({ currentStatus, statusOptions, recordId }) {
  const [status, setStatus] = useState('learned');
  const [open, setOpen] = useState(false);
  // const p = usePopover();
  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  return (
    <Popover
      isOpen={open}
      onOpenChange={setOpen}
      shadow="md"
      placement="bottom"
      showArrow
      offset={10}
    >
      <PopoverTrigger>
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
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="w-full px-1 py-2">
            {/* <p className="text-small font-bold text-foreground" {...titleProps}>
              Choose New Status
            </p> */}
            <div className="mt-2 flex w-full flex-col gap-2">
              <Select
                color={statusColorMap[status]}
                onChange={(e) => {
                  // alert(e.target.sele);
                  setStatus(e.target.value);
                  window.electron.ipcRenderer.sendMessage('update:word', {
                    status: e.target.value,
                    id: recordId,
                  });
                  setOpen(false);
                }}
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
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Status;
