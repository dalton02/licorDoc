import documentation from '$lib/localData/documentation.svelte.js';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return documentation.document.map((obj)=> {
        return {
            title: documentation.titleToUrl(obj.title)
        }
    });
}

export const prerender=true