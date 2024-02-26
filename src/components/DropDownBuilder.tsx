import React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DropDownBuilder = ({ items, Itemcode, handleItemCode }: any) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  console.log(value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {" "}
          {Itemcode}
          {/* {value ? value != undefined : "Search Items ...."} */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Items..." />
          <CommandEmpty>No Items Found.</CommandEmpty>
          <CommandGroup>
            {items?.map((item: any, index: any) => (
              <CommandItem
                key={index}
                value={item.Itemcode}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  handleItemCode(item.Itemcode);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.Itemcode ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.Itemcode}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DropDownBuilder;
