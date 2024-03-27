import { addDoc, collection } from "firebase/firestore";
import { ChangeEvent, useEffect, useRef ,useState} from "react";
import { LiaTimesSolid } from "react-icons/lia"
import TagsInput from "react-tagsinput"
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase";
import { ref } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { Blog } from "../../Context/Context";
import { useNavigate } from "react-router-dom";


export const Preview: React.FC<{description:any,title:any,setPublish:React.Dispatch<React.SetStateAction<any>>}> = ({setPublish,description,title}) => {
    const imageRef=useRef<HTMLInputElement>(null);
    const [imageUrl,setImageUrl]=useState("")
    const [tags,setTags]=useState([])
    const [desc,setDesc]=useState("")
    const {currentUser}=Blog()
    const [loading,setLoading]=useState(false);
    const [preview, setPreview] = useState<{ title: string; photo: string | File; }>({
        title: '',
        photo: '',
    });
    const navigate=useNavigate()
    
    useEffect(()=>{
       if(title||description){
        setPreview({...preview,title:title})
        setDesc(description)
    }else{
        setPreview({...preview,title:""})
        setDesc("")
    }
    },[title,description]);

    const handleSubmit=async()=>{
        setLoading(true)
        try{
            if(preview.title===""||desc===""||tags.length===0){
                toast.error("All fields are required!!")
                return
            }
            if(preview.title.length<15){
                toast.error("Title must be at least 15 characters long")
                return
            }
    
            const collections=collection(db,"posts");
            let url
    
            if (preview.photo instanceof File){
                const storageRef=ref(storage,`image/${preview.photo.name}`)
                await uploadBytes(storageRef, preview.photo)
                url=await getDownloadURL(storageRef)
            } else{
                url=preview.photo
            }
    
            await addDoc(collections, {
                userId: currentUser?.uid,
                title: preview.title,
                desc,
                tags,
                postImg: url || "",
                created: Date.now(),
                pageViews: 0
            });
    
            toast.success("Post has been added")
            navigate("/")
            setPublish(false)
            setPreview({
                title: "",
                photo: ""
            })
        } catch (error:any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };
    
    

    const handleImage=()=>{
        if(imageRef.current){
            imageRef.current.click()
        }
    }
    const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const url = URL.createObjectURL(file);
            setPreview({ ...preview, photo: file });
            setImageUrl(url)
        }
    }
    
    return (
        <section className="absolute inset-0 bg-white z-30">
  <div className="size my-8">
    <span onClick={() => { setPublish(false) }} className="absolute right-4 md:right-20 top-12 cursor-pointer text-2xl">
      <LiaTimesSolid />
    </span>
    <div className="mt-32 flex flex-col md:flex-row gap-10">
      <div className="flex-[1]">
        <h3 className="font-semibold">Your Story:</h3>
        <div className="h-80 w-80">
          <div style={{ backgroundImage: `URL(${imageUrl})` }} onClick={handleImage} className="w-full h-80 object-fill justify-center my-3 grid place-items-center cursor-pointer bg-contain bg-no-repeat">
            {!imageUrl && "Add Image+"}
          </div>
        </div>
        <input onChange={changeImage} ref={imageRef} type="file" className="hidden"></input>
        <div className="relative h-11 mt-6 w-full min-w-[200px]">
          <input value={preview.title} onChange={(e) => setPreview({ ...preview, title: e.target.value })} placeholder="Write your title here..."
            className="peer italic h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
          <label
            className="absolute left-0 -top-2.5 flex h-full w-full select-none overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
          >
            Title
          </label>
        </div>
      </div>
      <div className="flex-[2] border-l border-lime-200 pl-4 flex flex-col gap-4 mb-5 md:mb-0">
        <h3 className="text-xl">User: <span className="ml-1 font-bold text-xl">Samarth Chouhan</span></h3>
        <label className="left-0 top-2.5 flex select-none overflow-visible truncate text-sm font-semibold leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">Story:-</label>
        <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Write your story here..." className="" />
        <TagsInput value={tags} onChange={setTags} />
        <button onClick={handleSubmit} className="text-white w-28 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-full text-sm px-2 py-2.5 text-center me-2 mb-2">
          {loading ? "Publishing please wait" : "Post"}
        </button>
      </div>
    </div>
  </div>
</section>
    )
};
//4:20:25