import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images,
}) 

{
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const router = useRouter();
    const [goToProducts, setGoToProducts] = useState(false);
    async function saveProduct(e) {
        e.preventDefault();
        const data = {title,description,price};
        if(_id) {
            //Update
            await axios.put('/api/products', {...data, _id});
        } else {
            //Create
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);
    }

    if(goToProducts){
        router.push('/products');
    }

    async function uploadImage(ev){
        const files = ev.target?.files;
        if(files?.length > 0) {
            const data = new FormData();
            files.forEach(file => data.append('file', file));
            const res = await axios.post('/api/upload', data)
            console.log(res.data);
        }
    }
    return (
            <form onSubmit={saveProduct}>
                {/* New Product Details */}
                {/* 1. Product Name */}
                <label>Product Name</label>
                <input 
                type="text" 
                placeholder="Product Name" 
                value={title}
                onChange={e => setTitle(e.target.value)}/>
                
                <label>Photos</label>
                <div className="mb-2">
                    <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center gap-1 text-gray-500 rounded-lg bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Upload
                        </div>
                        <input type="file" onChange={uploadImage} className="hidden" />
                    </label>
                    {!images?.length && (
                        <div>No Photos in this product</div>
                    )}
                </div>

                {/* 2. Product Description */}
                <label>Product Description</label>
                <textarea 
                placeholder="Description" 
                value={description} 
                onChange={e => setDescription(e.target.value)} />

                {/* 3. Product Price */}
                <label>Product Price</label>
                <input 
                type="text" 
                placeholder="Price" 
                value={price} 
                onChange={e => setPrice(e.target.value)}/>

                {/* Save Button */}
                <button 
                type="submit" 
                className="btn-primary">
                    Save
                </button>
            </form>

    );
}