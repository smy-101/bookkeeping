import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';
import dayjs from 'dayjs';

export type RecordItem = {
    tagIds: number[];
    note: string;
    category: '+' | '-';
    amount: number;
    date: string;
    createdAt: string;
    month:string;
};

type newRecordItem = Omit<RecordItem, 'createdAt'>;


const useRecords = () => {
    const [records, setRecords] = useState<RecordItem[]>([]);
    useEffect(() => {
        setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'));
    }, []);
    useUpdate(() => {
        window.localStorage.setItem('records', JSON.stringify(records));
    }, records);
    const addRecord = (newRecord: newRecordItem) => {
        if (newRecord.amount <= 0) {
            alert('请输入金额');
            return false;
        }
        if (newRecord.tagIds.length === 0) {
            alert('请选择标签');
            return false;
        }
        const record = {...newRecord, createdAt: (new Date()).toISOString(),month:dayjs(newRecord.date).format('YYYY-MM')};
        setRecords([...records, record]);
        return true;
    };
    return {records, addRecord};
};

export {useRecords};