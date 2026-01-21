"use client"

import { MediaLocation } from '@/lib/airtable/types';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { useState } from 'react';
import { addQueryParameter } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';


export default function Search({ data }: { data: MediaLocation[] }) {
	const [searchValue, setSearchValue] = useState('');
	const [open, setOpen] = useState(false);

	return (
		<Command>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<CommandInput
						className='max-w-[500px]'
						placeholder="Search Media Locations"
						value={searchValue}
						onValueChange={setSearchValue} />
				</PopoverTrigger>
				<PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Media Locations">
							{data.map((media) => (
								<CommandItem
									key={media.id}
									value={`${media.name} ${media?.city} ${media?.country} ${media.media?.release_year} ${media.region} ${media.location_name}`}
									onSelect={() => {
										const params = addQueryParameter(window.location.search, "mediaPointId", media.id);
										window.history.pushState({}, "", params);
										setOpen(false);
									}}>
									{/* NAME
												Country Year Made
										*/}
									{media.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</PopoverContent>
			</Popover>
		</Command>
	);
}