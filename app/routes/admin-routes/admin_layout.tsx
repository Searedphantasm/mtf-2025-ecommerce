import {Link, Outlet} from "react-router";

const AdminLayout = () => {
    return (
        <section className={"h-screen grid grid-cols-[300px_1fr]"}>
            <aside className={"bg-gray-700"} >
                <nav className={"flex flex-col gap-3 text-white py-5"}>
                    <div className={"flex items-center justify-center"}>
                        <Link to={"/admin/products"}>
                            مدیریت محصول
                        </Link>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <Link to={"/admin/categories"}>
                            مدیریت کتگوری
                        </Link>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <Link to={"/admin/add-brand"}>
                            مدیریت برند
                        </Link>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <Link to={"/admin/subcategories"}>
                            مدیریت زیر دسته بندی
                        </Link>
                    </div>
                </nav>
            </aside>
            <main className={"bg-base-100"}>
                <Outlet />
            </main>
        </section>
    );
};

export default AdminLayout;