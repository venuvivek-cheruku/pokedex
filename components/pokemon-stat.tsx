export function PokemonStats(pokemonStats: any) {
  const statsData = Object.values(pokemonStats.pokemonStats);

  const statData = [
    { min: 1, max: 255 },
    { min: 1, max: 200 },
    { min: 1, max: 230 },
    { min: 1, max: 194 },
    { min: 1, max: 230 },
    { min: 1, max: 180 },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 w-full md:w-[80%] mt-10">
        {statsData.map((stat: any, index: number) => (
          <div
            key={index}
            className="stat flex flex-row flex-nowrap justify-between"
          >
            <span className="uppercase font-heading text-xl w-3/12 ">
              {stat.stat.name}
            </span>
            <div className="w-2/3 flex flex-row flex-nowrap items-center justify-end">
              <div className="progress-bar w-3/4 rounded-md h-5 bg-darkGray">
                <div
                  className="progress-bar-fill rounded-md text-right flex  items-center justify-end text-bgDark px-2 "
                  style={{
                    transition: "background-color 2s ease-in-out",
                    // width: `${
                    //   (stat.base_stat /
                    //     (statData[index].max - statData[index].min)) *
                    //   100
                    // }%`,
                    width: `${(stat.base_stat / statData[index].max) * 100}%`,
                    height: "100%",
                    backgroundColor: `var(--${stat.stat.name})`,
                  }}
                >
                  {" "}
                  <span className="text-sm">{stat.base_stat}</span>
                </div>
              </div>
              <div>
                <div className="min-max flex ml-4 gap-4 font-accent">
                  {/* <span>{statData[index].min}</span> */}
                  <span>{statData[index].max}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end gap-2 font-accent text-sm ">
          {/* <span>MIN</span> */}
          <span>MAX</span>
        </div>
      </div>
    </>
  );
}
