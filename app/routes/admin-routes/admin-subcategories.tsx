
import {type ActionFunctionArgs, redirect } from "react-router";
import { BASE_URL_API } from "~/apiClient";
import { useLoaderData } from "react-router";
import type {Category} from "~/types/Category";
import type {SubCategory} from "~/types/SubCategory";
import AdminSubCategoriesTable from "~/components/AdminSubCategoriesTable";
import AddSubCategoryModal from "~/components/AddSubCategoryModal";
import type {Route} from "../../../.react-router/types/app/routes/admin-routes/+types/subcategories";
import {uploadImage} from "~/.server/cloud-services";


export async function loader({request}:Route.LoaderArgs):Promise<{ categories: Category[],subCategories:SubCategory[] }> {

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const [categoriesRes,subCategoriesRes] = await Promise.all([
        fetch(`${BASE_URL_API}/categories`),
        fetch(`${BASE_URL_API}/sub-categories?${searchParams.toString()}`),
    ])

    return {
        categories: await categoriesRes.json(),
        subCategories: await subCategoriesRes.json(),
    };
}

const SubCategories = () => {

    const {subCategories} = useLoaderData()

    return (
        <div className={"p-5"}>
            <div className={"flex justify-between"}>
                <h1 className={"text-2xl my-5"}>دسته بندی محصولات</h1>
                <AddSubCategoryModal   />
            </div>
            <AdminSubCategoriesTable subCategories={subCategories} />
        </div>
    );
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const slug =
        formData.get("name").trim().replace(/\s+/g, "-").toLowerCase() || "";

    const requestBody = {
        name: formData.get("name"),
        description: formData.get("description"),
        slug: slug,
        parent_category_id: parseInt(formData.get("parent_category_id") as string),
        image: formData.get("image"),
        image_key: "",
    };

    const imageName = Date.now().toString() + requestBody.image.name;
    requestBody.image = new File([requestBody.image], imageName, {
        type: requestBody.image.type,
        lastModified: Date.now(),
    });

    const imageResponse = await uploadImage(requestBody.image);

    if (imageResponse.Location && imageResponse.Key) {
        requestBody.image = imageResponse.Location;
        requestBody.image_key = imageResponse.Key;
    }


    const response = await fetch(BASE_URL_API + "/sub-categories", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...requestBody }),
    });

    console.log(await response.json());

    if (response.status === 201) {
        console.log("Successfully uploaded");
    }

    return redirect("/");
}

export default SubCategories;
