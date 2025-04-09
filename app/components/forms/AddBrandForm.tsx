import { useActionData, useFetcher } from "react-router";
import { useState } from "react";
import {type FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createBrandSchema} from "~/validation";
import {z} from "zod";

type formData = z.infer<typeof createBrandSchema>

const AddBrandForm = () => {
    const fetcher = useFetcher()
    const {register,handleSubmit,formState:{errors}} = useForm<formData>({
        resolver:zodResolver(createBrandSchema)
    })
    const [prev, setPrev] = useState("");
    // To store the actual file
    const [file, setFile] = useState<File | null>(null);

    let actionData = useActionData();
    if (actionData) {
        actionData = JSON.parse(actionData);
    }

    const onSubmit = (data:FieldValues) => {
        // Create a FormData object manually
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("country", data.country);
        formData.append("website_url", data.website_url);
        formData.append("logo", file as File);



        // Submit the FormData with fetcher.submit
        fetcher.submit(formData, {
            method: "POST",
            action: "/admin/add-brand",
            encType: "multipart/form-data",
        });
    };


    return (
        <fetcher.Form
            className="p-8 bg-white shadow-lg rounded-lg border border-gray-200 max-w-md mx-auto space-y-6 felx flex-col"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="text-2xl font-semibold text-center text-gray-800">
                اضافه کردن برند
            </h1>

            <fieldset>
                <label
                    htmlFor={"name"}
                    className="block text-sm font-medium text-gray-600 mb-2"
                >
                    نام برند
                </label>
                <input
                    id={"name"}
                    type="text"
                    {...register("name")}
                    placeholder="مثال: اپل"
                    className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                {errors?.name && (
                    <p className="text-error text-sm mt-2">{errors.name.message}</p>
                )}
            </fieldset>

            <fieldset>
                <label
                    htmlFor={"description"}
                    className="block text-sm font-medium text-gray-600 mb-2"
                >
                    توضیحات
                </label>
                <input
                    type="text"
                    id={"description"}
                    {...register("description")}
                    placeholder="توضیحات درباره برند"
                    className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                {errors?.description && (
                    <p className="text-error text-sm mt-2">
                        {errors.description.message}
                    </p>
                )}
            </fieldset>

            <fieldset>
                <label
                    htmlFor={"country"}
                    className="block text-sm font-medium text-gray-600 mb-2"
                >
                    کشور سازنده
                </label>
                <input
                    id={"country"}
                    type="text"
                    {...register("country")}
                    placeholder="مثال: اپل"
                    className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                {errors?.country && (
                    <p className="text-error text-sm mt-2">
                        {errors.country.message}
                    </p>
                )}
            </fieldset>

            <fieldset>
                <label
                    htmlFor={"country"}
                    className="block text-sm font-medium text-gray-600 mb-2"
                >
                    آدرس سایت
                </label>
                <input
                    id={"website"}
                    type="text"
                    {...register("website_url")}
                    placeholder="مثال: https://www.samplebrand.com"
                    className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                {errors?.website_url && (
                    <p className="text-error text-sm mt-2">
                        {errors.website_url.message}
                    </p>
                )}
            </fieldset>

            <fieldset className=" justify-self-center my-4">
                <input
                    type="file"
                    id={"logo"}
                    {...register("logo" , {required:true})}
                    accept="image/*"
                    className="hidden"
                    onInput={(event) => {
                        if (!event.target.files || !event.target.files[0]) return;
                        const selectedFile = event.target.files[0];
                        setFile(selectedFile);
                        const logoUrl = URL.createObjectURL(selectedFile);
                        setPrev(logoUrl);
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

                {!file && (
                    <p className="text-error text-sm mt-2">لوگو اجباریست!</p>
                )}

                <label
                    htmlFor="logo"
                    className="btn bg-[#FF2E63] text-white text-center w-max cursor-pointer"
                >
                    عکس برند را انتخاب کنید.
                </label>
            </fieldset>

            <button
                disabled={fetcher.state !== "idle"}
                type="submit"
                className={
                    "bg-blue-500 hover:bg-blue-600 w-full py-2 px-4 text-white font-medium rounded-md transition-colors"
                }
            >
                ثبت برند {fetcher.state !== "idle" && <span className="loading loading-spinner loading-sm"></span>}
            </button>
        </fetcher.Form>
    );
};

export default AddBrandForm;
