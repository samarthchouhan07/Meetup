import { Banner } from "./Auth/Banner"
import { Trending } from "./Auth/Trending";
import { Posts } from "../Common/Posts/Posts";
import { Discover } from "./Auth/Discover";

export const Demo:React.FC=()=>{
    return (
        <div>
          <Banner />
          <Trending />
          <section className="flex flex-col gap-10">
          <div className="relative">
              <Discover />
            </div>
            <div className="ml-10">
              <Posts />
            </div>
          </section>
        </div>
      );
}