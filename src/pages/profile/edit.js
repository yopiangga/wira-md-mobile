import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiEdit, FiEdit2, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "src/components/button";
import { InputDefault } from "src/components/input/input-default";
import { NavbarComponent } from "src/components/navbar";
import { UserServices } from "src/services/UserServices";
import avatar from "src/assets/images/user.png";

export function EditProfilePage() {
  const navigate = useNavigate();

  const userServices = new UserServices();

  const [form, setForm] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const res = await userServices.myProfile();

    if (res) {
      setForm({
        name: res.data.name,
        image: null,
        preview: res.data.image,
      });
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await userServices.updateProfile({
      name: form.name,
    });

    if (res) {
      toast.success("Successfully updated profile");
      navigate(-1);
    }
  }

  async function handleImage(e) {
    if (e.target.name == "image") {
      const res = await userServices.updateImage({ image: e.target.files[0] });
      if (res) {
        toast.success("Successfully updated image");
        fetchProfile();
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="w-full">
        <NavbarComponent
          title="Edit Profile"
          type="dark"
          leftIcon={FiArrowLeft}
          handleLeft={() => {
            navigate(-1);
          }}
          rightIcon={FiHome}
          handleRight={() => {
            navigate("/");
          }}
        />
      </div>

      <div className="w-11/12 flex justify-center mt-4">
        <div className="relative w-28 h-28">
          <img
            src={form.preview ? form.preview : avatar}
            className="rounded-full w-28 h-28"
          />
          <div className="bg-primary-main text-white p-2 rounded-full absolute right-0 bottom-0 cursor-pointer">
            <label htmlFor="image" className="">
              <FiEdit2 size={16} />
            </label>
            <input
              type="file"
              className="hidden"
              name="image"
              id="image"
              onChange={handleImage}
            />
          </div>
        </div>
      </div>

      <div className="mt-2 w-11/12">
        <div className="mt-6">
          <InputDefault
            color="dark"
            label={"Nama Lengkap"}
            name={"name"}
            value={form.name}
            handleChange={handleChange}
            type={"text"}
            required={true}
            placeholder={"Masukkan nama lengkap anda"}
          />
        </div>

        <div className="mt-6">
          <ButtonComponent title="Update" type="submit" />
        </div>
      </div>
    </form>
  );
}
