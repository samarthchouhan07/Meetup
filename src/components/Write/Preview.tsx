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
<section className="relative bg-white z-30 py-8 md:py-16 px-4 md:px-8">
    <span onClick={() => { setPublish(false) }} className="absolute top-4 right-4 md:right-8 cursor-pointer text-2xl text-gray-600 hover:text-gray-900">
        <LiaTimesSolid />
    </span>
    <div className="mt-8 md:mt-16 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
            <h3 className="font-semibold text-lg md:text-xl mb-4">Your Story:</h3>
            <div className="h-60 md:h-80 w-full bg-gray-200 bg-center bg-cover rounded-md relative cursor-pointer" style={{backgroundImage: `url(${imageUrl})`}} onClick={handleImage}>
                {!imageUrl && <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">Add Image+</div>}
                <input onChange={changeImage} ref={imageRef} type="file" className="hidden"></input>
            </div>
            <div className="mt-4">
                <label className="text-sm text-gray-700 mb-1 block">Title</label>
                <input value={preview.title} onChange={(e) => setPreview({ ...preview, title: e.target.value })} placeholder="Write your title here..." className="w-full py-2.5 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800" />
            </div>
        </div>
        <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 pl-0 md:pl-6">
            <h3 className="text-lg md:text-xl font-semibold mb-4">User: <span className="font-bold text-lg">{currentUser?.email}</span></h3>
            <div>
                <label className="text-sm text-gray-700 mb-1 block">Story</label>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Write your story here..." rows={4} className="w-full py-2.5 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800 resize-none"></textarea>
            </div>
            <div className="mt-4">
                <label className="text-sm text-gray-700 mb-1 block">Tags</label>
                <TagsInput value={tags} onChange={setTags} className="w-full" />
            </div>
            <button onClick={handleSubmit} className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                {loading ? "Publishing please wait" : "Post"}
            </button>
        </div>
    </div>
</section>

    )
};
//4:20:25