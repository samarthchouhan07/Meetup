
interface  DropDownProps{
    children:React.ReactNode
    size?:string
    showDrop:boolean
}
export const DropDown:React.FC<DropDownProps>=({children,size,showDrop})=>{
    return <div>
        {showDrop && (
      <div className={`shadow flex flex-col absolute right-0 top-[2rem] bg-white ${size}`}>
        {children}
      </div>)}
    </div>
}
//5:23:268


