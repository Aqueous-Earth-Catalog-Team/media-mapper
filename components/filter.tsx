"use client"

import { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { MediaLocation } from '@/lib/airtable/types';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Check, ChevronsUpDown, FilterIcon } from 'lucide-react';
import { Label } from './ui/label';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useIsTablet } from './hooks/use-tablet';

export default function Filter({ data, filters }: { data: MediaLocation[], filters: any }) {
  const isMobile = useIsTablet();

  const [selectedCountry, setSelectedCountry] = useState<string[]>(filters.countries);
  const [selectedWater, setSelectedWater] = useState<string[]>(filters.bodiesOfWater);
  const [filtersOpen, setOpenFilters] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [waterOpen, setWaterOpen] = useState(false);
  const [startYear, setStartYear] = useState(filters.startYear || '');
  const [endYear, setEndYear] = useState(filters.endYear || '');

  const [countries] = useState([...new Set(data.map(media => media.country))].filter(country => country !== undefined).map(country => ({ value: country?.toLowerCase(), label: country?.toUpperCase() })))
  const [bodiesOfWater] = useState([...new Set(data.map(media => media.natural_feature_name))].filter(country => country !== undefined).map(country => ({ value: country?.toLowerCase(), label: country?.toUpperCase() })))
  const [minYear] = useState(Math.min(...data.map(d => d.media?.release_year).filter(year => year !== undefined)));
  const [maxYear] = useState(Math.max(...data.map(d => d.media?.release_year).filter(year => year !== undefined)));

  const handleSelectCountry = (currentValue: string) => {
    setSelectedCountry((countries: string[]) => countries.includes(currentValue) ? countries.filter(country => country !== currentValue) : [...countries, currentValue])
  }

  const handleSelectBodyOfWater = (currentValue: string) => {
    setSelectedWater(waters => waters.includes(currentValue) ? waters.filter(water => water !== currentValue) : [...waters, currentValue])
  }

  const handleApplyFilters = () => {
    const newParams = new URLSearchParams();

    if (selectedWater.length) {
      newParams.append("body_of_water", selectedWater.join(','));
    }
    if (selectedCountry.length) {
      newParams.append("country", selectedCountry.join(','));
    }
    if (startYear) {
      newParams.append("start_year", '' + startYear);
    }
    if (endYear) {
      newParams.append("end_year", '' + endYear);
    }

    setOpenFilters(false);
    history.pushState({}, "", `/?${newParams.toString()}`);
  }

  const filterInputs = (
    <div className='flex flex-col md:flex-row gap-3 flex-wrap'>
      <Popover open={countryOpen} onOpenChange={setCountryOpen}>
        <PopoverTrigger asChild>
          <div className='flex flex-col gap-1 min-w-32'>
            <Label>Countries</Label>
            <Button role="combobox" variant="outline" aria-expanded={countryOpen}>
              {selectedCountry.length > 0 ? `${selectedCountry.length} Selected` : 'None Selected'}
              <ChevronsUpDown />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder='Search Countries...' />
            <CommandList>
              <CommandEmpty>No Country Found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    onSelect={() => handleSelectCountry(country.value)}
                    key={country.value}
                    value={country.value}>
                    {country.label}
                    {selectedCountry.includes(country.value) && <Check />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={waterOpen} onOpenChange={setWaterOpen}>
        <PopoverTrigger asChild>
          <div className='flex flex-col gap-1 min-w-32'>
            <Label>Bodies of Water</Label>
            <Button role="combobox" variant="outline" aria-expanded={waterOpen}>
              {selectedWater.length > 0 ? `${selectedWater.length} Selected` : 'None Selected'}
              <ChevronsUpDown />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder='Search Bodies of Water...' />
            <CommandList>
              <CommandEmpty>No Bodies of Water Found.</CommandEmpty>
              <CommandGroup>
                {bodiesOfWater.map((water) => (
                  <CommandItem
                    onSelect={() => handleSelectBodyOfWater(water.value)}
                    key={water.value}
                    value={water.label}>
                    {water.label}
                    {selectedWater.includes(water.value) && <Check />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className='flex flex-col gap-1 no-wrap'>
        <Label>Date Range</Label>
        <div className='flex gap-1 items-center'>
          <Input
            value={startYear}
            min={minYear}
            max={maxYear}
            onChange={(e) => setStartYear(e.target.value)}
            type='number'
            placeholder='Start Year'
            className='min-w-28' />
          -
          <Input
            value={endYear}
            min={minYear}
            max={maxYear}
            onChange={(e) => setEndYear(e.target.value)}
            type='number'
            placeholder='End Year'
            className='min-w-28' />
        </div>
      </div>
    </div>
  );
  return (
    <>
      {!isMobile ? (
        <div className='flex items-end gap-2'>
          {filterInputs}
          <Button onClick={handleApplyFilters}>Apply</Button>
        </div>
      ) : (
        <Dialog open={filtersOpen} onOpenChange={setOpenFilters}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <FilterIcon />
            </Button>
          </DialogTrigger>
          <DialogContent onInteractOutside={e => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Map Filter</DialogTitle>
              <DialogDescription>Filter media points shown on map. Click apply filters when you are done.</DialogDescription>
            </DialogHeader>
            {filterInputs}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type='submit' onClick={handleApplyFilters}>Apply filters</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}