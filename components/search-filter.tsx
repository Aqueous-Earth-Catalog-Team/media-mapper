"use client"

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { MediaLocation } from '@/lib/airtable/types';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ChevronsUpDown, X } from 'lucide-react';
import { Badge } from './ui/badge';

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
  2. 
*/

export default function SearchAndFilter({ data }: { data: MediaLocation[] }) {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedWater, setSelectedWater] = useState([]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [waterOpen, setWaterOpen] = useState(false);

  const [countries] = useState([...new Set(data.map(media => media.country))].map(country => ({ value: country?.toLowerCase(), label: country?.toUpperCase() })))
  const [bodiesOfWater] = useState([...new Set(data.map(media => media.natural_feature_name))].map(country => ({ value: country?.toLowerCase(), label: country?.toUpperCase() })))

  //Add query params
  const handleSelectCountry = (currentValue: string) => {
    setSelectedCountry(countries => countries.includes(currentValue) ? countries.filter(country => country.value !== currentValue) : [...countries, currentValue])
  }

  const handleSelectBodyOfWater = (currentValue: string) => {
    setSelectedWater(waters => waters.includes(currentValue) ? waters.filter(water => water.value !== currentValue) : [...waters, currentValue])
  }

  const handleRemoveCountry = (value: string) => {
    setSelectedCountry(countries => countries.filter(country => country !== value));
  }

  const handleRemoveWater = (value: string) => {
    setSelectedWater(waters => waters.filter(water => water !== value));
  }

  const handleApplyFilters = () => {
    // Needs to handle both arrays
    // Needs to remove selected media
    // Add in date selections to this as well

  }

  return (
    <div className='border flex'>
      <Command className='max-w-[500]'>
        <CommandInput placeholder="Search Media Locations" value={searchValue} onValueChange={setSearchValue} onFocus={() => setOpen(open => !open)} />

        {searchValue && open &&
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Media Locations">
              {data.map((media) => (
                // Add function to convert media searches
                <CommandItem
                  key={media.id}
                  value={`${media.name} ${media?.city} ${media?.country} ${media.media?.release_year} ${media.region} ${media.location_name}`}
                  onSelect={() => {
                    // Update all mediaPointId to check search params
                    window.history.pushState({}, "", `?mediaPointId=${media.id}`);
                    setOpen(false);
                  }}>
                  {media.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        }
      </Command>

      <div>
        <div className="flex flex-wrap gap-1 items-center">
          {selectedCountry.map((country) => (
            <Badge
              key={country}
              variant="outline"
              className="flex items-center gap-1 p-2">
              <span>
                {country}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 cursor-pointer"
                onClick={() => handleRemoveCountry(country)}>
                <X className="w-2.5 h-2.5" />
              </Button>
            </Badge>
          ))}
        </div>
        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
          <PopoverTrigger asChild>
            <Button role="combobox" variant="outline" aria-expanded={countryOpen}>
              Select Countries
              <ChevronsUpDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder='Search Countries...' />
              <CommandList>
                <CommandEmpty>No Country Found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      onSelect={() => handleSelectCountry(country.label)}
                      key={country.value}
                      value={country.value}>
                      {country.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <div className="flex flex-wrap gap-1 items-center">
          {selectedWater.map((water) => (
            <Badge
              key={water}
              variant="outline"
              className="flex items-center gap-1 p-2">
              <span>
                {water}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 cursor-pointer"
                onClick={() => handleRemoveWater(water)}>
                <X className="w-2.5 h-2.5" />
              </Button>
            </Badge>
          ))}
        </div>
        <Popover open={waterOpen} onOpenChange={setWaterOpen}>
          <PopoverTrigger asChild>
            <Button role="combobox" variant="outline" aria-expanded={waterOpen}>
              Select Bodies of Water
              <ChevronsUpDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder='Search Bodies of Water...' />
              <CommandList>
                <CommandEmpty>No Bodies of Water Found.</CommandEmpty>
                <CommandGroup>
                  {bodiesOfWater.map((water) => (
                    <CommandItem
                      onSelect={() => handleSelectBodyOfWater(water.label)}
                      key={water.value}
                      value={water.label}>
                      {water.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Input type='number' placeholder='Start Year' className='max-w-52' />
      <Input type='number' placeholder='End Year' className='max-w-52' />
      <Button className='justify-self-end'>Apply filters</Button>

    </div>
  );
}