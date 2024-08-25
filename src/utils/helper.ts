export const secretEmail=(email:any)=>{ 
       const [username,domain]=email.split("@");
       const secretUser=username.substring(0,2)+"*".repeat(username.length-2);
       return `${secretUser}@${domain}`
}

interface DescObject{
       __html:string
}
export const readTime=(desc:DescObject)=>{
   const averageReading=225;

   const div=document.createElement("div");
   div.innerHTML=desc.__html;

   const textContent=div.textContent||div.innerHTML;
   const words=textContent.trim().split(/\s+/);
   return Math.ceil(words.length / averageReading);
}

export const formatNumber=(num:any)=>{
   if(num>=1e9){
       return (num/1e9).toFixed(1)+"K"
   }else if(num>=1e6){
       return (num/1e6).toFixed(1)+"M"
   }else{
       return num.toString();
   }
}