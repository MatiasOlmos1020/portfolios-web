import React, { useEffect, useState } from 'react';
import { fetchPortfolioItems } from '../api';
import { PortfolioItem } from '../types'; // Importa la interfaz

const PortfolioGrid: React.FC = () => {
	const [items, setItems] = useState<PortfolioItem[]>([]); // Especifica el tipo

	useEffect(() => {
		const loadPortfolioItems = async () => {
			try {
				const data = await fetchPortfolioItems();
				console.log('Fetched data:', data);
				setItems(data);
			} catch (error) {
				console.error('Failed to load portfolio items:', error);
			}
		};

		loadPortfolioItems();
	}, []);

	return (
		<div className="container">
			<div className="row centered mt mb">
				<h1>My Portfolio</h1>
				{items.map(item => (
					<div key={item.id} className="col-lg-4 col-md-4 col-sm-4 gallery">
						<a href="work.html"><img src={`${process.env.PUBLIC_URL}/template/assets/img/portfolio/folio0${item.id}.png`} className="img-responsive"></img></a>
					</div>
				))}
				{/* <div className="col-lg-4 col-md-4 col-sm-4 gallery">
					<a href="work.html"><img src={`${process.env.PUBLIC_URL}/template/assets/img/portfolio/folio01.png`} className="img-responsive"></img></a>
				</div> */}


			</div>
		</div>
	);
};

export default PortfolioGrid;