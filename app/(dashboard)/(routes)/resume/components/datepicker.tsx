import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, isSameMonth } from "date-fns";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selectedDate: string | undefined;
  onSelectDate: (date: Date | undefined) => void;
  disabled?: boolean; // Added disabled prop
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onSelectDate, disabled }) => {
  const [date, setDate] = useState<Date | undefined>(selectedDate ? new Date(selectedDate) : undefined);
  const [isPresent, setIsPresent] = useState<boolean>(false);

  useEffect(() => {
    setDate(selectedDate ? new Date(selectedDate) : undefined);
  }, [selectedDate]);

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setDate(newDate);
      onSelectDate(newDate);
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
          disabled={disabled} // Button disabled when disabled prop is true
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date && !isPresent ? format(date, "MMM yyyy") : "Present"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <ReactDatePicker
          selected={date}
          onChange={handleDateChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          inline
          disabled={disabled || isPresent} // Disable the date picker when Present is selected
        />
       
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
