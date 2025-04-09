import { useActionData, useFetcher, useLoaderData } from "react-router";
import {  useState } from "react";

import {type FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSubCategorySchema} from "~/validation";
import {z} from "zod";
import type {SubCategory} from "~/types/SubCategory";


type formData = z.infer<typeof createSubCategorySchema>

const AddSubCategoryForm = () => {

  const fetcher = useFetcher()
  const data = useLoaderData()
  const {categories} = data

  const [prev, setPrev] = useState("");
  const [file, setFile] = useState("");
  const {register,handleSubmit,formState:{errors}} = useForm<formData>({
    resolver: zodResolver(createSubCategorySchema)
  })

  let actionData = useActionData();
  if (actionData) {
    actionData = JSON.parse(actionData);
  }

  const onSubmit = (data:FieldValues) => {
    // Create a FormData object manually
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("parent_category_id", data.parent_category_id);
    formData.append("image", file as unknown as File);

    // Submit the FormData with fetcher.submit
    fetcher.submit(formData, {
      method: "POST",
      action: "/sub-categories",
      encType: "multipart/form-data",
    });
  };

  return (
    <fetcher.Form
      className="p-8 bg-white shadow-lg rounded-lg border border-gray-200 max-w-md mx-auto space-y-4 felx flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        اضافه کردن زیر دسته‌بندی
      </h1>

      <fieldset>
        <label
          htmlFor={"name"}
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          نام زیر دسته‌بندی
        </label>
        <input
          id={"name"}
          type="text"
          {...register("name")}
          placeholder="مثال: تکنولوژی"
          className="w-full px-4 py-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        {errors?.name && (
          <p className="text-error text-sm mt-1">{errors?.name.message}</p>
        )}
      </fieldset>

      <fieldset>
        <label
          htmlFor="parent_category_id"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          دسته بندی والد
        </label>
        <select
          id={"parent_category_id"}
          {...register("parent_category_id",{valueAsNumber:true})}
          className="w-full px-4 py-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        >
          <option value={""}>دسته بندی محصول را انتخاب کنید</option>
          {categories.map((category:SubCategory) => (
            <option
              key={category.id}
              value={category.id}
              id={"parent_category_id"}
            >
              {category.name}
            </option>
          ))}
        </select>

        {errors.parent_category_id && (
          <p className="text-error text-sm mt-1">
            {errors?.parent_category_id.message}
          </p>
        )}
      </fieldset>

      <fieldset>
        <label
          htmlFor={"description"}
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          توضیحات
        </label>
        <input
          type="text"
          id={"description"}
          {...register("description")}
          placeholder="توضیحات درباره دسته‌بندی"
          className="w-full px-4 py-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        {errors?.description && (
          <p className="text-error text-sm mt-1">
            {errors?.description.message}
          </p>
        )}
      </fieldset>

      <fieldset className=" justify-self-center my-3">
        <input
          type="file"
          id={"image"}
          {...register("image")}
          accept="image/*"
          className="hidden"
          onInput={(event) => {
            event.preventDefault();
            // @ts-expect-error it exists
            if (!event.target.files || !event.target.files[0]) {
              return;
            }

            // @ts-expect-error it exists
            const file = event.target.files[0];
            setFile(file)
            const imageUrl = URL.createObjectURL(file);
            setPrev(imageUrl);
          }}
        />

        <div
          className={
            "w-56 my-4 h-56 border-2 border-dashed border-[#a4abb9] rounded-md flex items-center justify-center overflow-hidden"
          }
        >
          {!prev && <span className="text-[#a4abb9]">یک عکس انتخاب کنید.</span>}
          {prev && (
            <img
              src={prev}
              alt="پیش‌نمایش تصویر"
              className="block object-contain w-56 h-56"
            />
          )}
        </div>


        <label
          htmlFor="image"
          className="btn bg-[#FF2E63] text-white text-center w-max cursor-pointer"
        >
          عکس دسته‌بندی را انتخاب کنید.
        </label>
      </fieldset>

      <button
        type="submit"
        className={
          "bg-blue-500 hover:bg-blue-600 w-full py-2 px-4 text-white font-medium rounded-md transition-colors"
        }
      >
        ثبت زیر دسته‌بندی
      </button>
    </fetcher.Form>
  );
};

export default AddSubCategoryForm;
