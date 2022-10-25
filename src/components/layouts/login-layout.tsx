import { PropsWithChildren } from "react";
import LoginBackground from "../../../public/login-bg.jpg";

export const LoginLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex h-full">
      <div
        className="hidden h-full w-[35%] bg-cover bg-center text-white md:flex"
        style={{ backgroundImage: `url(${LoginBackground.src})` }}
      >
        <div className="flex h-full flex-1 flex-col bg-slate-900/95 p-14">
          <div className="flex flex-1 flex-col justify-center gap-4">
            <div className="text-3xl font-bold">Bolek</div>
            <div className="text-slate-300">
              Velkommen til din fantastiske app.
              <br />
              <p>
                Du er velkommen til at logge ind og begynde at administrere din
                forening.
              </p>
            </div>
          </div>
          <div className="text-slate-400">
            Bolek 1.2 &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
      <div className="flex h-full flex-1 items-center justify-center">
        {props.children}
      </div>
    </div>
  );
};
