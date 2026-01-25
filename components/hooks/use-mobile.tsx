import { useState, useEffect } from 'react';


export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(('(max-width: 768px)'))
		setIsMobile(mediaQuery.matches);

		const mediaHandler = (e) => setIsMobile(e.matches);
		mediaQuery.addEventListener("change", mediaHandler);

		return () => mediaQuery.removeEventListener("change", mediaHandler);
	}, [])

	return isMobile;
}