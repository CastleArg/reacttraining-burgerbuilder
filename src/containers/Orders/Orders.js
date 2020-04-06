import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
const Orders = (props) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState();
    useEffect(() => {
        axios.get('/orders.json')
            .then(res => {
                console.log(res);
                const temp = Object.keys(res.data).map(x => { return { id: x, ...res.data[x] } });
                setOrders(temp);
                setLoading(false);

            })
            .catch(() => { console.log('yikes!')}) //not having this cuses nast y unhandled error - even though error is being handled in wrapper.  Ascertain if we still need this on prod
            .finally(() => console.log('finished!') )
    }, []);
    if (loading) {
        return <Spinner />
    }
    return (<div>
        {orders.map(x => <Order key={x.id} ingredients={x.ingredients} price={+x.price} />)}
    </div>);
}

export default withErrorHandler(Orders, axios);