import ImageStart from "src/assets/images/start.png";

export function StartPage() {
  return (
    <div className="bg-primary-main h-full relative flex flex-col justify-center">
      <div className="flex flex-col items-center w-full">
        <p className="text-center f-p1-r text-white">Welcome</p>
        <h2 className="text-center f-h2 text-white font-bold mt-2">
          Automatically classsifies stroke pastients
        </h2>
      </div>

      <br />
      <br />
      <br />
      <br />

      <div className="flex flex-row justify-center h-fit w-full">
        <img src={ImageStart} className="w-96 h-96" />
      </div>

      <br />
      <br />
      <br />

      <div className="flex flex-col items-center w-full">
        <h2 className="text-center f-h2 font-bold text-white">Prisma LAB</h2>
      </div>
    </div>
  );
}
