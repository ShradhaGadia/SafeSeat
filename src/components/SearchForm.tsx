import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { indianStations } from "@/data/stations";

const SearchForm = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      navigate("/search", {
        state: { from, to, date: format(date, "yyyy-MM-dd") },
      });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">From</label>
            <Select value={from} onValueChange={setFrom} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select origin station" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {indianStations.map((station) => (
                  <SelectItem key={station.value} value={station.label}>
                    {station.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">To</label>
            <Select value={to} onValueChange={setTo} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select destination station" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {indianStations.map((station) => (
                  <SelectItem key={station.value} value={station.label}>
                    {station.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Button type="submit" className="w-full md:w-auto" size="lg">
          <Search className="mr-2 h-5 w-5" />
          Search Trains
        </Button>
      </form>
    </Card>
  );
};

export default SearchForm;
