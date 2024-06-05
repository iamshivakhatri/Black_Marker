import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { startOfMonth, endOfMonth } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

interface DatePickerProps {
  selectedDate: string | undefined;
  onSelectDate: (date: Date | undefined) => void;
}



const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onSelectDate }) => {
const [date, setDate] = React.useState<Date | undefined>(selectedDate ? new Date(selectedDate) : undefined);

React.useEffect(() => {
    setDate(selectedDate ? new Date(selectedDate) : undefined);
}, [selectedDate]);

  const handleDateChange = (newDate?: Date) => {
    if (newDate) {
      // Set the date to the start of the selected month
      const startOfMonthDate = startOfMonth(newDate);
      setDate(startOfMonthDate);
      onSelectDate(startOfMonthDate);
    } else {
      setDate(undefined);
      onSelectDate(undefined);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[180px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMM yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
        {/* <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={handleDateChange}
            initialFocus
            showOutsideDays={false}
            fixedWeeks
            showMonthsOnly 
        /> */}
        <ReactDatePicker
          selected={date}
          onChange={handleDateChange as any}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          inline
        />
    </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
