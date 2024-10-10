import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPortfolios } from '../services/portfolioService';
import { PortfolioItem } from '../types'; 

const ListPortfolios : React.FC = () => {
    const [items, setItems] = useState<any[]>([]); // Especifica el tipo
    const navigate = useNavigate();
    useEffect(() => {
        const loadPortfolioItems = async () => {
            try {
                const data = await getAllPortfolios();
                setItems(data);
            } catch (error) {
                console.error('Failed to load portfolio items:', error);
            }
        };
        loadPortfolioItems();
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/editPortfolio/${id}`);
      };

    return (
        <div className="container">
            <div className="row centered mt mb">
                {items.map(item => (
                    <div key={item.id} className="col-lg-4 col-md-4 col-sm-4 gallery">
                        <h1>{item.title}</h1>
                        <a href="work.html"><img src={`${process.env.REACT_APP_API_BASE_URL}${item.imageUrls.URLs[0]}`} className="img-responsive"></img></a>
                        <button onClick={() => handleEdit(item._id)}>Editar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListPortfolios;