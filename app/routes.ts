import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("","./routes/layout.tsx",[
        index("./routes/home.tsx"),
        route("products/:subCateId","./routes/products.tsx")
    ]),
    route("admin","./routes/admin-routes/admin_layout.tsx",[
        route("products","./routes/admin-routes/admin-products.tsx"),
        route("categories","./routes/admin-routes/admin-categories.tsx"),
        route("add-category","./routes/admin-routes/add-category.tsx"),
        route("subcategories","./routes/admin-routes/admin-subcategories.tsx"),
        route("add-brand","./routes/admin-routes/add-brand.tsx"),
    ]),
] satisfies RouteConfig;
