"use client";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";


// file config
const FILE_SIZE = 1024 * 1024 * 3; // 2MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

export const uploadProduct = async (product) => {
  const { title, price, description, categoryId, images } = product;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let raw = JSON.stringify({
    title,
    price,
    description,
    categoryId,
    images,
  });
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    // redirect: "/",
  };
  try {
    const get = await fetch(
      `https://api.escuelajs.co/api/v1/products`,
      requestOptions
    );
    return get.ok;
  } catch (error) {
    alert(error);
  }
};
//
export const schemaValidator = Yup.object().shape({
  title: Yup.string().required("Title is required."),
  price: Yup.number().required("Price is required").positive(),
  description: Yup.string().required("Desciption is required"),
  categoryId: Yup.number().required("CategoryID is required").positive(),
  file: Yup.mixed()
    .test("fileSize", "File too large", (value) => {
      console.log(value.size);
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .required("Image is required"),
});
//img post
const imgPost = async (values) => {
  try {
    const respone = await axios.post(
      "https://api.escuelajs.co/api/v1/files/upload",
      values.file
    );
    if (respone) {
      return respone?.data?.location;
    }
  } catch (error) {
    console.log(error);
  }
};

export default function Upload() {
  const router = useRouter();
  const[spinner,setSpinner] = useState(false)
;  return (
    <div className="bg-base-200">
      <title>Upload - IsTock</title>
      <meta title="IsTOCK - Upload" content="Upload file"></meta>
      <div className="text-center">
        <br></br>
        <h1 className="text-5xl font-bold">Upload Product Now!</h1>
        <p className="py-6">
          Product stock by ISTAD first generation - scholarship student.
        </p>
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/* form is here */}
          <Formik
            initialValues={{
              title: "",
              price: "",
              description: "",
              categoryId: "",
              images: [""],
              file: undefined,
            }}
            validationSchema={schemaValidator}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const formData = new FormData();
              formData.append("file", values.file);
              const img = await imgPost({ file: formData });
              values.images = [img];
              setSpinner(true);
              const upload = await uploadProduct(values);
              setSubmitting(false);
              if (upload) {
                alert("You hace been created your product.");
                router.push(`/product/detailed/${values.images}`);
              }
              resetForm();
              //route to detailed page
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl -mt-20">
                  <div className="card-body">
                    <div class="grid md:grid-cols-2 md:gap-6">
                      {/* product title */}
                      <div class="relative z-0 w-full mb-6 group">
                        <Field
                          type="text"
                          name="title"
                          id="title"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          for="title"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Title
                        </label>
                        <ErrorMessage
                          name="title"
                          component={"div"}
                          className="text-red-700"
                        />
                      </div>
                      {/* Product Price */}
                      <div class="relative z-0 w-full mb-6 group">
                        <Field
                          type="number"
                          name="price"
                          id="price"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          for="price"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Price
                        </label>
                        <ErrorMessage
                          name="price"
                          className="text-red-700"
                          component={"div"}
                        />
                      </div>
                    </div>
                    {/* end of description */}
                    {/* select product category by id */}
                    <div class="relative z-0 w-full mb-6 group">
                      <label
                        for="categoryId"
                        class="block mb-2 -mt-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Select product categoryId
                      </label>
                      <Field
                        name="categoryId"
                        component="select"
                        id="categoryId"
                        class="text-gray-500 dark:text-gray-400 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Select product categoryId</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                      </Field>
                      <ErrorMessage
                        name="categoryId"
                        className="text-red-700"
                        component={"div"}
                      />
                    </div>
                    {/* end of category id */}
                    {/* file upload */}
                    <div class="relative z-0 w-full mb-6 group">
                      <label
                        for="categoryId"
                        class="block mb-3 -mt-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Product Picture
                      </label>
                      <Field
                        name="file"
                        className="-mt-2 file-input w-full max-w-xs"
                        type="file"
                        component={FileInput}
                        setFieldValue={setFieldValue}
                      />
                      <ErrorMessage
                        name="file"
                        className="text-red-700"
                        component={"div"}
                      />
                    </div>
                    {/* Description */}
                    <div class="relative z-0 w-full mb-6 group">
                      <Field
                        id="description"
                        name="description"
                        component="textarea"
                        className="textarea textarea-bordered textarea-lg w-full max-w-xs text-sm"
                        placeholder="Description"
                      ></Field>
                      <ErrorMessage
                        name="description"
                        className="text-red-700"
                        component={"div"}
                      />
                    </div>
                    {/* label */}
                    {/* <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label> */}
                    {/* end of forget password */}
                    <div className="form-control ">
                      <button className="btn bg-neutral" type="submit">
                        Upload
                      </button>
                      {/* spinner */}
                    
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {/* end of formik */}
        </div>
      </div>
    </div>
  );
}
// create file input filed

export const FileInput = ({
  field,
  form,
  setFieldValue,
  isSubmitting,
  ...props
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  // this function is used handle the file selection
  const handleChange = (event) => {
    event.preventDefault();
    const file = event.currentTarget.files[0];
    // call setFieldValue and pass the field name and file object to it
    setFieldValue(field.name, file);
    // URL.createObjectURL() converts the selected file into a URL which can be used
    // to display preview of the selected file
    setImagePreview(URL.createObjectURL(file));
  };
  const [type, setType] = useState(null);
  useEffect(() => {
    if (isSubmitting) {
      setImagePreview(null);
    }
  }, [isSubmitting]);
  return (
    <>
      <input
        className="-mt-2 file-input w-full max-w-xs"
        type="file"
        onChange={(event) => {
          form.setFieldValue(field.name, event.currentTarget.files[0]);
          setImagePreview(URL.createObjectURL(event.currentTarget.files[0]));
          setType(event.currentTarget.files[0].type);
          console.log(type === "");
        }}
        {...props}
      />
      {/* {imagePreview && (
        <img src={imagePreview} alt="preview" className="mt-2 h-72"/>
      )} */}
    </>
  );
};

// spinner 

export function Spinner(){
  return (
    <div
      role="status"
      class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
    >
      <svg
        aria-hidden="true"
        class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  );
}