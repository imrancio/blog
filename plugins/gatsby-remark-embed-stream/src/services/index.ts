export function urlProcessor(
	id: string,
	url: URL,
	filter: ([option, val]: [string, string]) => boolean = () => true,
	map: ([option, val]: [string, string]) => [string, string] = (a) => a,
	concat: [string, string][] = [],
): URL {
	let newParameters: [string, string][] = [];
	if (id.startsWith('http')) {
		const originalParams = new URL(id);
		newParameters = [...originalParams.searchParams.entries()]
			.filter(filter)
			.map(map)
			.concat(concat);
	}
	newParameters.forEach((val) => {
		url.searchParams.set(val[0], val[1]);
	});
	return url;
}
