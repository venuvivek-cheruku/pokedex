import Image from "next/image";
import Link from "next/link";
import region1 from "../public/static/Images/region1.png";
import region2 from "../public/static/Images/region2.png";
import region3 from "../public/static/Images/region3.png";

export async function ExploreRegions() {
  return (
    <>
      <div className="exploreByRegionsContainer mt-14 md:mt-36">
        <div className="section-title text-center">
          <h1 className="font-heading text-4xl md:text-5xl">
            Explore by Regions
          </h1>
        </div>
        <div className="exploreByRegions flex flex-wrap mt-14 justify-around w-full gap-14">
          <div className="gridRegion">
            <div
              className="relative w-80 h-72
            "
            >
              <Image src={region1} alt={"region Image"} fill={true} />
            </div>
            <div className="mt-10 text-center">
              <Link
                className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                href={"/regions/kanto"}
              >
                Search by Kanto Region
              </Link>
            </div>
          </div>
          <div className="gridRegion">
            <div
              className="relative w-80 h-72
            "
            >
              <Image src={region2} alt={"region Image"} fill={true} />
            </div>
            <div className="mt-10 text-center">
              <Link
                className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                href={"/regions/unova"}
              >
                Search by Unova Region
              </Link>
            </div>
          </div>
          <div className="gridRegion">
            <div
              className="relative w-80 h-72
            "
            >
              <Image src={region3} alt={"region Image"} fill={true} />
            </div>
            <div className="mt-10 text-center">
              <Link
                className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                href={"/regions/alola"}
              >
                Search by Alola Region
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-14 text-center">
          <Link
            className="bg-transparent py-2 px-4 font-semibold font-accent  text-white border-white border uppercase rounded-md"
            href={"/regions"}
          >
            Explore More
          </Link>
        </div>
      </div>
    </>
  );
}
