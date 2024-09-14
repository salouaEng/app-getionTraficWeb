import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LinkForm = ({ formData, setFormData, handleNext }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <Formik
       initialValues={formData}
       validationSchema={Yup.object({
         flowName: Yup.string().required("Flow Name is required"),
         whitePage: Yup.string().required("White Page is required"),
         offerPage: Yup.string().required("Offer Page is required"),
         selectionwhitepage: Yup.string().required("Selection is required"),
         selectionofferpage: Yup.string().required("Selection is required"),
       })}
       onSubmit={(values) => {
         setTimeout(() => {
           console.log(JSON.stringify(values, null, 2));
           handleNext();
         }, 400);
       }}
       onChange={(values) => {
        setFormData(values);
      }}
      >
        {({ values, handleChange }) => (
          <div className="  rounded-lg">
            <div className="mb-5.5 ">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="flowName"
              >
                Flow Name
              </label>
              <Field
                className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-gray-600 dark:text-white dark:focus:border-primary"
                name="flowName"
                type="text"
                placeholder="Flow Name"
                onChange={(e) => {
                  handleChange(e);
                  setFormData('flowName', e.target.value);}}
              />
              <ErrorMessage
                render={(msg) => <span style={{ color: "red" }}> {msg}</span>}
                name="flowName"
              />
            </div>

            <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="whitePage"
              >
                White Page
              </label>
              <Field
                className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-gray-600 dark:text-white dark:focus:border-primary"
                name="whitePage"
                type="text"
                placeholder="White Page"
                onChange={(e) => {
                  handleChange(e);
                  setFormData('whitePage', e.target.value);}}
              />
              <ErrorMessage
                render={(msg) => <span style={{ color: "red" }}> {msg}</span>}
                name="whitePage"
              />
            </div>

            <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="offerPage"
              >
                Offer Page
              </label>
              <Field
                className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-gray-600 dark:text-white dark:focus:border-primary"
                name="offerPage"
                type="text"
                placeholder="Offer Page"
                onChange={(e) => {
                  handleChange(e);
                  setFormData('offerPage', e.target.value);}}
              />
              <ErrorMessage
                render={(msg) => <span style={{ color: "red" }}> {msg}</span>}
                name="offerPage"
              />
            </div>

            <div className="">
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <Field
                    type="radio"
                    name="selection"
                    value="load content"
                    checked={values.selection === "load content"}
                    onChange={(e) => {
                      handleChange(e);
                      setFormData('selection', e.target.value);}}
                    className="text-[#059669] border-[#059669] focus:ring-[#059669] dark:text-[#34D399] dark:border-[#34D399] dark:focus:ring-[#34D399]"
                  />
                  <span className="text-sm font-medium text-black dark:text-white">
                    Load Content
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <Field
                    type="radio"
                    name="selection"
                    value="redirect"
                    checked={values.selection === "redirect"}
                    onChange={(e) => {
                      handleChange(e);
                      setFormData('selection', e.target.value);}}
                    className="text-[#059669] border-[#059669] focus:ring-[#059669] dark:text-[#34D399] dark:border-[#34D399] dark:focus:ring-[#34D399]"
                  />
                  <span className="text-sm font-medium text-black dark:text-white">
                    Redirect
                  </span>
                </label>
              </div>
              <ErrorMessage
                render={(msg) => <span style={{ color: "red" }}> {msg}</span>}
                name="selection"
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LinkForm;
