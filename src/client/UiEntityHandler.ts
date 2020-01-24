let ui: Map<string, string> = null;

export function initUI(storeData: string) {
	ui = new Map(JSON.parse(storeData));
}

export function getEntityData(key: string) {
	if (ui == null) return;
	const data = ui.get(key);
	console.log(data);
	return data;
}
