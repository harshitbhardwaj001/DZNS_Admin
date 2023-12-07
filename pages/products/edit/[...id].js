import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForms";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            console.log(response.data);
            setProductInfo(response.data);
            console.log(productInfo);
        });
    }, [id]);
    return (
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && (
                <ProductForm { ...productInfo } />
            )}
        </Layout>
    );
}