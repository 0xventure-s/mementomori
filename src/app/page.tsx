import MementoMoriForm from "@/components/MementoMori.tsx/memento-mori-form";
import { TypingAnimation } from "@/components/ui/typing-animation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full text-center mt-10 mb-5 px-5">
        <div className="items-center flex justify-center w-full">
          <Image
            src={"/marcosaurelio.png"}
            width={200}
            height={200}
            alt="marcos"
          />
        </div>

        <h1 className="text-6xl font-bold ">Memento Mori</h1>
        <TypingAnimation className="text-sm font-normal text-gray-400">
          «Podrías dejar la vida en este momento. Deja que eso determine lo que
          haces, dices y piensas»
        </TypingAnimation>
      </div>

      <main className="  max-w-6xl mx-auto h-fit">
        <div>
          <MementoMoriForm />
        </div>
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-500">Creado por:&nbsp; </p>
          <Link href={"https://x.com/0x_from"} className="hover:underline">
            
            Pantera 0x
          </Link>
        </div>
      </main>
    </>
  );
}
