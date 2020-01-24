import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';

import PageEntity from '@models/PageEntity';
import { loadUiFromDB } from '@src/utils/loadUiEntities';

@EventSubscriber()
export class PageEntityUpdate implements EntitySubscriberInterface<PageEntity> {
	listenTo() {
		return PageEntity;
	}

	async afterInsert(event: InsertEvent<PageEntity>) {
		await loadUiFromDB();
	}
}
