import { Tag } from 'antd';
import { getPriorityLabel, getCategoryLabel, getStatusLabel } from '../constants/constants';

export const getTicketsColumns = () => [
  {
    title: 'Employee Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (catKey) => getCategoryLabel(catKey)
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Priority',
    dataIndex: 'tags',
    key: 'tags',
    render: (priority) => {
      const translated = getPriorityLabel(priority);
      let color;
      if (translated === 'נמוכה') color = 'geekblue';
      else if (translated === 'בינונית') color = 'green';
      else if (translated === 'גבוהה') color = 'volcano';
      else color = 'default';
      return <Tag color={color}>{translated}</Tag>;
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const translated = getStatusLabel(status);
      let color;
      if (translated === 'ממתין') color = 'orange';
      else if (translated === 'בטיפול') color = 'blue';
      else if (translated === 'הושלם') color = 'green';
      else color = 'default';
      return <Tag color={color}>{translated}</Tag>;
    },
  },
];