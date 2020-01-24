import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import { getEntityData } from '@src/client/UiEntityHandler';

const TopBanner: React.FC = () => {
	const [entityData, setEntityData] = useState({});

	useEffect(() => {
		setEntityData(getEntityData('top_banner'));
	}, [setEntityData]);

	return (
		<Container
			fluid
			className='topbanner-container shadow-sm border-bottom border-gray'
			hidden={!entityData['visible']}
			style={{ backgroundColor: entityData['background_color'] }}>
			<div className='h-100 pt-4 text-center text-primary'>{entityData['content']}</div>
		</Container>
	);
};

export default TopBanner;
