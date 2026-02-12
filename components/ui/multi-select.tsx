"use client"

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Label } from './label';
import { Button } from './button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command';

interface MultiSelectProps {
	options: { value: string, label: string }[],
	label: string,
	setSelectedOptions: (options: string[]) => void,
	selectedOptions: string[],
}

export default function MultiSelect({ options, label, setSelectedOptions, selectedOptions }: MultiSelectProps) {
	const [open, setOpen] = useState(false);

	const handleSelection = (currentValue: string) => {
		const selection = selectedOptions.includes(currentValue) ? selectedOptions.filter(option => option !== currentValue) : [...selectedOptions, currentValue];
		setSelectedOptions(selection)
	}

	return (
		<Popover open={open} onOpenChange={setOpen} modal={true}>
			<PopoverTrigger asChild>
				<div className='flex flex-col gap-1 min-w-32'>
					<Label>{label}</Label>
					<Button role="combobox" variant="outline" aria-expanded={open} className='w-full md:w-36'>
						{selectedOptions.length > 0 ? `${selectedOptions.length} Selected` : 'None Selected'}
						<ChevronsUpDown />
					</Button>
				</div>
			</PopoverTrigger>
			<PopoverContent className='max-h-[300px]'>
				<Command>
					<CommandInput placeholder='Search Countries...' aria-label='Filter by country' className='text-base' />
					<CommandList className='max-h-[200px] overflow-y-auto'>
						<CommandEmpty>No Country Found.</CommandEmpty>

						{selectedOptions.length > 0 &&
							<CommandGroup>
								<CommandItem
									onSelect={() => setSelectedOptions([])}
									className='justify-center text-muted-foreground'>
									Clear Selection
								</CommandItem>
							</CommandGroup>
						}

						<CommandGroup>
							{options?.map((option) => (
								<CommandItem
									onSelect={() => handleSelection(option.value)}
									key={option.value}
									value={option.label}>
									{option.label}
									{selectedOptions.includes(option.value) && <Check />}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}