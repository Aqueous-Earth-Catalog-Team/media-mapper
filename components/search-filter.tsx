"use client"

// import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { MediaLocation } from '@/lib/airtable/types';
import { Popover, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

const BODIES_OF_WATER = [
  {
    value: "indian",
    label: "Indian Ocean"
  },
  {
    value: "atlantic",
    label: "Atlantic Ocean"
  },
  {
    value: "pacific",
    label: "Pacific Ocean"
  },
  {
    value: "arctic",
    label: "Arctic Ocean"
  },
]

const COUNTRIES = [
  {
    value: "india",
    label: "India"
  },
  {
    value: "china",
    label: "China"
  },
  {
    value: "america",
    label: "United States"
  },
  {
    value: "russia",
    label: "Russia"
  },
]


export default function SearchAndFilter({ data }: { data: MediaLocation[] }) {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedWater, setSelectedWater] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const [waterOpen, setWaterOpen] = useState(false);

  const [countries] = useState([...new Set(data.map(media => media.country))].map(country => ({ value: country?.toLowerCase(), label: country?.toUpperCase() })))
  const [bodiesOfWater] = useState([...new Set(data.map(media => media.natural_feature_name))].map(country => ({ value: country?.toLowerCase(), label: country?.toUpperCase() })))

  console.debug(data);

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
        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
          <PopoverTrigger asChild>
            <Button role="combobox"></Button>
          </PopoverTrigger>
        </Popover>

      </div>
      <Button className='justify-self-end'>Apply filters</Button>

    </div>
  );
}