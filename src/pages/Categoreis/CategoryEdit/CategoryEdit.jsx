// import React, { useState } from 'react';
// import { AiOutlineFileImage } from 'react-icons/ai';
// import { BsFillCloudUploadFill } from 'react-icons/bs';
// import './CategoryEdite.css'
// const CategoryUpdate = () => {
//   const [formData, setFormData] = useState({
//     name: {
//       en: 'Home, Pet & Appliances',
//       sa: 'المنزل والحيوانات الأليفة والأجهزة',
//       bd: 'বাড়ি, পোষা প্রাণী এবং যন্ত্রপাতি',
//       in: 'घर, पालतू जानवर और उपकरण',
//     },
//     priority: 1,
//     image: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       image: e.target.files[0],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Form submitted:', formData);
//   };

//   const handleReset = () => {
//     setFormData({
//       name: {
//         en: '',
//         sa: '',
//         bd: '',
//         in: '',
//       },
//       priority: 1,
//       image: null,
//     });
//   };

//   return (
//     <div className="content container-fluid snipcss-HanbV">
//       <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
//         <h2 className="h1 mb-0 flex gap-2">
//           <img
//             src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
//             className="mb-1 mr-1"
//             alt=""
//           />
//           Category Update
//         </h2>
//       </div>
//       <div className="row">
//         <div className="col-md-12">
//           <div className="card">
//             <div className="card-body text-start">
//               <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
//                 <input type="hidden" name="_token" value="PwtXfCOB4jJW4r7EFP7tbQ85VIeh6Q28sCgcjoVB" autoComplete="off" />

//                 <ul className="nav nav-tabs w-fit-content mb-4">
//                   {['en', 'sa', 'bd', 'in'].map((lang) => (
//                     <li key={lang} className="nav-item text-capitalize">
//                       <span className={`nav-link form-system-language-tab cursor-pointer ${lang === 'en' ? 'active' : ''}`}>
//                         {lang === 'en' ? 'English (EN)' : lang === 'sa' ? 'Arabic (SA)' : lang === 'bd' ? 'Bangla (BD)' : 'Hindi (IN)'}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="row">
//                   <div className="col-lg-6">
//                     {['en', 'sa', 'bd', 'in'].map((lang) => (
//                       <div key={lang}>
//                         <div className={`form-group form-system-language-form ${lang !== 'en' ? 'd-none' : ''}`} id={`${lang}-form`}>
//                           <label className="title-color">
//                             Category Name ({lang === 'en' ? 'EN' : lang.toUpperCase()})
//                           </label>
//                           <input
//                             type="text"
//                             name={`name[${lang}]`}
//                             value={formData.name[lang]}
//                             className="form-control"
//                             placeholder="New Category"
//                             onChange={(e) => handleInputChange(e, lang)}
//                             required={lang === 'en'}
//                           />
//                         </div>
//                         <input type="hidden" name={`lang[${lang}]`} value={lang} />
//                         <input type="hidden" name="id" value="34" />
//                       </div>
//                     ))}

//                     <div className="form-group">
//                       <label className="title-color" htmlFor="priority">
//                         Priority
//                       </label>
//                       <select className="form-control" name="priority" id="priority" value={formData.priority} onChange={handleInputChange} required>
//                         {[...Array(11).keys()].map((number) => (
//                           <option key={number} value={number}>
//                             {number}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="from_part_2">
//                       <label className="title-color">Category Logo</label>
//                       <span className="text-info">(Ratio 1:1)</span>
//                       <div className="custom-file text-left">
//                         <input
//                           type="file"
//                           name="image"
//                           id="category-image"
//                           className="custom-file-input image-preview-before-upload"
//                           onChange={handleFileChange}
//                           accept="image/*"
//                         />
//                         <label className="custom-file-label flex align-items-center gap-2" htmlFor="category-image">
//                           <BsFillCloudUploadFill /> Choose File
//                         </label>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-lg-6 mt-5 mt-lg-0 from_part_2">
//                     <div className="form-group">
//                       <div className="text-center mx-auto">
//                         <img className="upload-img-view" id="viewer" src="https://6valley.6amtech.com/storage/app/public/category/2023-06-13-64881a1265b65.png" alt="" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-end gap-3">
//                   <button type="reset" id="reset" className="btn btn-secondary px-4" onClick={handleReset}>
//                     Reset
//                   </button>
//                   <button type="submit" className="btn btn--primary px-4" style={{ backgroundColor: 'green-400' }}>
//                     Update
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryUpdate;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiUrl from '../../../ApiUrl';


const CategoryUpdate = () => {
  const { id } = useParams(); // Extract category ID from URL params
  const navigate = useNavigate(); // To navigate after successful update
  const [selectedLang, setSelectedLang] = useState('en');
  const [categoryData, setCategoryData] = useState({
    name: '',
    priority: 0,
    logo: null,
  });

  useEffect(() => {
    if (id) {
      fetchCategoryById(id);
    }
  }, [id]);

  const fetchCategoryById = (id) => {
    axios.get(`${ApiUrl}categories/${id}`)
      .then(response => {
        setCategoryData({
          name: response.data.docs.name || '',
          priority: response.data.docs.priority || 0,
          logo: response.data.docs.logo || null,
        });
        // Set the image preview if available
        document.getElementById('viewer').src = response.data.docs.logo || 'https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png';
      })
      .catch(error => {
        console.error('Error fetching category:', error);
        toast.error('Error fetching category');
      });
  };

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCategoryData(prevState => ({
      ...prevState,
      logo: file,
    }));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      document.getElementById('viewer').src = reader.result;
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('priority', categoryData.priority);
    if (categoryData.logo) {
      formData.append('logo', categoryData.logo);
    }

    axios.put(`${ApiUrl}categories/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        toast.success("Category updated successfully");
        navigate('/categories'); // Navigate back to categories list or another page
      })
      .catch(error => {
        console.error('Error updating category:', error);
        toast.error('Error updating category');
      });
  };

  return (
    <div className="content container-fluid px-10">
      <ToastContainer />
      <div className="mb-3">
        <h2 className="h1 mb-0 d-flex gap-10">
          {id ? 'Edit Category' : 'Add Category'}
        </h2>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body text-start">
              <form onSubmit={handleSubmit}>
                <ul className="nav nav-tabs w-fit-content mb-4">
                  {['en', 'sa', 'bd', 'in'].map((lang) => (
                    <li className="nav-item text-capitalize" key={lang}>
                      <span
                        className={`nav-link form-system-language-tab cursor-pointer ${selectedLang === lang ? 'active' : ''}`}
                        onClick={() => handleLangChange(lang)}
                      >
                        {lang === 'en' && 'English(EN)'}
                        {lang === 'sa' && 'Arabic(SA)'}
                        {lang === 'bd' && 'Bangla(BD)'}
                        {lang === 'in' && 'Hindi(IN)'}
                      </span>
                    </li>
                  ))}
                </ul>
                <CategoryForm
                  selectedLang={selectedLang}
                  categoryData={categoryData}
                  onInputChange={handleInputChange}
                  onFileChange={handleFileChange}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryForm = ({ selectedLang, categoryData, onInputChange, onFileChange }) => {
  return (
    <div className="row">
      <div className="col-lg-6">
        {['en', 'sa', 'bd', 'in'].map((lang) => (
          <div className={`form-group ${selectedLang === lang ? '' : 'd-none'} form-system-language-form`} key={lang} id={`${lang}-form`}>
            <label className="title-color">Category Name<span className="text-danger">*</span> ({lang.toUpperCase()})</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="New Category"
              required={lang === 'en'}
              value={categoryData.name}
              onChange={onInputChange}
            />
          </div>
        ))}
        <div className="form-group">
          <label className="title-color" htmlFor="priority">Priority</label>
          <select
            className="form-control"
            name="priority"
            required
            value={categoryData.priority}
            onChange={onInputChange}
          >
            <option disabled>Set Priority</option>
            {[...Array(11).keys()].map(num => (
              <option value={num} key={num}>{num}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="title-color">Category Logo</label>
          <span className="text-info"><span className="text-danger">*</span> Ratio 1:1 (500 x 500 px)</span>
          <div className="custom-file text-left">
            <input
              type="file"
              name="logo"
              id="category-image"
              className="custom-file-input"
              accept="image/*"
              onChange={onFileChange}
            />
            <label className="custom-file-label" htmlFor="category-image">Choose File</label>
          </div>
        </div>
      </div>
      <div className="col-lg-6 mt-4 mt-lg-0 from_part_2">
        <div className="form-group flex">
          <div className="text-center flex justify-center " style={{width:"50%"}}>
            <img
              className="upload-img-view"
              id="viewer"
              src="https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png"
              alt="Category Logo"
              width="500"
              height="500"
            />
          </div>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">Update</button>
      </div>
    </div>
  );
};

export default CategoryUpdate;
