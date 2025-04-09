import AddSubCategoryForm from "./AddSubCategoryForm";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import type {Category} from "~/types/category";


const AddSubCategoryModal = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <button
        className="btn bg-[#FF2E63] text-white"
        onClick={() => setToggle(true)}
      >
        اضافه کردن زیر دسته‌بندی
      </button>
      {toggle && ( // شرط برای نمایش مدال
        <div className="flex items-center justify-center w-screen left-0 h-screen top-0 fixed z-50 bg-[#0000007F]">
          <div className="bg-white w-1/2 p-5 rounded-md">
            <div className="flex justify-between">
              <h2 className="text-xl font-medium">
                فرم اضافه کردن زیر دسته‌بندی
              </h2>

              <IoIosClose
                className="text-4xl cursor-pointer"
                onClick={() => setToggle(false)}
              />
            </div>
            <AddSubCategoryForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSubCategoryModal;
