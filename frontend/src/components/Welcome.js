import { WelcomeSVG } from "./../resources/WelcomeSVG";

export default function Welcome() {
  return (
    <div className="flex flex-col  border pb-10 pt-4 px-4 align-items-center">
        <WelcomeSVG />
        <h1 className="text-center font-bold text-4xl text-white">Select a chat to send message!</h1>
    </div>
  );
}