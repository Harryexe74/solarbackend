import React, { useState, useEffect } from 'react';
import { FiSkipBack } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBannerForm = () => {
    const [bannerType, setBannerType] = useState('Main Section Banner');
    const [resourceType, setResourceType] = useState('product');
    const [productId, setProductId] = useState('');
    const [category, setCategory] = useState('');
    const [shop, setShop] = useState('');
    const [brand, setBrand] = useState('');
    const [bannerImage, setBannerImage] = useState(null);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [shops, setShops] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoints = {
                    product: 'http://localhost:3000/api/products/',
                    category: 'http://localhost:3000/api/categories/',
                    shop: 'http://localhost:3000/api/shops/',
                    brand: 'http://localhost:3000/api/brands/'
                };

                const response = await axios.get(endpoints[resourceType]);
                if (resourceType === 'product') setProducts(response.data.docs);
                else if (resourceType === 'category') setCategories(response.data.data);
                else if (resourceType === 'shop') setShops(response.data.data);
                else if (resourceType === 'brand') setBrands(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [resourceType]);

    const handleBannerTypeChange = (e) => setBannerType(e.target.value);
    const handleResourceTypeChange = (e) => {
        setResourceType(e.target.value);
        setProductId('');
        setCategory('');
        setShop('');
        setBrand('');
    };
    const handleProductChange = (e) => setProductId(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleShopChange = (e) => setShop(e.target.value);
    const handleBrandChange = (e) => setBrand(e.target.value);
    const handleImageChange = (e) => setBannerImage(e.target.files[0]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('bannerType', bannerType);
    //     formData.append('resourceType', resourceType);
    //     formData.append('resourceId', {
    //         product: productId,
    //         category,
    //         shop,
    //         brand
    //     }[resourceType]);
    //     formData.append('url', e.target.url.value);
    //     formData.append('publish', false); // Example publish value
    //     if (bannerImage) formData.append('bannerImage', bannerImage);

    //     // Log the FormData content
    //     for (const [key, value] of formData.entries()) {
    //         console.log(`${key}:`, value);
    //     }

    //     try {
    //      const response=  await axios.post('http://localhost:3000/api/banners/', formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         });

    //     if(response.ok)
    //      {

    //          toast.success('Banner submitted successfully');
    //      }
    //      else
    //      {
    //          toast.error('Failed to submit banner');
    //          console.log('Failed to submit banner:',);
    //      }
    //        // Clear the form and reset state
    //         // e.target.reset();
    //         // // setBannerType('Main Section Banner');
    //         // // setResourceType('product');
    //         // // setProductId('');
    //         // // setCategory('');
    //         // // setShop('');
    //         // // setBrand('');
    //         // // setBannerImage(null);
    //     } catch (error) {
    //         toast.error('Error submitting banner');
    //         console.error('Error submitting banner:', error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('bannerType', bannerType);
        formData.append('resourceType', resourceType);
        formData.append('resourceId', {
            product: productId,
            category,
            shop,
            brand
        }[resourceType]);
        formData.append('url', e.target.url.value);
        formData.append('publish', false); // Example publish value
        if (bannerImage) formData.append('bannerImage', bannerImage);
    
        // Log the FormData content
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    
        try {
            const response = await axios.post('http://localhost:3000/api/banner/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            if (response.status === 200 || response.status === 201) {
                toast.success('Banner submitted successfully');
                e.target.reset(); // Clear the form after successful submission
                setBannerType('Main Section Banner');
                setResourceType('product');
                setProductId('');
                setCategory('');
                setShop('');
                setBrand('');
                setBannerImage(null);
            } else {
                toast.error('Failed to submit banner');
                console.log('Failed to submit banner:', response.statusText);
            }
        } catch (error) {
            toast.error('Error submitting banner');
            console.error('Error submitting banner:', error.response ? error.response.data : error.message);
        }
    };
    
    return (
        <div className="content container-fluid snipcss-j33vn">
            <ToastContainer />
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
                        <img width="20" src="https://6valley.6amtech.com/public/assets/back-end/img/banner.png" alt="Banner Icon" /> Add Banner
                    </h2>
                </div>
                <div>
                    <Link to='/bannersetup' className="btn flex align-items-center gap-2 text-white" style={{ background: "lightgreen" }}>
                        <FiSkipBack /> Back
                    </Link>
                </div>
            </div>
            <div className="row text-start">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit} encType="multipart/form-data" className="banner_form">
                                <input type="hidden" name="_token" value="PwtXfCOB4jJW4r7EFP7tbQ85VIeh6Q28sCgcjoVB" autoComplete="off" />
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="banner_type" className="title-color text-capitalize">Banner Type</label>
                                            <select className="form-control" name="banner_type" id="banner_type" value={bannerType} onChange={handleBannerTypeChange}>
                                                <option value="Main Banner">Main Banner</option>
                                                <option value="Popup Banner">Popup Banner</option>
                                                <option value="Footer Banner">Footer Banner</option>
                                                <option value="Main Section Banner">Main Section Banner</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="url" className="title-color text-capitalize">Banner URL</label>
                                            <input type="url" name="url" className="form-control" id="url" required placeholder="Enter URL" defaultValue="https://codecanyon.net/item/6valley-multivendor-ecommerce-complete-ecommerce-mobile-app-web-and-admin-panel/31448597?s_rank=1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="resource_type" className="title-color text-capitalize">Resource Type</label>
                                            <select className="form-control" name="resource_type" id="resource_type" value={resourceType} onChange={handleResourceTypeChange}>
                                                <option value="product">Product</option>
                                                <option value="category">Category</option>
                                                {/* <option value="shop">Shop</option> */}
                                                <option value="brand">Brand</option>
                                            </select>
                                        </div>
                                        {resourceType === 'product' && (
                                            <div className="form-group">
                                                <label htmlFor="product_id" className="title-color text-capitalize">Product</label>
                                                <select className="form-control" name="product_id" id="product_id" value={productId} onChange={handleProductChange}>
                                                    {products.map(product => (
                                                        <option key={product._id} value={product._id}>{product.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                        {resourceType === 'category' && (
                                            <div className="form-group">
                                                <label htmlFor="category_id" className="title-color text-capitalize">Category</label>
                                                <select className="form-control" name="category_id" id="category_id" value={category} onChange={handleCategoryChange}>
                                                    {categories.map(cat => (
                                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                        {resourceType === 'shop' && (
                                            <div className="form-group">
                                                <label htmlFor="shop_id" className="title-color text-capitalize">Shop</label>
                                                <select className="form-control" name="shop_id" id="shop_id" value={shop} onChange={handleShopChange}>
                                                    {shops.map(shopItem => (
                                                        <option key={shopItem._id} value={shopItem._id}>{shopItem.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                        {resourceType === 'brand' && (
                                            <div className="form-group">
                                                <label htmlFor="brand_id" className="title-color text-capitalize">Brand</label>
                                                <select className="form-control" name="brand_id" id="brand_id" value={brand} onChange={handleBrandChange}>
                                                    {brands.map(brandItem => (
                                                        <option key={brandItem._id} value={brandItem._id}>{brandItem.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                      
                                    </div>
                                    
                                    <div className="col-md-6">
                                    <div className="form-group">
                                            <label htmlFor="banner_image" className="title-color text-capitalize">Banner Image</label>
                                            <input type="file" name="banner_image" className="form-control" id="banner_image" onChange={handleImageChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3 text-end">
                                        <button type="submit" className="btn bg-green-400 text-white hover:bg-green-600">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBannerForm;


//last===============

// import React, { useState, useEffect } from 'react';
// import { FiSkipBack } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AddBannerForm = () => {
//     const [bannerType, setBannerType] = useState('Main Section Banner');
//     const [resourceType, setResourceType] = useState('product');
//     const [productId, setProductId] = useState('');
//     const [category, setCategory] = useState('');
//     const [shop, setShop] = useState('');
//     const [brand, setBrand] = useState('');
//     const [bannerImage, setBannerImage] = useState(null);
//     const [imagePreview, setImagePreview] = useState(''); // New state for image preview

//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [brands, setBrands] = useState([]);
//     const [shops, setShops] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const endpoints = {
//                     product: 'http://localhost:3000/api/products/',
//                     category: 'http://localhost:3000/api/categories/',
//                     shop: 'http://localhost:3000/api/shops/',
//                     brand: 'http://localhost:3000/api/brands/'
//                 };

//                 const response = await axios.get(endpoints[resourceType]);
//                 if (resourceType === 'product') setProducts(response.data.docs);
//                 else if (resourceType === 'category') setCategories(response.data.data);
//                 else if (resourceType === 'shop') setShops(response.data.data);
//                 else if (resourceType === 'brand') setBrands(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [resourceType]);

//     const handleBannerTypeChange = (e) => setBannerType(e.target.value);
//     const handleResourceTypeChange = (e) => {
//         setResourceType(e.target.value);
//         setProductId('');
//         setCategory('');
//         setShop('');
//         setBrand('');
//     };
//     const handleProductChange = (e) => setProductId(e.target.value);
//     const handleCategoryChange = (e) => setCategory(e.target.value);
//     const handleShopChange = (e) => setShop(e.target.value);
//     const handleBrandChange = (e) => setBrand(e.target.value);
    
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setBannerImage(file);
//         if (file) {
//             const objectUrl = URL.createObjectURL(file);
//             setImagePreview(objectUrl);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('bannerType', bannerType);
//         formData.append('resourceType', resourceType);
//         formData.append('resourceId', {
//             product: productId,
//             category,
//             shop,
//             brand
//         }[resourceType]);
//         formData.append('url', e.target.url.value);
//         formData.append('publish', false); // Example publish value
//         if (bannerImage) formData.append('bannerImage', bannerImage);

//         // Log the FormData content
//         for (const [key, value] of formData.entries()) {
//             console.log(`${key}:`, value);
//         }

//         try {
//             await axios.post('http://localhost:3000/api/banners/', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });

//             toast.success('Banner submitted successfully');
//             // Clear the form and reset state
//             e.target.reset();
//             setBannerType('Main Section Banner');
//             setResourceType('product');
//             setProductId('');
//             setCategory('');
//             setShop('');
//             setBrand('');
//             setBannerImage(null);
//             setImagePreview(''); // Clear the image preview
//         } catch (error) {
//             toast.error('Error submitting banner');
//             console.error('Error submitting banner:', error);
//         }
//     };

//     return (
//         <div className="content container-fluid snipcss-j33vn">
//             <ToastContainer />
//             <div className="d-flex justify-content-between mb-3">
//                 <div>
//                     <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
//                         <img width="20" src="https://6valley.6amtech.com/public/assets/back-end/img/banner.png" alt="Banner Icon" /> Add Banner
//                     </h2>
//                 </div>
//                 <div>
//                     <Link to='/bannersetup' className="btn flex align-items-center gap-2 text-white" style={{ background: "lightgreen" }}>
//                         <FiSkipBack /> Back
//                     </Link>
//                 </div>
//             </div>
//             <div className="row text-start">
//                 <div className="col-md-12">
//                     <div className="card">
//                         <div className="card-body">
//                             <form onSubmit={handleSubmit} encType="multipart/form-data" className="banner_form">
//                                 <input type="hidden" name="_token" value="PwtXfCOB4jJW4r7EFP7tbQ85VIeh6Q28sCgcjoVB" autoComplete="off" />
//                                 <div className="row g-3">
//                                     <div className="col-md-6">
//                                         <div className="form-group">
//                                             <label htmlFor="banner_type" className="title-color text-capitalize">Banner Type</label>
//                                             <select className="form-control" name="banner_type" id="banner_type" value={bannerType} onChange={handleBannerTypeChange}>
//                                                 <option value="Main Banner">Main Banner</option>
//                                                 <option value="Popup Banner">Popup Banner</option>
//                                                 <option value="Footer Banner">Footer Banner</option>
//                                                 <option value="Main Section Banner">Main Section Banner</option>
//                                             </select>
//                                         </div>
//                                         <div className="form-group">
//                                             <label htmlFor="url" className="title-color text-capitalize">Banner URL</label>
//                                             <input type="url" name="url" className="form-control" id="url" required placeholder="Enter URL" defaultValue="https://codecanyon.net/item/6valley-multivendor-ecommerce-complete-ecommerce-mobile-app-web-and-admin-panel/31448597?s_rank=1" />
//                                         </div>
//                                         <div className="form-group">
//                                             <label htmlFor="resource_type" className="title-color text-capitalize">Resource Type</label>
//                                             <select className="form-control" name="resource_type" id="resource_type" value={resourceType} onChange={handleResourceTypeChange}>
//                                                 <option value="product">Product</option>
//                                                 <option value="category">Category</option>
//                                                 {/* <option value="shop">Shop</option> */}
//                                                 <option value="brand">Brand</option>
//                                             </select>
//                                         </div>
//                                         {resourceType === 'product' && (
//                                             <div className="form-group">
//                                                 <label htmlFor="product_id" className="title-color text-capitalize">Product</label>
//                                                 <select className="form-control" name="product_id" id="product_id" value={productId} onChange={handleProductChange}>
//                                                     {products.map(product => (
//                                                         <option key={product._id} value={product._id}>{product.name}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}
//                                         {resourceType === 'category' && (
//                                             <div className="form-group">
//                                                 <label htmlFor="category_id" className="title-color text-capitalize">Category</label>
//                                                 <select className="form-control" name="category_id" id="category_id" value={category} onChange={handleCategoryChange}>
//                                                     {categories.map(cat => (
//                                                         <option key={cat._id} value={cat._id}>{cat.name}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}
//                                         {resourceType === 'shop' && (
//                                             <div className="form-group">
//                                                 <label htmlFor="shop_id" className="title-color text-capitalize">Shop</label>
//                                                 <select className="form-control" name="shop_id" id="shop_id" value={shop} onChange={handleShopChange}>
//                                                     {shops.map(shopItem => (
//                                                         <option key={shopItem._id} value={shopItem._id}>{shopItem.name}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}
//                                         {resourceType === 'brand' && (
//                                             <div className="form-group">
//                                                 <label htmlFor="brand_id" className="title-color text-capitalize">Brand</label>
//                                                 <select className="form-control" name="brand_id" id="brand_id" value={brand} onChange={handleBrandChange}>
//                                                     {brands.map(brandItem => (
//                                                         <option key={brandItem._id} value={brandItem._id}>{brandItem.name}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}
//                                     </div>
                               

//         <div class="col-md-6 d-flex flex-column justify-content-center snipcss-DfQX6">
//     <div>
//         <div class="mx-auto text-center">
//             <div class="uploadDnD">
//                 <div class="form-group inputDnD input_image" data-title="Drag and drop file or Browse file">
//                     <input type="file" name="image" class="form-control-file text--primary font-weight-bold" id="banner" accept=".jpg, .png, .jpeg, .gif, .bmp, .webp |image/*" />
//                 </div>
//             </div>
//         </div>
//         <label for="name" class="title-color text-capitalize"> Banner image </label>
//         <span class="title-color" id="theme_ratio">Ratio 3:1</span>
//         <p>Banner Image ratio is not same for all sections in website. Please review the ratio before upload</p>
//     </div>
// </div>
//                                 </div>
//                                 <button type="submit" className="btn btn-primary">Submit</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddBannerForm;



// import React, { useState, useEffect } from 'react';
// import { FiSkipBack } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AddBannerForm = () => {
//     const [bannerType, setBannerType] = useState('Main Section Banner');
//     const [resourceType, setResourceType] = useState('product');
//     const [productId, setProductId] = useState('');
//     const [category, setCategory] = useState('');
//     const [shop, setShop] = useState('');
//     const [brand, setBrand] = useState('');
//     const [bannerImage, setBannerImage] = useState(null);
//     const [imagePreview, setImagePreview] = useState('');

//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [brands, setBrands] = useState([]);
//     const [shops, setShops] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const endpoints = {
//                     product: 'http://localhost:3000/api/products/',
//                     category: 'http://localhost:3000/api/categories/',
//                     shop: 'http://localhost:3000/api/shops/',
//                     brand: 'http://localhost:3000/api/brands/'
//                 };

//                 const response = await axios.get(endpoints[resourceType]);
//                 if (resourceType === 'product') setProducts(response.data.docs);
//                 else if (resourceType === 'category') setCategories(response.data.data);
//                 else if (resourceType === 'shop') setShops(response.data.data);
//                 else if (resourceType === 'brand') setBrands(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [resourceType]);

//     const handleBannerTypeChange = (e) => setBannerType(e.target.value);
//     const handleResourceTypeChange = (e) => {
//         setResourceType(e.target.value);
//         setProductId('');
//         setCategory('');
//         setShop('');
//         setBrand('');
//     };
//     const handleProductChange = (e) => setProductId(e.target.value);
//     const handleCategoryChange = (e) => setCategory(e.target.value);
//     const handleShopChange = (e) => setShop(e.target.value);
//     const handleBrandChange = (e) => setBrand(e.target.value);
    
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setBannerImage(file);
//         if (file) {
//             const objectUrl = URL.createObjectURL(file);
//             setImagePreview(objectUrl);
//         }
//     };

//     const handleDrop = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         const file = e.dataTransfer.files[0];
//         setBannerImage(file);
//         if (file) {
//             const objectUrl = URL.createObjectURL(file);
//             setImagePreview(objectUrl);
//         }
//     };

//     const handleDragOver = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('bannerType', bannerType);
//         formData.append('resourceType', resourceType);
//         formData.append('resourceId', {
//             product: productId,
//             category,
//             shop,
//             brand
//         }[resourceType]);
//         formData.append('url', e.target.url.value);
//         formData.append('publish', false); // Example publish value
//         if (bannerImage) formData.append('bannerImage', bannerImage);

//         // Log the FormData content
//         for (const [key, value] of formData.entries()) {
//             console.log(`${key}:`, value);
//         }

//         try {
//             await axios.post('http://localhost:3000/api/banners/', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });

//             toast.success('Banner submitted successfully');
//             // Clear the form and reset state
//             e.target.reset();
//             setBannerType('Main Section Banner');
//             setResourceType('product');
//             setProductId('');
//             setCategory('');
//             setShop('');
//             setBrand('');
//             setBannerImage(null);
//             setImagePreview(''); // Clear the image preview
//         } catch (error) {
//             toast.error('Error submitting banner');
//             console.error('Error submitting banner:', error);
//         }
//     };

//     return (
//         <div className="content container-fluid snipcss-j33vn">
//             <ToastContainer />
//             <div className="d-flex justify-content-between mb-3">
//                 <div>
//                     <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
//                         <img width="20" src="https://6valley.6amtech.com/public/assets/back-end/img/banner.png" alt="Banner Icon" /> Add Banner
//                     </h2>
//                 </div>
//                 <div>
//                     <Link to='/bannersetup' className="btn flex align-items-center gap-2 text-white" style={{ background: "lightgreen" }}>
//                         <FiSkipBack /> Back
//                     </Link>
//                 </div>
//             </div>
//             <div className="row text-start">
//                 <div className="col-md-12">
//                     <div className="card">
//                         <div className="card-body">
//                             <form onSubmit={handleSubmit} encType="multipart/form-data" className="banner_form">
//                                 <input type="hidden" name="_token" value="PwtXfCOB4jJW4r7EFP7tbQ85VIeh6Q28sCgcjoVB" autoComplete="off" />
//                                 <div className="row g-3">
//                                     <div className="col-md-6">
//                                         <div className="form-group">
//                                             <label htmlFor="banner_type" className="title-color text-capitalize">Banner Type</label>
//                                             <select className="form-control" name="banner_type" id="banner_type" value={bannerType} onChange={handleBannerTypeChange}>
//                                                 <option value="Main Banner">Main Banner</option>
//                                                 <option value="Popup Banner">Popup Banner</option>
//                                                 <option value="Footer Banner">Footer Banner</option>
//                                                 <option value="Main Section Banner">Main Section Banner</option>
//                                             </select>
//                                         </div>
//                                         <div className="form-group">
//                                             <label htmlFor="url" className="title-color text-capitalize">Banner URL</label>
//                                             <input type="url" name="url" className="form-control" id="url" required placeholder="Enter URL" defaultValue="https://codecanyon.net/item/6valley-multivendor-ecommerce-complete-ecommerce-mobile-app-web-and-admin-panel/31448597?s_rank=1" />
//                                         </div>
//                                         <div className="form-group">
//                                             <label htmlFor="resource_type" className="title-color text-capitalize">Resource Type</label>
//                                             <select className="form-control" name="resource_type" id="resource_type" value={resourceType} onChange={handleResourceTypeChange}>
//                                                 <option value="product">Product</option>
//                                                 <option value="category">Category</option>
//                                                 <option value="shop">Shop</option>
//                                                 <option value="brand">Brand</option>
//                                             </select>
//                                         </div>
//                                         {resourceType === 'product' && (
//                                             <div className="form-group">
//                                                 <label htmlFor="product_id" className="title-color text-capitalize">Product</label>
//                                                 <select className="form-control" name="product_id" id="product_id" value={productId} onChange={handleProductChange}>
//                                                     {products.map(product => (
//                                                         <option key={product._id} value={product._id}>{product.name}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}
//                                         {resourceType === 'category' && (
//                                             <div className="form-group">
//                                                 <label htmlFor="category_id" className="title-color text-capitalize">Category</label>
//                                                 <select className="form-control" name="category_id" id="category_id" value={category} onChange={handleCategoryChange}>
//                                                     {categories.map(cat => (
//                                                         <option key={cat._id} value={cat._id}>{cat.name}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}
//                                         {resourceType === 'shop' && (
//                                             <div className="form-group">
//                                                 <label htmlFor="shop_id" className="title-color text-capitalize">Shop</label>
//                                                 <select className="form-control" name="shop_id" id="shop_id" value={shop} onChange={handleShopChange}>
//                                                     {shops.map(shopItem => (
//                                                         <option key={shopItem._id} value={shopItem._id}>{shopItem.name}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}
//                                         {resourceType === 'brand' && (
//                                             <div className="form-group">
//                                                 <label htmlFor="brand_id" className="title-color text-capitalize">Brand</label>
//                                                 <select className="form-control" name="brand_id" id="brand_id" value={brand} onChange={handleBrandChange}>
//                                                     {brands.map(brandItem => (
//                                                         <option key={brandItem._id} value={brandItem._id}>{brandItem.name}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className="col-md-6 d-flex flex-column justify-content-center snipcss-DfQX6">
//                                         <div className="mx-auto text-center">
//                                             <div
//                                                 className="uploadDnD"
//                                                 onDrop={handleDrop}
//                                                 onDragOver={handleDragOver}
//                                                 style={{ border: '2px dashed #ddd', padding: '20px', borderRadius: '4px' }}
//                                             >
//                                                 <div className="form-group inputDnD input_image" data-title="Drag and drop file or Browse file">
//                                                     <input
//                                                         type="file"
//                                                         name="banner_image"
//                                                         className="form-control-file text--primary font-weight-bold"
//                                                         id="banner"
//                                                         accept=".jpg, .png, .jpeg, .gif, .bmp, .webp, image/*"
//                                                         onChange={handleImageChange}
//                                                         style={{ display: 'none' }}
//                                                     />
//                                                     <label htmlFor="banner" style={{ cursor: 'pointer', display: 'block' }}>
//                                                         Drag and drop file or Browse file
//                                                     </label>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <label htmlFor="banner" className="title-color text-capitalize">Banner Image</label>
//                                         <span className="title-color" id="theme_ratio">Ratio 3:1</span>
//                                         {/* <p>Banner Image ratio is not the same for all sections on the website. Please review the ratio before upload.</p> */}
//                                         {imagePreview && (
//                                             <div className="mt-3">
//                                                 <img src={imagePreview} alt="Banner Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="mt-3 d-flex justify-content-end">
//                                     <button type="submit" className="btn btn-primary">Submit</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddBannerForm;
