import { useLocalStorage } from 'react-use';

function useSiteSettings() {
  const tableWords = useLocalStorage('settings-table-word', {
    visibleColumns: ['englishWord', 'status', 'actions'],
    statusFilter: 'all',
    rowsPerPage: 5,
  });

  return {
    tableWords,
  };
}

export { useSiteSettings };
