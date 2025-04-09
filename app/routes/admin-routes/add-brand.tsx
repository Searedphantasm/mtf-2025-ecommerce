import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import {type ActionFunctionArgs, redirect} from "react-router";
import AddBrandForm from "~/components/forms/AddBrandForm";
import AdminBrandsTable from "~/components/AdminBrandsTable";
import {uploadImage} from "~/.server/cloud-services";
import {BASE_URL_API} from "~/apiClient";
import type {Route} from "../../../.react-router/types/app/routes/admin-routes/+types/add-brand";

export async function loader({request}:Route.LoaderArgs){
    const url = new URL(request.url);
    const searchParams = new URLSearchParams();

    const search = url.searchParams.get("search") || "";
    searchParams.set("search", search);
    const res = await fetch(`${BASE_URL_API}/brands?${searchParams.toString()}`);

    return {
        data: await res.json()
    }
}

const AddBrandModal = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div>
            <button
                className="btn bg-[#FF2E63] text-white"
                onClick={() => setToggle(true)}
            >
                اضافه کردن برند
            </button>
            {toggle && ( // شرط برای نمایش مدال
                <div className="flex items-center justify-center w-screen left-0 h-screen top-0 fixed z-50 bg-[#0000007F]">
                    <div className="bg-white w-1/2 p-5 rounded-md">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-medium">
                                فرم اضافه کردن برند
                            </h2>
                            <IoIosClose
                                className="text-4xl cursor-pointer"
                                onClick={() => setToggle(false)}/>
                        </div>
                        <AddBrandForm />
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminBrands = () => {
    return (
        <div className={"p-5"}>
            <div className={"flex justify-between"}>
                <h1 className={"text-2xl my-5"}>برند ها</h1>
                <AddBrandModal/>
            </div>
            <AdminBrandsTable/>
        </div>
    );
};

export default AdminBrands;


export async function action({
                                 request,}: ActionFunctionArgs) {
    const formData  = await request.formData();
    const slug = (formData.get("name") as string).trim().replace(/\s+/g, "-").toLowerCase() || "";

    const logoFileList = formData.get("logo")


    const requestBody = {
        name: formData.get("name"),
        description: formData.get("description"),
        slug: slug,
        logo:logoFileList,
        logo_key:  "",
        country : formData.get("country"),
        website_url: formData.get("website_url"),
    };

    console.log(requestBody);

    const logoName = Date.now().toString() + requestBody.logo;
    requestBody.logo = new File([requestBody.logo!], logoName,{
        type:requestBody.logo.type,
        lastModified: Date.now(),
    });

    const imageResponse = await uploadImage(requestBody.logo)

    if (imageResponse.Location && imageResponse.Key){
        requestBody.logo = imageResponse.Location;
        requestBody.logo_key= imageResponse.Key;
    }

    const response = await fetch(BASE_URL_API + "/brands", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(requestBody),
    })


    if(response.status === 201) {
        console.log("Successfully uploaded");
    }


    return redirect("/");
}

