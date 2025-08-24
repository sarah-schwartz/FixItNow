import React from 'react';
import { Space, Select, Input } from 'antd';
import { PRIORITY_LABELS_HE, STATUS_LABELS_HE } from '../constants/constants';

const { Search } = Input;

const urgencyOptions = Object.entries(PRIORITY_LABELS_HE).map(([value, label]) => ({
  value,
  label
}));

const statusOptions = Object.entries(STATUS_LABELS_HE).map(([value, label]) => ({
  value,
  label
}));

const TicketsFilter = ({ filterStates, filterSetters }) => {
  const {
    urgencyFilter,
    statusFilter,
    searchText,
    categorySearch,
    dateSearch,
  } = filterStates;

  const {
    setUrgencyFilter,
    setStatusFilter,
    setSearchText,
    setCategorySearch,
    setDateSearch,
  } = filterSetters;

  return (
    <Space wrap style={{ marginBottom: '24px' }}>
      <Select
        placeholder="Filter by Priority"
        style={{ width: 160 }}
        value={urgencyFilter || undefined}
        onChange={setUrgencyFilter}
        options={urgencyOptions}
        allowClear
      />
      <Select
        placeholder="Filter by Status"
        style={{ width: 160 }}
        value={statusFilter || undefined}
        onChange={setStatusFilter}
        options={statusOptions}
        allowClear
      />
      <Input
        placeholder="Search by Category"
        style={{ width: 160 }}
        value={categorySearch}
        onChange={(e) => setCategorySearch(e.target.value)}
        allowClear
      />
      <Input
        placeholder="Search by Date"
        style={{ width: 160 }}
        value={dateSearch}
        onChange={(e) => setDateSearch(e.target.value)}
      />
      <Search
        placeholder="Search by Employee Name"
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ width: 200 }}
      />
    </Space>
  );
};

export default TicketsFilter;