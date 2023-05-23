"use client";
import React, { useState,useEffect } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";


// file config
const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

export const uploadFile = async (product) => {
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
    redirect: "/",
  };

  const get = await fetch("https://api.escuelajs.co/api/v1/products", requestOptions);
  const data = get.json();
};

export const schemaValidator = Yup.object().shape({
  title: Yup.string().required("Title is required."),
  price: Yup.number().required("Price is required").positive(),
  description: Yup.string().required("Desciption is required"),
  categoryId: Yup.number().required("CategoryID is required").positive(),
  images: Yup.mixed()
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

export default function Upload() {
  return (
    <div className="bg-base-200">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Upload Product now!</h1>
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
              images: undefined,
            }}
            validationSchema={schemaValidator}
            onSubmit={(values, setSubmitting) => {
              alert(JSON.stringify(values));
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl -mt-56">
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
                        name="images"
                        className="-mt-2 file-input w-full max-w-xs"
                        type="file"
                        component={FileInput}
                        setFieldValue={setFieldValue}
                      />
                      <ErrorMessage
                        name="images"
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

export const FileInput = ({ field, form, setFieldValue, isSubmitting,...props }) => {
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
