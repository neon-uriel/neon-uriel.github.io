import { parseISO, format, parse } from 'date-fns';

export default function DateComponents({ dateString }) {
    console.log(dateString);
    // parse the date that likes '2020-08-23 21:21:21 +0530'
    const date = parse(dateString, 'yyyy-MM-dd HH:mm', new Date());
    return <time dateTime={dateString}>{format(date, 'yyyy/MM/dd')}</time>;
}