import React from 'react';
import Imageadd from 'components/Imageadd';
import Commentadd from 'components/Commentadd';
import Layout from 'components/layouts/Layout';
import Header from 'components/layouts/Header';



function Addpage() {
    return (
        <Layout>
        <Imageadd/>;
        <Commentadd/>;
        </Layout>
    ) 
    
}
export default Addpage;
