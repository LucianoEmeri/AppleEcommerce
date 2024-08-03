import { getProductsByCategory, getProductsById, getProductsDB } from '@/helpers/products.helper';
import React from 'react'
import Card from '../Card/Card';
import CardList from '../CardList/CardList';

const HomeContainer = () => {
    return (
        <div>
            <CardList/>
        </div>
    )
}

export default HomeContainer
