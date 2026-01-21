"use client"

import { MediaLocation } from '@/lib/airtable/types';
import { LngLatBoundsLike } from 'mapbox-gl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import SearchAndFilter from './filter';
import { LocationDetails } from './location-details';
import { Map } from "@/components/map";
import Search from './search';


interface MapContainerProps {
	mediaPoints: MediaLocation[],
}

export default function MapContainer({ mediaPoints }: MapContainerProps) {
	const searchParams = useSearchParams();

	const filters = {
		countries: searchParams.get('country')?.split(',').filter(Boolean) || [],
		bodiesOfWater: searchParams.get('body_of_water')?.split(',').filter(Boolean) || [],
		startYear: searchParams.get('start_year'),
		endYear: searchParams.get('end_year'),
	}

	const filteredMediaPoints = useMemo(() => {
		return mediaPoints.filter(media => {
			if (filters.countries.length > 0 && !filters.countries.includes(media?.country?.toLowerCase() || '')) return false;
			if (filters.bodiesOfWater.length > 0 && !filters.bodiesOfWater.includes(media.natural_feature_name?.toLowerCase() || '')) return false;
			if (filters.startYear && media.media?.release_year && media.media?.release_year < +filters.startYear) return false;
			if (filters.endYear && media.media?.release_year && media.media?.release_year > +filters.endYear) return false;

			return true;
		})
	}, [filters]);


	const mapBounds = filteredMediaPoints
		.filter((f) => f.longitude && f.latitude)
		.map((f) => [f.longitude, f.latitude]) as LngLatBoundsLike;

	return (
		<div className=''>
			<div className="px-4 py-2 w-full max-w-7xl mx-auto relative h-[calc(100vh-12rem)] lg:h-[calc(100vh-168px)]">
				<div className='border flex p-2 gap-1'>
					<Search data={filteredMediaPoints} />
					<SearchAndFilter data={mediaPoints} filters={filters} />
				</div>
				<Map data={filteredMediaPoints} bounds={mapBounds} />
				<LocationDetails data={mediaPoints} />
			</div>
		</div>
	);
}