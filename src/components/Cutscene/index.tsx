'use server'

import prisma from '@/lib/prisma'
import UpdateAtomsWithPrisma from './components/UpdateAtomsWithPrisma'
import TextSection from './components/TextSection'
import ButtonSection from './components/ButtonSection'
import ImageSection from './components/ImageSection'
import VideoSection from './components/VideoSection'

type CutsceneProps = {
  name: string
  language: string
}

const Cutscene = async ({ name, language }: CutsceneProps) => {
  console.log('Cutscene Rendered!')

  // const cutsceneStagesData = await prisma.cutscene.findFirst({
  //   where: {
  //     name: name,
  //     language: language,
  //   },
  //   select: {
  //     CutsceneStage: {
  //       select: {
  //         videoPath: true,
  //         imagePath: true,
  //         text: true,
  //       },
  //     },
  //   },
  // })
  return (
    // <div className="absolute z-50 h-full w-full overflow-y-auto bg-[#111111] py-10">
    //   <UpdateAtomsWithPrisma
    //     cutsceneStagesDataPropFromPrisma={cutsceneStagesData}
    //   >
    //     <main className="flex h-full w-full flex-col items-center gap-4">
    //       <VideoSection />
    //       <ImageSection />
    //       <TextSection />
    //       <ButtonSection />
    //     </main>
    //   </UpdateAtomsWithPrisma>
    // </div>
    <></>
  )
}

export default Cutscene
