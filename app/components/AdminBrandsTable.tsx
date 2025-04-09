import {Form, Link, useLoaderData} from "react-router";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { BASE_URL_API } from "~/apiClient";
import type {Brand} from "~/types/Brand";

const AdminBrandsTable = () => {

    const {data:brands} = useLoaderData()


    return (
        <div>
            <div>
                <Form method={"GET"} className={"w-full flex justify-between"}>
                    <label className="input w-full my-3">
                        <button className={"btn btn-ghost"}>
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                        </button>
                        <input type="search" name={"search"}  placeholder="جستجو بر اساس نام برند"/>
                    </label>
                </Form>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto mt-4">
                <table dir="rtl" className="table">
                    <thead>
                    <tr>
                        <th>پوستر</th>
                        <th>نام دسته‌بندی</th>
                        <th className={"hidden md:table-cell"}>محصولات این دسته</th>
                        <th>عملیات‌ها</th>
                    </tr>
                    </thead>
                    <tbody>
                    {brands.data.map((brand:Brand) => {
                        const src = brand.logo;
                        return (
                            <tr key={brand.id}>
                                <td className={"hidden md:table-cell"}>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-14 w-14">
                                                <img
                                                    src={src}
                                                    // loader={() => src}
                                                    width={50}
                                                    height={50}
                                                    alt="لوگو برند"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className={"font-medium"}>{brand.name}</p>
                                </td>
                                <td className={"hidden md:table-cell"}>
                                    <Link
                                        className="link text-[#185E57]"
                                        to={`${BASE_URL_API}/admin/brands/${brand.id}`}
                                    >
                                        مشاهده برند
                                    </Link>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <DeleteBrand
                                            brandId={brand.id}
                                            handleOnClick={(brandId) =>
                                                console.log(brandId)
                                            }
                                        />
                                        <Link to={`/brand-detail/${brand.id}`}>
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

interface DeleteBrandProps {
    brandId: number;
    handleOnClick: (brandId: number) => void;
}

const DeleteBrand = ({ brandId, handleOnClick }: DeleteBrandProps) => {
    const handleClick = () => {
        const options: RequestInit = {
            method: "DELETE",
        };
        fetch(`${BASE_URL_API}/brands/${brandId}`, options)
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
                handleOnClick(brandId);
            }}
        >
            <FiTrash2 className={"text-red-600 w-4 h-4"} />
        </button>
    );
};

export default AdminBrandsTable;
