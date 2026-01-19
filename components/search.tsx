"use client"

import { MediaLocation } from '@/lib/airtable/types';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { useState } from 'react';


export default function Search({ data }: { data: MediaLocation[] }) {
	const [searchValue, setSearchValue] = useState('');
	const [open, setOpen] = useState(false);

	return (

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
	);
}