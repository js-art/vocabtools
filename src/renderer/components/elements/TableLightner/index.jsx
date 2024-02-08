import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
} from '@nextui-org/react';

// import { GoPlus as PlusIcon } from "react-icons/go";
// import { HiDotsVertical as VerticalDotsIcon} from "react-icons/hi";
// import { CiSearch as SearchIcon } from "react-icons/ci";
// import { IoChevronDown as ChevronDownIcon } from "react-icons/io5";
import { PlusIcon } from './PlusIcon';
import { VerticalDotsIcon } from './VerticalDotsIcon';
import { SearchIcon } from './SearchIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { columns, statusOptions } from './data';
import { capitalize } from './utils';
import AddWordData from '../AddWordData';
import clsx from 'clsx';
import { useSiteSettings } from '../../../utils/react/hooks/useLocalStorage';
import Status from './Status';

export default function TableLightener() {
  const [words, setWords] = React.useState([]);
  const {
    tableWords: [settings, setSettings, delSettings],
  } = useSiteSettings();

  const INITIAL_VISIBLE_COLUMNS = settings.visibleColumns;
  const INITIAL_FILTERS = settings.statusFilter;
  const INITIAL_ROWS_PER_PAGE = settings.rowsPerPage;

  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState(INITIAL_FILTERS || 'all');
  const [rowsPerPage, setRowsPerPage] = React.useState(INITIAL_ROWS_PER_PAGE || 5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'status',
    direction: 'ascending',
  });

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get:words');
    window.electron.ipcRenderer.on('get:words', (res) => {
      // alert('dd');
      if (!res?.error) setWords(res?.data);
    });
  }, []);

  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    console.log(words, 'words');
    let filteredWords = words ? [...words] : [];

    if (hasSearchFilter) {
      filteredWords = filteredWords.filter((word) =>
        word.englishWord.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredWords = filteredWords.filter((word) =>
        Array.from(statusFilter).includes(word.status),
      );
    }

    return filteredWords;
  }, [words, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((word, columnKey) => {
    const cellValue = word[columnKey];

    switch (columnKey) {
      case 'wordEnglish':
        return cellValue;
      // <User
      //   avatarProps={{radius: "lg", src: user.avatar}}
      //   description={user.email}
      //   name={cellValue}
      // >
      //   {user.email}
      // </User>
      // case "wordPersian":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-small capitalize">{cellValue}</p>
      //       {/* <p className="text-bold text-tiny capitalize text-default-400">{word.persian}</p> */}
      //     </div>
      // );
      case 'status':
        return (
          <Status recordId={word?.id} statusOptions={statusOptions} currentStatus={cellValue} />
        );
      case 'actions':
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setShow(true);
                    setSelected(word);
                  }}
                >
                  View
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setEdit(true);
                    setSelected(word);
                  }}
                >
                  Edit
                </DropdownItem>

                <DropdownItem
                  onClick={() =>
                    window.electron.ipcRenderer.sendMessage('delete:word', { id: word?.id })
                  }
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  useEffect(() => {
    setSettings({
      ...settings,
      visibleColumns: [...visibleColumns],
    });
  }, [visibleColumns]);

  useEffect(() => {
    setSettings({
      ...settings,
      statusFilter: [...statusFilter],
    });
  }, [statusFilter]);

  useEffect(() => {
    setSettings({
      ...settings,
      rowsPerPage: Number(rowsPerPage),
    });
  }, [rowsPerPage]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            size="sm"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <AddWordData
              edit={edit}
              show={show}
              onEditChange={(e) => setEdit(false)}
              onShowChange={(e) => setShow(false)}
              editAction={() => {
                console.log(edited);
              }}
              selected={selected}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">Total {words.length} words</span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    words.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span> */}

        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'max-h-[420px] min-h-[420px]',
      }}
      selectedKeys={selectedKeys}
      selectionMode={'single'}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'end' : 'start'}
            allowsSorting={column.sortable}
            className={clsx({ 'text-right': column.uid === 'actions' })}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No words found'} items={sortedItems}>
        {(item) => (
          <TableRow
            className="cursor-pointer"
            key={item.id}
            onClick={() => {
              setSelected(item);
              setShow(true);
            }}
          >
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
