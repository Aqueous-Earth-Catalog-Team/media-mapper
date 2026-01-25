"use client"

import { MediaLocation } from '@/lib/airtable/types';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { useState } from 'react';
import { addQueryParameter } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Label } from './ui/label';


export default function Search({ data }: { data: MediaLocation[] }) {
	const [searchValue, setSearchValue] = useState('');
	const [open, setOpen] = useState(false);

	return (
		<Command className='basis-xs'>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<CommandInput
						className='max-w-[500px] justify-end'
						placeholder="Search Media Locations"
						value={searchValue}
						onValueChange={setSearchValue} />
				</PopoverTrigger>
				<PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Media">
							{data.map((media) => (
								<CommandItem
									key={media.id}
									value={`${media.name} ${media?.city} ${media?.country} ${media.media?.release_year} ${media.region} ${media.location_name}`}
									onSelect={() => {
										const params = addQueryParameter(window.location.search, "mediaPointId", media.id);
										window.history.pushState({}, "", params);
										setOpen(false);
									}}>
									<div className='w-full'>
										<div><strong>{media.name}</strong></div>
										<div>
											<div className='flex justify-between'>
												<div className='text-muted-foreground'>{media?.country}</div>
												<div className='text-muted-foreground'>{media?.media?.release_year}</div>
											</div>
										</div>
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</PopoverContent>
			</Popover>
		</Command>
	);
}