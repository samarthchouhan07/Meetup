export const Modal:React.FC<{children:React.ReactNode,modal:boolean,setModal: React.Dispatch<React.SetStateAction<boolean>>}>=({children,modal,setModal})=>{
  return<>
  <div onClick={()=>{
    setModal(false);
  }} className={`bg-white/50 fixed inset-0 z-10 ${modal?"visible opacity-100":"invisible opacity-0"}`}></div>
   {children}
</> 
}
//37:00