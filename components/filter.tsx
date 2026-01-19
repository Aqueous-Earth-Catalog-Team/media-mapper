"use client"

import { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { MediaLocation } from '@/lib/airtable/types';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { usePathname, useRouter } from 'next/navigation';
import { Label } from './ui/label';

/* ---- QUESTIONS ----
  1. Do we want the combo box to be it's own component? Yes
  2. Do we want a label for each input? Yes
  3. We have America and USA for a country?
  4. We might want to send all the locations here to begin with? Since we can adjust the filters before applying.

  ----- TODO'S -----
  1. Add in search params, potentially remove our state tracking and only use search params
  2. Add more details to search


  ----- Defined Behavior -----
  1. When you apply filter, it removes selected media. Can change
  2. Thought about the badge thing, could be good, but the page jumping can get a little aggressive, I chose to have them checked and sorted to the top.
  3. 
*/

export default function Filter({ data, filters }: { data: MediaLocation[], filters: any }) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCountry, setSelectedCountry] = useState<string[]>(filters.countries);
  const [selectedWater, setSelectedWater] = useState<string[]>(filters.bodiesOfWater);
  const [countryOpen, setCountryOpen] = useState(false);
  const [waterOpen, setWaterOpen] = useState(false);
  const [startYear, setStartYear] = useState(filters.startYear);
  const [endYear, setEndYear] = useState(filters.endYear);

  const [countries] = useState([...new Set(data.map(media => media.country))].map(country => ({ value: country?.toLowerCase(), label: country?.toUpperCase() })))
  const [bodiesOfWater] = useState([...new Set(data.map(media => media.natural_feature_name))].map(country => ({ value: country?.toLowerCase(), label: country?.toUpperCase() })))

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

    router.push(`${pathname}?${newParams.toString()}`, { scroll: true });
  }

  return (
    <div className='flex gap-1'>
      <div>
        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
          <PopoverTrigger asChild>
            <div className='flex flex-col gap-1  min-w-52'>
              <Label>Countries</Label>
              <Button role="combobox" variant="outline" aria-expanded={countryOpen}>
                {selectedCountry.length > 0 ? `${selectedCountry.length} Selected` : 'Select Countries'}
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
      </div>

      <div>
        <Popover open={waterOpen} onOpenChange={setWaterOpen}>
          <PopoverTrigger asChild>
            <div className='flex flex-col gap-1 min-w-52'>
              <Label>Bodies of Water</Label>
              <Button role="combobox" variant="outline" aria-expanded={waterOpen}>
                {selectedWater.length > 0 ? `${selectedWater.length} Selected` : 'Select Bodies of Water'}
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
      </div>

      <div className='flex flex-col gap-1'>
        <Label>Start Year</Label>
        <Input value={startYear} min={Math.min(...data.map(d => d.media?.release_year))} onChange={(e) => setStartYear(e.target.value)} type='number' placeholder='Start Year' className='min-w-52' />
      </div>

      <div className='flex flex-col gap-1'>
        <Label>End Year</Label>
        <Input value={endYear} max={Math.max(...data.map(d => d.media?.release_year))} onChange={(e) => setEndYear(e.target.value)} type='number' placeholder='End Year' className='min-w-52' />
      </div>

      <Button className='justify-self-end' onClick={handleApplyFilters}>Apply filters</Button>
    </div>
  );
}