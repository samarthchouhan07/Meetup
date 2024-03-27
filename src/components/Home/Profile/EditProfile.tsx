import { LiaTimesSolid } from "react-icons/lia"
import { Modal } from "../../../utils/Modal"
import Profile_img from "../../../../public/profile.jpg"
import { useEffect, useRef } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "../../../firebase/firebase"
import { doc, updateDoc } from "firebase/firestore"


interface UserData {
    userId: string;
    username: string;
    userImg: string;
    bio: string;
}

export const EditProfile: React.FC<{ getUserData: UserData | null, editModal: any, setEditModal: React.Dispatch<React.SetStateAction<any>> }> = ({ getUserData, editModal, setEditModal }) => {
    const imgRef = useRef<HTMLInputElement>(null);
    const [imgUrl, setImgUrl] = useState<string | null>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<UserData | null>(null);

    const openFile = () => {
        if (imgRef.current) {
            imgRef.current.click();
        }
    }

    const saveForm = async () => {
        if (!form) {
            toast.error("User data not available");
            return;
        }
        if (form.username === "" || form.bio === "") {
            toast.error("All fields are required!!");
            return;
        }
        setLoading(true);
        if (!selectedFile) {
            toast.error("Please select an image");
            return;
        }
        const storageRef = ref(storage, `image/${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        const imageUrl = await getDownloadURL(storageRef);
        try {
            const docRef = doc(db, "users", form.userId);
            await updateDoc(docRef, {
                bio: form.bio,
                username: form.username,
                userImg: imageUrl,
                userId: form.userId || ""
            });
            setLoading(false);
            setEditModal(false);
            toast.success("Profile has been updated");
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedFile(file);
            setImgUrl(imageUrl);
        }
    }

    useEffect(() => {
        if (getUserData) {
            setForm(getUserData);
        } else {
            setForm({
                username: "",
                userId: "", 
                userImg: "",
                bio: ""
            });
        }
    }, [getUserData]);

    return (
        <Modal modal={editModal} setModal={setEditModal}>
        <div className="center w-[95%] md:w-80 bg-white mx-auto p-8 shadow-md my-4 z-20 mb-12 rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Profile Detail</h2>
            <button onClick={() => { setEditModal(false) }} className="text-xl">
              <LiaTimesSolid />
            </button>
          </div>
          <section className="mt-6">
            <div className="flex gap-8">
              <div className="w-20">
                <img src={imgUrl ? imgUrl : form?.userImg ? form.userImg : Profile_img} className="min-h-20 min-w-20 object-cover border border-gray-500 rounded-full" alt="Profile" />
                <input ref={imgRef} type="file" onChange={handleFileChange} accept="image/jpg,image/png,image/jpeg" className="hidden" />
                <div className="gap-4 mt-3 text-sm flex">
                  <button onClick={openFile} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-full text-sm px-3 py-1 text-center mb-1">Update</button>
                  <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-full text-sm px-3 py-1 text-center mb-1">Remove</button>
                </div>
              </div>
            </div>
          </section>
          <section className="pt-4 text-sm">
            <input onChange={(e) => setForm({ ...form!, username: e.target.value })} value={form?.username ?? ""} placeholder="Username..." className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-none disabled:border-0 disabled:bg-blue-gray-50" />
            <input onChange={(e) => setForm({ ...form!, bio: e.target.value })} value={form?.bio ?? ""} placeholder="Your Bio..." className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-none disabled:border-0 disabled:bg-blue-gray-50" />
          </section>
          <div className="flex gap-4 mt-4 justify-center items-center">
            <button onClick={saveForm} className="text-white rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium text-sm px-3 py-1 text-center mb-1">Submit</button>
            <button onClick={() => { setEditModal(false) }} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-full text-sm px-3 py-1 text-center mb-1">Cancel</button>
          </div>
        </div>
      </Modal>
      
    );
}
//3:43:56