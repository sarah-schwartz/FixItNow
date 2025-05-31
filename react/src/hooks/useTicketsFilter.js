import { useState, useMemo } from 'react';
import { getCategoryLabel } from '../constants/constants';

export const useTicketsFilter = (tickets) => {
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [dateSearch, setDateSearch] = useState('');

  const filteredData = useMemo(() => {
    return tickets.filter((row) => {
      const matchesUrgency = !urgencyFilter || row.tags === urgencyFilter;
      const matchesStatus = !statusFilter || row.status === statusFilter;
      const matchesSearch = row.name.includes(searchText);
      const matchesCategory = !categorySearch || getCategoryLabel(row.category).includes(categorySearch);
      const matchesDate = !dateSearch || row.date.includes(dateSearch);
      return matchesUrgency && matchesStatus && matchesSearch && matchesCategory && matchesDate;
    });
  }, [tickets, urgencyFilter, statusFilter, searchText, categorySearch, dateSearch]);

  const filterStates = {
    urgencyFilter,
    statusFilter,
    searchText,
    categorySearch,
    dateSearch,
  };

  const filterSetters = {
    setUrgencyFilter,
    setStatusFilter,
    setSearchText,
    setCategorySearch,
    setDateSearch,
  };

  return {
    filteredData,
    filterStates,
    filterSetters,
  };
};