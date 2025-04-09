import {z} from "zod";

export const createCategorySchema = z.object({
    name: z.string().trim().min(2,"نام دسته بندی حداقل باید 2 حرف باشد").max(255,"ماکسیموم اسم کتگوری 255 حرف است!"),
    description: z.string().trim().min(2,"حداقل توضیحات باید 2 حرف باشد").max(64000,"توضیحات طولانیست!"),
    image: z.any(),
});

export const createBrandSchema = z.object({
    name: z
        .string({ required_error: "نام برند اجباریست" })
        .trim()
        .min(2, "نام برند اجباریست.")
        .max(255, "حداکثر اسم برند نباید بیشتر از 255 حرف باشد."),
    description: z
        .string({ required_error: "توضیحات برند اجباریست" })
        .trim()
        .min(2, "توضیحات اجباریست.")
        .max(64000, "توضیحات از 64 هزار حرف بیشتر نمیتواند باشد."),
    logo: z.any({message:"لوگو اجباریست!"}),
    country: z
        .string({ required_error: " کشور سازنده اجباریست" })
        .trim()
        .min(2, "کشور سازنده اجباریست.")
        .max(255, "حداکثر اسم برند نباید بیشتر از 255 حرف باشد."),

    website_url: z
        .string({ required_error: "آدرس سایت برند اجباریست" })
        .trim()
        .min(2, "آدرس سایت برند اجباریست.")
        .max(255, "حداکثر آدرس سایت برند نباید بیشتر از 255 حرف باشد."),
});


export const createSubCategorySchema = z.object({
    name: z
        .string({ required_error: "نام زیر دسته بندی اجباریست" })
        .trim()
        .min(2, "نام زیر دسته بندی اجباریست.")
        .max(255, "حداکثر اسم زیر دسته بندی نباید بیشتر از 255 حرف باشد."),
    description: z
        .string({ required_error: "توضیحات دسته بندی اجباریست" })
        .trim()
        .min(2, "توضیحات اجباریست.")
        .max(64000, "توضیحات از 64 هزار حرف بیشتر نمیتواند باشد."),
    image: z.any({ message: "عکس اجباریست!" }),
    parent_category_id: z.number({
        invalid_type_error: "یک دسته بندی را انتخاب نمایید",
        required_error: "یک دسته بندی را انتخاب نمایید",
    }),
});