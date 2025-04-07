'use client';

import dynamic from 'next/dynamic';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = dynamic(() => import('react-datepicker'), {
  ssr: false,
});

export default DatePicker;
