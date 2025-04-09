import {  useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import {Form, Link} from "react-router";
import type {SubCategory} from "~/types/SubCategory";
import { BASE_URL_API } from "~/apiClient";



const AdminSubCategoriesTable = ({subCategories}:{subCategories:SubCategory[]}) => {

    return (
        <div>
            <div>
                <Form method={"GET"} className={"w-full flex justify-between"}>
                    <label className="input w-full my-3">
                        <button className={"btn btn-ghost"}>
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                        </button>
                        <input type="search" name={"search"}  placeholder="جستجو بر اساس نام زیر دسته بندی"/>
                    </label>
                </Form>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto mt-4">
                <table dir="rtl" className="table">
                    <thead>
                    <tr>
                        <th>پوستر</th>
                        <th>نام زیر دسته‌بندی</th>
                        <th className={"hidden md:table-cell"}>محصولات این زیر دسته</th>
                        <th>عملیات‌ها</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subCategories.map((category) => {
                        const src = category.image;
                        return (
                            <tr key={category.id}>
                                <td className={"hidden md:table-cell"}>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-14 w-14">
                                                <img
                                                    src={src}
                                                    // loader={() => src}
                                                    width={50}
                                                    height={50}
                                                    alt="پوستر دسته‌بندی"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className={"font-medium"}>{category.name}</p>
                                </td>
                                <td className={"hidden md:table-cell"}>
                                    <Link
                                        className="link text-[#185E57]"
                                        to={`/`}
                                    >
                                        مشاهده محصولات
                                    </Link>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <DeleteCategory
                                            categoryId={category.id}
                                            handleOnClick={(categoryId) =>
                                            {}
                                            }
                                        />
                                        <Link to={`/subcategory-detail/${category.id}`}>
                                            <FiEdit2 className={"text-blue-600 w-4 h-4"} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

interface DeleteCategoryProps {
    categoryId: number;
    handleOnClick: (productId: number) => void;
}

const DeleteCategory = ({ categoryId, handleOnClick }: DeleteCategoryProps) => {
    const handleClick = () => {
        const options: RequestInit = {
            method: "DELETE",
        };
        fetch(`${BASE_URL_API}/categories/${categoryId}`, options)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <button
            className={"btn bg-gray-50"}
            onClick={() => {
                handleClick();
                handleOnClick(categoryId);
            }}
        >
            <FiTrash2 className={"text-red-600 w-4 h-4"} />
        </button>
    );
};

export default AdminSubCategoriesTable;
