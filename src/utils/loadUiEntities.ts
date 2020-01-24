import Page from '@models/Pages';
import PageEntity from '@models/PageEntity';

let cache = '';

export async function loadUiFromDB() {
	const map = new Map<string, string>();

	const pages = await Page.find();

	const pageEntities: PageEntity[] = pages.map(page => page.entities).reduce((acc, val) => acc.concat(val), []);
	for (let index = 0; index < pageEntities.length; index++) {
		const pageEntity = pageEntities[index];
		map.set(pageEntity.key, pageEntity.data);
	}

	cache = JSON.stringify([...map]);
}

export function getCache(): string {
	return cache;
}
